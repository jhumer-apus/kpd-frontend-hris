import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { SCHEDULEDAILYEditInterface, SCHEDULESHIFTViewInterface } from '@/types/types-pages';
import { SCHEDULESHIFTViewAction } from '@/store/actions/procedurals';
import dayjs from 'dayjs';


interface SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYEditPageInterface{
    createSCHEDULEDAILYEdit: SCHEDULEDAILYEditInterface;
    setSCHEDULEDAILYEdit: Dispatch<SetStateAction<SCHEDULEDAILYEditInterface>>;
}


export default function SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYEditPage(props: SCHEDULESHIFTFetchAutoCompleteOnSCHEDULEDAILYEditPageInterface) {
    const {setSCHEDULEDAILYEdit, createSCHEDULEDAILYEdit} = props;
    const dispatch = useDispatch();
    const state = useSelector((state:RootState)=> state.procedurals.SCHEDULESHIFTView);
    const dataArray = state.data as SCHEDULESHIFTViewInterface[];
    const [SCHEDULESHIFTList, setSCHEDULESHIFTList] = useState<{SCHEDULESHIFT: string, SCHEDULESHIFT_id: number }[]>([])
    const [selectedSCHEDULESHIFTId, setSelectedSCHEDULESHIFTId] = useState<number | null>(null);
    useEffect(()=> {
        if(dataArray?.length === 0 || !dataArray ){
            dispatch(SCHEDULESHIFTViewAction());
        }
    }, []);

    useEffect(()=> {
        if(selectedSCHEDULESHIFTId){
            setSCHEDULEDAILYEdit((prevState)=> {
                return(
                    {
                        ...prevState,
                        schedule_shift_code: selectedSCHEDULESHIFTId
                    }
                )
            })
        }
    }, [selectedSCHEDULESHIFTId])

    useEffect(() => {
        if (dataArray) {
            setTimeout(() => {
                const updatedSCHEDULESHIFTList = 
                dataArray?.map(({ id, name, time_in, time_out }) => {
                    return {
                        SCHEDULESHIFT: `${id} - ${name} [${dayjs(time_in, "HH:mm:ss").format("hh:mm a")} - ${dayjs(time_out, "HH:mm:ss").format("hh:mm a")}]`,
                        SCHEDULESHIFT_id: id ?? NaN,
                    };
                });
                setSCHEDULESHIFTList(updatedSCHEDULESHIFTList);
            }, 1000);
        }
    }, [dataArray]);

    const options = SCHEDULESHIFTList?.map((option) => {
        const firstLetter = option.SCHEDULESHIFT[0].toUpperCase();
        return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
        };
    });
    const defaultOption = options?.find((option) => option.SCHEDULESHIFT_id === createSCHEDULEDAILYEdit.schedule_shift_code)
    
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        const matchingSCHEDULESHIFT = SCHEDULESHIFTList.find(
        //   (employeeItems) => employeeItems.employee === newInputValue
        (SCHEDULESHIFTItems) => SCHEDULESHIFTItems.SCHEDULESHIFT.toLowerCase().includes(newInputValue.toLowerCase())
        );
        if (matchingSCHEDULESHIFT) {
            setSelectedSCHEDULESHIFTId(matchingSCHEDULESHIFT.SCHEDULESHIFT_id);
        } else {
            setSelectedSCHEDULESHIFTId(null);
        }
    };

    const isOptionEqualToValue = (option: { SCHEDULESHIFT: string; SCHEDULESHIFT_id: number }, value: { SCHEDULESHIFT: string; SCHEDULESHIFT_id: number }) => {
        return option.SCHEDULESHIFT_id === value.SCHEDULESHIFT_id;
    };
    
    return (
        <>
            {defaultOption &&
                <Autocomplete
                // disableCloseOnSelect
                noOptionsText={'Loading... Please Wait.'}
                options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.SCHEDULESHIFT}
                defaultValue={defaultOption}
                onInputChange={handleInputChange}
                sx={{ width: '100%' }}
                isOptionEqualToValue={isOptionEqualToValue}
                renderInput={(params) => 
                    {   
                        return(
                            <TextField {...params} label="Schedule Shift" />
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
                getOptionLabel={(option) => option.SCHEDULESHIFT}
                // options={["Loading"]}
                // defaultValue={"Loading"}
                onInputChange={handleInputChange}
                sx={{ width: '100%' }}
                isOptionEqualToValue={isOptionEqualToValue}
                renderInput={(params) => 
                    {   
                        return(
                            <TextField {...params} label={(!defaultOption && !!createSCHEDULEDAILYEdit.schedule_shift_code) ? `Loading Values...` : `No Schedule Assigned (Choose if assigning)`} />
                        )
        
                    }
        
                }
                />
            }
        </>

    );
}