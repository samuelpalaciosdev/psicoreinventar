'use client';

import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/context/store';

type DialogAppointmentButtonProps = {
  productName: string;
  priceId: string;
};

export default function DialogAppointmentButton({
  productName,
  priceId,
}: DialogAppointmentButtonProps) {
  const productSelected = useAppointmentStore((state) => state.productSelected);
  const setProduct = useAppointmentStore((state) => state.setProduct);
  const setProductPriceId = useAppointmentStore((state) => state.setProductPriceId);

  const handleClick = () => {
    setProductPriceId(priceId);
    setProduct(productName);
  };

  return (
    <Button
      onClick={handleClick}
      variant={productSelected === productName ? 'default' : 'secondary'}
    >
      {productName}
    </Button>
  );
}
