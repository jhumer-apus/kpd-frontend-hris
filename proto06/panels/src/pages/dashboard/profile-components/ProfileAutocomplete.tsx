
import * as React from 'react';
import {ChangeEvent} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Props {
    id:string,
    options: Option[],
    label: string,
    setState: any
    value?: string | number | null | undefined
    customKey: string
    disabled?: boolean
}

interface Option {
    id: number | string;
    name: string;
}
export default function ProfileAutocomplete(props: Props) {

    const { id, options, label, setState, value, customKey, disabled } = props

    const handleChange = (e: any, val: Option | null) => {
        setState((curr:any) => ({
            ...curr,
            [customKey]: val?.name

        }))
    }
    const selectedOption = value ? React.useMemo(() => options.find(option => option.id === value), options): null
    // const selectedOption = defaultValue ? options.find(option => option.id === defaultValue) : null;
    console.log(selectedOption)

    return (
      <Autocomplete
        className="w-full mb-4"
        disablePortal
        id={id}
        options={options}
        getOptionLabel={(option) => option.name}
        onChange={(handleChange)}
        defaultValue={selectedOption || null}
        renderInput={(params) => <TextField {...params} label={label} />}
        disabled={disabled}
      />
    );
  }