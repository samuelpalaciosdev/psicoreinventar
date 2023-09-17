import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import DialogAppointmentTrigger from './dialog-appointment-trigger';
import getProducts from '@/utilities/get-products';
import DialogAppointmentButton from './dialog-appointment-button';

type DialogAppointmentProps = {
  doctorId: string;
  doctorName: string;
};

export default async function DialogAppointment({ doctorId, doctorName }: DialogAppointmentProps) {
  const products = await getProducts();

  return (
    <Dialog>
      <DialogAppointmentTrigger doctorId={doctorId} doctorName={doctorName} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm appointment with Dr {doctorName}</DialogTitle>
          <DialogDescription>
            Please provide the data below to confirm your appointment.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          {/* Type of appointment buttons */}
          <p className='text-sm text-muted-foreground'> Type of appointment:</p>
          <div className='flex gap-4 items-center'>
            {products.map((product) => (
              <DialogAppointmentButton key={product.id} productName={product.name!} />
            ))}
          </div>

          {/* Date and time picker */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
