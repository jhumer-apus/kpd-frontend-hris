import { useOptionData } from "@/custom-hooks/use-option-data";
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
        fetchDepartments,  
        fetchPositions, 
        fetchBranches,
        fetchRanks,
        fetchEmploymentStatus
    } = useOptionData()

    useEffect(() => {
        fetchPositions()
        fetchBranches()
        fetchDepartments()
        fetchRanks()
        fetchEmploymentStatus()
    },[])

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
                    </div>
                </div>
                {/* <div id="Payroll">
                    <Typography variant="h6" component="h6" className="font-bold">Employment Status</Typography><br></br>
                </div> */}
            </form>
        </div>
    )
}