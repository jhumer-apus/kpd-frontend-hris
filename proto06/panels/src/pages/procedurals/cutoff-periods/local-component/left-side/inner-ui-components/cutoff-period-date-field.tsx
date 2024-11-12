import { ChangeEvent, Dispatch, SetStateAction } from 'react';
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

    // handle component state changes in single method instead of multiple methods -osama
    const handleChanges = (name: string, date: any): void => {
        const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm:ss');

        setCreateCUTOFFPERIOD((curr) => ({
            ...curr, 
            [name]: formattedDate
        }))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="Cutoff Date From"
                value={dayjs(createCUTOFFPERIOD?.datetime_from)}
                onChange={(value) => handleChanges('datetime_from', value)}                
            />
            <DateTimePicker
                label="Cutoff Date Until"
                value={dayjs(createCUTOFFPERIOD?.datetime_to)}
                onChange={(value) => handleChanges('datetime_to', value)}
            />
        </LocalizationProvider>
    );
}