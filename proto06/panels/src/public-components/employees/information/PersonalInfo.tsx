import CityMunicipality from "@/public-components/forms/address/CityMunicipality";
import Province from "@/public-components/forms/address/Province";
import AutocompleteForm from "@/public-components/forms/AutoCompleteForm";
import { AccountCircle } from "@mui/icons-material";
import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function PersonalInfo() {

    const handleUpdateAddress = (name: string, newValue: any) => {
        console.log(name)
        console.log(newValue)
    }

    return (
        <div>
            <form className="flex flex-col gap-8">
                <div id="personal-details-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Personal Details</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <TextField 
                            label="First Name:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            label="Middle Name:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            label="Last Name:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            label="Suffix:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <FormControl className="w-full md:w-52">
                            <InputLabel id="civil-status">Civil Status</InputLabel>
                            <Select
                                labelId="civil-status"
                                id="civil-status"
                                // value={age}
                                label="Civil Status"
                                // onChange={handleChange}
                                inputProps={{ readOnly: false }}
                            >
                                <MenuItem value="S">Single</MenuItem>
                                <MenuItem value="M">Married</MenuItem>
                                <MenuItem value="W">Widowed</MenuItem>
                                <MenuItem value="A">Anulled</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className="w-full md:w-52">
                            <InputLabel id="sex">Sex</InputLabel>
                            <Select
                                labelId="sex"
                                id="sex"
                                // value={age}
                                label="Sex"
                                // onChange={handleChange}
                                inputProps={{ readOnly: false }}
                            >
                                <MenuItem value="M">Male</MenuItem>
                                <MenuItem value="F">Female</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className="w-full md:w-52">
                            <InputLabel id="blood-type">Blood Type</InputLabel>
                            <Select
                                labelId="blood-type"
                                id="blood-type"
                                // value={age}
                                label="Blood Type"
                                // onChange={handleChange}
                                inputProps={{ readOnly: false }}
                            >
                                <MenuItem value="A+">A+</MenuItem>
                                <MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="B+">B+</MenuItem>
                                <MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem>
                                <MenuItem value="AB-">AB-</MenuItem>
                                <MenuItem value="O+">O+</MenuItem>
                                <MenuItem value="O-">O-</MenuItem>
                                <MenuItem value=""><em>None</em></MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Birthdate" />
                        </LocalizationProvider>

                        <OutlinedInput
                            label="Mobile No:" 
                            className="w-56"
                            inputProps={{
                                minLength: 10,
                                readOnly: false,
                                startAdornment: (
                                    <InputAdornment position="start">
                                      +63
                                    </InputAdornment>
                                ),
                            }}
                            startAdornment ={ (
                                <InputAdornment position="start">
                                  +63
                                </InputAdornment>
                            )}
                        />

                        <TextField 
                            label="Birthplace:" 
                            variant="outlined"
                            className="w-full"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        
                        <div className="w-full md:w-fit">
                            <Typography variant="subtitle1" className="font-bold">Permanent Address</Typography><br></br>

                            <div id="permanent-address-wrapper" className="flex gap-8 flex-col md:flex-row w-full ">
                                <div id="address-wrapper" className="w-full md:w-52">
                                    <Province 
                                        updateAddress={handleUpdateAddress} 
                                        name="Province" 
                                        defaultProvinceId={null}
                                        isReadOnly={false}
                                    />
                                </div>
                                <div id="address-wrapper" className="w-full md:w-52">
                                    <CityMunicipality 
                                        updateAddress={handleUpdateAddress} 
                                        currentProvinceCode={""} 
                                        name="city"
                                        label="City/Municipality"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div id="Account Details">
                    <Typography variant="h6" component="h6" className="font-bold">Account Details</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <TextField 
                            label="Employee No:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        /> 
                        <TextField 
                            label="Username:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        /> 
                        <TextField 
                            label="Role:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            label="Account Email:" 
                            variant="outlined" 
                            InputProps={{
                                readOnly: true,
                            }}
                        /> 
                    </div>
                </div> */}
            </form>
        </div>
    )
}