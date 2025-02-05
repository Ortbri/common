// lib/r2-admin.ts
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const r2Admin = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ADMIN_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_ADMIN_SECRET_ACCESS_KEY || '',
  },
});

export { getSignedUrl, PutObjectCommand };
