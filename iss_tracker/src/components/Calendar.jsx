import * as React from 'react';
import { useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

export default function BasicDatePicker({ onDateChange }) {
    const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));

  
    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        onDateChange(newValue); // Call the parent function
      };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DesktopDatePicker
            value={selectedDate} // Use value instead of defaultValue to control the component
            onChange={handleDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  }