import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { ReactNode } from "react";

interface Props {
    id: string | undefined
    options: any[],
    label: string | null
    getOptionLabel: (option:any) => string
    handleChange: (e:any, newValue: string | null) => void
    optionTitle: string
    defaultValueId: number | null

}
export default function AutocompleteForm(props: Props) {

    const { id, label, options, getOptionLabel, handleChange, optionTitle, defaultValueId} = props

    const categorizeOptions = options.map((option) => {
        const firstLetter = option[optionTitle][0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });

    const isOptionEqualToValue = (option: any, value: any) => option.id == value.id
    const findValue = options.find(option => option.id == defaultValueId) ?? ""
    return (
        <Autocomplete
            id={id}
            options={categorizeOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => getOptionLabel(option)}
            onChange={(e:any, newValue: string | null) => handleChange(e, newValue)}
            className="w-full"
            renderInput={(params) => <TextField {...params} label={label || ""} />}
            isOptionEqualToValue={isOptionEqualToValue}
            value={findValue}
        />
      );
}