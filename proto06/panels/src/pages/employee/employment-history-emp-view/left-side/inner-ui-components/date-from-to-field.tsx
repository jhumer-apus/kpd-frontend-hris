import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { EMPHISTORYCreateInterface } from '@/types/types-pages';
import { globalAPIDate } from '@/store/configureStore';
import { EMPHISTORYCreateInterface } from '@/types/types-employee-and-applicants';


interface DateFromToEMPHISTORYCreateInterface{
    createEMPHISTORY: EMPHISTORYCreateInterface;
    setCreateEMPHISTORY: Dispatch<SetStateAction<EMPHISTORYCreateInterface>>;
}


export default function DateFromToEMPHISTORYCreate(props: DateFromToEMPHISTORYCreateInterface) {
    const { createEMPHISTORY, setCreateEMPHISTORY } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <div title="Make sure this field is logical. (i.e, `Date & Time From` should come first and not the `Date & Time To`)"> */}
            <DateTimePicker
            label="Date of Changes"
            value={createEMPHISTORY?.date_promoted }
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                return (
                    setCreateEMPHISTORY((prevState)=>{
                        return(
                            {
                                ...prevState,
                                date_promoted: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            {/* </div> */}
            {/* <div title="Make sure this field is logical. (i.e, `Date & Time From` should come first and not the `Date & Time To`)">
                <DateTimePicker
                label="Date & Time To"
                value={createEMPHISTORY?.ot_date_to}
                onChange={(newValue) => {
                    const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                    return(
                        setCreateEMPHISTORY((prevState)=>{
                            return(
                                {
                                    ...prevState,
                                    ot_date_to: formattedDate
                                }
                            )
                        })
                    )
                }}
                />
            </div> */}
        </LocalizationProvider>
    );
}