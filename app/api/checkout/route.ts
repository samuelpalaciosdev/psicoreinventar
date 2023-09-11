import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';

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

    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ message: 'Price ID is required' }, { status: 400 });
    }

    // Create a Checkout Session.
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: session.user.email as string,
      metadata: {
        userId: session.user.id, //! This should be the stripeCustomerId
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
