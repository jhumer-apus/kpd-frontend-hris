import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { PAYROLLGROUPViewAction } from '@/store/actions/categories';
import { findExistingKey } from '@/helpers/utils';



interface PayrollGroupAutoCompleteInterface<LocalState>{
    localState: LocalState;
    setLocalState: Dispatch<SetStateAction<LocalState>>;
}


export default function PayrollGroupAutoCompleteCreateSingle<LocalState>(props: PayrollGroupAutoCompleteInterface<LocalState>) {
    const {setLocalState, localState} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.categories.PAYROLLGROUPView);
    const [payrollgroupList, setPayrollGroupList] = useState<{payrollgroup_name: string, payrollgroup_id: number}[]>([])
    const [selectedPayrollGroupID, setSelectedPayrollGroupID] = useState<number | null>(null);
    useEffect(()=> {
        if(Array.isArray(state.data) && state.data.length === 0){
            dispatch(PAYROLLGROUPViewAction());
        }
    }, []);

    useEffect(()=> {
        const keysToCheck: string[] = ['div_payrollgroup_code', 'payrollgroup_code', 'another_key'];
        const existingKey = findExistingKey(localState as object, keysToCheck as keyof object);
        if(selectedPayrollGroupID){
            setLocalState((prevState)=> {
                return(
                    {
                        ...prevState,
                        [existingKey]: selectedPayrollGroupID
                    }
                )
            })
        }
    }, [selectedPayrollGroupID])

    useEffect(() => {
        if (state?.data?.length > 0) {
            setTimeout(() => {
                const updatedPayrollGroupList = 
                state.data?.map(({ name, id }) => {
                    return {
                        payrollgroup_name: `${name} - #${id}`,
                        payrollgroup_id: id,
                    };
                }) || [];
                setPayrollGroupList(updatedPayrollGroupList);
            }, 1000);
        }
    }, [state.data]);

    const options = payrollgroupList?.map((option) => {
        const firstLetter = option.payrollgroup_name[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    // const defaultOption = options?.find((option) => option.payrollgroup_id === localState?.div_payrollgroup_code)

    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingPayrollGroup = payrollgroupList.find(
        (payrollgroupItems) => payrollgroupItems.payrollgroup_name.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingPayrollGroup) {
            setSelectedPayrollGroupID(matchingPayrollGroup.payrollgroup_id);
        } else {
          setSelectedPayrollGroupID(null);
        // window.alert('No Matched PayrollGroup in the list is found. Create an employee entry first')
        }
    };

    const isOptionEqualToValue = (option: { payrollgroup_name: string; payrollgroup_id: number }, value: { payrollgroup_name: string; payrollgroup_id: number }) => {
        return option.payrollgroup_id === value.payrollgroup_id;
    };
    
    return (
        <>
        {/* {defaultOption &&  */}
        <Autocomplete
        // disableCloseOnSelect
        // key={localState.div_payrollgroup_code}
        noOptionsText={'Loading... Please Wait.'}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.payrollgroup_name}
        getOptionLabel={(option) => option.payrollgroup_name}
        onInputChange={handleInputChange}
        sx={{ width: "90%" }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="PayrollGroup:" />
                )

            }

        }
        />
        {/* } */}

        </>
    );
}