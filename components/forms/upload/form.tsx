'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { uploadAction } from '../../../app/dashboard/upload/action';
import { Button } from '../../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { UploadElementSchema } from './schema';

export default function UploadForm() {
  const form = useForm<z.infer<typeof UploadElementSchema>>({
    resolver: zodResolver(UploadElementSchema),
    defaultValues: {
      SVGfile: undefined,
      JPGfile: undefined,
      DWGFTfile: undefined,
      DWGMfile: undefined,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof UploadElementSchema>) => {
    try {
      // Call the server action for presigned url
      const result = await uploadAction(data);

      // Handle possible server errors
      if (result.serverError) {
        console.warn('Server error:', result.serverError);
        form.setError('root', {
          message: result.serverError,
        });
        return;
      }

      // Adjust property access according to your server action response.
      if (!result.data?.presignedUrl) {
        console.warn('Upload URL not returned');
        form.setError('root', {
          message: 'Could not upload!!! :(',
        });
        return;
      }

      // Perform the file upload using the presigned URL.
      // const uploadResponse = await fetch(result.data.presignedUrl, {
      //   method: 'PUT',
      //   body: data.PNGfile,
      //   headers: {
      //     'Content-Type': data.PNGfile.type,
      //   },
      // });

      // if (!uploadResponse.ok) {
      //   throw new Error('Upload failed');
      // }

      // Notify the user upon success
      toast.success('Success!', {
        description: 'Your upload was successful!',
        duration: 10000,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Upload error:', errorMessage);
      form.setError('root', {
        message: 'An unexpected error occurred',
      });
    }
  };

  // const handleFile = (files: any) => {
  //   // handle current file
  //   const file = files[0];
  //   if (!file) return;
  //   const p = Object.assign(file, {
  //     preview: URL.createObjectURL(file),
  //   });
  //   // setPreview(p)  //state set preview
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   /**
  //    * handle drop file is the server action in the example usage he is using zsa we are not
  //    * way to create procedures in next server actions
  //    *
  //    * basically checks if user is auth
  //    * if user owns the listing of what they are uploading for (his use case)
  //    * cant upload unless auth and for specific use case ( if user has his listing)
  //    */
  //   // const [data, error] = await handleDropFile({
  //   //   listingId, his use case users have their listing id
  //   //   name, name of file are only  ("cover", "thumbnail")
  //   //   size: file.size,
  //   //   type: file.type,
  //   // });

  //   const presignedUrl = data?.presignedUrl;
  //   if (!presignedUrl || typeof presignedUrl !== 'string') return;
  //   // setValue(data.imageUrl); // set state again
  //   // await axios.put(presignedUrl, file, {
  //   //   headers: {
  //   //     "Content-Type": file.type,
  //   // },
  //   //   // upload progress for ui - uses axios because of this and says its harder with fetch
  //   //   onUploadProgress: (progressEvent) => {
  //   //     const percentCompleted = Math.round(
  //   //       (progressEvent.loaded * 100) / file.size,
  //   //     );
  //   //     setProgress(percentCompleted)
  //   // }
  //   // });
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="SVGfile"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>SVG File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/svg+xml"
                  onChange={e => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* JPG file input */}
        <FormField
          control={form.control}
          name="JPGfile"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>JPG File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/jpeg, image/jpg"
                  onChange={e => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DWG file for Feet */}
        <FormField
          control={form.control}
          name="DWGFTfile"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>DWG File (Feet)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".dwg"
                  onChange={e => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DWG file for Meters */}
        <FormField
          control={form.control}
          name="DWGMfile"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>DWG File (Meters)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".dwg"
                  onChange={e => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          <span className="font-bold">{isSubmitting ? 'UPLOADING...' : 'UPLOAD'}</span>
          <Upload />
        </Button>
      </form>
    </Form>
  );
}
