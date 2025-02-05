'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { uploadAction } from '../../../app/dashboard/upload/action';
import { Button } from '../../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Progress } from '../../ui/progress'; // Adjust import path to wherever Progress is exported
import { UploadElementSchema } from './schema';

// Helper function (could be in a separate file if you prefer)
function uploadFileWithProgress(
  file: File,
  presignedUrl: string,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', presignedUrl, true);
    xhr.setRequestHeader('Content-Type', file.type);

    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) {
        const pct = (e.loaded / e.total) * 100;
        onProgress(pct);
      }
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error on XHR upload'));

    xhr.send(file);
  });
}

export default function UploadForm() {
  const form = useForm<z.infer<typeof UploadElementSchema>>({
    resolver: zodResolver(UploadElementSchema),
    defaultValues: {
      title: '',
      SVGfile: undefined,
      JPGfile: undefined,
      DWGFTfile: undefined,
      DWGMfile: undefined,
    },
  });

  // 1) Keep track of each file’s upload progress in local state.
  const [uploadProgress, setUploadProgress] = useState({
    svg: 0,
    jpg: 0,
    dwgFt: 0,
    dwgM: 0,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof UploadElementSchema>) => {
    try {
      // Step 1: Insert row + get presigned URLs from the server action.
      const result = await uploadAction(data);

      if (result.serverError) {
        form.setError('root', { message: result.serverError });
        return;
      }

      const presignedUrls = result.data?.presignedUrls;
      if (!presignedUrls) {
        form.setError('root', { message: 'No presigned URLs returned.' });
        return;
      }

      // According to your server code, presignedUrls are [ svg, jpg, dwgFt, dwgM ]
      const [svgUrl, jpgUrl, dwgFtUrl, dwgMUrl] = presignedUrls;

      // Step 2: Upload each file in parallel (or sequentially). We'll do parallel.
      await Promise.all([
        data.SVGfile &&
          uploadFileWithProgress(data.SVGfile, svgUrl.presignedUrl, pct =>
            setUploadProgress(prev => ({ ...prev, svg: pct }))
          ),
        data.JPGfile &&
          uploadFileWithProgress(data.JPGfile, jpgUrl.presignedUrl, pct =>
            setUploadProgress(prev => ({ ...prev, jpg: pct }))
          ),
        data.DWGFTfile &&
          uploadFileWithProgress(data.DWGFTfile, dwgFtUrl.presignedUrl, pct =>
            setUploadProgress(prev => ({ ...prev, dwgFt: pct }))
          ),
        data.DWGMfile &&
          uploadFileWithProgress(data.DWGMfile, dwgMUrl.presignedUrl, pct =>
            setUploadProgress(prev => ({ ...prev, dwgM: pct }))
          ),
      ]);

      // Step 3: If all succeeded
      toast.success('Success!', {
        description: 'Your files were uploaded successfully!',
      });

      // Optionally reset the form and progress
      form.reset();
      setUploadProgress({ svg: 0, jpg: 0, dwgFt: 0, dwgM: 0 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Upload error:', errorMessage);
      form.setError('root', { message: `An unexpected error: ${errorMessage}` });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">Title of Folder</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Man with hat" {...field} />
              </FormControl>
              <FormDescription>
                This could be something like <span className="italic">man in hat</span>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SVG file input */}
        <FormField
          control={form.control}
          name="SVGfile"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">SVG File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="min-h-24"
                  accept="image/svg+xml"
                  onChange={e => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
              {/* Show progress bar for the SVG file */}
              <Progress value={uploadProgress.svg} className="mt-2" />
            </FormItem>
          )}
        />

        {/* JPG file input */}
        <FormField
          control={form.control}
          name="JPGfile"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">JPG File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="min-h-24"
                  accept="image/jpeg, image/jpg"
                  onChange={e => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
              {/* Show progress bar for the JPG file */}
              <Progress value={uploadProgress.jpg} className="mt-2" />
            </FormItem>
          )}
        />

        {/* DWG file (Feet) */}
        <FormField
          control={form.control}
          name="DWGFTfile"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">DWG File (FT)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="min-h-24"
                  accept=".dwg"
                  onChange={e => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
              {/* Show progress bar for the DWG FT file */}
              <Progress value={uploadProgress.dwgFt} className="mt-2" />
            </FormItem>
          )}
        />

        {/* DWG file (Meters) */}
        <FormField
          control={form.control}
          name="DWGMfile"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">DWG File (M)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="min-h-24"
                  accept=".dwg"
                  onChange={e => onChange(e.target.files?.[0])}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
              {/* Show progress bar for the DWG M file */}
              <Progress value={uploadProgress.dwgM} className="mt-2" />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" size="lg" disabled={isSubmitting}>
          <span className="font-bold">{isSubmitting ? 'UPLOADING...' : 'UPLOAD'}</span>
          <Upload />
        </Button>
      </form>
    </Form>
  );
}
