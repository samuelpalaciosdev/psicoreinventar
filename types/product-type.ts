export type ProductType = {
  id: string;
  name: string;
  description: string | null;
  default_price: string;
  unit_amount: number | null;
  image: string;
  currency: string;
  time: string;
};
