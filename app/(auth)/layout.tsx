import React from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO:if anytime inside auth you cant double auth so if signed no reason for this route to show at all
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-primary lg:block">
        <div className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
