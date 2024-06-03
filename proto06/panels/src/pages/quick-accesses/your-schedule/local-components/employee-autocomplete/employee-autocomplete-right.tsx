import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getEmployeesList } from '@/store/actions/employees';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';


interface EmployeeAutoCompleteInterface{
    currEmployee: number;
    setCurrEmployee: Dispatch<SetStateAction<number>>;
}


export default function EmployeeAutoCompleteRight(props: EmployeeAutoCompleteInterface) {
    const navigate = useNavigate();
    const {currEmployee, setCurrEmployee} = props;
    const state = useSelector((state:RootState)=> state.employees);
    const [employeesList, setEmployeesList] = useState<{employee: string, emp_no: number}[]>([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    useEffect(()=> {
        if(selectedEmployeeId){
            setCurrEmployee(selectedEmployeeId)
        }
    }, [selectedEmployeeId])

    useEffect(() => {
        if (state.employees_list) {
                const updatedEmployeesList = 
                state.employees_list?.map(({ emp_no, last_name, first_name }) => {
                    return {
                        employee: `${last_name}, ${first_name} - #${emp_no}`,
                        emp_no: emp_no,
                    };
                }) || [];
                setEmployeesList(updatedEmployeesList);
            // }, 800);
        }
    }, [state.employees_list]);

    const options = employeesList?.map((option) => {
        const firstLetter = option.employee[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const defaultOption = options?.find((option) => option.emp_no === currEmployee);
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingEmployee = employeesList.find(
        (employeeItems) => employeeItems.employee.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingEmployee) {
            setSelectedEmployeeId(matchingEmployee.emp_no);
        } else {
          setSelectedEmployeeId(null);
        }
    };

    const isOptionEqualToValue = (option: { employee: string; emp_no: number }, value: { employee: string; emp_no: number }) => {
        return option.emp_no === value.emp_no;
    };
    
    return (
        <>
        {defaultOption && 
        <Autocomplete
        disabled
        // noOptionsText={<><p>Not found. <i style={{cursor: 'pointer', color: 'blue'}} onClick={()=> navigate('/home/employees/201-files')}>Add Employee?</i></p></>}
        noOptionsText={'Loading... Please Wait.'}
        defaultValue={defaultOption}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.employee}
        onInputChange={handleInputChange}
        sx={{ width: '300px' }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Employee #" />
                )

            }

        }
        />
        }
        </>

    );
}