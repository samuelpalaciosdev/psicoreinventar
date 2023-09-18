'use client';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function DateTimePickerAppointment() {
  const today = dayjs();
  const oneWeek = dayjs().add(7, 'day');

  const eightAm = dayjs().set('hour', 8).startOf('hour');
  const fivePm = dayjs().set('hour', 17).startOf('hour');

  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        className='self-start'
        viewRenderers={{
          hours: renderTimeViewClock,
        }}
        minDate={today}
        maxDate={oneWeek}
        shouldDisableDate={isWeekend}
        minTime={eightAm}
        maxTime={fivePm}
        minutesStep={60}
        // Need this style so that the popup is clickable inside the dialog component
        slotProps={{
          popper: {
            sx: {
              '&.MuiPopper-root': { pointerEvents: 'auto' },
            },
            placement: 'top',
          },
        }}
      />
    </LocalizationProvider>
  );
}
