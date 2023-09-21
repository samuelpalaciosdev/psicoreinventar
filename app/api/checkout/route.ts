import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { AppointmentSchema } from '@/lib/validations/appointment';
import prisma from '@/lib/db';

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        {
          message: 'You must be logged in to access this route',
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const { status, dateTime, doctorId, patientId, stripeProductId, priceId } = body;

    //! Check if all fields are filled
    if (!status || !dateTime || !doctorId || !patientId || !stripeProductId || !priceId) {
      return NextResponse.json(
        {
          message: 'Please provide all fields',
        },
        {
          status: 400,
        }
      );
    }

    const validatedData = AppointmentSchema.safeParse(body);

    if (validatedData.success) {
      //* Create a Stripe checkout Session.
      const stripeSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [{ price: validatedData.data.priceId, quantity: 1 }],
        customer_email: session.user.email as string,
        metadata: {
          dateTime: validatedData.data.dateTime,
          doctorId: validatedData.data.doctorId,
          patientId: session.user.stripeCustomerId, // Stripe customer id
          stripePriceId: validatedData.data.priceId,
          productId: validatedData.data.stripeProductId, // Stripe product id
        },
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000`,
      });

      // console.log(stripeSession);

      return NextResponse.json(
        {
          message: 'Checkout created',
          url: stripeSession.url,
        },
        {
          status: 201,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: 'Please provide valid data',
        },
        {
          status: 400,
        }
      );
    }
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
