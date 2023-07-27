import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { CUTOFFPERIODCreateInterface } from '@/types/types-pages';

interface DateFromToCUTOFFPERIODCreateInterface{
    createCUTOFFPERIOD: CUTOFFPERIODCreateInterface;
    setCreateCUTOFFPERIOD: Dispatch<SetStateAction<CUTOFFPERIODCreateInterface>>;
}


export default function CUTOFFPERIODDateCreate(props: DateFromToCUTOFFPERIODCreateInterface) {
    const { createCUTOFFPERIOD, setCreateCUTOFFPERIOD } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Cutoff Date From"
            value={createCUTOFFPERIOD?.co_date_from}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateCUTOFFPERIOD((prevState)=>{
                        return(
                            {
                                ...prevState,
                                co_date_from: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            <DateTimePicker
            label="Cutoff Date Until"
            value={createCUTOFFPERIOD?.co_date_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateCUTOFFPERIOD((prevState)=>{
                        return(
                            {
                                ...prevState,
                                co_date_to: formattedDate
                            }
                        )
                    })
                )
            }}
            />
        </LocalizationProvider>
    );
}