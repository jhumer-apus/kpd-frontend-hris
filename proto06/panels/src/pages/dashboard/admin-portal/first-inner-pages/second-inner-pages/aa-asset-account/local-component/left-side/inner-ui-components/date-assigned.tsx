import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ASSETACCOUNTCreateInterface } from '@/types/types-payroll-eoy';

interface DateFromToASSETACCOUNTCreateInterface{
    createASSETACCOUNT: ASSETACCOUNTCreateInterface;
    setCreateASSETACCOUNT: Dispatch<SetStateAction<ASSETACCOUNTCreateInterface>>;
}


export default function DateAssignedASSETACCOUNTCreate(props: DateFromToASSETACCOUNTCreateInterface) {
    const { createASSETACCOUNT, setCreateASSETACCOUNT } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Asset - Date Assigned"
            value={createASSETACCOUNT?.date_assigned ?? null}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                return (
                    setCreateASSETACCOUNT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                date_assigned: formattedDate
                            }
                        )
                    })
                )
            }}
            />
        </LocalizationProvider>
    );
}