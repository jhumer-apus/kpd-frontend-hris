import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OBTCreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface OBTTypeAutoCompleteInterface{
    createOBT: OBTCreateInterface;
    setCreateOBT: Dispatch<SetStateAction<OBTCreateInterface>>;
}




export default function OBTTypeAutoComplete(props: OBTTypeAutoCompleteInterface) {
    const { createOBT, setCreateOBT } = props;
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string | null) => {
        setCreateOBT((prevState)=>{
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
            value={createOBT?.obt_type}
            // onChange={(event: React.SyntheticEvent<Element, Event>, newValue ) => {
            //     setLocalOBTTypeState(newValue.label)
            // }}
            noOptionsText={'Loading... Please Wait.'}
            onChange={handleInputChange}
            disablePortal
            options={OBTTypeOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="OBT Type" />}
        />
    );
}

const OBTTypeOptions = [
    'On Client Meeting',
    'On-Site Project',
    'Others'
]