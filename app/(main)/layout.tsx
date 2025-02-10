import React from 'react';
import MarketingHeader from '../../components/header';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MarketingHeader />
      {children}
      {/* <MarketingFooter /> */}
    </div>
  );
}
