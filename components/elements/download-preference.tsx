'use client';

import { Select, SelectContent, SelectTrigger, SelectValue } from '../../components/ui/select';
// import { DownloadType, useDownloadPreference } from '../../contexts/download-preference';

// const downloadOptions: { value: DownloadType; label: string }[] = [
//   { value: 'svg', label: 'SVG Vector' },
//   { value: 'jpg', label: 'JPG Image' },
//   { value: 'dwg-ft', label: 'DWG (ft)' },
//   { value: 'dwg-m', label: 'DWG (m)' },
// ];

export function DownloadPreference() {
  // const { preferredType, setPreferredType } = useDownloadPreference();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Quick download:</span>
      <Select
      // value={preferredType}
      // onValueChange={(value: string) => setPreferredType(value as DownloadType)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {/* {downloadOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))} */}
        </SelectContent>
      </Select>
    </div>
  );
}
