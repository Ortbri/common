import { ModalTest } from '@/components/modal-test';
import { DialogTitle } from '@radix-ui/react-dialog';

export default async function ElementModal({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  return (
    <ModalTest>
      <DialogTitle>{slug}</DialogTitle>

      {/* <div className="mx-auto flex w-64 flex-col gap-4">
        <h1 className="text-center text-3xl">testing route</h1>
        <div className="relative h-64 w-64 overflow-hidden rounded-xl border-2 bg-gray-600"></div>
      </div> */}
    </ModalTest>
  );
}

// export default async function Element({ params }: { params: Promise<{ slug: string }> }) {
//   const slug = (await params).slug;
//   return <div>ElementId: {slug}</div>;
// }
