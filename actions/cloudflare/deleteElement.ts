"use server"

import { r2Admin } from "@/utils/cloudflare/admin";
import { createClient } from "@/utils/supabase/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

type DeleteElementResponse = {
  success: boolean;
  message: string;
};

// Initialize S3 client for Cloudflare R2
// const s3Client = new S3Client({
//   region: "auto",
//   endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
//   credentials: {
//     accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
//   },
// });

export async function deleteElementAction(element_id: string): Promise<DeleteElementResponse> {
  try {
    // Get element details from Supabase
    const supabase = await createClient();
    // check if we have the element
    const { data: element, error: fetchError } = await supabase
      .from('elements')
      .select('*')
      .eq('element_id', element_id)
      .single();

    if (fetchError || !element) {
      throw new Error('Element not found');
    }

      // Define all possible file URLs to delete
      // not sure if this will work....
    const privateFiles = [
      element.svg_url, // private
      element.jpg_url, // private
      element.dwg_ft_url, // private
      element.dwg_m_url, // private
      // element.thumbnail_url // public bucket
    ].filter(Boolean); // Remove null/undefined values
    const publicFiles = [
      element.thumbnail_url, // public
    ]

    // console.log(JSON.stringify(publicFiles , null,2));
    // console.log(JSON.stringify(privateFiles , null,2));
    // out put -----
// [
//   "https://pub-7debab0acbee4447a863dda9dfcd75d9.r2.dev/elements/144ae8e8-3bad-444b-b0d7-0c9db945e450/thumbnail.jpg"
// ]
// [
//   "https://2cdf7c66f95c2978dc332fe0a7938745.r2.cloudflarestorage.com/elements/144ae8e8-3bad-444b-b0d7-0c9db945e450/model.svg",
//   "https://2cdf7c66f95c2978dc332fe0a7938745.r2.cloudflarestorage.com/elements/144ae8e8-3bad-444b-b0d7-0c9db945e450/model.jpg",
//   "https://2cdf7c66f95c2978dc332fe0a7938745.r2.cloudflarestorage.com/elements/144ae8e8-3bad-444b-b0d7-0c9db945e450/model-ft.dwg",
//   "https://2cdf7c66f95c2978dc332fe0a7938745.r2.cloudflarestorage.com/elements/144ae8e8-3bad-444b-b0d7-0c9db945e450/model-m.dwg"
// ]



    // Delete files from R2
    // const deletePromises = [...privateFiles, ...publicFiles].map(async (fileUrl) => {
    //   const key = new URL(fileUrl).pathname.slice(1); // Remove leading slash
    //   const command = new DeleteObjectCommand({
    //     Bucket: process.env.R2_PRIVATE_BUCKET_NAME,
    //     Key: key,
    //   });
    //   return r2Admin.send(command);
    // });


    // base pth in presigned url retrival
    const basePath = `elements/${element.element_id}`; // delete while foler

    //  why the async there?
     const deletePrivateBucketObject = privateFiles.map(async (fileUrl) => {
      const key = new URL(fileUrl).pathname.slice(1); // Remove leading slash
      const command = new DeleteObjectCommand({
        Bucket: process.env.R2_PUBLIC_BUCKET_NAME,
        Key: key,  //TODO: should be the path??
      });
      return r2Admin.send(command);
     });
    // does them all at the same time, async is for the await promise all .. right?
    await Promise.all(deletePrivateBucketObject)

    // const deletePublicBucketObject

    // Wait for all deletions to complete
    // await Promise.all(deletePromises);

    // Delete record from Supabase
    // const { error: deleteError } = await supabase
    //   .from('elements')
    //   .delete()
    //   .match({ element_id });

    // if (deleteError) {
    //   throw new Error('Failed to delete database record');
    // }

    return {
      success: true,
      message: "Element successfully deleted"
    };
  } catch (error) {
    console.error("Error deleting element:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete element"
    };
  }
}