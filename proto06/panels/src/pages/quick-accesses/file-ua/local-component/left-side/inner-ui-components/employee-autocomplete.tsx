import { Dispatch, SetStateAction, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { UACreateInterface } from '@/types/types-pages';


interface EmployeeAutoCompleteInterface{
    createUA?: UACreateInterface;
    setCreateUA: Dispatch<SetStateAction<UACreateInterface>>;
}


export default function EmployeeAutoComplete(props: EmployeeAutoCompleteInterface) {
    const { setCreateUA } = props;
    const curr_user = useSelector((state:RootState)=> state.auth.employee_detail);
    const curr_emp = curr_user?.emp_no as number
    useEffect(()=> {
        if(curr_emp){
            setCreateUA((prevState)=> {
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