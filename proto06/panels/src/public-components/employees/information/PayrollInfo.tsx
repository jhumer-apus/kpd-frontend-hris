import { useOptionData } from "@/custom-hooks/use-option-data";
import AutocompleteForm from "@/public-components/forms/AutoCompleteForm";
import InputField from "@/public-components/forms/InputField";
import { InputAdornment, Typography } from "@mui/material";
import { useEffect } from "react";

export default function PayrollInfo() {

    const { payrollGroup, fetchPayrollGroup } = useOptionData()

    useEffect(() => {
        fetchPayrollGroup()
    },[])

    const handleChangeAutoComplete = (e:any, newValue:any) => {
        console.log(newValue)
    }
    return (
        <div>
            <form className="flex flex-col gap-8">
                <div id="employment-status-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Payroll Details</Typography><br></br>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
                        <div id="payroll-group" className="w-full md:w-96">
                            <AutocompleteForm 
                                id="payroll-group" 
                                options={payrollGroup.data} 
                                label="Payroll Group" 
                                getOptionLabel={(option: any) => option? `${option?.id} - ${option?.name}`: ""} 
                                handleChange={handleChangeAutoComplete} 
                                optionTitle='name' 
                                defaultValueId={null} 
                                disabled={false} 
                            />
                        </div>
                        <InputField 
                            label="Account No:"
                            variant="outlined" 
                            readOnly
                        />
                        <InputField 
                            label="Insurance Life:"
                            variant="outlined"
                            startAdornment={(
                                <InputAdornment position="start">
                                    ₱
                                </InputAdornment>
                            )}
                            // readOnly
                        />
                        <InputField 
                            label="Ecola:"
                            variant="outlined"
                            startAdornment={(
                                <InputAdornment position="start">
                                    ₱
                                </InputAdornment>
                            )}
                            // readOnly
                        />
                    </div>
                </div>

                <div id="government-contribution-wrapper">
                    <Typography variant="h6" component="h6" className="font-bold">Government Contributions</Typography><br></br>
                    <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
                        <InputField 
                            label="TIN:"
                            variant="outlined" 
                            // readOnly
                        />
                        <InputField 
                            label="HDMF Pag-ibig:"
                            variant="outlined" 
                            // readOnly
                        />

                        <InputField 
                            label="SSS ID:"
                            variant="outlined" 
                            // readOnly
                        />

                        <InputField 
                            label="Philhealth No:"
                            variant="outlined" 
                            // readOnly
                        />

                        <InputField 
                            label="HMO No:"
                            variant="outlined" 
                            // readOnly
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}