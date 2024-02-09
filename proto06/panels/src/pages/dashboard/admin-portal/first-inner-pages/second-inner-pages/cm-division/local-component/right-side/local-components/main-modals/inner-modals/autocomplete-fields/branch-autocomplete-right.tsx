import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { BRANCHViewInterface, DIVISIONCreateInterface, DIVISIONViewInterface } from '@/types/types-pages';
import { BRANCHViewAction } from '@/store/actions/categories';


interface BranchAutoCompleteInterface{
    createDIVISION: DIVISIONViewInterface;
    setCreateDIVISION: Dispatch<SetStateAction<DIVISIONViewInterface>>;
}


export default function BranchAutoCompleteRight(props: BranchAutoCompleteInterface) {
    const {setCreateDIVISION, createDIVISION} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.categories.BRANCHView);
    const [branchList, setBranchList] = useState<{branch_name: string, branch_id: number}[]>([])
    const [selectedBranchID, setSelectedBranchID] = useState<number | null>(null);
    useEffect(()=> {
        if(Array.isArray(state.data) && state.data.length === 0){
            dispatch(BRANCHViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedBranchID){
            setCreateDIVISION((prevState)=> {
                return(
                    {
                        ...prevState,
                        div_branch_code: selectedBranchID
                    }
                )
            })
        }
    }, [selectedBranchID])

    useEffect(() => {
        if (state.data.length > 0) {
            setTimeout(() => {
                const updatedBranchList = 
                state.data?.map(({ branch_name, id }) => {
                    return {
                        branch_name: `${branch_name} - #${id}`,
                        branch_id: id,
                    };
                }) || [];
                setBranchList(updatedBranchList);
            }, 1000);
        }
    }, [state.data]);

    const options = branchList?.map((option) => {
        const firstLetter = option.branch_name[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const defaultOption = options?.find((option) => option.branch_id === createDIVISION.div_branch_code)

    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingBranch = branchList.find(
        (branchItems) => branchItems.branch_name.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingBranch) {
            setSelectedBranchID(matchingBranch.branch_id);
        } else {
          setSelectedBranchID(null);
        // window.alert('No Matched Branch in the list is found. Create an employee entry first')
        }
    };

    const isOptionEqualToValue = (option: { branch_name: string; branch_id: number }, value: { branch_name: string; branch_id: number }) => {
        return option.branch_id === value.branch_id;
    };
    
    return (
        <>
        {defaultOption && 
        <Autocomplete
        // disableCloseOnSelect
        // key={createDIVISION.div_branch_code}
        noOptionsText={'Loading... Please Wait.'}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        defaultValue={defaultOption}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.branch_name}
        onInputChange={handleInputChange}
        sx={{ width: "90%" }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Branch:" />
                )

            }

        }
        />
        }

        </>
    );
}