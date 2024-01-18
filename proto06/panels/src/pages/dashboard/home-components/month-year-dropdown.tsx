import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { OBTCreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';

interface MonthYearDropdownInterface{
    filter?: boolean;
    setCreateOBT?: Dispatch<SetStateAction<OBTCreateInterface>>;
}




export default function MonthYearDropdown(props: MonthYearDropdownInterface) {
    // const { createOBT, setCreateOBT } = props;
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string | null, reason: AutocompleteChangeReason, details: AutocompleteChangeDetails<string> | undefined, type: "month" | "year") => {
        // setCreateOBT((prevState)=>{
        //     return(
        //         {
        //             ...prevState,
        //             obt_type: newInputValue
        //         }
        //     )
        // })
        console.log(reason, "reason", details, "detail", type)
    };

    return (
        <div className='flex justify-around mr-2.5 gap-2.5 self-end' style={{width: "23%", zIndex: ""}}>
            <Autocomplete
                value={null}
                // onChange={(event: React.SyntheticEvent<Element, Event>, newValue ) => {
                //     setLocalOBTTypeState(newValue.label)
                // }}
                onChange={(e, v, r, d) => handleInputChange(e, v, r ,d, "month")}
                disablePortal
                id="perfect-attendance-month"
                options={Months_List}
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label="Month" />}
            />
            <Autocomplete
                value={null}
                // onChange={(event: React.SyntheticEvent<Element, Event>, newValue ) => {
                //     setLocalOBTTypeState(newValue.label)
                // }}
                onChange={(e, v, r, d) => handleInputChange(e, v, r ,d, "year")}
                disablePortal
                id="perfect-attendance-year"
                options={Years_List}
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label="Year" />}
            />
        </div>
    );
}

const Months_List = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',    
]


const Years_List = [
    '2023',
    '2024',
    '2025',
    '2026',
]