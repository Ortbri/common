'use client';

import { useState } from 'react';
import { generateDownloadUrlAction } from '../../actions/cloudflare/actions';
import { Button } from '../../components/ui/button';

interface DownloadButtonProps {
  elementId: string;
  fileType: 'svg' | 'jpg' | 'dwg-ft' | 'dwg-m';
  label: string;
}

export function DownloadButton({ elementId, fileType, label }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const result = await generateDownloadUrlAction({ elementId, fileType });

      if (result.data?.downloadUrl) {
        window.open(result.data.downloadUrl, '_blank');
      } else if (result.serverError) {
        console.error('Server error:', result.serverError);
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Download error:', error);
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isLoading} variant="outline" className="w-full">
      {isLoading ? 'Generating download...' : label}
    </Button>
  );
}
