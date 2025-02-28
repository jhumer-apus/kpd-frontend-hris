import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { UACreateInterface } from '@/types/types-pages';

interface DateFromToUACreateInterface{
    createUA: UACreateInterface;
    setCreateUA: Dispatch<SetStateAction<UACreateInterface>>;
}


export default function DateFromToUACreate(props: DateFromToUACreateInterface) {
    const { createUA, setCreateUA } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Date From"
            value={dayjs(createUA ?.ua_date_from)}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateUA((prevState)=>{
                        return(
                            {
                                ...prevState,
                                ua_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            sx={{width:'100%'}}
            />
            {/* <div title="Make sure this field is logical. (i.e, `Date From` should come first and not the `Date To`)">
            <DateTimePicker
            label="Date & Time Froms"
            value={createUA?.ua_date_from}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateUA((prevState)=>{
                        return(
                            {
                                ...prevState,
                                ua_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            sx={{ width: '100%' }}
            />
            </div> */}


            <DateTimePicker
            label="Date To"
            value={dayjs(createUA?.ua_date_to)}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateUA((prevState)=>{
                        return(
                            {
                                ...prevState,
                                ua_date_to: formattedDate
                            }
                        )
                    })
                )
            }}
            sx={{ width: '100%' }}
            />
        </LocalizationProvider>
    );
}