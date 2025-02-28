import HomeConditonal from '@/components/home-conditional';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

type Element = {
  element_id: string;
  title: string;
  preview_url?: string;
  thumbnail_url?: string;
  name?: string;
  created_at: string;
};

async function getUploads(): Promise<Element[] | []> {
  const supabase = await createClient();

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
/* -------------------------------------------------------------------------- */
/*                                  HOME PAGE                                 */
/* -------------------------------------------------------------------------- */
export default async function Home() {
  const data = await getUploads();
  return (
    <div className="flex flex-col">
      <HomeConditonal />
      <Assets assets={data} />
    </div>
  );
}
/* -------------------------------------------------------------------------- */
/*                                   Assets                                   */
/* -------------------------------------------------------------------------- */
function Assets({ assets }: { assets: Element[] }) {
  return (
    <div className="grid h-screen w-full auto-rows-min grid-cols-1 gap-3 px-4 pt-14 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
      {assets.map(element => (
        <Link
          href={`/element/${element.element_id}`}
          key={element.element_id}
          passHref
          shallow
          className="group flex w-[400px] animate-fade-up flex-col gap-4 rounded-3xl p-4 opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] hover:border"
        >
          {element.thumbnail_url ? (
            <div className="aspect-[5/3] overflow-hidden rounded-md">
              <Image
                src={element.thumbnail_url}
                width={800}
                height={480} // Maintains 5:3 aspect ratio
                alt={element.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-[120px] w-[200px] items-center justify-center rounded-md">
              <span className="text-gray-500">nothing here lol</span>
            </div>
          )}
          <div className="flex flex-col justify-between px-7 py-3">
            <h4 className="group-hover:animate-pulse">{element.title}</h4>
            <p className="text-xs group-hover:animate-pulse">some description?</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
