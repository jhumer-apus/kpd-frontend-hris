import { useOptionData } from "@/custom-hooks/use-option-data";
import AutocompleteForm from "@/public-components/forms/AutoCompleteForm";
import DatePickerField from "@/public-components/forms/DatePickerField";
import InputField from "@/public-components/forms/InputField";
import SelectField from "@/public-components/forms/SelectField";
import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect } from "react";

export default function EmploymentInfo() {

    const { 
        positions, 
        branches,
        departments,
        ranks,
        employmentStatus,
        separationType,
        employeeType,
        approvers,
        fetchDepartments,  
        fetchPositions, 
        fetchBranches,
        fetchRanks,
        fetchEmploymentStatus,
        fetchApprovers,
    } = useOptionData()

    useEffect(() => {
        fetchPositions()
        fetchBranches()
        fetchDepartments()
        fetchRanks()
        fetchEmploymentStatus()
        fetchApprovers()
    },[])

    const handleChangeAutoComplete = (e:any, newValue:any) => {
        console.log(newValue)
    }

    return (
        <div>
            <form className="flex flex-col gap-8">
                <div id="employment-status-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Employment Details</Typography><br></br>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
                        <DatePickerField 
                            label="Date Hired"
                        />
                        <DatePickerField 
                            label="Date Separated"
                        />
                        <SelectField 
                            className="w-full md:w-52"
                            labelId="separation-type"
                            id="separation-type"
                            label="Separation Type"
                            inputProps={{ readOnly: false }} 
                            options={separationType} 
                        />

                        <InputField 
                            label="Employment Duration:" 
                            variant="outlined" 
                            readOnly
                        />   

                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="positions"
                            id="positions"
                            label="Positions"
                            loading={positions.loading}
                            inputProps={{ readOnly: false }} 
                            options={positions.data}
                            // disabled
                        />

                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="branches"
                            id="branches"
                            label="Branches"
                            loading={branches.loading}
                            inputProps={{ readOnly: false }} 
                            options={branches.data}
                            // disabled
                        />

                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="departments"
                            id="departments"
                            label="Departments"
                            loading={departments.loading}
                            inputProps={{ readOnly: false }} 
                            options={departments.data}
                            // disabled
                        />

                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="ranks"
                            id="ranks"
                            label="Rank"
                            loading={ranks.loading}
                            inputProps={{ readOnly: false }} 
                            options={ranks.data}
                            // disabled
                        />          
                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="employment_status"
                            id="employment_status"
                            label="Employment Status"
                            loading={employmentStatus.loading}
                            inputProps={{ readOnly: false }} 
                            options={employmentStatus.data}
                            // disabled
                        />
                        <SelectField 
                            className="w-full md:w-[300px]"
                            labelId="employee_type"
                            id="employee_type"
                            label="Employee Type"
                            inputProps={{ readOnly: false }} 
                            options={employeeType}
                            // disabled
                        />

                        <div id="approver1-wrapper" className="w-full md:w-96">
                            <AutocompleteForm 
                                id="approver1" 
                                options={approvers.data} 
                                label="Approver 1" 
                                getOptionLabel={(option: any) => option? `${option?.id} - ${option?.name}`: ""} 
                                handleChange={handleChangeAutoComplete} 
                                optionTitle='name' 
                                defaultValueId={null} 
                                disabled={false} 
                            />
                        </div>

                        <div id="approver2-wrapper" className="w-full md:w-96">
                            <AutocompleteForm 
                                id="approver2" 
                                options={approvers.data} 
                                label="Approver 2" 
                                getOptionLabel={(option: any) => option? `${option?.id} - ${option?.name}`: ""} 
                                handleChange={handleChangeAutoComplete} 
                                optionTitle='name' 
                                defaultValueId={null} 
                                disabled={false} 
                            />
                        </div>

                        <InputField 
                            label="Other Duty And Responsibilities:" 
                            variant="outlined"
                            className="w-full"
                            readOnly
                        />
                    </div>
                </div>
                {/* <div id="Payroll">
                    <Typography variant="h6" component="h6" className="font-bold">Employment Status</Typography><br></br>
                </div> */}
            </form>
        </div>
    )
}