import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request, res: Response) {
  const body = await req.text(); // raw body
  const sig = req.headers.get('stripe-signature')!;

  if (!sig) {
    return NextResponse.json(
      {
        message: 'Missing the stripe signature',
      },
      {
        status: 400,
      }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Webhook error: ' + err,
      },
      {
        status: 400,
      }
    );
  }

  // Get the data from the event
  const checkoutSession = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case 'checkout.session.completed':
      // Create an appointment on the db
      const appointment = await prisma.appointment.create({
        data: {
          status: 'pending',
          dateTime: checkoutSession.metadata?.dateTime!,
          doctorId: checkoutSession.metadata?.doctorId!,
          patientId: checkoutSession.metadata?.patientId!,
          stripePriceId: checkoutSession.metadata?.stripePriceId!,
          productId: checkoutSession.metadata?.productId!, // Stripe product id
        },
      });

      console.log('Checkout session was completed');
      break;
    default:
      console.log('Unhandled event type: ' + event.type);
  }
  return new Response(null, { status: 200 });
}
