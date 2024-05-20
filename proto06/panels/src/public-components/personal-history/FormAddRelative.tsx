import { Button, FormControl, OutlinedInput } from "@mui/material";

interface Props {
    handleChangeField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitAdd: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormAddRelative({handleChangeField, handleSubmitAdd}:Props) {

    return (
        <form onSubmit={handleSubmitAdd} autoComplete="off" className='flex flex-wrap gap-4'>

            <FormControl>
                <OutlinedInput 
                    placeholder="First Name" 
                    name="firstName"
                    onChange={handleChangeField}
                    required
                />
            </FormControl>

            <FormControl>
                <OutlinedInput 
                    placeholder="Middle Name"
                    name="middleName"
                    onChange={handleChangeField}
                />
            </FormControl>

            <FormControl>
                <OutlinedInput 
                    placeholder="Last Name" 
                    name="lastName"
                    onChange={handleChangeField}
                    required
                />
            </FormControl>

            <FormControl>
                <OutlinedInput 
                    placeholder="Suffix" 
                    name="suffix"
                    onChange={handleChangeField}
                />
            </FormControl>

            <FormControl>
                <OutlinedInput 
                    placeholder="Relationship" 
                    name="relationship"
                    onChange={handleChangeField}
                    required
                />
            </FormControl>
            
            <Button type="submit">Add</Button>
        </form>
    )
}