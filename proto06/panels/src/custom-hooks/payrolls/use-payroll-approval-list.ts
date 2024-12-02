import axiosInstance from "@/helpers/axiosConfig"
import { RootState } from "@/store/configureStore"
import { useState } from "react"
import { useSelector } from "react-redux"

export const usePayrollApprovalList = () => {

    const currUser = useSelector((state:RootState) => state.auth.employee_detail)

    const [payrollApprovers, setPayrollApprovers] = useState<any>({
        loading:false,
        data:[]
    })

    const fetchPayrollByApprovers = async (status: "APD" | "DIS" | "P" | null = null) => {

        setPayrollApprovers((curr:any) => ({
            loading: true,
            data: []
        }))

        await 
            axiosInstance
                .get(`payroll_approver`, {
                    params: {
                        approver: currUser?.emp_no,
                        status: status
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

    return {
        payrollApprovers,
        fetchPayrollByApprovers
    }
}