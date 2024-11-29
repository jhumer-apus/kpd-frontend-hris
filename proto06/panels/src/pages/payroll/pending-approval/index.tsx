import { usePayrollApprovalList } from "@/custom-hooks/payrolls/use-payroll-approval-list"
import axiosInstance from "@/helpers/axiosConfig"
import PayrollApprovalsTable from "@/public-components/payrolls/approvals/PayrollApprovalsTable"
import ViewPayroll from "@/public-components/payrolls/approvals/ViewPayroll"
import { RootState } from "@/store/configureStore"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function PayrollPendingApproval() {

    const { payrollApprovers, fetchPayrollByApprovers} = usePayrollApprovalList()

    useEffect(() => {
        fetchPayrollByApprovers("P")
    },[])

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