// import prisma from '@/lib/db';
// import { stripe } from '@/lib/stripe';
// import { NextResponse } from 'next/server';
// import { z } from 'zod';

// const routeContextSchema = z.object({
//   params: z.object({
//     productId: z.string(),
//   }),
// });

// //* Delete product on stripe and db
// export async function DELETE(
//   req: Request,
//   context: z.infer<typeof routeContextSchema>
// ) {
//   try {
//     const { params } = routeContextSchema.parse(context);

//     if (!params.productId) {
//       return NextResponse.json(
//         {
//           message: 'Please provide product id',
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     // //* Delete product on stripe
//     const deletedProduct = await stripe.products.del(params.productId);

//     // //* Delete product on db
//     const deletedProductOnDb = await prisma.product.delete({
//       where: { id: params.productId as string },
//     });

//     return NextResponse.json({
//       message: 'Product deleted successfully',
//       deletedProduct,
//     });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({
//         errors: error.errors,
//       });
//     }

//     return NextResponse.json(
//       {
//         message: 'Something went wrong',
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { z } from 'zod';

const routeContextSchema = z.object({
  params: z.object({
    productId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params (productId) base_url/api/products/productId
    const { params } = routeContextSchema.parse(context);

    // Delete the product on the db
    await prisma.product.delete({
      where: {
        id: params.productId as string,
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
