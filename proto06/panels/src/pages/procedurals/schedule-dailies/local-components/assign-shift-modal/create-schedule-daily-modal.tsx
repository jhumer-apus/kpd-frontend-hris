import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { SCHEDULEDAILYCreateInterface } from '@/types/types-pages';
import { SCHEDULEDAILYCreateAction, SCHEDULEDAILYCreateActionFailureCleanup } from '@/store/actions/procedurals';
import SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYPage from '../schedule-shift-autocomplete/schedule-shift-autocomplete';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EmployeeAutoCompleteLeft from '../employee-autocomplete/employee-autocomplete-left';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

interface CreateSCHEDULEDAILYModalInterface {
    open1?: boolean,
    setOpen1: React.Dispatch<React.SetStateAction<boolean>>,
    handleOpen1: () => void,
    handleClose1: () => void,
}

export default function CreateSCHEDULEDAILYModal(props: CreateSCHEDULEDAILYModalInterface) {
    const dispatch = useDispatch();
    const {open1, handleClose1} = props;
    const createSCHEDULEDAILY = useSelector((state: RootState)=> state.procedurals.SCHEDULEDAILYCreate);
    const [createSCHEDULEDAILYForm, setCreateSCHEDULEDAILYForm] = useState<SCHEDULEDAILYCreateInterface>({
        schedule_shift_code: null,
        business_date_from: null,
        business_date_to: null,
        emp_no: [],
        is_restday: false,
        sched_default: false,
    })
    const submitNewSCHEDULEDAILY = () => {
        dispatch(SCHEDULEDAILYCreateAction(createSCHEDULEDAILYForm));
    };

    useEffect(()=>{
        if(createSCHEDULEDAILY?.status === 'succeeded'){
            window.alert("SCHEDULEDAILY has been successfully created");
            setTimeout(()=> {
                window.location.reload();
            }, 1000)
        } else if (createSCHEDULEDAILY?.status === 'failed'){
            window.alert(`Error: ${createSCHEDULEDAILY.error}`)
            dispatch(SCHEDULEDAILYCreateActionFailureCleanup())
        }
    }, [createSCHEDULEDAILY?.status])
    return (
        <div>
            <Modal
            open={open1 ?? false}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create an HRIS SCHEDULEDAILY
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Make sure to double check all the fields and entry.
                </Typography>
                <SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYPage createSCHEDULEDAILY={createSCHEDULEDAILYForm} setCreateSCHEDULEDAILY={setCreateSCHEDULEDAILYForm}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={createSCHEDULEDAILYForm.business_date_from}
                        onChange={(newValue) => {
                            setCreateSCHEDULEDAILYForm((prevState)=> ({
                                ...prevState,
                                business_date_from: dayjs(newValue).format('YYYY-MM-DD')
                            }))
                        }}
                        label="Date Range From"
                        slotProps={{
                        textField: {
                            helperText: 'MM/DD/YYYY',
                        },
                        }}
                    />
                    <DatePicker
                        value={createSCHEDULEDAILYForm.business_date_to}
                        onChange={(newValue) => {
                            setCreateSCHEDULEDAILYForm((prevState)=> ({
                                ...prevState,
                                business_date_to: dayjs(newValue).format('YYYY-MM-DD')
                            }))
                        }}
                        label="Date Range To (Optional)"
                        slotProps={{
                        textField: {
                            helperText: 'MM/DD/YYYY',
                        },
                        }}
                    />
                </LocalizationProvider>
                <EmployeeAutoCompleteLeft createSCHEDULEDAILY={createSCHEDULEDAILYForm} setCreateSCHEDULEDAILY={setCreateSCHEDULEDAILYForm}/>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Is Restday</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={`${!!createSCHEDULEDAILYForm.is_restday}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const value = (event.target.value=== 'true' ? true : false);
                            setCreateSCHEDULEDAILYForm((prevState)=> {
                                return (
                                    {
                                        ...prevState,
                                        is_restday: value
                                    }
                                )
                            })
                        }}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <div className='flex justify-end'>
                <Button variant="contained" onClick={submitNewSCHEDULEDAILY}> Submit SCHEDULEDAILY </Button>
                </div>
            </Box>
            </Modal>
        </div>
    );
}