import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type ProductProps = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  default_price: number | null;
  time: string;
};

export default function Product({
  name,
  description,
  image,
  default_price,
  time,
}: ProductProps) {
  return (
    <Card className='w-[18rem]'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <p className='font-semibold text-primary'>{default_price}</p> */}
        <p className='text-sm text-gray-500'>{time}</p>
      </CardContent>
    </Card>
  );
}
