import useFetchQuery from "@/custom-hooks/use-fetch-query";
import { APILink } from "@/store/configureStore";
import { Autocomplete, Button, FormControl, OutlinedInput, TextField, Typography } from "@mui/material";
import { convertCompilerOptionsFromJson } from "typescript";

interface Props {
    handleChangeField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitAdd: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormAddRelative({handleChangeField, handleSubmitAdd}:Props) {

    const {data:employees, status, error} = useFetchQuery(`${APILink}/employees/`, null)

    return (
        <>
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
                    isOptionEqualToValue={(option, value) => option?.emp_no == value?.emp_no}
                    onChange={(e: any, newValue: string | null) => {
                        handleChangeField({
                            ...e, 
                            target: {
                                ...e.target, 
                                name: "emp_no",
                                value: newValue?.emp_no
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
                    <OutlinedInput 
                        placeholder="Age"
                        type="number"
                        inputProps={{
                            min:"0"
                        }}
                        name="age"
                        onChange={handleChangeField}
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
        </>
    )
}