import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getEmployeesList } from '@/store/actions/employees';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { ASSETACCOUNTEditInterface } from '@/types/types-payroll-eoy';


interface EmployeeAutoCompleteInterface{
    editASSETACCOUNT: ASSETACCOUNTEditInterface;
    setEditASSETACCOUNT: Dispatch<SetStateAction<ASSETACCOUNTEditInterface>>;
}


export default function EmployeeAutoCompleteRight(props: EmployeeAutoCompleteInterface) {
    const {setEditASSETACCOUNT, editASSETACCOUNT} = props;
    const state = useSelector((state:RootState)=> state.employees);
    const [employeesList, setEmployeesList] = useState<{employee: string, emp_no: number}[]>([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    useEffect(()=> {
        if(selectedEmployeeId){
            setEditASSETACCOUNT((prevState)=> {
                return(
                    {
                        ...prevState,
                        assigned_to: selectedEmployeeId
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
            }, 500);
        }
    }, [state.employees_list]);

    const options = employeesList?.map((option) => {
        const firstLetter = option.employee[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });

    const defaultOptions = options?.find((item)=> item.emp_no === editASSETACCOUNT.assigned_to)
    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingEmployee = employeesList.find(
        //   (employeeItems) => employeeItems.employee === newInputValue
        (employeeItems) => employeeItems.employee.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingEmployee) {
            setSelectedEmployeeId(matchingEmployee.emp_no);
        } else {
          setSelectedEmployeeId(null);
        // window.alert('No Matched Employee in the list is found. Edit an employee entry first')
        }
    };

    const isOptionEqualToValue = (option: { employee: string; emp_no: number }, value: { employee: string; emp_no: number }) => {
        return option.emp_no === value.emp_no;
    };
    
    return (
        <>
        {
            defaultOptions &&
            <Autocomplete
            // disableCloseOnSelect
            noOptionsText={'Loading... Please Wait.'}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.employee}
            defaultValue={defaultOptions}
            onInputChange={handleInputChange}
            sx={{ width: '100%' }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Assign to Employee:" />
                    )
                }
            }
            />
        }
        {
            !defaultOptions &&
            <Autocomplete
            // disableCloseOnSelect
            noOptionsText={'Loading... Please Wait.'}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.employee}
            defaultValue={defaultOptions}
            onInputChange={handleInputChange}
            sx={{ width: '100%' }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Loading" />
                    )
                }
            }
            />
        }
        </>
        
    );
}