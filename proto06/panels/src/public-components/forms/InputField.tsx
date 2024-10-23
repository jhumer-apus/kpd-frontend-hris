import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Fragment } from "react";

export default function InputField(props:any) {
    const {shrink = true} = props
    return (
        <Fragment>
            <FormControl 
                className={props?.className || ""}
            >
                <InputLabel 
                    htmlFor={props?.id || ""}
                    shrink={shrink}
                >
                    {props?.label}
                </InputLabel>
                <OutlinedInput
                    {...props}
                />
            </FormControl>
        </Fragment>
    )
}