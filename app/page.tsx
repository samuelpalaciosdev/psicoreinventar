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
        <div className='flex gap-4 items-center justify-center'>
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </main>
  );
}
