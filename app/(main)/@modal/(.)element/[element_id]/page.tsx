import Modal from '@/components/modal';

export default async function ElementModal({ params }: { params: Promise<{ slug: string }> }) {
  console.log('params', params);
  return (
    <Modal>
      <div>testing</div>
    </Modal>
  );
}
