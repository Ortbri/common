export default async function Element({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return <div>ElementId: {slug}</div>;
}
