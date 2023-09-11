import Link from 'next/link';

export default function Home() {
  return (
    <main className=''>
      <div className='flex items-center justify-center gap-4'>
        <Link href={'/register'} className='font-semibold text-xl'>
          Register
        </Link>
        <Link href={'/login'} className='font-semibold text-xl'>
          Login
        </Link>
        <Link href={'/services'} className='font-semibold text-xl'>
          Services
        </Link>
      </div>
    </main>
  );
}
