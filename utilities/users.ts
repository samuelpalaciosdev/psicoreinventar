import { Role } from '@prisma/client';

export type Doctor = {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  role: Role;
  doctorExperience: string;
  doctorSpecialty: string;
  doctorEducation: string;
};

export const getDoctors = async () => {
  const res = await fetch('http://localhost:3000/api/doctors', { cache: 'no-store' });
  const data = await res.json();
  return data.doctors as Doctor[];
};

export const getDoctor = async (doctorId: string) => {
  const res = await fetch(`http://localhost:3000/api/doctors/${doctorId}`, { cache: 'no-store' });
  const data = await res.json();
  return data.doctor as Doctor;
};
