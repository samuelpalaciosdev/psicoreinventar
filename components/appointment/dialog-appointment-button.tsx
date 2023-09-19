'use client';

import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/context/store';

type DialogAppointmentButtonProps = {
  productName: string;
  productId: string;
  priceId: string;
};

export default function DialogAppointmentButton({
  productName,
  productId,
  priceId,
}: DialogAppointmentButtonProps) {
  const productSelected = useAppointmentStore((state) => state.productSelected);
  const setProduct = useAppointmentStore((state) => state.setProduct);
  const setProductId = useAppointmentStore((state) => state.setProductId);
  const setProductPriceId = useAppointmentStore((state) => state.setProductPriceId);

  const handleClick = () => {
    setProductPriceId(priceId);
    setProductId(productId);
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
