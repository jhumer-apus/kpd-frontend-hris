import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { BRANCHViewInterface, DEPARTMENTCreateInterface } from '@/types/types-pages';
import { BRANCHViewAction } from '@/store/actions/categories';


interface BranchAutoCompleteInterface{
    createDEPARTMENT: DEPARTMENTCreateInterface;
    setCreateDEPARTMENT: Dispatch<SetStateAction<DEPARTMENTCreateInterface>>;
    currentId: number | null
}


export default function BranchAutoComplete(props: BranchAutoCompleteInterface) {
    const {setCreateDEPARTMENT, createDEPARTMENT, currentId} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.categories.BRANCHView);
    const [branchList, setBranchList] = useState<{branch_name: string, branch_id: number}[]>([])
    // const [selectedBranchID, setSelectedBranchID] = useState<number | null>(currentId);
    useEffect(()=> {
        if(Array.isArray(state.data) && state.data.length === 0){
            dispatch(BRANCHViewAction());
        }
    }, []);

    // useEffect(()=> {
    //     if(selectedBranchID){
    //         setCreateDEPARTMENT((prevState)=> {
    //             return(
    //                 {
    //                     ...prevState,
    //                     dept_branch_code: selectedBranchID
    //                 }
    //             )
    //         })
    //     }
    // }, [selectedBranchID])

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

    const updateCreateDepartment = (id:number | null) => {

        setCreateDEPARTMENT((prevState:any)=> {
            return(
                {
                    ...prevState,
                    dept_branch_code: id
                }
            )
        })
    }

    const options = branchList?.map((option) => {
        const firstLetter = option.branch_name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const handleChange = (e:any, value:any) => {
        if(value) {
            updateCreateDepartment(value?.branch_id)
        } else {    
            updateCreateDepartment(null)
        }


    };
    
    // const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
    //     console.log(newInputValue)
    //     const matchingBranch = branchList.find(
    //     (branchItems) => branchItems.branch_name.toLowerCase().includes(newInputValue.toLowerCase())
    //     );
    //     if (matchingBranch) {
    //         updateBranchCode(matchingBranch.branch_id)
    //         // setSelectedBranchID(matchingBranch.branch_id);
    //     } else {
    //         updateBranchCode(null)
    //     //   setSelectedBranchID(null);
    //     // window.alert('No Matched Branch in the list is found. Create an employee entry first')
    //     }
    // };

    const isOptionEqualToValue = (option: { branch_name: string; branch_id: number }, value: { branch_name: string; branch_id: number }) => {
        return option.branch_id === value.branch_id;
    };

    const findValue = branchList.find(branch => currentId == branch.branch_id)?? null
    
    return (
        <Autocomplete
            // disableCloseOnSelect
            value={findValue}
            noOptionsText={'Loading... Please Wait.'}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option:any) => option.firstLetter}
            getOptionLabel={(option) => option.branch_name}
            onChange={handleChange}
            sx={{ width: 300 }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Branch Code" />
                    )

                }

            }
        />
    );
}