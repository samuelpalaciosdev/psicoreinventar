'use client';
import { Button } from './ui/button';

interface ButtonCheckoutProps extends React.HTMLAttributes<HTMLButtonElement> {
  priceId: string;
}

export default function ButtonCheckout({ className, priceId, ...props }: ButtonCheckoutProps) {
  const createCheckout = async () => {
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
      className={className}
      onClick={() => {
        console.log(priceId);
        createCheckout();
      }}
      {...props}
    >
      Make an appointment
    </Button>
  );
}
