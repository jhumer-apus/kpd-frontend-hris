import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Fragment } from "react";

interface Props {
    label: any
    propsInput:any
}
export default function InputField(props:Props) {
    const { label, propsInput } = props
    return (
        <Fragment>
            <FormControl className='w-full'>
                <InputLabel htmlFor={propsInput?.id || ""}>{label}</InputLabel>
                <OutlinedInput
                    // id="telephone"
                    // className='w-full'
                    // onChange={}
                    // name="telephone"
                    // label="Telephone #: (optional)"
                    // inputProps={{
                    //     maxLength:15,
                    //     minLength:11,
                    //     pattern: '^[0-9]+$'
                    // }}
                    // type='text'
                    {
                        ...propsInput
                    }

                />
            </FormControl>
        </Fragment>
    )
}