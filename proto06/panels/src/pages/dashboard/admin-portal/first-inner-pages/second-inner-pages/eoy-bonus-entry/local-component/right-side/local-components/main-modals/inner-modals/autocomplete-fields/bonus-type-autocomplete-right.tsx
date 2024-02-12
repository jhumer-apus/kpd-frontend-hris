import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';

import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { BONUSENTRYCreateInterface } from '@/types/types-payroll-eoy';
import { CUTOFFPERIODViewAction } from '@/store/actions/procedurals';
import { BONUSLISTViewAction } from '@/store/actions/payroll-eoy';


interface BonusListAutoCompleteInterface{
    createBONUSENTRY: BONUSENTRYCreateInterface;
    setCreateBONUSENTRY: Dispatch<SetStateAction<BONUSENTRYCreateInterface>>;
}


export default function BonusListAutoCompleteRight(props: BonusListAutoCompleteInterface) {
    const {setCreateBONUSENTRY, createBONUSENTRY} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.payrollEOY.BONUSLISTView);
    const [bonusList, setBonusListsList] = useState<{bonus: string, bonus_code: number}[]>([])
    const [selectedBonusListId, setSelectedBonusListId] = useState<number | null>(null);
    useEffect(()=> {
        if(state.data?.length === 0 || !state.data){
            dispatch(BONUSLISTViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedBonusListId){
            setCreateBONUSENTRY((prevState)=> {
                return(
                    {
                        ...prevState,
                        bonus_code: selectedBonusListId
                    }
                )
            })
        }
    }, [selectedBonusListId])

    useEffect(() => {
        if (state.data) {
            setTimeout(() => {
                const updatedBonusListsList = 
                state.data?.map(({ id, name, amount }) => {
                    return {
                        bonus: `Amount: ₱${amount} - ${name} - #${id}`,
                        bonus_code: id,
                    };
                }) || [];
                setBonusListsList(updatedBonusListsList);
            }, 200);
        }
    }, [state.data]);

    const options = bonusList?.map((option) => {
        const firstLetter = option.bonus[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });

    const defaultOption = options?.find((option) => option.bonus_code === createBONUSENTRY.bonus_code)

    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingBonusList = bonusList.find(
        //   (bonusItems) => bonusItems.bonus === newInputValue
        (bonusItems) => bonusItems.bonus.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingBonusList) {
            setSelectedBonusListId(matchingBonusList.bonus_code);
        } else {
          setSelectedBonusListId(null);
        // window.alert('No Matched BonusList in the list is found. Create an bonus entry first')
        }
    };

    const isOptionEqualToValue = (option: { bonus: string; bonus_code: number }, value: { bonus: string; bonus_code: number }) => {
        return option.bonus_code === value.bonus_code;
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
            getOptionLabel={(option) => option.bonus}
            onInputChange={handleInputChange}
            sx={{ width: "100%" }}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => 
                {   
                    return(
                        <TextField {...params} label="For BonusList #:" />
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
            getOptionLabel={(option) => option.bonus}
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