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
      {/* <div className="min-h-screen">
        <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
          <div className="container flex items-center justify-between py-4">
            <h2 className="text-lg font-semibold">Elements</h2>
            <DownloadPreference />
          </div>
        </div> */}
      <MarketingHeader />
      {children}
      {modal}
      <MarketingFooter />
      {/* </div> */}
    </DownloadPreferenceProvider>
  );
}
