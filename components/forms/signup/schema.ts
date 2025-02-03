import { z } from 'zod'; // Add new import

export const SignUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(20, { message: 'Password is too long' }),
});

export type zSignUp = z.infer<typeof SignUpSchema>;
