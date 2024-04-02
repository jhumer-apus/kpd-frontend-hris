import { APILink, RootState } from '@/store/configureStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useFetchLeavesByApprover() {
    const currUser = useSelector((state: RootState) => state.auth.employee_detail);
    const [data, setData] = useState([])
    const [status, setStatus] = useState<string>('')
    const [error, setError] = useState<string>('')

    useEffect(() => {
        fetchLeavesByApprover()
    },[])

    const fetchLeavesByApprover = async() => {
        
        await axios.get(`${APILink}leave`,{

            params:{
                approver: currUser?.user?.emp_no
            }

        }).then((res:any) => {
            const resData = Array.isArray(res.data)? res.data: []
            console.log(resData)
            setData(curr => resData)
            setStatus(curr => 'success')

        }).catch((err:any) => {
            
            setError(curr => err)
            setStatus(curr => 'failed')

        })
    }

    return {
        data,
        status,
        error
    }
}