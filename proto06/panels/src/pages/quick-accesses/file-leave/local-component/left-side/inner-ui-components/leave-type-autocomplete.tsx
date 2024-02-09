import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { LEAVECreateInterface, LEAVETYPEViewInterface } from '@/types/types-pages';
import { LEAVETYPEViewAction } from '@/store/actions/procedurals';


interface LEAVETYPEFetchAutoCompleteInterface{
    createLEAVE: LEAVECreateInterface;
    setCreateLEAVE: Dispatch<SetStateAction<LEAVECreateInterface>>;
}


export default function LEAVETYPEFetchAutoComplete(props: LEAVETYPEFetchAutoCompleteInterface) {
    const {setCreateLEAVE, createLEAVE} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.procedurals.LEAVETYPEView);
    const dataArray = state.data as LEAVETYPEViewInterface[];
    const [LEAVETYPEList, setLEAVETYPEList] = useState<{LEAVETYPE: string, LEAVETYPE_id: number }[]>([])
    const [selectedLEAVETYPEId, setSelectedLEAVETYPEId] = useState<number | null>(null);
    useEffect(()=> {
        if(dataArray?.length === 0 || !dataArray ){
            dispatch(LEAVETYPEViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedLEAVETYPEId){
            setCreateLEAVE((prevState)=> {
                return(
                    {
                        ...prevState,
                        leave_type: selectedLEAVETYPEId
                    }
                )
            })
        }
    }, [selectedLEAVETYPEId])

    useEffect(() => {
        if (dataArray) {
            setTimeout(() => {
                const updatedLEAVETYPEList = 
                dataArray?.map(({ id, name, is_paid }) => {
                    return {
                        LEAVETYPE: `${id} - ${name} [${is_paid ? 'Paid': 'Unpaid'}]`,
                        LEAVETYPE_id: id ?? NaN,
                    };
                });
                setLEAVETYPEList(updatedLEAVETYPEList);
            }, 1000);
        }
    }, [dataArray]);

    const options = LEAVETYPEList?.map((option) => {
        const firstLetter = option.LEAVETYPE[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingLEAVETYPE = LEAVETYPEList.find(
        //   (employeeItems) => employeeItems.employee === newInputValue
        (LEAVETYPEItems) => LEAVETYPEItems.LEAVETYPE.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingLEAVETYPE) {
            setSelectedLEAVETYPEId(matchingLEAVETYPE.LEAVETYPE_id);
        } else {
            setSelectedLEAVETYPEId(null);
        // window.alert('No Matched Employee in the list is found. Create an employee entry first')
        }
    };

    const isOptionEqualToValue = (option: { LEAVETYPE: string; LEAVETYPE_id: number }, value: { LEAVETYPE: string; LEAVETYPE_id: number }) => {
        return option.LEAVETYPE_id === value.LEAVETYPE_id;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        noOptionsText={'Loading... Please Wait.'}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.LEAVETYPE}
        onInputChange={handleInputChange}
        sx={{ width: 300 }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Leave Types" />
                )

            }

        }
        />
    );
}