import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ANNOUNCEMENTCreateInterface } from '@/types/types-payroll-eoy';
import { globalAPIDate } from '@/store/configureStore';

interface DateFromToANNOUNCEMENTCreateInterface{
    createANNOUNCEMENT: ANNOUNCEMENTCreateInterface;
    setCreateANNOUNCEMENT: Dispatch<SetStateAction<ANNOUNCEMENTCreateInterface>>;
}


export default function DateAssignedANNOUNCEMENTCreate(props: DateFromToANNOUNCEMENTCreateInterface) {
    const { createANNOUNCEMENT, setCreateANNOUNCEMENT } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Announcement Post Date"
            value={createANNOUNCEMENT?.date_posted ?? null}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                return (
                    setCreateANNOUNCEMENT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                date_posted: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            <DateTimePicker
            label="Announcement Expiry Date"
            value={createANNOUNCEMENT?.expiry_date ?? null}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                return (
                    setCreateANNOUNCEMENT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                expiry_date: formattedDate
                            }
                        )
                    })
                )
            }}
            />
        </LocalizationProvider>
    );
}