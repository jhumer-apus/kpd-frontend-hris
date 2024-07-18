import { APILink, RootState } from '@/store/configureStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useFetchFileApplicationByApprover(url: string) {
    const currUser = useSelector((state: RootState) => state.auth.employee_detail);
    const [data, setData] = useState([])
    const [status, setStatus] = useState<string>('')
    const [error, setError] = useState<string>('')

    useEffect(() => {
        fetchFileApplicationByApprover()
    },[])

    const fetchFileApplicationByApprover = async() => {
        
        await axios.get(url,{

            params:{
                approver: currUser?.user?.emp_no
            }

        }).then((res:any) => {
            const resData = Array.isArray(res.data)? res.data: []
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