import Link from 'next/link';
import getProducts from '@/utilities/get-products';
import Product from '@/components/product';

export default async function Home() {
  const products = await getProducts();
  console.log(products);
  return (
    <main className=''>
      <div className='flex items-center justify-center gap-4'>
        <Link href={'/register'} className='font-semibold text-xl'>
          Register
        </Link>
        <Link href={'/login'} className='font-semibold text-xl'>
          Login
        </Link>
      </div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {/* Stripe does not provide types for extended api responses, so have to do this */}
        {products.map((product) => {
          let unitAmount: number | null | undefined;

          if (typeof product.default_price === 'object') {
            unitAmount = product.default_price?.unit_amount;
          }

          return (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.images[0]}
              default_price={unitAmount as number}
              time={product.metadata.time}
            />
          );
        })}
      </div>
    </main>
  );
}
