import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getRanksList } from '@/store/actions/rank';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { ANNOUNCEMENTCreateInterface } from '@/types/types-payroll-eoy';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


interface RankAutoCompleteInterface{
    createANNOUNCEMENT: ANNOUNCEMENTCreateInterface;
    setCreateANNOUNCEMENT: Dispatch<SetStateAction<ANNOUNCEMENTCreateInterface>>;
}


interface optionsInterface {
    employee: string;
    emp_no: number;
    firstLetter: string;
}

export default function MultiRankAutoCompleteLeft(props: RankAutoCompleteInterface) {
    const {setCreateANNOUNCEMENT, createANNOUNCEMENT} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.payrollEOY);
    const [rankList, setRanksList] = useState<optionsInterface[]>([])
    const [selectedRankId, setSelectedRankId] = useState<number[]>([]);

    useEffect(()=> {
        if(state.rank_list?.length === 0){
            dispatch(getRanksList());
        }
    }, []);

    useEffect(()=> {
        if(selectedRankId){
            setCreateANNOUNCEMENT((prevState)=> {
                return(
                    {
                        ...prevState,
                        for_ranks_code: selectedRankId
                    }
                )
            })
        }
    }, [selectedRankId])
    useEffect(() => {
        if (state.rank_list) {
            const updatedRanksList = 
            state.rank_list?.map(({ emp_no, last_name, first_name }) => {
                return {
                    employee: `${last_name}, ${first_name} - #${emp_no}`,
                    emp_no: emp_no,
                    firstLetter: /[0-9]/.test(last_name[0].toUpperCase()) ? '0-9' : last_name[0].toUpperCase() 
                };
            }) || [];
            setRanksList(updatedRanksList);
        }
    }, [state.rank_list]);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: optionsInterface[], reason: AutocompleteChangeReason) => {
        if (Array.isArray(newInputValue) && newInputValue.length > 0) {
            const matchingRanks = rankList.filter((employeeItem) =>
                newInputValue.some((selectedItem) => selectedItem.employee === employeeItem.employee)
            );
            const matchingRankIds = matchingRanks.map((employee) => employee.emp_no);
            setSelectedRankId(matchingRankIds)
        } else { 
            setSelectedRankId([]);
        }
    };

 
    const isOptionEqualToValue = (option: { employee: string; emp_no: number }, value: { employee: string; emp_no: number }) => {
        return option.emp_no === value.emp_no;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        multiple
        limitTags={2}
        id="grouped-demo"
        options={rankList?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(rankList) => rankList.firstLetter}
        getOptionLabel={(rankList) => rankList.employee}
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
                    <TextField {...params} label="Ranks List" placeholder='Select One or More Ranks' />
                )

            }

        }

        />
    );
}