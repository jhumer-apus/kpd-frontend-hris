import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LEAVECreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface LEAVETypeAutoCompleteInterface{
    createLEAVE: LEAVECreateInterface;
    setCreateLEAVE: Dispatch<SetStateAction<LEAVECreateInterface>>;
}




export default function LEAVETypeAutoComplete(props: LEAVETypeAutoCompleteInterface) {
    const { setCreateLEAVE, createLEAVE } = props;

    return (
        <Autocomplete
            noOptionsText={'Loading... Please Wait.'}
            value={`${createLEAVE?.leave_type}` ?? ''}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null ) => {
                setCreateLEAVE((prevState)=>{
                    if(newValue){
                        return(
                            {
                                ...prevState,
                                leave_type: (+newValue)
                            }
                        )
                    }else {
                        return(
                            {
                                ...prevState,
                                leave_type: null
                            }
                        )
                    }

                })
            }}
            disablePortal
            id="combo-box-demo"
            options={LEAVETypeOptions}
            // isOptionEqualToValue={(option, value) => {
            //     return option === value;
            // }}
            //   groupBy={(option) => option.firstLetter}
            //   getOptionLabel={(option) => option.title}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="LEAVE Type" />}
        />
    );
}

const LEAVETypeOptions = [
    'WD',
    'BD',
    'AD'
]