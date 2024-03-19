import {useState, useEffect, Dispatch, SetStateAction } from 'react'

//LIBARIES
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios'
import InputLabel from '@mui/material/InputLabel';

//REDUX
import { APILink, RootState } from '@/store/configureStore';

interface ProvinceInterface {
    id: number,
    name: string,
    code: string
}

interface Props {
    state?:any;
    setState: any;
    province_id? : number | null;
    city_id? : number | null;
    isReadOnly?: boolean
}
export default function Province(props: Props) {

    //PROPS
    const { state, setState, province_id, city_id, isReadOnly } = props

    //STATES
    const [provinces, setProvinces] = useState<ProvinceInterface[]>([])
    // const [defaultProvince , setDefaultProvince] = useState<ProvinceInterface | null>(null)
    

    //USE EFFECTS
    useEffect(() => {
        fetchProvinces()

    }, [])

    useEffect(() => {
        console.log(province_id)
        if(provinces.length>0) {
            findProvince(province_id)
        }
    },[provinces.length])

    // useEffect(() => {
    //     console.log("sdasdas" + province_id)
    // }, [province_id])

    //FUNCTIONS
    const fetchProvinces = async() => {

        await axios.get(`${APILink}province/`).then((res:AxiosResponse) => {

            const sortedProvince= res.data.sort((a:any, b:any) => a.name.localeCompare(b.name));
            setProvinces(curr => sortedProvince)

        }).catch((err:AxiosError) => {

            console.log(err)

        })

    }

    const findProvince = (val:any) => {
        const selectedProvince = provinces.find(prov => prov.id == val)
        if(selectedProvince) {
            console.log(selectedProvince)
            // setDefaultProvince((curr:any) => selectedProvince)
            setState((curr:any) => ({
                ...curr,
                province: selectedProvince
            }))
            return selectedProvince
        }
    }

    const handleChange = (e: any, newValue: ProvinceInterface | null) => {
        if(newValue) {
            setState((curr:any) => ({
                ...curr,
                province: newValue
            }))
        }
    }

    return (
        <div className='w-full'>

            <Autocomplete
                disablePortal
                id="province"
                options={provinces}
                className='w-full'
                value={state?.province}
                getOptionLabel={(province: ProvinceInterface) => province.name}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label="Province" />}
                readOnly={isReadOnly}
            />

        </div>


    )


}