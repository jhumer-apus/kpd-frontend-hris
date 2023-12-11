import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ONBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface ONBOARDINGSTATUSTypeAutoCompleteInterface{
    createONBOARDINGSTATUS: ONBOARDINGSTATUSCreateInterface;
    setCreateONBOARDINGSTATUS: Dispatch<SetStateAction<ONBOARDINGSTATUSCreateInterface>>;
}




export default function ONBOARDINGSTATUSTypeAutoComplete(props: ONBOARDINGSTATUSTypeAutoCompleteInterface) {
    const { createONBOARDINGSTATUS, setCreateONBOARDINGSTATUS } = props;
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string | null) => {
        setCreateONBOARDINGSTATUS((prevState)=>{
            return(
                {
                    ...prevState,
                    obt_type: newInputValue
                }
            )
        })
    };

    return (
        <Autocomplete
            value={createONBOARDINGSTATUS?.obt_type}
            // onChange={(event: React.SyntheticEvent<Element, Event>, newValue ) => {
            //     setLocalONBOARDINGSTATUSTypeState(newValue.label)
            // }}
            onChange={handleInputChange}
            disablePortal
            id="combo-box-demo"
            options={ONBOARDINGSTATUSTypeOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="ONBOARDINGSTATUS Type" />}
        />
    );
}

const ONBOARDINGSTATUSTypeOptions = [
    'On Client Meeting',
    'On-Site Project',
    'Others'
]