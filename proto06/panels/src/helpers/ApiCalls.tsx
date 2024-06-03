import axios from 'axios';
import { APILink } from '@/store/configureStore';

export const fetchCutOffPeriods = async (year:string | number = new Date().getFullYear()) => {

    return await axios.get(`${APILink}cutoff_period?year=${year}`)
}

// export const debounceFetchCutOffPeriods = debounce( async(year:string | number = new Date().getFullYear()) => {
//     await axios.get(`${APILink}cutoff_period?year=${year}`).then(response => console.log(response))
// },20000)