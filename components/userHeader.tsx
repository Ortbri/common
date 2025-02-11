'use client';
import { Asterisk, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function UserHeader() {
  return (
    <header className="flex flex-row items-center justify-between p-4">
      <Link href={'/'} className="flex flex-row items-center gap-1">
        <ChevronLeft className="h-5 w-5" />
        <Asterisk className="h-5 w-5" />
      </Link>
      <form action="/api/auth/logout" method="post">
        <Button size={'sm'} className="rounded-3xl" variant={'outline'} type="submit">
          Logout
        </Button>
      </form>
    </header>
  );
}
