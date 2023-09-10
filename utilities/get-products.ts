import { stripe } from '@/lib/stripe';

export default async function getProducts() {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
  });

  return products.data;
}
