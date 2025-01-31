import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type zLogin = z.infer<typeof ForgotPasswordSchema>;
