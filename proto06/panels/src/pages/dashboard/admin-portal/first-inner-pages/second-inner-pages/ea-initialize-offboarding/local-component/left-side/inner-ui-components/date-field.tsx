import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { OFFBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';

interface DateOFFBOARDINGSTATUSCreateInterface{
    initialState: OFFBOARDINGSTATUSCreateInterface;
    setInitialState: Dispatch<SetStateAction<OFFBOARDINGSTATUSCreateInterface>>;
}


export default function DateFieldCreate(props: DateOFFBOARDINGSTATUSCreateInterface) {
    const { initialState, setInitialState } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Date Resigned"
                    value={initialState?.date_offboard}
                    onChange={(newValue) => {
                        const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                        return (
                            setInitialState((prevState)=>{
                                return(
                                    {
                                        ...prevState,
                                        date_offboard: formattedDate
                                    }
                                )
                            })
                        )
                }}
                />
        </LocalizationProvider>
    );
}