import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { OBTCreateInterface } from '@/types/types-pages';
import { DatePicker } from '@mui/x-date-pickers';

interface DateFromToOBTCreateInterface{
    createOBT: OBTCreateInterface;
    setCreateOBT: Dispatch<SetStateAction<OBTCreateInterface>>;
}


export default function DateFromToOBTCreate(props: DateFromToOBTCreateInterface) {
    const { createOBT, setCreateOBT } = props;

    const handleChangeDate = (name:string, value:Date | Dayjs | string | null) => {
        const formattedDate = dayjs(value).format('YYYY-MM-DD');
        setCreateOBT((curr) => (
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
                    onChange={(newValue:any) => handleChangeDate("obt_business_date", newValue)}
                    sx={{ width: '100%' }} 
                />
            </div>
            <div title="Make sure this field is logical. (i.e, `Date From` should come first and not the `Date To`)">
            <DateTimePicker
            label="Date From"
            value={createOBT?.obt_date_from}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateOBT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                obt_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            sx={{ width: '100%' }}
            />
            </div>
            <div title="Make sure this field is logical. (i.e, `Date From` should come first and not the `Date To`)">
            <DateTimePicker
            label="Date To"
            value={createOBT?.obt_date_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateOBT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                obt_date_to: formattedDate
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