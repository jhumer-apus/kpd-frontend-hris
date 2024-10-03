import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Fragment } from "react";

export default function InputField(props:any) {
    return (
        <Fragment>
            <FormControl className={props?.className || ""}>
                <InputLabel htmlFor={props?.id || ""}>{props?.label}</InputLabel>
                <OutlinedInput
                    {...props}
                />
            </FormControl>
        </Fragment>
    )
}