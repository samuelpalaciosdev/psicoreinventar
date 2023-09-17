'use client';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppointmentStore } from '@/context/store';
import { useState, useEffect } from 'react';
import { ProductType } from '@/types/product-type';
import getProducts from '@/utilities/get-products';
import ButtonCheckout from './button-checkout';

type DialogSelectDoctorProps = {
  doctorId: string;
  doctorName: string;
};

export default function DialogSelectDoctor({ doctorId, doctorName }: DialogSelectDoctorProps) {
  const setDoctor = useAppointmentStore((state) => state.setDoctor);
  const selectedDoctorName = useAppointmentStore((state) => state.selectedDoctorName);

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          onClick={() => {
            setDoctor(doctorId, doctorName);
          }}
        >
          Select doctor
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Confirm appointment with {selectedDoctorName}</DialogTitle>
          <DialogDescription>Please confirm the details for the appointment</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {products.map((product) => (
            <p>option</p>
          ))}
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
