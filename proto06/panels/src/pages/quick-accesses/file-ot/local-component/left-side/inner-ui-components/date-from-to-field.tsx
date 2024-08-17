import { MutableRefObject, Dispatch, SetStateAction, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { OVERTIMECreateInterface } from '@/types/types-pages';
import { DatePicker } from '@mui/x-date-pickers';
import { create } from 'lodash';

interface DateFromToOVERTIMECreateInterface{
    createOVERTIME: OVERTIMECreateInterface;
    setCreateOVERTIME: Dispatch<SetStateAction<OVERTIMECreateInterface>>;
}


export default function DateFromToOVERTIMECreate(props: DateFromToOVERTIMECreateInterface) {
    const { createOVERTIME, setCreateOVERTIME } = props;

    const handleChangeDate = (name:string, value:Date | Dayjs | string | null) => {
        const formattedDate = dayjs(value).format('YYYY-MM-DD');
        setCreateOVERTIME((curr) => (
            {
                ...curr,
                [name]: formattedDate
            }
        ))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                <DatePicker
                    label="Business Date"
                    // value={createOVERTIME?.ot_business_date}
                    onChange={(newValue:any) => handleChangeDate("ot_business_date", newValue)}
                    sx={{ width: '100%' }} 
                />
            </div>
            <div title="Make sure this field is logical. (i.e, `Date & Time From` should come first and not the `Date & Time To`)">
                <DateTimePicker
                    label="Date & Time From"
                    value={createOVERTIME?.ot_date_from}
                    onChange={(newValue) => {
                        const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                        return (
                            setCreateOVERTIME((prevState)=>{
                                return(
                                    {
                                        ...prevState,
                                        ot_date_from: formattedDate
                                    }
                                )
                            })
                        )
                    }}
                    sx={{ width: '100%' }} 
                />
            </div>
            <div title="Make sure this field is logical. (i.e, `Date & Time From` should come first and not the `Date & Time To`)">
                <DateTimePicker
                    label="Date & Time To"
                    value={createOVERTIME?.ot_date_to}
                    onChange={(newValue) => {
                        const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                        return(
                            setCreateOVERTIME((prevState)=>{
                                return(
                                    {
                                        ...prevState,
                                        ot_date_to: formattedDate
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