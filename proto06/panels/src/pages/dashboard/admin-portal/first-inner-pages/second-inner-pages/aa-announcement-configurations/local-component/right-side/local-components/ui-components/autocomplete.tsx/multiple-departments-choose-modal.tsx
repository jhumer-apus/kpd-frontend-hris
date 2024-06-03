import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { DEPARTMENTViewAction } from '@/store/actions/categories';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


interface DepartmentAutoCompleteInterface{
    viewANNOUNCEMENT: ANNOUNCEMENTViewInterface;
    setViewANNOUNCEMENT: Dispatch<SetStateAction<ANNOUNCEMENTViewInterface>>;
}


interface optionsInterface {
    department: string;
    department_id: number;
    firstLetter: string;
}

export default function MultiDepartmentAutoCompleteRight(props: DepartmentAutoCompleteInterface) {
    const {setViewANNOUNCEMENT, viewANNOUNCEMENT} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.categories.DEPARTMENTView);
    const [departmentsList, setDepartmentsList] = useState<optionsInterface[]>([])
    const [chosenDepartments, setChosenDepartments] = useState<optionsInterface[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number[]>([]);

    useEffect(()=> {
        dispatch(DEPARTMENTViewAction());
    }, []);
    useEffect(()=> {
        if(selectedDepartmentId){
            setViewANNOUNCEMENT((prevState)=> {
                return(
                    {
                        ...prevState,
                        for_departments_code: selectedDepartmentId
                    }
                )
            })
        }
    }, [selectedDepartmentId])
    useEffect(() => {
        if (state.data) {
            const updatedDepartmentsList = 
            state.data?.map(({ id, dept_name, dept_branch_code }) => {
                return {
                    department: `${dept_name}, ${dept_branch_code} - #${id}`,
                    department_id: id,
                    firstLetter: /[0-9]/.test(dept_name[0].toUpperCase()) ? '0-9' : dept_name[0].toUpperCase() 
                };
            }) || [];
            setDepartmentsList(updatedDepartmentsList);
            const matchingDepartments = departmentsList.filter((departmentItem) => 
                 viewANNOUNCEMENT.for_departments_code.some((department_code) => department_code === departmentItem.department_id))
            setChosenDepartments(matchingDepartments)
        }

    }, [state.data]);

    useEffect(() => {
        // if(viewANNOUNCEMENT.for_departments_code.length > 0){

        // }
    }, [])

    // console.log(departmentsList, "ha113344")
    const handleChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: optionsInterface[], reason: AutocompleteChangeReason) => {
        // if (Array.isArray(newInputValue) && newInputValue.length > 0) {
            const matchingDepartments = departmentsList.filter((departmentItem) =>
                newInputValue.some((selectedItem) => selectedItem.department === departmentItem.department)
            );
            const matchingDepartmentIds = matchingDepartments.map((department) => department.department_id);
            setSelectedDepartmentId(matchingDepartmentIds)
            setChosenDepartments(matchingDepartments)
        // } else { 
            // setSelectedDepartmentId([]);
        // }
    };

 
    const isOptionEqualToValue = (option: { department: string; department_id: number }, value: { department: string; department_id: number }) => {
        return option.department_id === value.department_id;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        multiple
        limitTags={2}
        noOptionsText={'Loading... Please Wait.'}
        options={departmentsList?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(departmentsList) => departmentsList.firstLetter}
        getOptionLabel={(departmentsList) => departmentsList.department}
        // onInputChange={()=> console.log("asd11")}
        value={chosenDepartments}
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
              {option.department}
            </li>
        )}
        placeholder='Select Multiple'    
        sx={{ width: '100%' }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Target By [Departments]" placeholder='Select One or More Departments' />
                )

            }

        }

        />
    );
}