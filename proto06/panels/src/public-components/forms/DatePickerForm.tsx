import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  defaultValue? : string,
  label: string,
  setState: any
  customKey: string
  disabled?: boolean
}

export default function DatePickerForm(props: Props) {

  const {setState, label, defaultValue, customKey, disabled} = props

  const formatDate = (date: Dayjs | null) => {
    return date ? date.format('YYYY-MM-DD') : null;
  };
  const handleChange = (newValue:any) => {
    const formattedDate = formatDate(newValue);
      setState((curr:any) => ({
      ...curr,
      [customKey]: formattedDate
    }))
  }


  return (
    <div className='w-full -mt-2 mb-4'>
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DemoContainer  components={['DatePicker']}>
          <DatePicker 
            className='w-full'
            label={label} 
            defaultValue={dayjs(defaultValue)}
            onChange={handleChange}
            disabled={disabled}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}