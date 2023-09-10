import { stripe } from '@/lib/stripe';

export default async function getProducts() {
  const products = await stripe.products.list({
    active: true, // Retrieve only available products
    expand: ['data.default_price'],
  });

  return products.data;
}
