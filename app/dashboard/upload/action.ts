'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UploadElementSchema } from '../../../components/forms/upload';
import { r2Admin } from '../../../utils/cloudflare/admin';
import { safeAction } from '../../../utils/safe-action';

const baseUrl = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
// export const admin = new S3Client({
//   region: 'auto',
//   endpoint: baseUrl,
//   credentials: {
//     accessKeyId: process.env.R2_ADMIN_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.R2_ADMIN_SECRET_ACCESS_KEY!,
//   },
// });

export const uploadAction = safeAction(UploadElementSchema, async ({ PNGfile }) => {
  // TODO: handle auth first
  // Authentication check
  // const session = await auth();
  // if (!session?.user || session.user.role !== 'ADMIN') {
  //   throw new Error('Unauthorized');
  // }

  const file = PNGfile as File;
  // const size = file.size;
  // const sizeLimit = 5 * 1024 ** 2; // 5MB
  const fileType = file.type;

  // Generate presigned URL
  const objectKey = `name/filename3`;
  // maybe its the key name?
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: objectKey,
    ContentType: fileType,
  });
  // what is the cloudflare base path
  const imageUrl = `${baseUrl}/${objectKey}`;
  const presignedUrl = await getSignedUrl(r2Admin, putObjectCommand, {
    expiresIn: 3600, // 5 minutes
  });

  return {
    presignedUrl: presignedUrl,
    imageUrl,
  };
});

/**
 * in example use case 
 * 
 * 
 * const fileName = input.name
 * const size = input.size
 * const sizeLimit = 5 * 1024 **2; // 5MB
 * 
 * const filetype = input.type
 * 
 * if (fileType !== 'image/jpeg && filetype !== "iamge/png") {
 * throw err ...
 * }
 * 
 * if (size > sizeLimit) {
 * throw err ...
 * }
 * const objectKey = `${input.listingId}/${fileName}`;
 * const cmd = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: objectkey,
    ContentLength: size,
    ContentType: fileType,
  });

  const imageUrl = `${env.Cloudflaure image base path}/${objectKey}`
    const presignedUrl = await getSignedUrl(S3, cmd, {
    expiresIn: 3600, // 5 minutes
  });
  console.log("presigned url", presigned url)
  console.log("image url", imageurl)
  return {presignedUrl, imageUrl}
 */
