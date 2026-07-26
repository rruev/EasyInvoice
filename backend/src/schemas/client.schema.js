import * as z from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().regex(/^[A-Za-zÄÖÜäöüßẞ .'-]+ \d+[A-Za-z]?, \d{4} [A-Za-zÄÖÜäöüßẞ .'-]+$/, { message: 'The address must be in this format: "Street Name 123, 4000 City"' }),
  email: z.string().email("Invalid email address").trim().toLowerCase().optional(),
  phone: z.string().regex(/^\+?[0-9\s\-()]+$/, { message: "Invalid phone number" }).trim().optional(),
});

export default clientSchema;