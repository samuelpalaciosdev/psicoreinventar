'use client';

import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppointmentStore } from '@/context/store';

type DialogAppointmentTriggerProps = {
  doctorId: string;
  doctorName: string;
};

export default function DialogAppointmentTrigger({
  doctorId,
  doctorName,
}: DialogAppointmentTriggerProps) {
  const setDoctor = useAppointmentStore((state) => state.setDoctor);
  return (
    <DialogTrigger asChild>
      <Button
        onClick={() => {
          setDoctor(doctorId, doctorName);
        }}
      >
        Select doctor
      </Button>
    </DialogTrigger>
  );
}
