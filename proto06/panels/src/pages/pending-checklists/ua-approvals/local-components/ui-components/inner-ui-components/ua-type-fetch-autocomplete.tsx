import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getEmployeesList } from '@/store/actions/employees';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { 
    UACreateInterface, 
    UATYPEViewInterface 
} from '@/types/types-pages';
import { UATYPEViewAction } from '@/store/actions/procedurals';


interface UATYPEFetchAutoCompleteInterface{
    createUA: UACreateInterface;
    setCreateUA: Dispatch<SetStateAction<UACreateInterface>>;
}


export default function UATYPEFetchAutoComplete(props: UATYPEFetchAutoCompleteInterface) {
    const {setCreateUA, createUA} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.procedurals.UATYPEView);
    const dataArray = state.data as UATYPEViewInterface[];
    const [UATYPEList, setUATYPEList] = useState<{UATYPE: string, UATYPE_id: number }[]>([])
    const [selectedUATYPEId, setSelectedUATYPEId] = useState<number | null>(null);
    useEffect(()=> {
        if(dataArray?.length === 0 || !dataArray ){
            dispatch(UATYPEViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedUATYPEId){
            setCreateUA((prevState)=> {
                return(
                    {
                        ...prevState,
                        leave_type: selectedUATYPEId
                    }
                )
            })
        }
    }, [selectedUATYPEId])

    useEffect(() => {
        if (dataArray) {
            setTimeout(() => {
                const updatedUATYPEList = 
                dataArray?.map(({ id, name, is_paid }) => {
                    return {
                        UATYPE: `${id} - ${name} [${is_paid ? 'Paid': 'Unpaid'}]`,
                        UATYPE_id: id,
                    };
                }) || [];
                setUATYPEList(updatedUATYPEList);
            }, 1000);
        }
    }, [dataArray]);

    const options = UATYPEList?.map((option) => {
        const firstLetter = option.UATYPE[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingUATYPE = UATYPEList.find(
        //   (employeeItems) => employeeItems.employee === newInputValue
        (UATYPEItems) => UATYPEItems.UATYPE.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingUATYPE) {
            setSelectedUATYPEId(matchingUATYPE.UATYPE_id);
        } else {
            setSelectedUATYPEId(null);
        // window.alert('No Matched Employee in the list is found. Create an employee entry first')
        }
    };

    const isOptionEqualToValue = (option: { UATYPE: string; UATYPE_id: number }, value: { UATYPE: string; UATYPE_id: number }) => {
        return option.UATYPE_id === value.UATYPE_id;
    };
    
    return (
        <Autocomplete
        // disableCloseOnSelect
        noOptionsText={'Loading... Please Wait.'}
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.UATYPE}
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