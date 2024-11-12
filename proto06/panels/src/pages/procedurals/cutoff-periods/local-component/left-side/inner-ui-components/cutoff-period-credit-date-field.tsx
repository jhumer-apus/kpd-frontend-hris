import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { CUTOFFPERIODCreateInterface } from '@/types/types-pages';

interface CUTOFFPERIODCreditDateCreateInterface{
    createCUTOFFPERIOD: CUTOFFPERIODCreateInterface;
    setCreateCUTOFFPERIOD: Dispatch<SetStateAction<CUTOFFPERIODCreateInterface>>;
}


export default function CUTOFFPERIODCreditDateCreate(props: CUTOFFPERIODCreditDateCreateInterface) {
    const { createCUTOFFPERIOD, setCreateCUTOFFPERIOD } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Cutoff Credit(Pay) Date"
            value={dayjs(createCUTOFFPERIOD?.credit_date)}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateCUTOFFPERIOD((prevState)=>{
                        return(
                            {
                                ...prevState,
                                credit_date: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            {/* <DateTimePicker
            label="Cutoff Date Until"
            value={createCUTOFFPERIOD?.datetime_to}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return(
                    setCreateCUTOFFPERIOD((prevState)=>{
                        return(
                            {
                                ...prevState,
                                datetime_to: formattedDate
                            }
                        )
                    })
                )
            }}
            /> */}
        </LocalizationProvider>
    );
}