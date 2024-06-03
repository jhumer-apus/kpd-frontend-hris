import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getEmployeesList } from '@/store/actions/employees';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { SCHEDULEDAILYCreateInterface } from '@/types/types-pages';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


interface EmployeeAutoCompleteInterface{
    createSCHEDULEDAILY: SCHEDULEDAILYCreateInterface;
    setCreateSCHEDULEDAILY: Dispatch<SetStateAction<SCHEDULEDAILYCreateInterface>>;
}


interface optionsInterface {
    employee: string;
    emp_no: number;
    firstLetter: string;
}

export default function MultiEmployeeAutoCompleteLeft(props: EmployeeAutoCompleteInterface) {
    const {setCreateSCHEDULEDAILY, createSCHEDULEDAILY} = props;
    const state = useSelector((state:RootState)=> state.employees);
    const [employeesList, setEmployeesList] = useState<optionsInterface[]>([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number[]>([]);

    useEffect(()=> {
        if(selectedEmployeeId){
            setCreateSCHEDULEDAILY((prevState)=> {
                return(
                    {
                        ...prevState,
                        emp_no: selectedEmployeeId
                    }
                )
            })
        }
    }, [selectedEmployeeId])
    useEffect(() => {
        if (state.employees_list) {
            const updatedEmployeesList = 
            state.employees_list?.map(({ emp_no, last_name, first_name }) => {
                return {
                    employee: `${last_name}, ${first_name} - #${emp_no}`,
                    emp_no: emp_no,
                    firstLetter: /[0-9]/.test(last_name[0].toUpperCase()) ? '0-9' : last_name[0].toUpperCase() 
                };
            }) || [];
            setEmployeesList(updatedEmployeesList);
        }
    }, [state.employees_list]);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: optionsInterface[], reason: AutocompleteChangeReason) => {
        if (Array.isArray(newInputValue) && newInputValue.length > 0) {
            const matchingEmployees = employeesList.filter((employeeItem) =>
                newInputValue.some((selectedItem) => selectedItem.employee === employeeItem.employee)
            );
            const matchingEmployeeIds = matchingEmployees.map((employee) => employee.emp_no);
            setSelectedEmployeeId(matchingEmployeeIds)
        } else { 
            setSelectedEmployeeId([]);
        }
    };

 
    const isOptionEqualToValue = (option: { employee: string; emp_no: number }, value: { employee: string; emp_no: number }) => {
        return option.emp_no === value.emp_no;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        noOptionsText={'Loading... Please Wait.'}
        multiple
        limitTags={2}
        options={employeesList?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(employeesList) => employeesList.firstLetter}
        getOptionLabel={(employeesList) => employeesList.employee}
        // onInputChange={()=> console.log("asd11")}
        // value={selectedTags}
        onChange={handleChange}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.employee}
            </li>
        )}
        placeholder='Select Multiple'    
        sx={{ width: '100%' }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Employees List" placeholder='Select One or More Employees' />
                )

            }

        }

        />
    );
}