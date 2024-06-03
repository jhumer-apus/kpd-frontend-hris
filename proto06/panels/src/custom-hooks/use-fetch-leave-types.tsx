import { APILink, RootState } from '@/store/configureStore';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFetchLeaveTypes() {
    const [data, setData] = useState([])
    const [status, setStatus] = useState<string>('')
    const [error, setError] = useState<string>('')

    useEffect(() => {
        fetchLeaveTypes()
    },[])

    const fetchLeaveTypes = async() => {
        
        await axios.get(`${APILink}leave_type/`).then((res:any) => {
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