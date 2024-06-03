import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';

import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { BONUSENTRYCreateInterface } from '@/types/types-payroll-eoy';
import { CUTOFFPERIODViewAction } from '@/store/actions/procedurals';


interface CutoffAutoCompleteInterface{
    createBONUSENTRY: BONUSENTRYCreateInterface;
    setCreateBONUSENTRY: Dispatch<SetStateAction<BONUSENTRYCreateInterface>>;
}


export default function CutoffAutoCompleteRight(props: CutoffAutoCompleteInterface) {
    const {setCreateBONUSENTRY, createBONUSENTRY} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.procedurals.CUTOFFPERIODView);
    const [cutoffsList, setCutoffsList] = useState<{cutoff: string, cutoff_code: number}[]>([])
    const [selectedCutoffId, setSelectedCutoffId] = useState<number | null>(null);
    useEffect(()=> {
        if(state.data?.length === 0 || !state.data){
            dispatch(CUTOFFPERIODViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedCutoffId){
            setCreateBONUSENTRY((prevState)=> {
                return(
                    {
                        ...prevState,
                        cutoff_code: selectedCutoffId
                    }
                )
            })
        }
    }, [selectedCutoffId])

    useEffect(() => {
        if (state.data) {
            setTimeout(() => {
                const updatedCutoffsList = 
                state.data?.map(({ co_name, id, payroll_group_code, division_code }) => {
                    return {
                        cutoff: `Pay Group: ${payroll_group_code} Div: ${division_code} ${co_name} - #: ${id}`,
                        cutoff_code: id,
                    };
                }) || [];
                setCutoffsList(updatedCutoffsList);
            }, 200);
        }
    }, [state.data]);

    const options = cutoffsList?.map((option) => {
        const firstLetter = option.cutoff[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const defaultOption = options?.find((option) => option.cutoff_code === createBONUSENTRY.cutoff_code)


    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingCutoff = cutoffsList.find(
        //   (cutoffItems) => cutoffItems.cutoff === newInputValue
        (cutoffItems) => cutoffItems.cutoff.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingCutoff) {
            setSelectedCutoffId(matchingCutoff.cutoff_code);
        } else {
          setSelectedCutoffId(null);
        // window.alert('No Matched Cutoff in the list is found. Create an cutoff entry first')
        }
    };

    const isOptionEqualToValue = (option: { cutoff: string; cutoff_code: number }, value: { cutoff: string; cutoff_code: number }) => {
        return option.cutoff_code === value.cutoff_code;
    };
    
    return (
        <>
        {defaultOption &&
            <Autocomplete
            // disableCloseOnSelect
            noOptionsText={'Loading... Please Wait.'}
            defaultValue={defaultOption}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.cutoff}
            onInputChange={handleInputChange}
            sx={{ width: "100%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="For Cutoff #:" />
                    )

                }

            }
            />
        }
        {!defaultOption &&
            <Autocomplete
            // disableCloseOnSelect
            noOptionsText={'Loading... Please Wait.'}
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.cutoff}
            onInputChange={handleInputChange}
            sx={{ width: "100%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="Loading Values..." />
                    )

                }

            }
            />
        }
        
        </>

    );
}