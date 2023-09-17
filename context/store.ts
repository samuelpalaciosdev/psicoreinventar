import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Doctor selected (patient dashboard) and patient selected (doctor dashboard)
interface AppointmentState {
  doctorSelected: string;
  selectedDoctorName: string;
  dateTimeSelected: string;
  patientSelected: string;
  productSelected: string;
  setDoctor: (doctorId: string, doctorName: string) => void;
  setDateTime: (date: string) => void;
  setPatient: (patient: string) => void;
  setProduct: (product: string) => void;
}

export const useAppointmentStore = create(
  persist<AppointmentState>(
    (set) => ({
      doctorSelected: '',
      selectedDoctorName: '',
      dateTimeSelected: '',
      patientSelected: '',
      productSelected: 'Individual therapy', // Default product
      setDoctor: (doctorId: string, doctorName: string) =>
        set((state) => ({ doctorSelected: doctorId, selectedDoctorName: doctorName })),
      setDateTime: (date: string) => set((state) => ({ dateTimeSelected: date })),
      setPatient: (patient: string) => set((state) => ({ patientSelected: patient })),
      setProduct: (product: string) => set((state) => ({ productSelected: product })),
    }),
    {
      name: 'appointment-storage',
    }
  )
);
