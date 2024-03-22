import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { HolidayGetType } from '@/types/types-pages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalAPIDate } from '@/store/configureStore';
import dayjs from 'dayjs';
import { HolidayCreate } from '@/store/actions/procedurals';

//LIBRARIES
import FormControl, { useFormControl } from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//COMPONENTS
import Province from '@/public-components/forms/address/Province';
import AllCityMunicipality from '@/public-components/forms/address/AllCityMunicipality';

//HELPERS
import { beautifyJSON } from '@/helpers/utils';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

interface CreateHolidayModalInterface {
    open?: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOpen: () => void,
    handleClose: () => void,
}
const holiday_location = ['City', 'Province', 'National'];

export default function CreateHolidayModal(props: CreateHolidayModalInterface) {
    const dispatch = useDispatch();
    const {open, handleClose} = props;
    const createHoliday = useSelector((state: RootState)=> state.procedurals?.HolidayCreate);
    const [createHolidayForm, setCreateHolidayForm] = useState<any>({
        holiday_date: null,
        holiday_description: '',
        holiday_type: '',
        holiday_location: '',
        province_ref: null,
        city_ref: null,
        province: {
            id: null,
            name: null,
            code: null
        },
        city: {
            id: null,
            name: null,
            code: null
        },

    })
    const [value, setValue] = React.useState<string | null>(holiday_location[0]);
    const [inputValue, setInputValue] = React.useState('');

    const validateHoliday = (data:HolidayGetType) => {

        let errors:any = {}

        !data.holiday_date && (errors["Holiday Date"] = "Holiday Date should be required")
        !data.holiday_description && (errors["Holiday Description"] = "Holiday Description should be required")
        !data.holiday_type && (errors["Holiday Type"] = "Holiday Type should be required")
        !data.holiday_location && (errors["Holiday Location"] = "Holiday Location should be required")

        switch (data.holiday_location) {

            case "Province":
                if(!data.province_ref) {
                    errors["Province"] = "Province should be required if the selected location is Province"
                }
                break

            case "City":
                if(!data.city_ref) {
                    errors["City"] = "City should be required if the selected location is City"
                }
                break
        }

        if(Object.keys(errors).length > 0) {
            window.alert(beautifyJSON(errors))
            return true
        }
        return false
        

        

    }
    const submitNewHoliday = () => {
        
        const holidayData: HolidayGetType = {
            holiday_date: createHolidayForm.holiday_date,
            holiday_description: createHolidayForm.holiday_description,
            holiday_type: createHolidayForm.holiday_type,
            holiday_location: createHolidayForm.holiday_location,
            // province_ref: (createHolidayForm.holiday_location=="Province" && createHolidayForm.province.id) ||
            //             (createHolidayForm.holiday_location=="City" && createHolidayForm.city.id) ||
            //             (createHolidayForm.holiday_location=="" && createHolidayForm.province.id),
            // city_ref: createHolidayForm.city.id
        }

        switch(createHolidayForm.holiday_location) {

            case "Province":
                holidayData.province_ref = createHolidayForm.province.id
                break

            case "City":
                holidayData.city_ref = createHolidayForm.city.id
                break

            case "National":
                holidayData.province_ref = null
                holidayData.city_ref = null
                break

            default:
                holidayData.province_ref = null
                holidayData.city_ref = null
                break
        }

        const isError = validateHoliday(holidayData);

        if(isError) {
            return
        }

        dispatch(HolidayCreate(holidayData));

    };
    useEffect(()=>{
        if(createHoliday.status && createHoliday.status === 'succeeded'){
            window.alert("Holiday has been successfully created");
            setTimeout(()=> {
                window.location.reload();
            }, 1000)
        } else if (createHoliday.error){
            window.alert(`${createHoliday.error}`)
        } else {
            return;
        }
    }, [createHoliday.status])
    return (
        <div>
            <Modal
            open={open ?? false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create an HRIS Holiday
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Make sure to double check all the fields and entry.
                </Typography>
                <FormControl className='w-full'>
                    <InputLabel htmlFor="holiday_type">Holiday Type:*</InputLabel>
                    <Select
                        onChange={(e:any) => setCreateHolidayForm((curr:any) => ({
                        ...curr,
                        holiday_type: e.target.value
                        }))}
                        placeholder="Holiday Type*"
                        name="holiday_type"
                        variant="outlined"
                        label="Holiday Type*"
                    >
                        <MenuItem value="SH">Special Non-working Holiday</MenuItem>
                        <MenuItem value="LH">Legal Holiday</MenuItem>
                    </Select>
                </FormControl>
                {/* <Autocomplete
                    noOptionsText={'Loading... Please Wait.'}
                    inputValue={createHolidayForm['holiday_type']}
                    onInputChange={(event, newInputValue) => {
                            setCreateHolidayForm((prevState)=> ({
                            ...prevState,
                            holiday_type: newInputValue
                        }))
                    }}
                    disablePortal
                    id="holiday_type"
                    options={['SH', 'LH']}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} required label="Holiday Type" />}
                /> */}
                <Autocomplete
                    noOptionsText={'Loading... Please Wait.'}
                    inputValue={createHolidayForm['holiday_location']}
                    onInputChange={(event, newInputValue) => {
                            setCreateHolidayForm((prevState:any)=> ({
                            ...prevState,
                            holiday_location: newInputValue
                        }))
                    }}
                    disablePortal
                    id="holiday_location"
                    options={holiday_location}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} required label="Holiday Location" />}
                />

                {createHolidayForm.holiday_location == "Province" && 
                    <Province 
                        state={createHolidayForm}
                        setState={setCreateHolidayForm}
                    />
                }
                {createHolidayForm.holiday_location == "City" && 
                    <AllCityMunicipality
                        state={createHolidayForm}
                        setState={setCreateHolidayForm}
                    />
                }
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={createHolidayForm['holiday_date']}
                        onChange={(newValue) => {
                            setCreateHolidayForm((prevState:any)=> ({
                                ...prevState,
                                holiday_date: dayjs(newValue).format(`${globalAPIDate}`)
                            }))
                        }}
                        label="Choose Which Date"
                        slotProps={{
                        textField: {
                            helperText: 'MM/DD/YYYY',
                        },
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    value={createHolidayForm['holiday_description']}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        // To do: Debounce this Input
                        setCreateHolidayForm((prevState:any)=> ({
                            ...prevState,
                            holiday_description: event.target.value
                        }))
                    }}
                    id="holiday_description" 
                    required 
                    label="Holiday Description" 
                    variant="filled" 
                />
                <div className='flex justify-end'>
                <Button variant="contained" onClick={submitNewHoliday}> Submit Holiday </Button>
                </div>
            </Box>
            </Modal>
        </div>
    );
}