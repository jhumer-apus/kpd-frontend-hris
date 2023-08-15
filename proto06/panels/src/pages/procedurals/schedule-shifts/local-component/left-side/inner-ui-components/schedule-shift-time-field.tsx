import { Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SCHEDULESHIFTCreateInterface } from '@/types/types-pages';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface TimeFromToSCHEDULESHIFTCreateInterface{
    createSCHEDULESHIFT: SCHEDULESHIFTCreateInterface;
    setCreateSCHEDULESHIFT: Dispatch<SetStateAction<SCHEDULESHIFTCreateInterface>>;
}


export default function SCHEDULESHIFTTimeCreate(props: TimeFromToSCHEDULESHIFTCreateInterface) {
    const { createSCHEDULESHIFT, setCreateSCHEDULESHIFT } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
            label="Time In:"
            value={createSCHEDULESHIFT?.time_in === null ? null : dayjs(createSCHEDULESHIFT?.time_in, "HH:mm:ss")}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('HH:mm:ss');
                return (
                    setCreateSCHEDULESHIFT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                time_in: formattedDate
                            }
                        )
                    })
                )
            }}
            />
            <TimePicker
            label="Time Out:"
            value={createSCHEDULESHIFT?.time_out === null ? null : dayjs(createSCHEDULESHIFT?.time_out, "HH:mm:ss")}
            onChange={(newValue) => {
                const formattedDate = dayjs(newValue).format('HH:mm:ss');
                return(
                    setCreateSCHEDULESHIFT((prevState)=>{
                        return(
                            {
                                ...prevState,
                                time_out: formattedDate
                            }
                        )
                    })
                )
            }}
            />
        </LocalizationProvider>
    );
}