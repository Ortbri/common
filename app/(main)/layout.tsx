import React from 'react';
import MarketingFooter from '../../components/footer';
import MarketingHeader from '../../components/header';
import { DownloadPreferenceProvider } from '../../contexts/download-preference';

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <DownloadPreferenceProvider>
      <MarketingHeader />
      {children}
      {modal}
      <MarketingFooter />
    </DownloadPreferenceProvider>
  );
}
