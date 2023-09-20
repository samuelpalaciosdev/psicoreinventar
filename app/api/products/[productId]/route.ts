import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { patchProductSchema } from '@/lib/validations/product';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    productId: z.string(),
  }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route params (productId) base_url/api/products/productId
    const { params } = routeContextSchema.parse(context);

    // Delete the product on the db
    await prisma.product.delete({
      where: {
        stripeProductId: params.productId as string,
      },
    });

    // Archive product on stripe (since it can't be deleted from the api if the product has a price)
    await stripe.products.update(params.productId, {
      active: false,
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route params (productId) base_url/api/products/productId
    const { params } = routeContextSchema.parse(context);

    // Validate the body of the request
    const body = await req.json();

    const validatedData = patchProductSchema.parse(body);

    // Update the product on the db
    const product = await prisma.product.update({
      where: {
        stripeProductId: params.productId as string,
      },
      data: validatedData,
    });

    //* Update product on stripe
    const updatedStripeProduct = await stripe.products.update(params.productId, {
      name: validatedData.name,
      description: validatedData.description,
      images: validatedData.images,
      metadata: {
        time: validatedData.time!,
      },
      active: validatedData.active,
    });

    //* Update product price on stripe (it cant be changed directly so achieve the old price and create a new one)
    if (validatedData.price) {
      const newPrice = await stripe.prices.create({
        unit_amount: validatedData.price * 100,
        currency: 'usd',
        product: params.productId as string,
      });

      // Change default_price to the new price and archive the old one
      const updateProductPrice = await stripe.products.update(params.productId, {
        default_price: newPrice.id,
      });

      const achieveOldPrice = await stripe.prices.update(
        updatedStripeProduct.default_price as string,
        {
          active: false,
        }
      );
    }

    const updatedProduct = await stripe.products.retrieve(params.productId);

    return NextResponse.json(
      {
        message: 'Product updated successfully',
        updatedProduct,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

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
