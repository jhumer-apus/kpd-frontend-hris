import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { OBTCreateInterface } from '@/types/types-pages';
import { AutocompleteInputChangeReason } from '@mui/joy';
import { Perfect_Attendace_Filter_Interface } from '@/types/types-employee-and-applicants';

interface MonthYearDropdownInterface{
    filter: Perfect_Attendace_Filter_Interface;
    setFilter: Dispatch<SetStateAction<Perfect_Attendace_Filter_Interface>>;
}




export default function MonthYearDropdown(props: MonthYearDropdownInterface) {
    const { filter, setFilter } = props;
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string | null, reason: AutocompleteChangeReason, details: AutocompleteChangeDetails<string> | undefined, type: "month" | "year") => {
        setFilter((prevState)=>{
            return(
                {
                    ...prevState,
                    [`${type}`]: newInputValue
                }
            )
        })
    };

    return (
        <div className='flex justify-end mr-2.5 gap-2.5 self-end' style={{  width: "100%", zIndex: "" }}>
    <Autocomplete
        noOptionsText={'Loading... Please Wait.'}
        value={filter.month ? `${filter.month}` : null}
        onChange={(e, v, r, d) => handleInputChange(e, v, r ,d, "month")}
        disablePortal
        id="perfect-attendance-month"
        options={Months_List}
        sx={{ width: "100%", maxWidth: "100px" }}
        renderInput={(params) => <TextField {...params} label="Month" />}
    />
    <Autocomplete
        noOptionsText={'Loading... Please Wait.'}
        value={filter.year ? `${filter.year}` : null}
        onChange={(e, v, r, d) => handleInputChange(e, v, r ,d, "year")}
        disablePortal
        id="perfect-attendance-year"
        options={Years_List}
        sx={{ width: "100%", maxWidth: "130px" }}
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