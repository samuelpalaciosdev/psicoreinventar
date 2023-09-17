'use client';

import { ProductType } from '@/types/product-type';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAppointmentStore } from '@/context/store';

type DialogAppointmentButtonProps = {
  productName: string;
};

export default function DialogAppointmentButton({ productName }: DialogAppointmentButtonProps) {
  const productSelected = useAppointmentStore((state) => state.productSelected);
  const setProduct = useAppointmentStore((state) => state.setProduct);

  return (
    <Button
      onClick={() => {
        setProduct(productName);
      }}
      variant={productSelected === productName ? 'default' : 'secondary'}
    >
      {productName}
    </Button>
  );
}
