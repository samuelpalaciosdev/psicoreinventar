import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Doctor selected (patient dashboard) and patient selected (doctor dashboard)
interface AppointmentState {
  doctorSelected: string;
  selectedDateTime: string;
  patientSelected: string;
  setDoctorSelected: (doctor: string) => void;
  setSelectedDateTime: (date: string) => void;
  setPatientSelected: (patient: string) => void;
}

export const useAppointmentStore = create<AppointmentState>()((set) => ({
  doctorSelected: '',
  selectedDateTime: '',
  patientSelected: '',
  setDoctorSelected: (doctor) => set((state) => ({ doctorSelected: doctor })),
  setSelectedDateTime: (date) => set((state) => ({ selectedDateTime: date })),
  setPatientSelected: (patient) => set((state) => ({ patientSelected: patient })),
}));
