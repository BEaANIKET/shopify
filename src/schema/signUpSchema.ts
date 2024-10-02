// schema/signUpSchema.ts

import * as z from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters long.' }).max(50, { message: 'First name cannot exceed 50 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long.' }).max(50, { message: 'Last name cannot exceed 50 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }).max(50, { message: 'Password cannot exceed 50 characters.' }),
  role: z.string()
});
