import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { ALLOWANCETYPEViewAction } from '@/store/actions/payroll-variables';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { ALLOWANCEENTRYCreateInterface } from '@/types/types-payroll-variables';


interface AllowanceAutoCompleteInterface{
    createALLOWANCEENTRY: ALLOWANCEENTRYCreateInterface;
    setCreateALLOWANCEENTRY: Dispatch<SetStateAction<ALLOWANCEENTRYCreateInterface>>;
}


export default function AllowanceAutoComplete(props: AllowanceAutoCompleteInterface) {
    const {setCreateALLOWANCEENTRY, createALLOWANCEENTRY} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.payrollVariables.ALLOWANCETYPEView);
    const [allowanceList, setAllowanceList] = useState<{allowance: string, allowance_code: number}[]>([])
    const [selectedAllowanceId, setSelectedAllowanceId] = useState<number | null>(null);
    useEffect(()=> {
        if(state.data?.length === 0){
            dispatch(ALLOWANCETYPEViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedAllowanceId){
            setCreateALLOWANCEENTRY((prevState)=> {
                return(
                    {
                        ...prevState,
                        allowance_code: selectedAllowanceId
                    }
                )
            })
        }
    }, [selectedAllowanceId])

    useEffect(() => {
        if (state.data) {
            setTimeout(() => {
                const updatedAllowanceList = 
                state.data?.map(({ id, allowance_name, taxable }) => {
                    return {
                        allowance: `${allowance_name}, Taxable: ${taxable? 'Yes': 'No'} - #${id}`,
                        allowance_code: id,
                    };
                }) || [];
                setAllowanceList(updatedAllowanceList);
            }, 1000);
        }
    }, [state.data]);

    const options = allowanceList?.map((option) => {
        const firstLetter = option.allowance[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingAllowance = allowanceList.find(
        //   (allowanceItems) => allowanceItems.allowance === newInputValue
        (allowanceItems) => allowanceItems.allowance.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingAllowance) {
            setSelectedAllowanceId(matchingAllowance.allowance_code);
        } else {
          setSelectedAllowanceId(null);
        // window.alert('No Matched Allowance in the list is found. Create an allowance entry first')
        }
    };

    const isOptionEqualToValue = (option: { allowance: string; allowance_code: number }, value: { allowance: string; allowance_code: number }) => {
        return option.allowance_code === value.allowance_code;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        noOptionsText={'Loading... Please Wait.'}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.allowance}
        onInputChange={handleInputChange}
        sx={{ width: "100%" }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Allowance Type:" placeholder='Make Sure To Declare First The Allowance Type ' />
                )

            }

        }
        />  
    );
}