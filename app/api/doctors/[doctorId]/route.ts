// Retrieve data of a doctor based on its id

import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    doctorId: z.string(),
  }),
});

export async function GET(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route params (doctorId) base_url/api/doctors/doctorId
    const { params } = routeContextSchema.parse(context);

    const doctor = await prisma.user.findUnique({
      where: {
        id: params.doctorId as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        role: true,
        doctorExperience: true,
        doctorSpecialty: true,
        doctorEducation: true,
      },
    });

    if (doctor?.role !== 'doctor') {
      return NextResponse.json(
        {
          message: 'Doctor not found',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: 'Doctor retrieved successfully',
        doctor,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong',
        error,
      },
      {
        status: 500,
      }
    );
  }
}
