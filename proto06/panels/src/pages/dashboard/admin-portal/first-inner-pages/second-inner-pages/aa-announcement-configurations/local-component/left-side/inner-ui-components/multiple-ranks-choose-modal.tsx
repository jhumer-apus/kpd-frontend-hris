import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { ANNOUNCEMENTCreateInterface } from '@/types/types-payroll-eoy';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { RANKViewAction } from '@/store/actions/categories';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


interface RankAutoCompleteInterface{
    createANNOUNCEMENT: ANNOUNCEMENTCreateInterface;
    setCreateANNOUNCEMENT: Dispatch<SetStateAction<ANNOUNCEMENTCreateInterface>>;
}


interface optionsInterface {
    rank: string;
    rank_id: number;
    firstLetter: string;
}

export default function MultiRankAutoCompleteLeft(props: RankAutoCompleteInterface) {
    const {setCreateANNOUNCEMENT, createANNOUNCEMENT} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.categories.RANKView);
    const [ranksList, setRanksList] = useState<optionsInterface[]>([])
    const [selectedRankId, setSelectedRankId] = useState<number[]>([]);

    useEffect(()=> {
        dispatch(RANKViewAction());
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
        if (state.data) {
            const updatedRanksList = 
            state.data?.map(({ id, rank_name, hierarchy }) => {
                return {
                    rank: `${rank_name}, ${hierarchy} - #${id}`,
                    rank_id: id,
                    firstLetter: /[0-9]/.test(rank_name[0].toUpperCase()) ? '0-9' : rank_name[0].toUpperCase() 
                };
            }) || [];
            setRanksList(updatedRanksList);
        }
    }, [state.data]);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: optionsInterface[], reason: AutocompleteChangeReason) => {
        if (Array.isArray(newInputValue) && newInputValue.length > 0) {
            const matchingRanks = ranksList.filter((rankItem) =>
                newInputValue.some((selectedItem) => selectedItem.rank === rankItem.rank)
            );
            const matchingRankIds = matchingRanks.map((rank) => rank.rank_id);
            setSelectedRankId(matchingRankIds)
        } else { 
            setSelectedRankId([]);
        }
    };

 
    const isOptionEqualToValue = (option: { rank: string; rank_id: number }, value: { rank: string; rank_id: number }) => {
        return option.rank_id === value.rank_id;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        multiple
        limitTags={2}
        noOptionsText={'Loading... Please Wait.'}
        options={ranksList?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(ranksList) => ranksList.firstLetter}
        getOptionLabel={(ranksList) => ranksList.rank}
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
              {option.rank}
            </li>
        )}
        placeholder='Select Multiple'    
        sx={{ width: '100%' }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Target By [Ranks]" placeholder='Select One or More Ranks' />
                )

            }

        }

        />
    );
}