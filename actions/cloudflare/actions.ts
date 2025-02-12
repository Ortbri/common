'use server';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DownloadSchema } from '../../components/forms/download/schema';
import { UploadElementSchema } from '../../components/forms/upload';
import { STRIPE_SUB_KV_CACHE } from '../../types/stripe';
import { r2Admin, r2Download } from '../../utils/cloudflare/admin';
import { safeAction } from '../../utils/safe-action';
import { createClient } from '../../utils/supabase/server';
import { kv } from '../../utils/upstash/client';


/* -------------------------------------------------------------------------- */
/*                                presigned url                               */
/* -------------------------------------------------------------------------- */
const baseUrl = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
/**
 * request a presigned url from cloudflare 
 * returns private signed urls for both the public and private bucket
 */
export const generatePresignedUrlsAction = safeAction(
  UploadElementSchema,
  async ({ title, SVGfile, JPGfile, DWGFTfile, DWGMfile }) => {
    const supabase = await createClient();

    if (!SVGfile || !JPGfile || !DWGFTfile || !DWGMfile) {
      throw new Error('All files are required');
    }

    const { data, error } = await supabase
      .from('elements')
      .insert({ title })
      .select('element_id')
      .single();

    if (error) throw error;
    if (!data?.element_id) throw new Error('Failed to create element');

    const privateBucket = process.env.PRIVATE_R2_BUCKET_NAME!;
    const publicBucket = process.env.PUBLIC_R2_BUCKET_NAME!;

    const basePath = `elements/${data.element_id}`;

    const files = {
      svg: { file: SVGfile, path: `${basePath}/model.svg` },
      jpg: { file: JPGfile, path: `${basePath}/model.jpg` },
      dwgFt: { file: DWGFTfile, path: `${basePath}/model-ft.dwg` },
      dwgM: { file: DWGMfile, path: `${basePath}/model-m.dwg` },
    };

    const privatePresignedUrls = await Promise.all(
      Object.entries(files).map(async ([, { file, path }]) => {
        const command = new PutObjectCommand({
          Bucket: privateBucket!, // private bucket name!
          Key: path,
          ContentType: file.type,
        });
        return {
          presignedUrl: await getSignedUrl(r2Admin, command, { expiresIn: 3600 }),
          publicUrl: `${baseUrl}/${path}`,
        };
      })
    );

    // thumbnail upload presigned url
    const thumbnailPath = `${basePath}/thumbnail.svg`;
    const thumbnnail = SVGfile as File;
    const command = new PutObjectCommand({
      Bucket: publicBucket!, // private bucket name!
      Key: thumbnailPath,
      ContentType: thumbnnail.type,
    });

    const devSubDomain = process.env.R2_DEV_SUBDOMAIN!;
    const publicPresignedUrl = await getSignedUrl(r2Admin, command, { expiresIn: 3600 });
    // const publicThumbnailUrl = `${baseUrl}/${publicBucket}/${thumbnailPath}`;
    const publicThumbnailUrl = `${devSubDomain}/${thumbnailPath}`; //TODO: THIS IS ONLY FOR DEVELOPMENT LINKS

    await supabase
      .from('elements')
      .update({
        svg_url: privatePresignedUrls[0].publicUrl,
        jpg_url: privatePresignedUrls[1].publicUrl,
        dwg_ft_url: privatePresignedUrls[2].publicUrl,
        dwg_m_url: privatePresignedUrls[3].publicUrl,
        thumbnail_url: publicThumbnailUrl,
      })
      .eq('element_id', data.element_id);

    return {
      privatePresignedUrls,
      publicPresignedUrl,
      publicThumbnailUrl,
    };
  }
);




/* -------------------------------------------------------------------------- */
/*                                  download                                  */
/* -------------------------------------------------------------------------- */
/**
 * TODO:
 * idea to speed up downloads, 
 * 1. add customer id to supabase db
 * 2. cache the query result
 * 3. remove first kv lookup
 * 4. single kv status lookup
 * 5. could potentially cache kv lookup after initia download
 * 6.return signed download url?
 * 
 */
export const generateDownloadUrlAction = safeAction(
  DownloadSchema,
  async ({ elementId, fileType }) => {
    const supabase = await createClient(); // check cache
    
    /**
     * issue every single download you do it goes through a db check to see if you are subbed
     * is there a way to cache the kv?? is that a bad idea lol?
     */
    // Authentication check
    const { data: { user } } = await supabase.auth.getUser(); 
      if (!user) throw new Error('Not authenticated');

    //   check kv for user subscription status
    // const subscriptionStatus = await kv.get(`subscription_status:${user.id}`);
    const stripeCustomerId = (await kv.get(`stripe:user_id:${user.id}`)) as string;
    if (!stripeCustomerId) {
      throw new Error('No Stripe customer found');
    }
    // Retrieve the user's Stripe subscription data from KV
    const subscriptionData = await kv.get<STRIPE_SUB_KV_CACHE>(`stripe:customer_id:${stripeCustomerId}`);

    if (!subscriptionData || subscriptionData.status !== 'active') {
      throw new Error('User is not subscribed');
    }
      
    const filePaths = {
      svg: `elements/${elementId}/model.svg`,
      jpg: `elements/${elementId}/model.jpg`,
      'dwg-ft': `elements/${elementId}/model-ft.dwg`,
      'dwg-m': `elements/${elementId}/model-m.dwg`,
    };

    // Type-safe file type access
    const key = filePaths[fileType as keyof typeof filePaths];
    if (!key) throw new Error('Invalid file type');

    const command = new GetObjectCommand({
      Bucket: process.env.PRIVATE_R2_BUCKET_NAME!,
      Key: key,
    });

    // Generate presigned URL valid for 1 hour
    const downloadUrl = await getSignedUrl(r2Download, command, { 
      expiresIn: 1000 
    });

    return { downloadUrl };
  }
);