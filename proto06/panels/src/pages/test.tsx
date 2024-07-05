import { Autocomplete, Button, FormControl, FormHelperText, TextField } from "@mui/material";


export default function Test() {

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
    ];

    const submit = (e:any) => {
        e.preventDefault()
    }
    return (
        <form onSubmit={submit}>
            <FormControl required>
                {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" /> */}

                {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                /> */}
                <FormHelperText 
                    required
                    id="my-helper-text"
                >
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Movie" />}
                    />
                </FormHelperText>
                <Button type="submit">Submit</Button>
        </FormControl>
        </form>
        

    )
}