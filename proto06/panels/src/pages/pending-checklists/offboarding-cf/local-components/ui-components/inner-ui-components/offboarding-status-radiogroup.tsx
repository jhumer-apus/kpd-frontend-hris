import { EMP_OFFBOARD_REQS_Interface, OFFBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Dispatch, SetStateAction } from 'react';




interface OFFBOARDINGSTATUSTypeAutoCompleteInterface{
    initialValue: EMP_OFFBOARD_REQS_Interface;
    itemIndex: number;
    disabled: boolean;
    setDisabled: Dispatch<SetStateAction<boolean>>;
    setInitialValue: (index: number, field_get: string, value: string) => void;
}




export default function OFFBOARDINGSTATUSTypeAutoComplete(props: OFFBOARDINGSTATUSTypeAutoCompleteInterface) {
    const { initialValue, setInitialValue, itemIndex, disabled, setDisabled } = props;
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue= event.target.value;
        setInitialValue(itemIndex, "status", newValue)
    };

    return (
        <FormControl>
        <FormLabel id="_onboarding_status">Status</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={initialValue?.status}
            onChange={handleInputChange}

        >
          <FormControlLabel disabled={!disabled} value="Pending" control={<Radio />} label="Pending" />
          <FormControlLabel disabled={!disabled} value="Completed" control={<Radio />} label="Completed" />
        </RadioGroup>
      </FormControl>
    );
}



