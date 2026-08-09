import * as z from 'zod';

export const invoiceFormSchema = z.object({
    businessName: z.string({ message: 'Business name is required' }).trim().optional(),
    businessStreet: z.string().trim().optional(),
    businessStreetNum: z.string().trim().optional(),
    businessPostalCode: z.string().trim().optional(),
    businessCity: z.string().trim().optional(),
    businessPhone: z.string({ message: 'Business phone is required' }).regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }).trim().optional(),
    businessEmail: z.string({ message: 'Business email is required' }).email({ message: 'Invalid email address' }).trim().toLowerCase().optional(),
    bankName: z.string().trim().optional(),
    bic: z.string().trim().optional(),
    iban: z.string()
        .regex(/^[A-Z]{2}\d{2}(?: [A-Z0-9]{4})+(?: [A-Z0-9]{1,2})?$/, { message: 'Invalid IBAN' })
        .optional(),
    taxId: z.string().trim().optional(),
    clientName: z.string({ message: 'Client name is required' }).trim().optional(),
    clientStreet: z.string().trim().optional(),
    clientStreetNum: z.string().trim().optional(),
    clientPostalCode: z.string().trim().optional(),
    clientCity: z.string().trim().optional(),
    invoiceNum: z.string({ message: 'Invoice number is required' }).regex(/^\d{4}-\d{3}$/, { message: "Invoice number must be in the format YYYY-001" }).trim().optional(),
    issuedAt: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, { message: "Issue date must be in the format DD.MM.YYYY" }).trim().optional(),
    workedAt: z.string({ message: 'Performed date is required' }).regex(/^\d{2}\.\d{2}\.\d{4}$/, { message: "Performed date must be in the format DD.MM.YYYY" }).trim().optional(),
    quantity: z.coerce.number({ message: 'Quantity must be a positive number' }).positive({ message: "Quantity must be a positive number" }).optional(),
    price: z.coerce.number({ message: 'Price must be a positive number' }).positive({ message: "Price must be a positive number" }).optional(),
})