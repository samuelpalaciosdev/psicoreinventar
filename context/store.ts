import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Doctor selected (patient dashboard) and patient selected (doctor dashboard)
interface AppointmentState {
  doctorSelected: string;
  selectedDateTime: string;
  patientSelected: string;
  setDoctor: (doctor: string) => void;
  setDateTime: (date: string) => void;
  setPatient: (patient: string) => void;
}

export const useAppointmentStore = create(
  persist<AppointmentState>(
    (set) => ({
      doctorSelected: '',
      selectedDateTime: '',
      patientSelected: '',
      setDoctor: (doctor: string) => set((state) => ({ doctorSelected: doctor })),
      setDateTime: (date: string) => set((state) => ({ selectedDateTime: date })),
      setPatient: (patient: string) => set((state) => ({ patientSelected: patient })),
    }),
    {
      name: 'appointment-storage',
    }
  )
);
