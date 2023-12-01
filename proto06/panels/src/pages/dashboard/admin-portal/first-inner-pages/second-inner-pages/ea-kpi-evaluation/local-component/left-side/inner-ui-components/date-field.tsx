import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { KPICORECreateInterface } from '@/types/types-employee-and-applicants';
import { globalAPIDate } from '@/store/configureStore';

interface DateKPICORECreateInterface{
    initialState: KPICORECreateInterface;
    setInitialState: Dispatch<SetStateAction<KPICORECreateInterface>>;
}


export default function DateFieldCreate(props: DateKPICORECreateInterface) {
    const { initialState, setInitialState } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="KPI Evaluation Deadline"
                    value={initialState?.date_evaluation_deadline}
                    onChange={(newValue) => {
                        const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                        return (
                            setInitialState((prevState)=>{
                                return(
                                    {
                                        ...prevState,
                                        date_evaluation_deadline: formattedDate
                                    }
                                )
                            })
                        )
                }}
                />
        </LocalizationProvider>
    );
}