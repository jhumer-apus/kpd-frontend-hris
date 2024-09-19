import axiosInstance from "@/helpers/axiosConfig";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchQuery (url:string, payload: object | null | undefined) {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const [status, setStatus] = useState<string| null>(null)

    useEffect(() => {
        fetchQuery()
    },[])

    const fetchQuery = async () => {

        await axiosInstance.get(url, payload).then(res => {

            setData((curr:any) => res.data)

        }).catch(err => {

            setError((curr:any) => err)
            setStatus((curr:string | null) => 'failed')

        })
    }

    return {
        data,
        error,
        status
    }
}