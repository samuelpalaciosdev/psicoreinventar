import Link from 'next/link';
import { buttonVariants } from './ui/button';

export default function Nav() {
  return (
    <header className='sticky top-0 inset-x-0 h-fit py-4 border-b bg-white dark:bg-gray-950 z-[10]'>
      <div className='container max-w-7xl flex items-center justify-between gap-2'>
        {/* Logo and links */}
        <div className='flex items-center gap-14'>
          <Link href={'/'} className='text-xl font-semibold text-blue-600'>
            psicoreinventar
          </Link>
          <nav className='hidden md:flex items-center gap-6 font-medium text-sm'>
            <Link
              href={'/about'}
              className='text-foreground/70 transition-colors hover:text-foreground/90'
            >
              How it works
            </Link>
            <Link
              href={'/services'}
              className='text-foreground/70 transition-colors hover:text-foreground/90'
            >
              Services
            </Link>
            <Link
              href={'/psychologists'}
              className='text-foreground/70 transition-colors hover:text-foreground/90'
            >
              Specialists
            </Link>
          </nav>
        </div>
        <div className='flex items-center'>
          <Link href={'/login'} className={buttonVariants()}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
