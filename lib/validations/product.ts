import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.number().min(1),
  image: z.string().url(),
  time: z.number().min(1),
});

export type Product = z.infer<typeof productSchema>;
