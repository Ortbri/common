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

// A helper function to fetch uploads from Supabase.
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

export default async function Uploads() {
  // Fetch the upload data from Supabase.
  const uploadData = await getUploads();

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">Uploads</h1>
          <p className="text-xs text-muted-foreground">
            Do not do normal uploads until custom domain is set in cloudflare
          </p>
        </div>
        <SheetDemo />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {uploadData.map(item => (
          <Card key={item.element_id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                Uploaded on{' '}
                {new Date(item.created_at).toLocaleString('en-US', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {item.thumbnail_url ? (
                <Image
                  loading={'lazy'}
                  src={item.thumbnail_url}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="mb-4 h-48 w-full rounded-md object-cover"
                />
              ) : (
                // Fallback placeholder if there is no thumbnail.
                <div className="mb-4 h-48 rounded-md bg-gray-200" />
              )}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function SheetDemo() {
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
