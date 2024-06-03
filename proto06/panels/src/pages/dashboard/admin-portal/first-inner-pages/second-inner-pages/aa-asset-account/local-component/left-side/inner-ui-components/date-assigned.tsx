import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ASSETACCOUNTCreateInterface } from '@/types/types-payroll-eoy';
import { globalAPIDate } from '@/store/configureStore';

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
                const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
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