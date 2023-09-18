'use client';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function DateTimePickerAppointment() {
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
        defaultValue={eightAm}
        shouldDisableDate={isWeekend}
        disablePast
        minTime={eightAm}
        maxTime={fivePm}
        maxDate={oneWeek}
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
