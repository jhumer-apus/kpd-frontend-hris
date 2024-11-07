import axiosInstance from "@/helpers/axiosConfig"
import { HandleAlertAction } from "@/store/actions/components"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function usePayrollList() {

    const dispatch = useDispatch()
    const [payrollList, setPayrollList] = useState<any[]>([])
    const [loading ,setLoading] = useState<boolean>(false)
    
    const fetchPayrollList = async(id:number) => {
        setPayrollList(curr => [])
        setLoading(curr => true)
        await 
            axiosInstance
                .get(`payroll`,
                    {
                        params: {
                            payroll_approver_id: id
                        }
                    }
                )
                .then(res => {
                    setPayrollList(curr => Array.isArray(res.data)? res.data: [])
                    setLoading(curr => false)
                })
                .catch(err => {
                    console.error(err?.res?.data)
                    dispatch(HandleAlertAction({
                        open:true,
                        status:"error",
                        message:err?.res?.data
                    }))
                    setPayrollList(curr => [])
                    setLoading(curr => false)
                })
    }
    return {
        payrollList,
        loading,
        fetchPayrollList,
    }
}