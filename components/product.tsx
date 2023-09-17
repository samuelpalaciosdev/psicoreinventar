import { ProductType } from '@/types/product-type';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import formatPrice from '@/utilities/format-price';
import ButtonCheckout from './button-checkout';

export default function Product({
  id,
  name,
  description,
  default_price,
  unit_amount,
  image,
  currency,
  time,
}: ProductType) {
  return (
    <Card className='w-[18rem]'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='font-semibold text-primary'>
          {unit_amount !== null ? formatPrice(unit_amount) : 'N/A'}
        </p>
        <p className='text-sm text-gray-500'>{time}</p>
        <ButtonCheckout className='mt-4' priceId={default_price} text='Make an appointment' />
      </CardContent>
    </Card>
  );
}
