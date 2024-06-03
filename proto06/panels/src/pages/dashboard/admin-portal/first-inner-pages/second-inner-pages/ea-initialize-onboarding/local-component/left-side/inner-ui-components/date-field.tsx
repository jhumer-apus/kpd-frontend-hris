import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ONBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';

interface DateONBOARDINGSTATUSCreateInterface{
    initialState: ONBOARDINGSTATUSCreateInterface;
    setInitialState: Dispatch<SetStateAction<ONBOARDINGSTATUSCreateInterface>>;
}


export default function DateFieldCreate(props: DateONBOARDINGSTATUSCreateInterface) {
    const { initialState, setInitialState } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Onboarding Date Start"
                    value={initialState?.date_start}
                    onChange={(newValue) => {
                        const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                        return (
                            setInitialState((prevState)=>{
                                return(
                                    {
                                        ...prevState,
                                        date_start: formattedDate
                                    }
                                )
                            })
                        )
                }}
                />
        </LocalizationProvider>
    );
}