import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { UACreateInterface } from '@/types/types-pages';

interface DateFromToUACreateInterface{
    createUA: UACreateInterface;
    setCreateUA: Dispatch<SetStateAction<UACreateInterface>>;
}


export default function DateFromToUACreate(props: DateFromToUACreateInterface) {
    const { setCreateUA, createUA } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Date From"
            value={createUA?.ua_date_from}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateUA((prevState)=> {
                        return(
                            {
                                ...prevState,
                                ua_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            <DateTimePicker
            label="Date To"
            value={createUA?.ua_date_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateUA((prevState)=> {
                        return(
                            {
                                ...prevState,
                                ua_date_to: formattedDate
                            }
                        )
                    })
                )
            }}
            />
        </LocalizationProvider>
    );
}