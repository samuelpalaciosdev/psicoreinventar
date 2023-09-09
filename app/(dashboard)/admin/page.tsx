import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function AdminDashboard() {
  {
    /* //! If no session redirect to login */
  }
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <h1 className='text-4xl lg:text-7xl font-semibold'>
        Welcome {session?.user.name}, your role is {session?.user.role}
      </h1>
    </div>
  );
}
