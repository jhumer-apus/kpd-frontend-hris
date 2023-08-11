import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { OBTCreateInterface } from '@/types/types-pages';

interface DateFromToOBTCreateInterface{
    createOBT: OBTCreateInterface;
    setCreateOBT: Dispatch<SetStateAction<OBTCreateInterface>>;
}


export default function DateFromToOBTCreate(props: DateFromToOBTCreateInterface) {
    const { createOBT, setCreateOBT } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            />
            </div>
        </LocalizationProvider>
    );
}