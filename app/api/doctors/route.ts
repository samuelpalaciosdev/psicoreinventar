import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

// Retrieve all users with doctor role
export async function GET(req: Request, res: Response) {
  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: 'doctor',
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

    return NextResponse.json(
      {
        doctors,
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
