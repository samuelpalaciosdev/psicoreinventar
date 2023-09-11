import { stripe } from '@/lib/stripe';
import { ProductType } from '@/types/product-type';

export default async function getProducts() {
  const products = await stripe.products.list({
    active: true, // Retrieve only available products
  });

  const productsPromises = products.data.map(async (product) => {
    try {
      const prices = await stripe.prices.list({
        product: product.id,
      });
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        default_price: product.default_price,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        time: product.metadata.time,
      };
    } catch (error) {
      console.log('Failed to fetch products due to error: ', error);
      return error;
    }
  });

  const results = await Promise.allSettled(productsPromises);

  // Return only fulfilled promises
  const productsWithPrices = results
    .filter(
      (result): result is PromiseFulfilledResult<ProductType> => result.status === 'fulfilled'
    )
    .map((result) => result.value);

  return productsWithPrices;
}
