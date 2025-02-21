import { DownloadForm } from '@/components/forms/download';
import { Separator } from '@/components/ui/separator';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import UploadForm from '../../components/forms/upload/form';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';
import { createClient } from '../../utils/supabase/client';

/* ------------------------------- get uploads ------------------------------ */
async function getUploads() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('elements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching uploads:', error);
    return [];
  }

  return data;
}

/* ------------------------------ upload sheet ------------------------------ */
function UploadSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'sm'} className="gap-[2px]">
          <span>New Upload</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-3">
          <SheetTitle>Upload Element</SheetTitle>
          <SheetDescription>
            Let me know if any more forms are needed - also could add drag and drop later
          </SheetDescription>
        </SheetHeader>
        <UploadForm />
      </SheetContent>
    </Sheet>
  );
}

/* -------------------------------------------------------------------------- */
/*                                uploads page                                */
/* -------------------------------------------------------------------------- */
export default async function Uploads() {
  // Fetch the upload data from Supabase.
  const uploadData = await getUploads();

  /**
   * element id
   * title
   * thumbnail_url
   * svg_url
   * jpg_url
   * dwg_ft_url
   * dwg_m_url
   * searchabletext vector (not needed to show)
   * clip_embedding(dont show)
   * created_at
   * updated_at
   */

  return (
    <div className="flex flex-col gap-3 p-4">
      {/* top header */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">Uploads</h1>
          <p className="text-xs text-muted-foreground">
            Do not do normal uploads until custom domain is set in cloudflare
          </p>
        </div>
        <UploadSheet />
      </div>
      {/* content */}
      <div className="3xl:grid-cols-6 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {/* cards */}
        {uploadData.map(item => (
          <Card key={item.element_id} className="flex h-full flex-col">
            <CardHeader className="flex flex-col items-start justify-between gap-3 space-y-0">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                Uploaded on{' '}
                {new Date(item.created_at).toLocaleString('en-US', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {item.thumbnail_url ? (
                <div className="relative aspect-video w-full rounded-md bg-muted">
                  <Image
                    loading={'lazy'}
                    src={item.thumbnail_url}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="mb-4 h-48 w-full rounded-md object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-md bg-muted" />
              )}
            </CardContent>
            <CardFooter className="flex w-full flex-col gap-4">
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">Element Details</h3>
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">ID:</span>
                      <span className="break-all text-xs text-muted-foreground">
                        {item.element_id}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="w-full space-y-3">
                  <h3 className="text-sm font-semibold">Downloads</h3>
                  <div className="grid w-full grid-cols-1 gap-2">
                    {item.svg_url && <DownloadForm id={item.element_id} fileType="svg" />}
                    {item.jpg_url && <DownloadForm id={item.element_id} fileType="jpg" />}
                    {item.dwg_ft_url && <DownloadForm id={item.element_id} fileType="dwg-ft" />}
                    {item.dwg_m_url && <DownloadForm id={item.element_id} fileType="dwg-m" />}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="w-full space-y-3">
                <Button variant="destructive" size="sm" className="w-full" disabled>
                  Delete <TrashIcon className="ml-2 h-4 w-4" /> (not implemented)
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
