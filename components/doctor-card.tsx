import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import DialogAppointment from './appointment/dialog-appointment';

type DoctorCardProps = {
  id: string;
  name: string;
  image: string;
  doctorExperience: string;
  doctorSpecialty: string;
  doctorEducation: string;
};

export default function DoctorCard({
  id,
  name,
  image,
  doctorExperience,
  doctorSpecialty,
  doctorEducation,
}: DoctorCardProps) {
  return (
    <Card className='w-[22rem] min-h-fit py-2'>
      <CardHeader className='flex flex-row gap-4 items-center'>
        <Image src={image} alt={name} className='rounded-full' width={72} height={72} />
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-muted-foreground'>Psychologist</p>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Specialty: {doctorSpecialty}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <p className='text-muted-foreground text-sm'>{doctorExperience}</p>
        <p className='text-muted-foreground text-sm'>{doctorEducation}</p>
        <div className='flex'>
          <DialogAppointment doctorId={id} doctorName={name} />
        </div>
      </CardContent>
    </Card>
  );
}
