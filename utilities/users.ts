export type Doctors = {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  doctorExperience: string;
  doctorSpecialty: string;
  doctorEducation: string;
};

export const getDoctors = async () => {
  const res = await fetch('http://localhost:3000/api/doctors', { cache: 'no-store' });
  const data = await res.json();
  return data.doctors as Doctors[];
};
