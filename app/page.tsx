import Link from 'next/link';
import getProducts from '@/utilities/get-products';

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
      {products.map((product) => (
        <p key={product.id}>Product #{product.id}</p>
      ))}
    </main>
  );
}
