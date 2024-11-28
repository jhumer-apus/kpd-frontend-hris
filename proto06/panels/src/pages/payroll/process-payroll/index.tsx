import { useOptionData } from "@/custom-hooks/use-option-data"
import axiosInstance from "@/helpers/axiosConfig"
import CutOffPeriodByYearField from "@/public-components/forms/CutOffPeriodByYearField"
import SelectField from "@/public-components/forms/SelectField"
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
    const { branches, fetchBranches } = useOptionData()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)

    const [year, setYear] = useState<string>(dayjs().format('YYYY'))
    const [data, setData] = useState<any>(
        {
            branch_id: null,
            cutoff_id: null,
            emp_no: []
        }
    )

    useEffect(() => {
        fetchBranches()
    }, [])

    useEffect(() => {
        console.log(data)
    },[data])

    const handleChangeYear = (e:any) => {
        setYear(curr => e.target.value)
    }

    const handleChange = (e:any) => {
        const { name, value} = e.target
        setData((curr:any) => ({
            ...curr,
            [name]: value
        }))
    }

    const handleChangeCutoff = (key:string, newValue:any) => {

        setData((curr:any) => (
            {
                ...curr,
                [key]: newValue?.id ?? ""
            }
        ))
    }

    const onSelectedEmployees = (selectedEmployees: any) => {
        const listOfEmployeeNo = selectedEmployees.map((emp:any) => emp.emp_no)
        setData((curr:any) => (
            {
                ...curr,
                emp_no:listOfEmployeeNo
            }
        ))
    }

    const onProcess = () => {

        if(validate().isError) return
        
        const payload = {
            cutoff_id: data.cutoff_id,
            branch_id: data.branch_id,
            emp_no: data.emp_no,
            added_by: currUser?.emp_no
        }

        processPayroll(payload)
    }

    const processPayroll = async (payload:any) => {
        setLoading(curr => true)
        await 
            axiosInstance
                .post(`create_pay/`, payload)
                .then(res => {
                    dispatch(HandleAlertAction({
                        open: true,
                        status: "success",
                        message: "Payroll Processed Successfully"
                    }))
                    setData((curr:any) => ({
                        branch_id: null,
                        cutoff_id: null,
                        emp_no: []
                    }))
                    setLoading(curr => false)
                })
                .catch(err => {
                    console.error(err?.response)
                    dispatch(HandleAlertAction({
                        open: true,
                        status: "error",
                        message: err?.response?.data?.["Error Message"]
                    }))
                    setLoading(curr => false)
                })
    }

    const validate = () => {
        let errors:any = {
            cutoff_id: null,
            emp_no: null
        }

        if(!data.cutoff_id) 
            errors.cutoff_id = "Please Select Cut Off Period"

        if(!data.branch_id) 
            errors.branch_id = "Please Select a Branch"
        
        // if(data.emp_no.length == 0)
        //     errors.emp_no = "Please Select 1 or more Employees"

        for(const err in errors) {
            if(errors[err]) {
                dispatch(HandleAlertAction(
                    {
                        open: true,
                        status: "error",
                        message: errors[err]
                    }
                ))
                return {
                    isError:true
                }
            }
        } 

        return {
            isError:false
        }
    }

    return (
        <div>
            <div id="payroll-process-wrapper" className="mt-20">
                <div className="flex flex-col gap-8 bg-white md:w-[500px] m-auto p-12 rounded-xl">
                    <YearField 
                        name="year"
                        handleChange={handleChangeYear}
                        className="w-full"
                    />
                    <CutOffPeriodByYearField
                        handleChange={handleChangeCutoff}
                        year={parseInt(year)} 
                        defaultId={data?.cutoff_id}
                        stateKey="cutoff_id"
                        className="w-full"             
                    />
                    <SelectField
                        name="branch_id"
                        label="Branch"
                        options={branches.data}
                        className="w-full"
                        onChange={handleChange}
                    />
                    <Button 
                        variant="contained" 
                        onClick={() => onProcess()}
                        disabled={loading}
                    >
                        Process
                    </Button>
                </div>
                {/* <br></br>
                <EmployeesTable 
                    onSelectedRow={onSelectedEmployees} 
                /> */}
            </div>
        </div>
    )
}