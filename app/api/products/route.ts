import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { productSchema } from '@/lib/validations/product';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

//* Create product on stripe and db
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { name, description, price, image, time } = body;

    //! Check if all fields are filled
    if (!name || !description || !price || !image || !time) {
      return NextResponse.json(
        {
          message: 'Please provide all fields',
        },
        {
          status: 400,
        }
      );
    }

    //* Validate data with zod
    const validatedData = productSchema.safeParse(body);

    //* If data is valid, create stripe product
    if (validatedData.success) {
      const product = await stripe.products.create({
        name: validatedData.data.name,
        description: validatedData.data.description,
        images: [validatedData.data.image],
        default_price_data: {
          currency: 'usd',
          unit_amount: validatedData.data.price * 100, // In cents
        },
        metadata: {
          time: validatedData.data.time, //* Add time of the session to the metadata
        },
      });

      //* Now create a product in the db with prisma
      const newProduct = await prisma.product.create({
        data: {
          id: product.id,
          name: validatedData.data.name,
          description: validatedData.data.description,
          image: validatedData.data.image,
          price: validatedData.data.price,
          time: validatedData.data.time,
          stripeProductId: product.id,
        },
      });

      return NextResponse.json(
        {
          message: 'Product created successfully',
          product: product,
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
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
