import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getEmployeesList } from '@/store/actions/employees';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { PAY13THCreateInterface } from '@/types/types-payroll-eoy';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


interface EmployeeAutoCompleteInterface{
    createPAY13TH: PAY13THCreateInterface;
    setCreatePAY13TH: Dispatch<SetStateAction<PAY13THCreateInterface>>;
}


interface optionsInterface {
    employee: string;
    emp_no: number;
    firstLetter: string;
}

export default function MultiEmployeeAutoCompleteLeft(props: EmployeeAutoCompleteInterface) {
    const {setCreatePAY13TH, createPAY13TH} = props;
    const state = useSelector((state:RootState)=> state.employees);
    const [employeesList, setEmployeesList] = useState<optionsInterface[]>([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(()=> {
        if(selectedEmployeeId){
            setCreatePAY13TH((prevState)=> {
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
        
        
        if (selectAll) {
            setSelectedEmployeeId(employeesList.map((employee) => employee.emp_no));
        }else if (Array.isArray(newInputValue) && newInputValue.length > 0) {
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
        <>
        <Autocomplete
        // disableCloseOnSelect
        multiple
        limitTags={2}
        noOptionsText={'Loading... Please Wait.'}
        options={employeesList?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(employeesList) => employeesList.firstLetter}
        getOptionLabel={(employeesList) => employeesList.employee}
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
        </>

    );
}