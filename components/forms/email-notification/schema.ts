import { z } from 'zod';

export const EmailNotificationSchema = z.object({
  email: z.string().email(),
});

export type zLogin = z.infer<typeof EmailNotificationSchema>;
