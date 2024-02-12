import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OVERTIMECreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface OVERTIMETypeAutoCompleteInterface{
    createOVERTIME: OVERTIMECreateInterface;
    setCreateOVERTIME: Dispatch<SetStateAction<OVERTIMECreateInterface>>;
}




export default function OVERTIMETypeAutoComplete(props: OVERTIMETypeAutoCompleteInterface) {
    const { createOVERTIME, setCreateOVERTIME } = props;
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string | null) => {
        setCreateOVERTIME((prevState)=>{
            return(
                {
                    ...prevState,
                    ot_type: newInputValue
                }
            )
        })
    };

    return (
        <Autocomplete
            value={createOVERTIME?.ot_type}
            // onChange={(event: React.SyntheticEvent<Element, Event>, newValue ) => {
            //     setLocalOVERTIMETypeState(newValue.label)
            // }}
            onChange={handleInputChange}
            disablePortal
            noOptionsText={'Loading... Please Wait.'}
            options={OVERTIMETypeOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="OVERTIME Type" />}
        />
    );
}

const OVERTIMETypeOptions = [
    'WD',
    'BD',
    'AD'
]