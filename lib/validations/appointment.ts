import { z } from 'zod';

export const AppointmentSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending'),
  dateTime: z.string(),
  doctorId: z.string().cuid(),
  patientId: z.string(),
  stripeProductId: z.string(),
  priceId: z.string(), // Product price id
});

export type Appointment = z.infer<typeof AppointmentSchema>;
