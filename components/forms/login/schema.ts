import { z } from 'zod'; // Add new import

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(), // no holding back on password because in case we dont have proper password reset and where that is handled
});

export type zSignUp = z.infer<typeof LoginSchema>;
