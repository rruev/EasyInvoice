import * as z from 'zod';

export const invoiceFormSchema = z.object({
    businessName: z.string({ message: 'Business name is required' }).trim().optional(),
    businessAddress: z.string({ message: 'Business address is required' }).regex(/^[A-Za-zÄÖÜäöüßẞ .'-]+ \d+[A-Za-z]?, \d{4} [A-Za-zÄÖÜäöüßẞ .'-]+$/, { message: 'The address must be in this format: "Street Name 123, 4000 City"' }).optional(),
    businessPhone: z.string({ message: 'Business phone is required' }).regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }).trim().optional(),
    businessEmail: z.string({ message: 'Business email is required' }).email({ message: 'Invalid email address' }).trim().toLowerCase().optional(),
    clientName: z.string({ message: 'Client name is required' }).trim().optional(),
    clientAddress: z.string({ message: 'Client address is required' }).regex(/^[A-Za-zÄÖÜäöüßẞ .'-]+ \d+[A-Za-z]?, \d{4} [A-Za-zÄÖÜäöüßẞ .'-]+$/, { message: 'The address must be in this format: "Street Name 123, 4000 City"' }).optional(),
    invoiceNum: z.string({ message: 'Invoice number is required' }).regex(/^\d{4}-\d{3}$/, { message: "Invoice number must be in the format YYYY-001" }).trim().optional(),
    issuedAt: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, { message: "Issue date must be in the format DD.MM.YYYY" }).trim().optional(),
    workedAt: z.string({ message: 'Performed date is required' }).regex(/^\d{2}\.\d{2}\.\d{4}$/, { message: "Performed date must be in the format DD.MM.YYYY" }).trim().optional(),
    quantity: z.coerce.number({ message: 'Quantity is required' }).positive({ message: "Quantity must be a positive number" }).optional(),
    price: z.coerce.number({ message: 'Price is required' }).positive({ message: "Price must be a positive number" }).optional(),
})