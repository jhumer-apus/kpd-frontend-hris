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
    setState: any;
}
export default function Province(props: Props) {

    //PROPS
    const { setState } = props

    //STATES
    const [provinces, setProvinces] = useState<ProvinceInterface[]>([])

    //USE EFFECTS
    useEffect(() => {

        fetchProvinces()

    }, [])

    //FUNCTIONS
    const fetchProvinces = async() => {

        await axios.get(`${APILink}province/`).then((res:AxiosResponse) => {

            const sortedProvince= res.data.sort((a:any, b:any) => a.name.localeCompare(b.name));
            setProvinces(curr => sortedProvince)

        }).catch((err:AxiosError) => {

            console.log(err)

        })

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

        <Autocomplete
            disablePortal
            id="province"
            options={provinces}
            sx={{ minWidth: 500 }}
            getOptionLabel={(province: ProvinceInterface) => province.name}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Province" />}
        />


    )


}