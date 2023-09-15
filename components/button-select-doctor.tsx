'use client';

import { Button } from './ui/button';
import { useAppointmentStore } from '@/context/store';

interface ButtonSelectDoctorProps extends React.HTMLAttributes<HTMLButtonElement> {
  doctorId: string;
}

export default function ButtonSelectDoctor({
  className,
  doctorId,
  ...props
}: ButtonSelectDoctorProps) {
  const setDoctor = useAppointmentStore((state) => state.setDoctor);

  return (
    <Button
      type='button'
      className={className}
      onClick={() => {
        setDoctor(doctorId);
      }}
    >
      Select doctor
    </Button>
  );
}
