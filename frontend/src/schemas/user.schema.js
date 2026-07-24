import * as z from 'zod';

export const userRegisterSchema = z.object({
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z.string({ message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }).regex(/(?=.*[A-Z])(?=.*\d)/, { message: 'Password must contain at least one uppercase letter and one number' }),
  confirmPassword: z.string({ message: 'Confirm Password is required' }),
  businessName: z.string().optional(),
  businessAddress: z.string().regex(/^[A-Za-zÄÖÜäöüßẞ .'-]+ \d+[A-Za-z]?, \d{4} [A-Za-zÄÖÜäöüßẞ .'-]+$/, { message: 'The address must be in this format: "Street Name 123, 4000 City"' }).optional(),
  businessEmail: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase().optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }).trim().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const userUpdateSchema = z.object({
  fullName: z.string().optional(),
  businessName: z.string().optional(),
  businessAddress: z.string().regex(/^[A-Za-zÄÖÜäöüßẞ .'-]+ \d+[A-Za-z]?, \d{4} [A-Za-zÄÖÜäöüßẞ .'-]+$/, { message: 'The address must be in this format: "Street Name 123, 4000 City"' }).optional(),
  businessEmail: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase().optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }).trim().optional(),
});