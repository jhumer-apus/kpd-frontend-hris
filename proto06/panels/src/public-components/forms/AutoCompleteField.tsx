import { Autocomplete, AutocompleteRenderInputParams, CircularProgress, TextField } from "@mui/material";
import { Fragment, ReactNode } from "react";

interface Props {
    id: string | undefined
    options: any[],
    label: string | null
    getOptionLabel: (option:any) => string
    handleChange: (key:string, newValue: string | null) => void
    value: number | null
    disabled: boolean
    loading: boolean
    optionNameKey: string
    stateKey: string
    [key: string]: any;

}
export default function AutocompleteField(props: Props) {

    const { optionNameKey, loading, handleChange, options, value, label, stateKey, ...restProps } = props

    const categorizeOptions = options.map((option) => {
        const firstLetter = option[optionNameKey][0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });

    const isOptionEqualToValue = (option: any, value: any) => option.id == value.id
    const findValue = options.find(option => option.id == value) ?? ""

    return (
        <Autocomplete
            {...restProps}
            options={categorizeOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            onChange={(e:any, newValue: string | null) => handleChange(stateKey, newValue)}
            isOptionEqualToValue={isOptionEqualToValue}
            value={findValue}
            renderInput={(params) => (
                <TextField
                    name="test"
                    {...params}
                    label={label}
                    InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </Fragment>
                        ),
                    }}
                />
            )}
        />
      );
}