import Product from '@/components/product';
import { getAuthSession } from '@/lib/auth';
import getProducts from '@/utilities/get-products';
import { redirect } from 'next/navigation';

export default async function ServicesPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect('/login');
  }

  const products = await getProducts();
  console.log(products);
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='flex gap-6 items-center justify-center'>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
