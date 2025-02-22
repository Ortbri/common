export default async function ElementId({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return <div>ElementId: {slug}</div>;
}

// import { Metadata, ResolvingMetadata } from 'next';
// import { DownloadButton } from '../../../components/elements/download-button';
// import type { Database } from '../../../database.types';
// import { createClient } from '../../../utils/supabase/server';

// interface Props {
//   params: { id: string };
// }

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const supabase = await createClient();
//   const { data } = await supabase
//     .from('elements')
//     .select('title, searchable_text, thumbnail_url')
//     .eq('element_id', params.id)
//     .returns<Database['public']['Tables']['elements']['Row'][]>()
//     .single();

//   const previousImages = (await parent).openGraph?.images || [];
//   const images = data?.thumbnail_url ? [data.thumbnail_url, ...previousImages] : previousImages;

//   return {
//     title: data?.title ?? 'Drawing Element',
//     description: data?.searchable_text?.toString() ?? 'Architectural drawing element',
//     openGraph: {
//       title: data?.title ?? 'Drawing Element',
//       description: data?.searchable_text?.toString() ?? 'Architectural drawing element',
//       images,
//       type: 'article',
//     },
//   };
// }

// export default async function Page({ params }: Props) {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from('elements')
//     .select('*')
//     .eq('element_id', params.id)
//     .returns<Database['public']['Tables']['elements']['Row'][]>();

//   if (error) {
//     console.error('Error fetching element:', error);
//     return (
//       <main className="container mx-auto p-4">
//         <h1 className="text-xl font-bold text-red-500">Error loading element</h1>
//       </main>
//     );
//   }

//   if (!data?.length) {
//     return (
//       <main className="container mx-auto p-4">
//         <h1 className="text-xl font-bold">Element not found</h1>
//       </main>
//     );
//   }

//   const element = data[0];
//   return (
//     <article className="container mx-auto p-4">
//       <header>
//         <h1 className="mb-4 text-2xl font-bold">{element.title}</h1>
//       </header>
//       <section className="space-y-8">
//         {element.thumbnail_url && (
//           <figure className="relative mx-auto aspect-video w-full max-w-3xl">
//             {/* <Image
//               src={element.thumbnail_url}
//               alt={element.title}
//               className="object-contain"
//               fill
//               priority
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             /> */}
//           </figure>
//         )}

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {element.svg_url && (
//             <DownloadButton elementId={params.id} fileType="svg" label="Download SVG" />
//           )}
//           {element.jpg_url && (
//             <DownloadButton elementId={params.id} fileType="jpg" label="Download JPG" />
//           )}
//           {element.dwg_ft_url && (
//             <DownloadButton elementId={params.id} fileType="dwg-ft" label="Download DWG (ft)" />
//           )}
//           {element.dwg_m_url && (
//             <DownloadButton elementId={params.id} fileType="dwg-m" label="Download DWG (m)" />
//           )}
//         </div>
//       </section>
//     </article>
//   );
// }
