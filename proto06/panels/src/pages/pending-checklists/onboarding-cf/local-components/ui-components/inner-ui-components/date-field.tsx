import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import { ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';

interface DateONBOARDINGSTATUSViewInterface{
    index: number;
    initialDate: string | null;
    setInitialDate: (index: number, field_get: string, value: string) => void;
    disabledDate: boolean;
    setDisabledDate: Dispatch<SetStateAction<boolean>>;
}


export default function DateFieldInput(props: DateONBOARDINGSTATUSViewInterface) {
    const { index, initialDate, setInitialDate } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Commencement Date"
                    value={dayjs(initialDate)}
                    disabled
                    onChange={(newValue) => {
                        const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                        setInitialDate(index, "date_commencement_array", formattedDate)
                    }}

                />
        </LocalizationProvider>
    );
}