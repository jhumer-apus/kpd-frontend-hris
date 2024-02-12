import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OVERTIMECreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface OVERTIMETypeAutoCompleteInterface{
    createOVERTIME: OVERTIMECreateInterface;
    setCreateOVERTIME: Dispatch<SetStateAction<OVERTIMECreateInterface>>;
}




export default function OVERTIMETypeAutoComplete(props: OVERTIMETypeAutoCompleteInterface) {
    const { setCreateOVERTIME, createOVERTIME } = props;

    return (
        <Autocomplete
            noOptionsText={'Loading... Please Wait.'}
            value={createOVERTIME?.ot_type}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null ) => {
                setCreateOVERTIME((prevState)=>{
                    return(
                        {
                            ...prevState,
                            ot_type: newValue
                        }
                    )
                })
            }}
            disablePortal
            options={OVERTIMETypeOptions}
            // isOptionEqualToValue={(option, value) => {
            //     return option === value;
            // }}
            //   groupBy={(option) => option.firstLetter}
            //   getOptionLabel={(option) => option.title}
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