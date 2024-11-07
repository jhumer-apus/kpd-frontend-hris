import { useOptionData } from "@/custom-hooks/use-option-data"
import axiosInstance from "@/helpers/axiosConfig"
import CutOffPeriodByYearField from "@/public-components/forms/CutOffPeriodByYearField"
import YearField from "@/public-components/forms/YearField"
import EmployeesTable from "@/public-components/payrolls/EmployeesTable"
import { HandleAlertAction } from "@/store/actions/components"
import { RootState } from "@/store/configureStore"
import { Button } from "@mui/material"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function ProcessPayroll() {

    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const dispatch = useDispatch()

    const [year, setYear] = useState<string>(dayjs().format('YYYY'))
    const [data, setData] = useState<any>(
        {
            cutoff_id: null,
            emp_no: []
        }
    )

    const handleChangeYear = (e:any) => {
        setYear(curr => e.target.value)
    }

    const handleChangeCutoff = (key:string, newValue:any) => {

        console.log(newValue)
        setData((curr:any) => (
            {
                ...curr,
                [key]: newValue?.id ?? ""
            }
        ))
    }

    const onSelectedEmployees = (selectedEmployees: any) => {
        console.log(selectedEmployees)
    }

    const onProcess = () => {

        validate()
        
        const payload = {
            cutoff_id: data.cutoff_id,
            emp_no: data.emp_no,
            added_by: currUser?.emp_no
        }

        processPayroll(payload)
    }

    const processPayroll = async (payload:any) => {
        await 
            axiosInstance
                .post(`create_pay/`, payload)
                .then(res => {
                    dispatch(HandleAlertAction({
                        open: true,
                        status: "success",
                        message: "Payroll Processed Successfully"
                    }))
                })
                .catch(err => {
                    console.error(err?.res?.data)
                    dispatch(HandleAlertAction({
                        open: true,
                        status: "error",
                        message: err?.res?.data
                    }))
                })
    }

    const validate = () => {
        let errors:any = {
            cutoff_id: null,
            emp_no: null
        }

        if(!data.cutoff_id) 
            errors.cutoff_id = "Please Select Cut Off Period"
        
        if(data.emp_no.length == 0)
            errors.emp_no = "Please Select 1 or more Employees"

        for(const err in errors) {
            if(errors[err]) {
                dispatch(HandleAlertAction(
                    {
                        open: true,
                        status: "error",
                        message: errors[err]
                    }
                ))
                break
            }
        } 
    }

    return (
        <div>
            <div id="payroll-process-wrapper" className="mt-20">
                <div className="flex gap-4">
                    <YearField 
                        handleChange={handleChangeYear}
                        className="w-32"
                    />
                    <CutOffPeriodByYearField
                        handleChange={handleChangeCutoff}
                        year={parseInt(year)} 
                        defaultId={data?.cutoff_id}
                        stateKey="cutoff_id"
                        className="w-64"             
                    />
                    <Button variant="contained" onClick={() => onProcess()}>Process</Button>
                </div>
                <br></br>
                <EmployeesTable 
                    onSelectedRow={onSelectedEmployees} 
                />
            </div>
        </div>
    )
}