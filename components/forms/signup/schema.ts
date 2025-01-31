import { z } from 'zod'; // Add new import

export const SignUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  // what type of user: "Education", "Professional", "Company"
  password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(20, { message: 'Password is too long' }),
});

export type zSignUp = z.infer<typeof SignUpSchema>;
