'use client';
import { useState } from 'react';
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

  // Format date like Thursday, September 21, 2023 8:00 AM
  const formatDateTime = (date: Dayjs) => {
    return date.format('dddd, MMMM D, YYYY h:mm A');
  };

  const [value, setValue] = useState<Dayjs | null>(eightAm);
  const [formattedValue, setFormattedValue] = useState<string>(
    formatDateTime(eightAm) // Initialize with formatted initial value
  );
  // console.log(formattedValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        className='self-start'
        viewRenderers={{
          hours: renderTimeViewClock,
        }}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setFormattedValue(formatDateTime(newValue!));
        }}
        minDate={today}
        maxDate={oneWeek}
        shouldDisableDate={isWeekend}
        minTime={eightAm}
        maxTime={fivePm}
        minutesStep={60}
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
