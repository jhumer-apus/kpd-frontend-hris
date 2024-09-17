import {useState, useEffect, Dispatch, SetStateAction, useRef } from 'react'

//LIBARIES
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios'
import InputLabel from '@mui/material/InputLabel';

//REDUX
import { APILink, RootState } from '@/store/configureStore';
import axiosInstance from '@/helpers/axiosConfig';

interface ProvinceInterface {
    id: number,
    name: string,
    code: string
}

interface Props {
    updateAddress: (name: string, newValue: any) => void;
    defaultProvinceId? : number | null;
    isReadOnly?: boolean;
    name: string;
    label? : string
}
export default function Province(props: Props) {

    //PROPS
    const { name, defaultProvinceId, isReadOnly, updateAddress, label } = props

    //STATES
    const [provinces, setProvinces] = useState<ProvinceInterface[]>([])
    const [currentProvince, setCurrentProvince] = useState<ProvinceInterface | null>(null)
    

    //USE EFFECTS
    useEffect(() => {
        fetchProvinces()

    }, [])

    useEffect(() => {

        if(provinces.length > 0) {

            findProvince(defaultProvinceId)
        }

    },[provinces.length, defaultProvinceId])

    //FUNCTIONS
    const fetchProvinces = async() => {

        await axiosInstance.get(`province/`).then((res:AxiosResponse) => {

            const sortedProvince= res.data.sort((a:any, b:any) => a.name.localeCompare(b.name));
            setProvinces(curr => sortedProvince)

        }).catch((err:AxiosError) => {

            console.log(err)

        })

    }

    const findProvince = (val:any) => {
        
        if(val) {
            
            const selectedProvince = provinces.find(prov => prov.id == val)

            if(selectedProvince) {
                
                setCurrentProvince(curr => selectedProvince)
                updateAddress(name, selectedProvince)
            }
        }
    }

    const handleChange = (e: any, newValue: ProvinceInterface | null) => {

        if(newValue) {

            setCurrentProvince(curr => newValue)
            updateAddress(name, newValue)
        }
    }

    return (
        <div className='w-full'>

            <Autocomplete
                disablePortal
                id="province"
                options={provinces}
                className='w-full'
                value={currentProvince}
                getOptionLabel={(province: ProvinceInterface) => province?.name?? ''}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label={label?? "Province"} />}
                readOnly={isReadOnly}
            />

        </div>


    )


}