import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Doctor selected (patient dashboard) and patient selected (doctor dashboard)
interface AppointmentState {
  doctorSelected: string;
  selectedDoctorName: string;
  selectedDateTime: string;
  patientSelected: string;
  setDoctor: (doctorId: string, doctorName: string) => void;
  setDateTime: (date: string) => void;
  setPatient: (patient: string) => void;
}

export const useAppointmentStore = create(
  persist<AppointmentState>(
    (set) => ({
      doctorSelected: '',
      selectedDoctorName: '',
      selectedDateTime: '',
      patientSelected: '',
      setDoctor: (doctorId: string, doctorName: string) =>
        set((state) => ({ doctorSelected: doctorId, selectedDoctorName: doctorName })),
      setDateTime: (date: string) => set((state) => ({ selectedDateTime: date })),
      setPatient: (patient: string) => set((state) => ({ patientSelected: patient })),
    }),
    {
      name: 'appointment-storage',
    }
  )
);
