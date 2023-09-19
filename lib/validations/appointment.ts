import { z } from 'zod';

export const AppointmentSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending').optional(),
  dateTime: z.string(),
  doctorId: z.string().cuid(),
  product: z.string(),
  stripeProductId: z.string(),
  priceId: z.string(), // Product price id
  patientId: z.string(),
});

export type Appointment = z.infer<typeof AppointmentSchema>;
