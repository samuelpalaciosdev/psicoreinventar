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
import { getDoctor } from '@/utilities/users';
import { useEffect } from 'react';

type DialogSelectDoctorProps = {
  doctorId: string;
  doctorName: string;
};

export default function DialogSelectDoctor({ doctorId, doctorName }: DialogSelectDoctorProps) {
  const setDoctor = useAppointmentStore((state) => state.setDoctor);
  const selectedDoctorName = useAppointmentStore((state) => state.selectedDoctorName);

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
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {/* <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' value='Pedro Duarte' className='col-span-3' />
          </div> */}
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
