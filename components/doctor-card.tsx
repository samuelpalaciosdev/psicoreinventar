import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import ButtonSelectDoctor from './button-select-doctor';

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
    <Card className='w-[18rem] min-h-fit py-4'>
      <CardHeader className='flex flex-row gap-2 items-center justify-center'>
        <Image src={image} alt={name} className='rounded-full' width={72} height={72} />
        <div className='flex flex-col gap-2'>
          <CardTitle>Psychologist {name}</CardTitle>
          <CardDescription>Specialty: {doctorSpecialty}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground text-sm'>{doctorExperience}</p>
        <p className='text-muted-foreground text-sm'>{doctorEducation}</p>
        <ButtonSelectDoctor doctorId={id} />
      </CardContent>
    </Card>
  );
}
