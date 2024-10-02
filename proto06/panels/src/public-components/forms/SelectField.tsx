import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
    [key: string]: any;
    options: Option[]
}

type Option = {
    value: string,
    label: string | React.ReactNode,
}

export default function SelectField(props:Props) {

    const {options, className,  loading, ...selectProps} = props

    const renderMenuItems = () => {

        if(loading) {
            return (
                <MenuItem disabled className="flex gap-4">
                    <CircularProgress size={24} /> <p>Loading...</p>
                </MenuItem>
            )
        }
        else {
            return options.length > 0 
                ? options.map((option:Option) => (<MenuItem value={option.value}>{option.label}</MenuItem>))
                : <MenuItem value="" disabled>No Option</MenuItem>
        }
    }
    return (
        <FormControl className={className}>
            <InputLabel id={props?.id}>{selectProps?.label || ""}</InputLabel>
            <Select
                // labelId="blood-type"
                // id="blood-type"
                // label="Blood Type"
                // inputProps={{ readOnly: false }}
                {...selectProps}
            >
                {renderMenuItems()}
            </Select>
        </FormControl>
    )
}