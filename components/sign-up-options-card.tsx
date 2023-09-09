'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';

type SignUpOptionsCardProps = {
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
};

export default function SignUpOptionsCard({
  showForm,
  setShowForm,
}: SignUpOptionsCardProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  return (
    <Card className='w-[24rem]'>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Already have an account?{' '}
          <Link href={'/login'} className='text-blue-500 font-medium'>
            Sign in
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showForm && (
          <motion.div className='flex flex-col gap-6' key='buttons'>
            <Button
              type='button'
              className='w-full'
              onClick={() => {
                setShowForm(true);
              }}
            >
              Sign Up with Email
            </Button>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              type='button'
              variant='outline'
              disabled={isGoogleLoading}
              className='gap-2'
              onClick={() => {
                setIsGoogleLoading(true);
                signIn('google', { callbackUrl: '/admin' });
              }}
            >
              {isGoogleLoading ? (
                <Loader2 className='animate-spin h-5 w-5' />
              ) : (
                <FcGoogle className='h-5 w-5' />
              )}
              {''}
              Google
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
