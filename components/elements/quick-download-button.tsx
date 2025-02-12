'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';

interface QuickDownloadButtonProps {
  elementId: string;
  className?: string;
}

export function QuickDownloadButton({ elementId, className }: QuickDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const { preferredType } = useDownloadPreference();
  console.log(elementId);
  const handleDownload = async () => {
    try {
      setIsLoading(true);
      // const result = await generateDownloadUrlAction({ elementId, fileType: preferredType });

      // if (result.data?.downloadUrl) {
      //   window.open(result.data.downloadUrl, '_blank');
      // } else if (result.serverError) {
      //   console.error('Server error:', result.serverError);
      //   // You might want to show a toast notification here
      // }
    } catch (error) {
      console.error('Download error:', error);
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isLoading} size="sm" className={className}>
      {isLoading ? 'Downloading...' : 'Download'}
    </Button>
  );
}
