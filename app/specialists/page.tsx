import DoctorCard from '@/components/doctor-card';
import { getDoctors } from '@/utilities/users';

export default async function SpecialistsPage() {
  const doctors = await getDoctors();
  console.log(doctors);

  return (
    <div className='container max-w-7xl flex flex-col gap-4'>
      <h1 className='text-4xl lg:text-7xl font-semibold'>Psychologists</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto'>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} {...doctor} />
        ))}
      </div>
    </div>
  );
}
