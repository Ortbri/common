import { Asterisk } from 'lucide-react';
import Link from 'next/link';

function AdminHeader() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Link href={'/'}>
        <Asterisk className="h-5 w-5" />
      </Link>
      <ul className="flex space-x-4"></ul>
    </nav>
  );
}

export default AdminHeader;
