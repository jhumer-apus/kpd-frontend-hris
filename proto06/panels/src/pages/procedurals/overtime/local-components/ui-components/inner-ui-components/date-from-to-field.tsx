import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { OVERTIMECreateInterface } from '@/types/types-pages';

interface DateFromToOVERTIMECreateInterface{
    createOVERTIME: OVERTIMECreateInterface;
    setCreateOVERTIME: Dispatch<SetStateAction<OVERTIMECreateInterface>>;
}


export default function DateFromToOVERTIMECreate(props: DateFromToOVERTIMECreateInterface) {
    const { setCreateOVERTIME, createOVERTIME } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Date From"
            value={createOVERTIME?.ot_date_from}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateOVERTIME((prevState)=> {
                        return(
                            {
                                ...prevState,
                                ot_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            <DateTimePicker
            label="Date To"
            value={createOVERTIME?.ot_date_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateOVERTIME((prevState)=> {
                        return(
                            {
                                ...prevState,
                                ot_date_to: formattedDate
                            }
                        )
                    })
                )
            }}
            />
        </LocalizationProvider>
    );
}