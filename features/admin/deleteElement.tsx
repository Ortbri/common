'use client';

import { deleteElementAction } from '@/actions/cloudflare/deleteElement';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // if (!confirm('Are you sure you want to delete this element?')) return;

    startTransition(async () => {
      const result = await deleteElementAction(id);

      if (result.success) {
        toast.success(result.message);
        // Optionally refresh the page or update the UI
        // window.location.reload();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isPending} className="w-full">
      <Trash2 className="mr-2 h-4 w-4" />
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
