import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { EMP_ONBOARD_REQS_Interface, ONBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';

interface ONBOARDINGSTATUSTypeAutoCompleteInterface{
    createONBOARDINGSTATUS: EMP_ONBOARD_REQS_Interface;
    itemIndex: number;
    setCreateONBOARDINGSTATUS: (index: number, field_get: string, value: string) => void;
}




export default function ONBOARDINGSTATUSTypeAutoComplete(props: ONBOARDINGSTATUSTypeAutoCompleteInterface) {
    const { createONBOARDINGSTATUS, setCreateONBOARDINGSTATUS, itemIndex } = props;
    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, newInputValue: string | null) => {
        const newValue= event.currentTarget.innerHTML;
        setCreateONBOARDINGSTATUS(itemIndex, "status", newValue)
    };

    return (
        <Autocomplete
            value={createONBOARDINGSTATUS?.status}
            onChange={handleInputChange}
            disablePortal
            id="combo-box-demo"
            options={ONBOARDINGSTATUSTypeOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
        />
    );
}

const ONBOARDINGSTATUSTypeOptions = [
    'Pending',
    'Completed'
]






