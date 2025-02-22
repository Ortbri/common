import { z } from 'zod';

export const UploadElementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  SVGfile: z
    .instanceof(File, { message: 'File is required' })
    .refine(file => file.name.toLowerCase().endsWith('.svg'), 'Only SVG files allowed'),

  JPGfile: z
    .instanceof(File, { message: 'File is required' })
    .refine(
      file => file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg'),
      'Only JPG files allowed'
    ),

  // DWG file intended for feet:
  DWGFTfile: z
    .instanceof(File, { message: 'File is required' })
    .refine(file => file.name.toLowerCase().endsWith('.dwg'), 'Only DWG files allowed')
    // Optional: check that the file name includes "ft" (for feet)
    .refine(file => file.name.toLowerCase().includes('ft'), 'DWG file must indicate "ft" (feet)'),

  // DWG file intended for meters:
  DWGMfile: z
    .instanceof(File, { message: 'File is required' })
    .refine(file => file.name.toLowerCase().endsWith('.dwg'), 'Only DWG files allowed')
    // Optional: check that the file name includes "m" (for meters)
    .refine(file => file.name.toLowerCase().includes('m'), 'DWG file must indicate "m" (meters)'),
});

export type UploadElementData = z.infer<typeof UploadElementSchema>;
