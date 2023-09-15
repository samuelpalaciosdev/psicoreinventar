'use client';

import { Button } from './ui/button';
import { useAppointmentStore } from '@/context/store';

type ButtonSelectDoctorProps = {
  doctorId: string;
};

export default function ButtonSelectDoctor({ doctorId }: ButtonSelectDoctorProps) {
  const setDoctor = useAppointmentStore((state) => state.setDoctor);

  return (
    <Button
      type='button'
      onClick={() => {
        setDoctor(doctorId);
      }}
    >
      Select doctor
    </Button>
  );
}
