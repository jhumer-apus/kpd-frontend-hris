import useFetchQuery from "@/custom-hooks/use-fetch-query";
import { APILink } from "@/store/configureStore";
import { Autocomplete, Button, FormControl, OutlinedInput, TextField, Typography } from "@mui/material";
import { convertCompilerOptionsFromJson } from "typescript";
import DatePickerForm from "../forms/DatePickerForm";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Fragment } from "react";

interface Props {
    handleChangeField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitAdd: (event: React.FormEvent<HTMLFormElement>) => void;
    setRelative: any;
}

export default function FormAddRelative(props:Props) {

    const {handleChangeField, handleSubmitAdd, setRelative} = props

    const {data:employees, status, error} = useFetchQuery(`${APILink}employees/`, null)

    return (
        <Fragment>
            <Typography variant="h6">Add New Relative</Typography><br></br>
            <form onSubmit={handleSubmitAdd} autoComplete="off" className="flex flex-col gap-4">
                <Autocomplete
                    disablePortal
                    id="emp_no"
                    options={Array.isArray(employees)? employees: []}
                    sx={{ width: 'full' }}
                    getOptionLabel={(option:any) => `${option? option?.emp_no + ' - ' + option?.emp_full_name: ''}`}
                    loading={status == 'loading'}
                    renderInput={(params) => <TextField {...params} label="Employee" />}
                    // isOptionEqualToValue={(option, value) => option?.id == value?.id}
                    onChange={(e: any, newValue: any) => {
                        handleChangeField({
                            ...e, 
                            target: {
                                ...e.target, 
                                name: "emp_no",
                                value: newValue?.emp_no ?? ""
                            }
                        })
                    }}
                />
                <FormControl
                    className='w-full'
                >
                    <OutlinedInput 
                        placeholder="First Name" 
                        name="firstName"
                        onChange={handleChangeField}
                        required
                    />
                </FormControl>

                <FormControl
                    className='w-full'
                >
                    <OutlinedInput 
                        placeholder="Middle Name"
                        name="middleName"
                        onChange={handleChangeField}
                    />
                </FormControl>

                <FormControl
                    className='w-full'
                >
                    <OutlinedInput 
                        placeholder="Last Name" 
                        name="lastName"
                        onChange={handleChangeField}
                        required
                    />
                </FormControl>

                <FormControl
                    className='w-full'
                >
                    <OutlinedInput 
                        placeholder="Suffix" 
                        name="suffix"
                        onChange={handleChangeField}
                    />
                </FormControl>

                <FormControl
                    className='w-full'
                >
                    <DatePickerForm 
                        label="Birth Date"
                        setState={setRelative} 
                        customKey="birthday"
                    />
                </FormControl>

                <FormControl
                    className='w-full'
                >
                    <OutlinedInput 
                        placeholder="Relationship" 
                        name="relationship"
                        onChange={handleChangeField}
                        required
                    />
                </FormControl>
                
                <Button  variant="outlined" type="submit">Add</Button>
            </form>
        </Fragment>
    )
}