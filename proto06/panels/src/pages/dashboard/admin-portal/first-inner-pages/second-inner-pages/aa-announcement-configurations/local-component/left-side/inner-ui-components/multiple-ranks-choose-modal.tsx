import { Dispatch, MutableRefObject, SetStateAction, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { ANNOUNCEMENTCreateInterface } from '@/types/types-payroll-eoy';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import { RANKViewAction } from '@/store/actions/categories';
import useFetchQuery from '@/custom-hooks/use-fetch-query';

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
    // const state = useSelector((state:RootState)=> state.categories.RANKView);
    // const [ranksList, setRanksList] = useState<any[]>([])
    const [selectedRankId, setSelectedRankId] = useState<number[]>([]);


    const {data:rankList, status, error} = useFetchQuery(`${APILink}ann_rank/`, null)

    // useEffect(()=> {
    //     dispatch(RANKViewAction());
    // }, []);

    // useEffect(()=> {
    //     if(selectedRankId){
    //         setCreateANNOUNCEMENT((prevState)=> {
    //             return(
    //                 {
    //                     ...prevState,
    //                     for_ranks_code: selectedRankId
    //                 }
    //             )
    //         })
    //     }
    // }, [selectedRankId])
    // useEffect(() => {
    //     if (state.data) {
    //         const updatedRanksList = 
    //         state.data?.map(({ id, rank_name, hierarchy }) => {
    //             return {
    //                 rank: `${rank_name}, ${hierarchy} - #${id}`,
    //                 rank_id: id,
    //                 firstLetter: /[0-9]/.test(rank_name[0].toUpperCase()) ? '0-9' : rank_name[0].toUpperCase() 
    //             };
    //         }) || [];
    //         setRanksList(updatedRanksList);
    //     }
    // }, [state.data]);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: any[], reason: AutocompleteChangeReason) => {

        if (Array.isArray(newInputValue) && newInputValue.length > 0) {

            // const matchingRanks = rankList.filter((rankItem:any) =>
            //     newInputValue.some((selectedItem) => selectedItem.rank === rankItem.rank)
            // );
            // const matchingRankIds = matchingRanks.map((rank:any) => rank.id);

            const rankIdList = newInputValue.map((rank:any) => rank.id)

            setCreateANNOUNCEMENT((prevState)=> {
                return(
                    {
                        ...prevState,
                        for_ranks_code: rankIdList 
                    }
                )
            })
            setSelectedRankId(rankIdList)

        } else { 

            setCreateANNOUNCEMENT((prevState)=> {
                return(
                    {
                        ...prevState,
                        for_ranks_code: []
                    }
                )
            })
            setSelectedRankId([]);
        }
    };
 
    // const isOptionEqualToValue = (option: { rank: string; rank_id: number }, value: { rank: string; rank_id: number }) => {
    //     return option.rank_id === value.rank_id;
    // };

    // const selectedValues = useMemo(
    //     () => ranks.filter((v:any) => v.selected),
    //     [ranks],
    // );
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        multiple
        limitTags={2}
        noOptionsText={'Loading... Please Wait.'}
        options={rankList?? []}
        // groupBy={(ranksList) => ranksList.firstLetter}
        getOptionLabel={(rank:any) => rank.rank_name}
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
              {option.rank_name}
            </li>
        )}
        placeholder='Select Multiple'    
        sx={{ width: '100%' }}
        // isOptionEqualToValue={isOptionEqualToValue}
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