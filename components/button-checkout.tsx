'use client';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ButtonCheckoutProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  priceId: string;
}

export default function ButtonCheckout({
  className,
  text,
  priceId,
  ...props
}: ButtonCheckoutProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createCheckout = async () => {
    setIsLoading(!isLoading);

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await response.json(); // Receive checkout session url
    window.location.href = data.url;
  };

  return (
    <Button
      className={cn(className, 'w-full')}
      disabled={isLoading}
      onClick={() => {
        console.log(priceId);
        createCheckout();
      }}
      {...props}
    >
      {text}
      {isLoading && <Loader2 className='ml-2 h-5 w-5 animate-spin' />}
    </Button>
  );
}
