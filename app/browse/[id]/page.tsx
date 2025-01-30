import { useRouter } from 'next/router';

function ElementId() {
  // item will use the slug
  const router = useRouter();
  return <div>elementId {router.query.slug}</div>;
}

export default ElementId;
