import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { ANNOUNCEMENTCreateInterface } from '@/types/types-payroll-eoy';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { DEPARTMENTViewAction } from '@/store/actions/categories';
import useFetchQuery from '@/custom-hooks/use-fetch-query';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


interface DepartmentAutoCompleteInterface{
    createANNOUNCEMENT: ANNOUNCEMENTCreateInterface;
    setCreateANNOUNCEMENT: Dispatch<SetStateAction<ANNOUNCEMENTCreateInterface>>;
}


interface optionsInterface {
    department: string;
    department_id: number;
    firstLetter: string;
}

export default function MultiDepartmentAutoCompleteLeft(props: DepartmentAutoCompleteInterface) {
    const {setCreateANNOUNCEMENT, createANNOUNCEMENT} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.categories.DEPARTMENTView);
    const [departmentsList, setDepartmentsList] = useState<any[]>([])
    const [chosenDepartments, setChosenDepartments] = useState<any[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number[]>([]);
    // useEffect(()=> {
    //     dispatch(DEPARTMENTViewAction());
    // }, []);

    const {data:departments, status, error} = useFetchQuery(`ann_department/`, null)

    // useEffect(()=> {
    //     if(selectedDepartmentId){
    //         setCreateANNOUNCEMENT((prevState)=> {
    //             return(
    //                 {
    //                     ...prevState,
    //                     for_departments_code: selectedDepartmentId
    //                 }
    //             )
    //         })
    //     }
    // }, [selectedDepartmentId])
    useEffect(() => {
        if (departments) {
            const updatedDepartmentsList = 
            departments?.map(({ id, dept_name, dept_branch_code }:any) => {
                return {
                    // department: `${dept_name}, ${dept_branch_code} - #${id}`,
                    department: `${dept_name}`,
                    department_id: id,
                    firstLetter: /[0-9]/.test(dept_name[0].toUpperCase()) ? '0-9' : dept_name[0].toUpperCase() 
                };
            }) || [];
            setDepartmentsList(updatedDepartmentsList);
        }
    }, [departments]);

    useEffect(() => {
        // if(createANNOUNCEMENT.for_departments_code.length > 0){
           const matchingDepartments = departmentsList.filter((departmentItem) => createANNOUNCEMENT.for_departments_code.some((department_code) => department_code === departmentItem.department_id))
           setChosenDepartments(matchingDepartments)
        // }
    }, [])

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: any[], reason: AutocompleteChangeReason) => {
        if (Array.isArray(newInputValue) && newInputValue.length > 0) {
        // const matchingDepartments = departmentsList.filter((departmentItem) =>
        //     newInputValue.some((selectedItem) => selectedItem.department === departmentItem.department)
        // );
        // const matchingDepartmentIds = matchingDepartments.map((department) => department.department_id);

        
            const departmentIds = newInputValue.map(dep => dep.department_id)

            setCreateANNOUNCEMENT((prevState)=> {
                return(
                    {
                        ...prevState,
                        for_departments_code: departmentIds
                    }
                )
            })
            setSelectedDepartmentId(departmentIds)
            setChosenDepartments(newInputValue)
        } else { 
            setCreateANNOUNCEMENT((prevState)=> {
                return(
                    {
                        ...prevState,
                        for_departments_code: []
                    }
                )
            })
            setSelectedDepartmentId([]);
        }
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
        options={departmentsList?.sort((a:any, b:any) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(departmentsList) => departmentsList.firstLetter}
        getOptionLabel={(departmentsList) => departmentsList.department}
        // onInputChange={()=> console.log("asd11")}
        disableCloseOnSelect
        // value={chosenDepartments}
        onChange={handleChange}
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