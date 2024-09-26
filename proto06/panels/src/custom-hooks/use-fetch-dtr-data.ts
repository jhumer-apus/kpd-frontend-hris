import axiosInstance from "@/helpers/axiosConfig"
import { useRef, useState } from "react"

type DTR = {
    data: any[],
    type: "logs" | "merged" | "cutoff",
    loading: boolean
}

export const useFetchDTRData = (filter:any) => {

    const [dtr, setDtr] = useState<DTR>(
        {
          data: [],
          type: "cutoff",
          loading: false
        }
    )



    const controllerRef = useRef<AbortController | null>(null);

    const abortPreviousRequest = () => {
        if (controllerRef.current) {
            controllerRef.current.abort(); // Abort previous request
        }
        controllerRef.current = new AbortController(); // Create new controller
    };


    const fetchDtrData = {

        logs: async () => {

            abortPreviousRequest()

            setDtr((curr:DTR) => ({
                ...curr,
                loading: true
            }))

            await axiosInstance.get(`dtr/`, {
                signal: controllerRef.current?.signal,
                params: {
                    emp_no: filter.emp_no,
                    month: filter.month,
                    year: filter.year
                },
            }).then(res => {
                setDtr((curr:DTR) => ({
                    data: Array.isArray(res.data) ? res.data: [],
                    type: "logs",
                    loading:false
                }))
            }).catch(err => {
                console.error(err)
                setDtr(curr => ({
                    data: [],
                    type: "logs",
                    loading:false
                }))
            })
        },
    
        merged: async () => {

            abortPreviousRequest()

            setDtr((curr:DTR) => ({
                ...curr,
                loading: true
            }))

            await axiosInstance.get(`dtr_summary/`, {
                signal: controllerRef.current?.signal,
                params: {
                    emp_no: filter.emp_no,
                    cutoff: filter.cutoff_id
                }
            }).then(res => {
                setDtr(curr => ({
                    data: Array.isArray(res.data) ? res.data: [],
                    type: "merged",
                    loading:false
                }))
            }).catch(err => {
                console.error(err)
                setDtr(curr => ({
                    data: [],
                    type: "merged",
                    loading:false
                }))
            })
        },
    
        cutoff: async () => {

            abortPreviousRequest()

            setDtr((curr:DTR) => ({
                ...curr,
                loading: true
            }))

            
            if(filter.emp_no){
                

                await axiosInstance.get(`dtr_cutoff_summary/${filter.emp_no}/`, {
                    signal: controllerRef.current?.signal,
                }).then(res => {
                    setDtr(curr => ({
                        data: Array.isArray(res.data) ? res.data: [],
                        type: "cutoff",
                        loading:false
                    }))
                }).catch(err => {
                    console.error(err)
                    setDtr(curr => ({
                        data: [],
                        type: "cutoff",
                        loading:false
                    }))
                })
        
            } else{
        
                await axiosInstance.get(`dtr_cutoff_summary/`, {
                    signal: controllerRef.current?.signal,
                    params: {
                        cutoff_code: filter.cutoff_id
                    }
                }).then(res => {
                    setDtr(curr => ({
                        data: Array.isArray(res.data) ? res.data: [],
                        type: "cutoff",
                        loading:false
                    }))
                }).catch(err => {
                    console.error(err)
                    setDtr(curr => ({
                        data: [],
                        type: "cutoff",
                        loading:false
                    }))
                })
        
            }
        }
    }

    return {
        dtr,
        fetchDtrData
    }
}