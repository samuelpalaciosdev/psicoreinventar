'use client';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

export default function DateTimePickerAppointment() {
  const oneWeek = dayjs().add(7, 'day');

  const eightAM = dayjs().set('hour', 8).startOf('hour');
  const fivePM = dayjs().set('hour', 17).startOf('hour');

  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          viewRenderers={{
            hours: renderTimeViewClock,
          }}
          className='self-start z-[100] pointer-events-auto'
          autoFocus={true}
          disablePast={true}
          minutesStep={60}
          maxDate={oneWeek}
          shouldDisableDate={isWeekend}
          defaultValue={eightAM}
          minTime={eightAM}
          // Need this styling to make the popper work inside the dialog component
          slotProps={{
            popper: {
              sx: {
                '&.MuiPopper-root': { pointerEvents: 'auto' },
              },
              placement: 'top',
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
