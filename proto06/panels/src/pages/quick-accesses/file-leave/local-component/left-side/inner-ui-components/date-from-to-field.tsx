import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LEAVECreateInterface } from '@/types/types-pages';

interface DateFromToLEAVECreateInterface{
    createLEAVE: LEAVECreateInterface;
    setCreateLEAVE: Dispatch<SetStateAction<LEAVECreateInterface>>;
}


export default function DateFromToLEAVECreate(props: DateFromToLEAVECreateInterface) {
    const { createLEAVE, setCreateLEAVE } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div title="Make sure this field is logical. (i.e, `Date From` should come first and not the `Date To`)">
            <DatePicker
            label="Date Start"
            value={createLEAVE?.leave_date_from}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
                return (
                    setCreateLEAVE((prevState)=>{
                        return(
                            {
                                ...prevState,
                                leave_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            sx={{ width: '100%' }}
            />
            </div>
            <div title="Make sure this field is logical. (i.e, `Date From` should come first and not the `Date To`)">
            <DatePicker
            label="Date End"
            value={createLEAVE?.leave_date_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
                return(
                    setCreateLEAVE((prevState)=>{
                        return(
                            {
                                ...prevState,
                                leave_date_to: formattedDate
                            }
                        )
                    })
                )
            }}
            sx={{ width: '100%' }}
            />
            </div>
        </LocalizationProvider>
    );
}