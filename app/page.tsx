import SignupForm from '@/components/SignupForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className=''>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <SignupForm />
      </div>
    </main>
  );
}
