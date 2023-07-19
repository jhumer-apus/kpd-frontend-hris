import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LEAVECreateInterface } from '@/types/types-pages';

interface DateFromToLEAVECreateInterface{
    createLEAVE: LEAVECreateInterface;
    setCreateLEAVE: Dispatch<SetStateAction<LEAVECreateInterface>>;
}


export default function DateFromToLEAVECreate(props: DateFromToLEAVECreateInterface) {
    const { setCreateLEAVE, createLEAVE } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Date From"
            value={createLEAVE?.leave_date_from}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateLEAVE((prevState)=> {
                        return(
                            {
                                ...prevState,
                                leave_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            <DateTimePicker
            label="Date To"
            value={createLEAVE?.leave_date_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateLEAVE((prevState)=> {
                        return(
                            {
                                ...prevState,
                                leave_date_to: formattedDate
                            }
                        )
                    })
                )
            }}
            />
        </LocalizationProvider>
    );
}