import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Fragment } from "react";

export default function InputField(props:any) {
    return (
        <Fragment>
            <FormControl className={props?.className || ""}>
                <InputLabel htmlFor={props?.id || ""}>{props?.label}</InputLabel>
                <OutlinedInput
                    // className={className}
                    // // id="telephone"
                    // // className='w-full'
                    // // onChange={}
                    // // name="telephone"
                    // // label="Telephone #: (optional)"
                    // // inputProps={{
                    // //     maxLength:15,
                    // //     minLength:11,
                    // //     pattern: '^[0-9]+$'
                    // // }}
                    // // type='text'
                    // {
                    //     ...propsInput
                    // }
                    {...props}

                />
            </FormControl>
        </Fragment>
    )
}