import * as z from 'zod';

export const invoiceSchema = z.object({
    invoiceNum: z.string().regex(/^\d{4}-\d{3}$/, { message: "Invoice number must be in the format YYYY-001" }).trim(),
    issuedAt: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, { message: "Issue date must be in the format DD.MM.YYYY" }).trim(),
    workedAt: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, { message: "Performed date must be in the format DD.MM.YYYY" }).trim(),
    // itemDescription: z.string().min(1, { message: "Item description is required" }),
    quantity: z.coerce.number().positive({ message: "Quantity must be a positive number" }),
    price: z.coerce.number().positive({ message: "Price must be a positive number" }),
})