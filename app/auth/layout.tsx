import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await getCachedAuthUser();
  // if (user) {
  //   redirect('/user');
  // }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Link href={'/'}>
              <Button variant={'link'}>Back</Button>
            </Link>
            {children}
          </div>
        </div>
      </div>
      <div className="bg-primary relative hidden lg:block">
        <div className="absolute inset-0 flex h-full w-full items-center justify-center object-cover text-white dark:brightness-[0.2] dark:grayscale">
          {/* GOOGLE AUTH HERE if mobile add under children */}
          {/* <GoogleAuth /> */}
        </div>
      </div>
    </div>
  );
}
