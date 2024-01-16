import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';
import { globalAPIDate } from '@/store/configureStore';

interface DateFromToANNOUNCEMENTViewInterface{
    editANNOUNCEMENT: ANNOUNCEMENTViewInterface;
    setEditANNOUNCEMENT: Dispatch<SetStateAction<ANNOUNCEMENTViewInterface>>;
}


export default function DateAssignedANNOUNCEMENTEdit(props: DateFromToANNOUNCEMENTViewInterface) {
    const { editANNOUNCEMENT, setEditANNOUNCEMENT } = props;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            label="Announcement Post Date"
            value={dayjs(editANNOUNCEMENT?.date_posted)}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                return (
                    setEditANNOUNCEMENT((prevState)=>{
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
            value={dayjs(editANNOUNCEMENT?.expiry_date) ?? null}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                return (
                    setEditANNOUNCEMENT((prevState)=>{
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