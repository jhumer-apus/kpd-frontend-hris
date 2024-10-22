import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DatePickerField(props:any) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker {...props}/>
        </LocalizationProvider>
    )
}