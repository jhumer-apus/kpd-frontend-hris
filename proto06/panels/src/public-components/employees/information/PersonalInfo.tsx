import { useOptionData } from "@/custom-hooks/use-option-data";
import CityMunicipality from "@/public-components/forms/address/CityMunicipality";
import Province from "@/public-components/forms/address/Province";
import AutocompleteForm from "@/public-components/forms/AutoCompleteForm";
import DatePickerField from "@/public-components/forms/DatePickerField";
import InputField from "@/public-components/forms/InputField";
import SelectField from "@/public-components/forms/SelectField";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { AccountCircle } from "@mui/icons-material";
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";

export default function PersonalInfo() {

    const {civilStatus, sex, bloodTypes} = useOptionData()

    
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
                        <InputField 
                            label="First Name:" 
                            variant="outlined" 
                            readOnly
                        />
                        <InputField 
                            label="Middle Name:" 
                            variant="outlined" 
                            readOnly
                        />
                        <InputField 
                            label="Last Name:" 
                            variant="outlined" 
                            readOnly
                        />
                        <InputField 
                            label="Suffix:" 
                            variant="outlined" 
                            readOnly
                        />

                        <SelectField 
                            className="w-full md:w-52"
                            labelId="Civil Status"
                            id="civil-status"
                            label="Civil Status"
                            inputProps={{ readOnly: false }} 
                            options={civilStatus} 
                        />


                        <SelectField 
                            className="w-full md:w-52"
                            labelId="sex"
                            id="sex"
                            label="Sex"
                            inputProps={{ readOnly: false }} 
                            options={sex} 
                        />

                        <SelectField
                            className="w-full md:w-52"
                            labelId="blood-type"
                            id="blood-type"
                            label="Blood Type"
                            inputProps={{ readOnly: false }} 
                            options={bloodTypes}                        
                        />

                        <DatePickerField label="Birthdate"/>

                        <InputField 
                            id='mobile-no'
                            label="Mobile No:"
                            startAdornment={(
                                <InputAdornment position="start">
                                    +63
                                </InputAdornment>
                            )}
                            maxLength="10"
                            minLength="10"
                            pattern='^[0-9]+$'                     
                        />

                        <InputField 
                            id='emergency-contact-no'
                            label="Emergency Contact No:"
                            startAdornment={(
                                <InputAdornment position="start">
                                    +63
                                </InputAdornment>
                            )}
                            maxLength="10"
                            minLength="10"
                            pattern='^[0-9]+$'                     
                        />

                        <InputField 
                            id='emergency-contact-person'
                            label="Emergency Contact Person:"                   
                        />

                        <InputField 
                            id='licensed-no'
                            label="License No:"                   
                        />

                        <InputField 
                            label="Birthplace:" 
                            variant="outlined"
                            className="w-full"
                            readOnly
                        />
                        
                        
                        <div className="w-full">
                            <Typography variant="subtitle1" className="font-bold">Permanent Address</Typography><br></br>
                            <div id="permanent-address-wrapper" className="flex gap-8 flex-col md:flex-row w-full">
                                <div className="w-full md:w-80">
                                    <Province 
                                        updateAddress={handleUpdateAddress} 
                                        name="Province" 
                                        defaultProvinceId={null}
                                        isReadOnly={false}
                                    />
                                </div>
                                <div className="w-full md:w-80">
                                    <CityMunicipality 
                                        updateAddress={handleUpdateAddress} 
                                        currentProvinceCode={""} 
                                        name="city"
                                        label="City/Municipality"
                                    />
                                </div>
                                <div className="w-full">
                                    <InputField 
                                        label="Street Address:" 
                                        variant="outlined"
                                        className="w-full"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <Typography variant="subtitle1" className="font-bold">Current Address</Typography><br></br>
                            <div id="permanent-address-wrapper" className="flex gap-8 flex-col md:flex-row w-full">
                                <div className="w-full md:w-80">
                                    <Province 
                                        updateAddress={handleUpdateAddress} 
                                        name="Province" 
                                        defaultProvinceId={null}
                                        isReadOnly={false}
                                    />
                                </div>
                                <div className="w-full md:w-80">
                                    <CityMunicipality 
                                        updateAddress={handleUpdateAddress} 
                                        currentProvinceCode={""} 
                                        name="city"
                                        label="City/Municipality"
                                    />
                                </div>
                                <div className="w-full">
                                    <InputField 
                                        label="Street Address:" 
                                        variant="outlined"
                                        className="w-full"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <InputField 
                            label="URL Google Map:" 
                            variant="outlined"
                            className="w-full"
                            endAdornment={(
                                <InputAdornment position="end">
                                    <a 
                                        href="https://www.facebook.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <MapPinIcon className="text-gray-500 w-10 cursor-pointer hover:text-indigo-900" />
                                    </a>
                                </InputAdornment>
                            )}
                            readOnly
                        />
                    </div>
                </div>

                <div id="other-details">
                    <Typography variant="h6" component="h6" className="font-bold">Other Details</Typography><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <InputField 
                            label="Profession:" 
                            variant="outlined"
                            className="w-full"
                            readOnly
                        /> 
                        <InputField 
                            label="School Graduated:" 
                            variant="outlined"
                            className="w-full"
                            readOnly
                        /> 
                    </div>
                </div>
            </form>
        </div>
    )
}