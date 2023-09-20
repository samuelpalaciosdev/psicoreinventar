'use client';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { useAppointmentStore } from '@/context/store';

export default function DateTimePickerAppointment() {
  const setDateTime = useAppointmentStore((state) => state.setDateTime);

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
  const [minTime, setMinTime] = useState<Dayjs>(eightAm);
  const [formattedValue, setFormattedValue] = useState<string>(
    formatDateTime(eightAm) // Initialize with formatted initial value
  );

  // useEffect(() => {
  //   setDateTime(formatDateTime(minTime!)); // Initial datetime value on store
  //   // Update minTime dynamically based on the current time
  //   const currentHour = dayjs().hour();
  //   if (currentHour >= 8) {
  //     // If current hour is 8 AM or later, set minTime to the current hour
  //     setMinTime(dayjs().startOf('hour').hour(currentHour));
  //   } else {
  //     // If current hour is earlier than 8 AM, set minTime to 8 AM
  //     setMinTime(eightAm);
  //   }
  // }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label='Date and time of appointment'
        className='self-start'
        viewRenderers={{
          hours: renderTimeViewClock,
        }}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          const formattedValue = formatDateTime(newValue!);
          setDateTime(formattedValue);
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
