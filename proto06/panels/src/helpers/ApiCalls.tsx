import axios from 'axios';
import { APILink } from '@/store/configureStore';
import axiosInstance from './axiosConfig';

export const fetchCutOffPeriods = async (year:string | number = new Date().getFullYear()) => {

    return await axiosInstance.get(`cutoff_period?year=${year}`)
}

// export const debounceFetchCutOffPeriods = debounce( async(year:string | number = new Date().getFullYear()) => {
//     await axiosInstance.get(`cutoff_period?year=${year}`).then(response => console.log(response))
// },20000)