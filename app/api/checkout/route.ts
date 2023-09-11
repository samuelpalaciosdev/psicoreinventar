import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ message: 'Price ID is required' }, { status: 400 });
    }

    // Create a Checkout Session.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000`,
    });

    console.log(session);

    return NextResponse.json(
      {
        message: 'Checkout created',
        url: session.url,
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
