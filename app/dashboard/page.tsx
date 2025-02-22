import { DownloadForm } from '@/components/forms/download';
import { Separator } from '@/components/ui/separator';
import DeleteButton from '@/features/admin/deleteElement';
import Image from 'next/image';
import UploadForm from '../../components/forms/upload/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
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

/* -------------------------------------------------------------------------- */
/*                                uploads page                                */
/* -------------------------------------------------------------------------- */
export default async function Uploads() {
  const uploadData = await getUploads();
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
        <UploadForm />
      </div>
      {/* content */}
      <div
        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))' }}
      >
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
                <div className="aspect-[5/3] w-[300px] overflow-hidden rounded-md">
                  <Image
                    src={item.thumbnail_url}
                    width={800}
                    height={480} // Maintains 5:3 aspect ratio
                    alt={item.title}
                    className="h-full w-full object-cover"
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
              <DeleteButton id={item.element_id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
