import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { OVERTIMECreateInterface } from '@/types/types-pages';


interface EmployeeAutoCompleteInterface{
    createOVERTIME?: OVERTIMECreateInterface;
    setCreateOVERTIME: Dispatch<SetStateAction<OVERTIMECreateInterface>>;
}


export default function EmployeeAutoComplete(props: EmployeeAutoCompleteInterface) {
    const { setCreateOVERTIME } = props;
    const curr_user = useSelector((state:RootState)=> state.auth.employee_detail);
    const curr_emp = curr_user?.emp_no as number
    useEffect(()=> {
        if(curr_emp){
            setCreateOVERTIME((prevState)=> {
                return(
                    {
                        ...prevState,
                        emp_no: curr_emp
                    }
                )
            })
        }
    }, [curr_emp])

    return (
        <Autocomplete
        // disableCloseOnSelect
        classes={{focused: 'true'}}
        noOptionsText={'Loading... Please Wait.'}
        options={[`${curr_emp}`]}
        // groupBy={(option) => option.firstLetter}
        value={`${curr_emp} - ${curr_user?.last_name} ${curr_user?.first_name}`}
        // getOptionLabel={(option) => option.employee}
        // onInputChange={handleInputChange}
        sx={{ width: 300 }}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Your Employee #" />
                )

            }

        }
        />
    );
}