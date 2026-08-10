import * as z from "zod";

export const clientSchema = z.object({
    name: z.string({ error: "Name is required" }).optional(),
    street: z.string().trim().nullable().optional(),
    streetNum: z.string().trim().nullable().optional(),
    postalCode: z.string().trim().nullable().optional(),
    city: z.string().trim().nullable().optional(),
    email: z.string().email("Invalid email address").trim().toLowerCase().nullable().optional(),
    phone: z.string().regex(/^\+?[0-9\s\-()]+$/, { message: "Invalid phone number" }).trim().nullable().optional(),
});

export default clientSchema;