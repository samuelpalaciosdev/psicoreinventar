'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
import { loginSchema, loginType } from '@/lib/validations/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const onSubmit = async (data: loginType) => {
    const signInData = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      router.push('/admin');
    }
  };

  return (
    <Card className='w-[24rem]'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Don't have an account?{' '}
          <Link href={'/'} className='text-blue-500 font-medium'>
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='jdoe@gmail.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}