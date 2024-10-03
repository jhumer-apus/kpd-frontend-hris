import { useOptionData } from "@/custom-hooks/use-option-data";
import CityMunicipality from "@/public-components/forms/address/CityMunicipality";
import Province from "@/public-components/forms/address/Province";
import AutocompleteForm from "@/public-components/forms/AutoCompleteForm";
import DatePickerField from "@/public-components/forms/DatePickerField";
import InputField from "@/public-components/forms/InputField";
import SelectField from "@/public-components/forms/SelectField";
import { RootState } from "@/store/configureStore";
import { CloudArrowUpIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { AccountCircle } from "@mui/icons-material";
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface Props {
    employeeData: any
}

export default function PersonalInfo(props: Props) {

    const { employeeData } = props
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const [personalInfo, setPersonalInfo] = useState<any>(
        {
            employee_image: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            suffix: "",
            birthday: "",
            birth_place: "",
            civil_status: "",
            gender: "",
            mobile_phone: "",
            blood_type: "",
            graduated_school: "",
            profession: "",
            license_no: "",
            emergency_contact_person: "",
            emergency_contact_number: "",
            other_duties_responsibilities: "",
            date_hired: "",
            date_separation: "",
            separation_type: "",
            approver1: "",
            approver2: "",
            // permanent_province_code: "",
            // permanent_city_code: "",
            // permanent_address: "",
            // current_province_code: "",
            // current_city_code: "",
            current_address: "",
            branch_code: "",
            department_code: "",
            position_code: "",
            rank_code: "",
            employment_status: "",
            url_google_map: "",
            employee_type: "",
            added_by: currUser?.emp_no,
            permanent: {
                id: "",
                name: "",
                code: ""
            },
            current: {
                id: "",
                name: "",
                code: ""
            }
        }
    )
    const [isEdit, setIsEdit] = useState<boolean>(false)
    
    const {civilStatus, sex, bloodTypes} = useOptionData()

    useEffect(()=> {
        setPersonalInfo((curr:any) => (
            {
                employee_image: employeeData?.employee_image || "",
                first_name: employeeData?.first_name || "",
                middle_name: employeeData?.middle_name || "",
                last_name: employeeData?.last_name || "",
                suffix: employeeData?.suffix || "",
                birthday: employeeData?.birthday? dayjs(employeeData?.birthday).format('YYYY-MM-DDThh:mm:ss') : "",
                birth_place: employeeData?.birth_place || "",
                civil_status: employeeData?.civil_status || "",
                gender: employeeData?.gender || "",
                mobile_phone: employeeData?.mobile_phone || "",
                blood_type: employeeData?.blood_type || "",
                graduated_school: employeeData?.graduated_school || "",
                profession: employeeData?.profession || "",
                license_no: employeeData?.license_no || "",
                emergency_contact_person: employeeData?.emergency_contact_person || "",
                emergency_contact_number: employeeData?.emergency_contact_number || "",
                other_duties_responsibilities: employeeData?.other_duties_responsibilities || "",
                date_hired: employeeData?.date_hired ? dayjs(employeeData?.date_hired).format('YYYY-MM-DDThh:mm:ss'): "",
                date_separation: employeeData?.date_separation ? dayjs(employeeData?.date_separation).format('YYYY-MM-DDThh:mm:ss'): "",
                separation_type: employeeData?.separation_type || "",
                approver1: employeeData?.approver1 || "",
                approver2: employeeData?.approver2 || "",
                permanent_province_code: employeeData?.permanent_province_code || "",
                permanent_city_code: employeeData?.permanent_city_code || "",
                permanent_address: employeeData?.permanent_address || "",
                current_province_code: employeeData?.current_province?.id || "",
                current_city_code: employeeData?.current_city_code || "",
                current_address: employeeData?.current_address || "",
                branch_code: employeeData?.branch_code || "",
                department_code: employeeData?.department_code || "",
                position_code: employeeData?.position_code || "",
                rank_code: employeeData?.rank_code || "",
                employment_status: employeeData?.employment_status || "",
                url_google_map: employeeData?.url_google_map || "",
                employee_type: employeeData?.employee_type || "",
                added_by: currUser?.emp_no
            }
        ))
    },[employeeData])

    useEffect(() => {
        console.table(personalInfo)
    }, [personalInfo])

    const handleUpdateAddress = (name: string, newValue: any) => {
        console.log(name)
        console.log(newValue)
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setPersonalInfo((prevState:any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (name:string, newValue: Dayjs | null) => {

        setPersonalInfo((curr:any) => (
            {
                ...curr,
                [name]: newValue
            }
        ))

    };
    

    return (
        <div>
            <form className="flex flex-col gap-8">
                <div id="personal-details-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Personal Details</Typography><br></br>
                    <div id='profile-pic-wrapper' className="w-fit">
                        <img src="" width={150} height={150} className="border-gray-200 border-2 rounded-full m-auto" alt="profile picture"/><br></br>
                        <label className="bg-indigo-900 text-white cursor-pointer">
                            <input type="file" className="hidden"/>
                            <div className="bg-indigo-900 flex gap-2 p-2 w-fit rounded-lg">Update Profile Picture <CloudArrowUpIcon className="h-6 w-6" /></div>
                        </label>
                    </div><br></br>
                    <div className="flex gap-8 flex-col md:flex-wrap md:flex-row">
                        <InputField 
                            label="First Name:"
                            name="first_name"
                            variant="outlined"
                            value={personalInfo.first_name}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />
                        <InputField 
                            label="Middle Name:"
                            name="middle_name"
                            variant="outlined"
                            value={personalInfo.middle_name}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />
                        <InputField 
                            label="Last Name:" 
                            variant="outlined"
                            name="last_name" 
                            value={personalInfo.last_name}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />
                        <InputField 
                            label="Suffix:" 
                            variant="outlined"
                            name="suffix"
                            value={personalInfo.suffix}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />

                        <SelectField 
                            className="w-full md:w-52"
                            labelId="Civil Status"
                            id="civil-status"
                            label="Civil Status" 
                            options={civilStatus} 
                            name="civil_status"
                            value={personalInfo.civil_status}
                            onChange={handleValueChange}
                            disabled={!isEdit}
                        />


                        <SelectField 
                            className="w-full md:w-52"
                            labelId="sex"
                            id="sex"
                            label="Sex"
                            options={sex} 
                            name="gender"
                            value={personalInfo.gender}
                            disabled={!isEdit}
                            onChange={handleValueChange}
                        />

                        <SelectField
                            className="w-full md:w-52"
                            labelId="blood-type"
                            id="blood-type"
                            label="Blood Type"
                            options={bloodTypes}
                            name="blood_type"
                            value={personalInfo.blood_type}
                            disabled={!isEdit}
                            onChange={handleValueChange}                        
                        />

                        <DatePickerField 
                            label="Birthdate"
                            name="birthday"
                            onChange={(newValue: Dayjs | null) => handleDateChange("birthday", newValue)}
                            value={personalInfo.birthday? dayjs(personalInfo.birthday): null}
                            disabled={!isEdit}
                        />

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
                            name="mobile_phone"
                            value={personalInfo.mobile_phone}
                            onChange={handleValueChange}
                            readOnly={!isEdit}                 
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
                            name="emergency_contact_number"
                            value={personalInfo.emergency_contact_number}
                            onChange={handleValueChange}          
                            readOnly={!isEdit}         
                        />

                        <InputField 
                            id='emergency-contact-person'
                            label="Emergency Contact Person:"
                            name="emergency_contact_person"
                            value={personalInfo.emergency_contact_person}
                            readOnly={!isEdit}            
                        />

                        <InputField 
                            id='licensed-no'
                            label="License No:"
                            name="license_no"
                            value={personalInfo.license_no}             
                            onChange={handleValueChange}
                            readOnly={!isEdit}              
                        />

                        <InputField 
                            label="Birthplace:" 
                            variant="outlined"
                            className="w-full"
                            name="birth_place"
                            value={personalInfo.birth_place}             
                            onChange={handleValueChange}
                            readOnly={!isEdit}
                        />
                        
                        
                        <div className="w-full">
                            <Typography variant="subtitle1" className="font-bold">Permanent Address</Typography><br></br>
                            <div id="permanent-address-wrapper" className="flex gap-8 flex-col md:flex-row w-full">
                                <div className="w-full md:w-80">
                                    <Province 
                                        updateAddress={handleUpdateAddress} 
                                        name="Province" 
                                        defaultProvinceId={null}
                                        isReadOnly={!isEdit}
                                    />
                                </div>
                                <div className="w-full md:w-80">
                                    <CityMunicipality 
                                        updateAddress={handleUpdateAddress} 
                                        currentProvinceCode={""} 
                                        name="city"
                                        label="City/Municipality"
                                        isReadOnly={!isEdit}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputField 
                                        label="Street Address:" 
                                        variant="outlined"
                                        className="w-full"
                                        value={personalInfo.permanent_address}
                                        name="permanent_address"
                                        onChange={handleValueChange}
                                        readOnly={!isEdit}
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
                                        isReadOnly={!isEdit}
                                    />
                                </div>
                                <div className="w-full md:w-80">
                                    <CityMunicipality 
                                        updateAddress={handleUpdateAddress} 
                                        currentProvinceCode={""} 
                                        name="city"
                                        label="City/Municipality"
                                        isReadOnly={!isEdit}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputField 
                                        label="Street Address:" 
                                        variant="outlined"
                                        className="w-full"
                                        name="current_address"
                                        value={personalInfo.current_address}
                                        onChange={handleValueChange}
                                        readOnly={!isEdit}
                                    />
                                </div>
                            </div>
                        </div>

                        <InputField 
                            label="URL Google Map:" 
                            variant="outlined"
                            className="w-full"
                            name="url_google_map"
                            value={personalInfo.url_google_map}
                            endAdornment={(
                                <InputAdornment position="end">
                                    <a 
                                        href={personalInfo?.url_google_map} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <MapPinIcon className="text-gray-500 w-10 cursor-pointer hover:text-indigo-900" />
                                    </a>
                                </InputAdornment>
                            )}
                            onChange={handleValueChange}
                            readOnly={!isEdit}
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
                            name="profession"
                            onChange={handleValueChange}
                            value={personalInfo.profession}
                            readOnly={!isEdit}
                        /> 
                        <InputField 
                            label="School Graduated:" 
                            variant="outlined"
                            className="w-full"
                            name="graduated_school"
                            onChange={handleValueChange}
                            value={personalInfo.graduated_school}
                            readOnly={!isEdit}
                        /> 
                    </div>
                </div>

                {isEdit 
                    ?   <div className="w-full flex gap-4">
                            <Button 
                                onClick={() => setIsEdit(curr => false)}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    p: 2
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="contained" 
                                type="submit"
                                sx={{
                                    width: "100%",
                                    p: 2
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    
                    :   <div>
                            <Button 
                                onClick={() => setIsEdit(curr => true)}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    p: 2
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                }
            </form>
        </div>
    )
}