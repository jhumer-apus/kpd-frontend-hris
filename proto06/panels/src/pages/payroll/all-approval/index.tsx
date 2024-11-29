import axiosInstance from "@/helpers/axiosConfig"
import PayrollApprovalsTable from "@/public-components/payrolls/approvals/PayrollApprovalsTable"
import ViewPayroll from "@/public-components/payrolls/approvals/ViewPayroll"
import { RootState } from "@/store/configureStore"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function AllApproval() {

    const currUser = useSelector((state:RootState) => state.auth.employee_detail)

    const [payrollApprovers, setPayrollApprovers] = useState<any>({
        loading:false,
        data:[]
    })

    useEffect(() => {
        fetchPayrollByApprovers()
    },[currUser])

    const fetchPayrollByApprovers = async () => {

        setPayrollApprovers((curr:any) => ({
            loading: true,
            data: []
        }))

        await 
            axiosInstance
                .get(`payroll_approver`, {
                    params: {
                        approver: currUser?.emp_no,
                    }
                })
                .then(res => {
                    setPayrollApprovers((curr:any) => ({
                        loading:false,
                        data: Array.isArray(res?.data) ? res.data : []
                    }))
                })
                .catch(err => {
                    console.error(err?.res?.data)
                    setPayrollApprovers((curr:any) => ({
                        loading: false,
                        data: []
                    }))
                })
    }

    return (
        <div className="mt-8">
            {/* <Button variant="contained" onClick={() => onApprove()}>Approve</Button> */}
            <PayrollApprovalsTable 
                rows={payrollApprovers.data} 
                loading={payrollApprovers.loading}
                refreshPayrollApprovers={fetchPayrollByApprovers}
            />
        </div>
    )
}