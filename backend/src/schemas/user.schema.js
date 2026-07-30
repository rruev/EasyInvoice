import * as z from 'zod';

export const userLogInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase(),
  password: z.string(),
});

export const userRegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase(),
  password: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
  confirmPassword: z.string().min(3, { message: 'Confirm Password must be at least 3 characters long' }),
  businessName: z.string().regex(/^[A-Za-zÄÖÜäöüßẞ .'-]*$/, { message: 'Invalid business name' }).optional(),
  businessAddress: z.string()
    .regex(/^[A-Za-zÄÖÜäöüßẞ .'-]+ \d+[A-Za-z]?, \d{4} [A-Za-zÄÖÜäöüßẞ .'-]+$/, { message: 'Invalid business address' })
    .optional(),
  businessEmail: z.string().email({ message: 'Invalid business email address' }).trim().toLowerCase().optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }).trim().optional(),
  bankName: z.string().nullable().optional(),
  bic: z.string().optional(),
  iban: z.string()
    .regex(/^[A-Z]{2}\d{2}(?: [A-Z0-9]{4})+(?: [A-Z0-9]{1,2})?$/, { message: 'Invalid IBAN' })
    .optional(),
  taxId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const userUpdateSchema = z.object({
  email: z.string({ error: "Email is required" }).email({ message: 'Invalid email address' }).trim().toLowerCase(),
  businessName: z.string().regex(/^[A-Za-zÄÖÜäöüßẞ .'-]*$/, { message: 'Invalid business name' }).nullable().optional(),
  businessAddress: z.string()
    .regex(/^[A-Za-zÄÖÜäöüßẞ .'-]+ \d+[A-Za-z]?, \d{4} [A-Za-zÄÖÜäöüßẞ .'-]+$/, { message: 'Invalid business address' })
    .nullable()
    .optional(),
  businessEmail: z.string().email({ message: 'Invalid business email address' }).trim().toLowerCase().nullable().optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }).trim().nullable().optional(),
  bankName: z.string().nullable().optional(),
  bic: z.string().nullable().optional(),
  iban: z.string()
    .regex(/^[A-Z]{2}\d{2}(?: [A-Z0-9]{4})+(?: [A-Z0-9]{1,2})?$/, { message: 'Invalid IBAN' })
    .optional(),
  taxId: z.string().nullable().optional(),
});