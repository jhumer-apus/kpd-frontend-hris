import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LEAVECREDITCreateInterface } from '@/types/types-pages';

interface DateFromToLEAVECREDITCreateInterface{
    createLEAVECREDIT: LEAVECREDITCreateInterface;
    setCreateLEAVECREDIT: Dispatch<SetStateAction<LEAVECREDITCreateInterface>>;
}


export default function ExpiryDateLEAVECREDITCreate(props: DateFromToLEAVECREDITCreateInterface) {
    const { createLEAVECREDIT, setCreateLEAVECREDIT } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Expiry Date"
            value={createLEAVECREDIT?.expiry}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateLEAVECREDIT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                expiry: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            {/* <DateTimePicker
            label="Date To"
            value={createLEAVECREDIT?.leave_date_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateLEAVECREDIT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                leave_date_to: formattedDate
                            }
                        )
                    })
                )
            }}
            /> */}
        </LocalizationProvider>
    );
}