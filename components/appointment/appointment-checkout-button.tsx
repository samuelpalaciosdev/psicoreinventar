'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useAppointmentStore } from '@/context/store';

interface ButtonCheckoutProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function AppointmentCheckoutButton({
  className,
  text,
  ...props
}: ButtonCheckoutProps) {
  const { data: session, status } = useSession();

  const appointmentData = useAppointmentStore((state) => ({
    dateTime: state.dateTimeSelected,
    doctorId: state.doctorSelected,
    product: state.productSelected,
    stripeProductId: state.productId,
    priceId: state.productPriceId,
  }));

  const { dateTime, doctorId, product, stripeProductId, priceId } = appointmentData;
  const patientId = session?.user?.stripeCustomerId;
  // const priceId = useAppointmentStore((state) => state.productPriceId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appointmentStatus = 'pending';

  const createCheckout = async () => {
    setIsLoading(!isLoading);

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: appointmentStatus,
        dateTime,
        doctorId,
        product,
        stripeProductId,
        priceId,
        patientId,
      }),
    });

    const data = await response.json(); // Receive checkout session url
    window.location.href = data.url;
  };

  return (
    <Button
      className={cn(className)}
      disabled={isLoading}
      onClick={() => {
        createCheckout();
      }}
      {...props}
    >
      {text}
      {isLoading && <Loader2 className='ml-2 h-5 w-5 animate-spin' />}
    </Button>
  );
}
