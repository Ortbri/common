import { z } from "zod";

// Zod schema for validation
export const DownloadSchema = z.object({
  elementId: z.string().uuid(),
  fileType: z.enum(['svg', 'jpg', 'dwg-ft', 'dwg-m']),
});
