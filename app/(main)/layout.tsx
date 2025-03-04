import React from 'react';
import MarketingFooter from '../../components/footer';
import MarketingHeader from '../../components/header';

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <MarketingHeader />
      {children}
      {modal}
      <MarketingFooter />
    </div>
  );
}
