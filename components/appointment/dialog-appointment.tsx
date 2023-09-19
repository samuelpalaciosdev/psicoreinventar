import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import DialogAppointmentTrigger from './dialog-appointment-trigger';
import getProducts from '@/utilities/get-products';
import DialogAppointmentButton from './dialog-appointment-button';
import DateTimePickerAppointment from './datetime-picker';
import AppointmentSubmitButton from './appointment-checkout-button';

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
              <DialogAppointmentButton
                key={product.id}
                productId={product.id!}
                productName={product.name!}
                priceId={product.default_price}
              />
            ))}
          </div>
          {/* Date and time picker */}
          <DateTimePickerAppointment />
        </div>
        <DialogFooter>
          <AppointmentSubmitButton text='Make an appointment' />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
