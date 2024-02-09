import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { EMPSEMINARSCreateInterface } from '@/types/types-pages';
import { globalAPIDate } from '@/store/configureStore';
import { EMPSEMINARSCreateInterface } from '@/types/types-employee-and-applicants';


interface DateFromToEMPSEMINARSCreateInterface{
    createEMPSEMINARS: EMPSEMINARSCreateInterface;
    setCreateEMPSEMINARS: Dispatch<SetStateAction<EMPSEMINARSCreateInterface>>;
}


export default function DateFromToEMPSEMINARSCreate(props: DateFromToEMPSEMINARSCreateInterface) {
    const { createEMPSEMINARS, setCreateEMPSEMINARS } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <div title="Make sure this field is logical. (i.e, `Date & Time From` should come first and not the `Date & Time To`)"> */}
            <DateTimePicker
            label="Date of Accomplishment"
            value={createEMPSEMINARS?.date_accomplished }
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format(`${globalAPIDate}`);
                return (
                    setCreateEMPSEMINARS((prevState)=>{
                        return(
                            {
                                ...prevState,
                                date_accomplished: formattedDate
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
                value={createEMPSEMINARS?.ot_date_to}
                onChange={(newValue) => {
                    const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                    return(
                        setCreateEMPSEMINARS((prevState)=>{
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