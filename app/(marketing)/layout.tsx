import React from 'react';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <MarketingHeader /> */}
      {children}
      {/* <MarketingFooter /> */}
    </div>
  );
}
