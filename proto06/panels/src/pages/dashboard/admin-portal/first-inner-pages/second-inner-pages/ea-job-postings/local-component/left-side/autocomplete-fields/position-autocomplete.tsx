import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { JOBPOSTINGSCreateInterface } from '@/types/types-employee-and-applicants';
import { POSITIONViewAction } from '@/store/actions/categories';


interface PositionAutoCompleteInterface{
    createJOBPOSTINGS: JOBPOSTINGSCreateInterface;
    setCreateJOBPOSTINGS: Dispatch<SetStateAction<JOBPOSTINGSCreateInterface>>;
}


export default function PositionAutoComplete(props: PositionAutoCompleteInterface) {
    const {setCreateJOBPOSTINGS, createJOBPOSTINGS} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.categories.POSITIONView);
    const [positionsList, setPositionsList] = useState<{position: string, id: number}[]>([])
    const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);
    useEffect(()=> {
        if(state.data?.length === 0){
            dispatch(POSITIONViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedPositionId){
            setCreateJOBPOSTINGS((prevState)=> {
                return(
                    {
                        ...prevState,
                        position_code: selectedPositionId
                    }
                )
            })
        }
    }, [selectedPositionId])

    useEffect(() => {
        if (state.data) {
            setTimeout(() => {
                const updatedPositionsList = 
                state.data?.map(({ id, pos_name }) => {
                    return {
                        position: `${pos_name}, - #${id}`,
                        id: id,
                    };
                }) || [];

                
                setPositionsList(updatedPositionsList);
            }, 1000);
        }
    }, [state.data]);

    const options = positionsList?.map((option) => {
        const firstLetter = option.position[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingPosition = positionsList.find(
        //   (positionItems) => positionItems.position === newInputValue
        (positionItems) => positionItems.position.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingPosition) {
            setSelectedPositionId(matchingPosition.id);
        } else {
          setSelectedPositionId(null);
        // window.alert('No Matched Position in the list is found. Create an position entry first')
        }
    };

    const isOptionEqualToValue = (option: { position: string; id: number }, value: { position: string; id: number }) => {
        return option.id === value.id;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        noOptionsText={'Loading... Please Wait.'}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.position}
        onInputChange={handleInputChange}
        sx={{ width: '100%' }}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => 
            {   
                return(
                    <TextField {...params} label="Position:" />
                )

            }

        }
        />
    );
}