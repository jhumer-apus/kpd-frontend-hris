import axiosInstance from "@/helpers/axiosConfig";
import { APILink } from "@/store/configureStore";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";


export default function useGetSpecificProvince(provinceId: number| string) {

    const [province, setProvince] = useState<any>(null)
    const [status, setStatus] = useState<string>('')
    const [error, setError] = useState<string>('')
    
    useEffect(() => {
        if(provinceId) {
            fetchSpecificProvince()
        }
    },[provinceId])

    const fetchSpecificProvince = async() => {

        await axiosInstance.get(`province/${provinceId}/`).then((res:any) => {

            setProvince(curr => res.data)

        }).catch((err:any) => {

            setError(curr => err)
            setStatus(curr => 'failed')

        })

    }

    return {
        province,
        status,
        error
    }
}