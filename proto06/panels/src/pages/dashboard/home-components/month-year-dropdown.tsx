import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OBTCreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface MonthYearDropdownInterface{
    // createOBT?: OBTCreateInterface;
    // setCreateOBT?: Dispatch<SetStateAction<OBTCreateInterface>>;
}




export default function MonthYearDropdown(props: MonthYearDropdownInterface) {
    // const { createOBT, setCreateOBT } = props;
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string | null) => {
        // setCreateOBT((prevState)=>{
        //     return(
        //         {
        //             ...prevState,
        //             obt_type: newInputValue
        //         }
        //     )
        // })
    };

    return (
        <div className='flex' style={{width: "50%"}}>
            <Autocomplete
                value={null}
                // onChange={(event: React.SyntheticEvent<Element, Event>, newValue ) => {
                //     setLocalOBTTypeState(newValue.label)
                // }}
                onChange={handleInputChange}
                disablePortal
                id="perfect-attendance-month"
                options={Months_List}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Month" />}
            />
            <Autocomplete
                value={null}
                // onChange={(event: React.SyntheticEvent<Element, Event>, newValue ) => {
                //     setLocalOBTTypeState(newValue.label)
                // }}
                onChange={handleInputChange}
                disablePortal
                id="perfect-attendance-year"
                options={Years_List}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Year" />}
            />
        </div>
    );
}

const Months_List = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]


const Years_List = [
    '2023',
    '2024',
    '2025',
    '2026',
]