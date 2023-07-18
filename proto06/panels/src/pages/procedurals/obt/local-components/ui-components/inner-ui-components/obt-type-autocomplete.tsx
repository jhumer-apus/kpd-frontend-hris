import {Dispatch, SetStateAction, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OBTCreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface OBTTypeAutoCompleteInterface{
    createOBT?: OBTCreateInterface,
    setCreateOBT: Dispatch<SetStateAction<OBTCreateInterface>>;
}




export default function OBTTypeAutoComplete(props: OBTTypeAutoCompleteInterface) {
    const {createOBT, setCreateOBT} = props;

    return (
        <Autocomplete
            value={createOBT?.obt_type}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null ) => {
                setCreateOBT((prevState)=> {
                    return (
                        {
                            ...prevState,
                            obt_type: newValue
                        }
                    )
                });
            }}
            disablePortal
            id="combo-box-demo"
            options={OBTTypeOptions}
            //   groupBy={(option) => option.firstLetter}
            //   getOptionLabel={(option) => option.title}
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