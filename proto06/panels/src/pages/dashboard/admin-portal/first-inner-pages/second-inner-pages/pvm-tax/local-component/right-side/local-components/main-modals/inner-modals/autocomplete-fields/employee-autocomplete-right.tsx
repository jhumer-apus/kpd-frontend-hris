import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getEmployeesList } from '@/store/actions/employees';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { TAXCreateInterface, TAXViewInterface } from '@/types/types-payroll-variables';


interface EmployeeAutoCompleteInterface{
    createTAX: TAXViewInterface;
    setCreateTAX: Dispatch<SetStateAction<TAXViewInterface>>;
}


export default function EmployeeAutoCompleteRight(props: EmployeeAutoCompleteInterface) {
    const {setCreateTAX, createTAX} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.employees);
    const [employeesList, setEmployeesList] = useState<{employee: string, emp_no: number}[]>([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    useEffect(()=> {
        if(state.employees_list?.length === 0){
            dispatch(getEmployeesList());
        }
    }, []);

    useEffect(()=> {
        if(selectedEmployeeId){
            setCreateTAX((prevState)=> {
                return(
                    {
                        ...prevState,
                        dept_lead: selectedEmployeeId
                    }
                )
            })
        }
    }, [selectedEmployeeId])

    useEffect(() => {
        if (state.employees_list) {
            setTimeout(() => {
                const updatedEmployeesList = 
                state.employees_list?.map(({ emp_no, last_name, first_name }) => {
                    return {
                        employee: `${last_name}, ${first_name} - #${emp_no}`,
                        emp_no: emp_no,
                    };
                }) || [];
                setEmployeesList(updatedEmployeesList);
            }, 1000);
        }
    }, [state.employees_list]);

    const options = employeesList?.map((option) => {
        const firstLetter = option.employee[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    const defaultOption = options?.find((option) => option.emp_no === createTAX.emp_no)
    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingEmployee = employeesList.find(
        (employeeItems) => employeeItems.employee.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingEmployee) {
            setSelectedEmployeeId(matchingEmployee.emp_no);
        } else {
          setSelectedEmployeeId(null);
        // window.alert('No Matched Employee in the list is found. Create an employee entry first')
        }
    };

    const isOptionEqualToValue = (option: { employee: string; emp_no: number }, value: { employee: string; emp_no: number }) => {
        return option.emp_no === value.emp_no;
    };
    
    return (
        <>
        {defaultOption &&
        <Autocomplete
        // disableCloseOnSelect
        // key={createTAX.dept_lead}
        id="grouped-demo"
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.employee}
        defaultValue={defaultOption}
        onInputChange={handleInputChange}
        sx={{ width: "100%" }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="For Employee #:" />
                )

            }

        }
        />
        }
        {!defaultOption &&
        <Autocomplete
        id="grouped-demo"
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.employee}
        onInputChange={handleInputChange}
        sx={{ width: '100%' }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Loading Values..." />
                )

            }

        }
        />
        }
        </>
    );
}