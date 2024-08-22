import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { UACreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface UATypeAutoCompleteInterface{
    createUA: UACreateInterface;
    setCreateUA: Dispatch<SetStateAction<UACreateInterface>>;
}




export default function UATypeAutoComplete(props: UATypeAutoCompleteInterface) {
    const { setCreateUA, createUA } = props;

    return (
        <Autocomplete
            noOptionsText={'Loading... Please Wait.'}
            value={`${createUA?.ua_type}` ?? ''}
            onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null ) => {
                setCreateUA((prevState)=>{
                    if(newValue){
                        return(
                            {
                                ...prevState,
                                ua_type: (+newValue)
                            }
                        )
                    }else {
                        return(
                            {
                                ...prevState,
                                ua_type: null
                            }
                        )
                    }

                })
            }}
            disablePortal
            id="combo-box-demo"
            options={UATypeOptions}
            // isOptionEqualToValue={(option, value) => {
            //     return option === value;
            // }}
            //   groupBy={(option) => option.firstLetter}
            //   getOptionLabel={(option) => option.title}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="UA Type" />}
        />
    );
}

const UATypeOptions = [
    'WD',
    'BD',
    'AD'
]