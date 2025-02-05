'use server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UploadElementSchema } from '../../../components/forms/upload';
import { r2Admin } from '../../../utils/cloudflare/admin';
import { safeAction } from '../../../utils/safe-action';
import { createClient } from '../../../utils/supabase/server';

const baseUrl = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

export const uploadAction = safeAction(
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

    const basePath = `elements/${data.element_id}`;
    const files = {
      svg: { file: SVGfile, path: `${basePath}/thumbnail.svg` },
      jpg: { file: JPGfile, path: `${basePath}/preview.jpg` },
      dwgFt: { file: DWGFTfile, path: `${basePath}/model-ft.dwg` },
      dwgM: { file: DWGMfile, path: `${basePath}/model-m.dwg` },
    };

    const presignedUrls = await Promise.all(
      Object.entries(files).map(async ([, { file, path }]) => {
        const command = new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: path,
          ContentType: file.type,
        });
        return {
          presignedUrl: await getSignedUrl(r2Admin, command, { expiresIn: 3600 }),
          publicUrl: `${baseUrl}/${path}`,
        };
      })
    );

    await supabase
      .from('elements')
      .update({
        svg_url: presignedUrls[0].publicUrl,
        jpg_url: presignedUrls[1].publicUrl,
        dwg_ft_url: presignedUrls[2].publicUrl,
        dwg_m_url: presignedUrls[3].publicUrl,
      })
      .eq('element_id', data.element_id);

    return { presignedUrls };
  }
);
