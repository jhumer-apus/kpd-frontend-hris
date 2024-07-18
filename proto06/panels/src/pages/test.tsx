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
        <input type="date" id="myDate" name="myDate" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" min="1900-01-01" max="9999-12-31" required></input>
        

    )
}