'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
import { FileUploadField } from './fileUploadField';
import { UploadElementSchema } from './schema';
import { useFileUpload } from './useFileUpload';

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

  const { uploadProgress, handleUpload, resetProgress } = useFileUpload(form);

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof UploadElementSchema>) => {
    const success = await handleUpload(data);

    if (success) {
      toast.success('Success!', {
        description: 'Your files were uploaded successfully!',
      });

      // TODO: is there a better way at resetting the form && file inptu with query selectors
      form.reset({
        title: '',
        SVGfile: undefined,
        JPGfile: undefined,
        DWGFTfile: undefined,
        DWGMfile: undefined,
      });

      const fileInputs = document.querySelectorAll('input[type="file"]');

      fileInputs.forEach(input => {
        if (input instanceof HTMLInputElement) {
          input.value = '';
        }
      });
      resetProgress();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'sm'} className="gap-[2px]">
          <span>New Upload</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col">
            <div className="flex-1 space-y-6">
              <SheetHeader>
                <SheetTitle>Upload Element</SheetTitle>
                <SheetDescription>
                  Let me know if any more forms are needed - also could add drag and drop later
                </SheetDescription>
              </SheetHeader>

              {/* Title field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Title of Folder</FormLabel>
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

              {/* File upload fields - making them more compact */}
              <div className="space-y-4">
                <FileUploadField
                  control={form.control}
                  name="SVGfile"
                  label="SVG File"
                  accept="image/svg+xml"
                  progress={uploadProgress.svg}
                />

                <FileUploadField
                  control={form.control}
                  name="JPGfile"
                  label="JPG File"
                  accept="image/jpeg, image/jpg"
                  progress={uploadProgress.jpg}
                  secondaryProgress={uploadProgress.thumbnail}
                />

                <FileUploadField
                  control={form.control}
                  name="DWGFTfile"
                  label="DWG File (FT)"
                  accept=".dwg"
                  progress={uploadProgress.dwgFt}
                />

                <FileUploadField
                  control={form.control}
                  name="DWGMfile"
                  label="DWG File (M)"
                  accept=".dwg"
                  progress={uploadProgress.dwgM}
                />
              </div>
            </div>

            <SheetFooter className="flex-shrink-0">
              <Button className="w-full" type="submit" size="lg" disabled={isSubmitting}>
                <span className="mr-2 font-bold">{isSubmitting ? 'UPLOADING...' : 'UPLOAD'}</span>
                <Upload className="h-4 w-4" />
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
