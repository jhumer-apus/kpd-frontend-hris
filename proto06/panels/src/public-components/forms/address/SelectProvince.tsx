import {useState, useEffect, Dispatch, SetStateAction } from 'react'

//LIBARIES
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios'
import InputLabel from '@mui/material/InputLabel';
import { Select, Option } from "@material-tailwind/react";

//REDUX
import { APILink, RootState } from '@/store/configureStore';
import { update } from 'lodash';
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
    isDisable?: boolean
}
export default function SelectProvince(props: Props) {

    //PROPS
    const { updateAddress, defaultProvinceId, isDisable, isReadOnly, name } = props

    //STATES
    const [provinces, setProvinces] = useState<ProvinceInterface[]>([])
    const [currentProvince, setCurrentProvince] = useState<number | null |undefined>(defaultProvinceId)

    //USE EFFECTS
    useEffect(() => {

        fetchProvinces()

    }, [])

    useEffect(() => {
        if(defaultProvinceId) {
            const provinceFound = findProvince(defaultProvinceId)
            updateAddress(name, provinceFound)
        }
    },[provinces.length])

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
        return provinces.find(prov => prov.id == val)
    }

    const handleChange = (newValue: string | number) => {

        if(newValue) {

            const provinceFound = findProvince(newValue)
            updateAddress(name, provinceFound)
        }
    }

    return (
        <div className='w-full'>
            {provinces.length > 0 &&
                <Select
                    label="Province:"
                    placeholder="Select Province"
                    onChange={handleChange}
                    value={defaultProvinceId}
                    disabled={isDisable}
                >
                    {provinces.length > 0 ? provinces.map((province: ProvinceInterface) => (
                        <Option value={province.id}>{province.name}</Option>
                    )):
                        <Option disabled>No cities available on the selected province</Option>
                    }
                </Select>
            }
            {provinces.length < 1 &&
                <Select
                    key={0}
                    label="Province:"
                    placeholder="Select Province"
                    onChange={handleChange}
                    value={defaultProvinceId}
                    disabled={isDisable}
                >
                    {provinces.length > 0 ? provinces.map((province: ProvinceInterface) => (
                        <Option value={province.id}>{province.name}</Option>
                    )):
                        <Option disabled>No province available on the selected province</Option>
                    }
                </Select>
            }
        </div>
        
        // <Autocomplete
        //     disablePortal
        //     id="province"
        //     options={provinces}
        //     className='w-full'
        //     getOptionLabel={(province: ProvinceInterface) => province.name}
        //     onChange={handleChange}
        //     renderInput={(params) => <TextField {...params} label="Province" />}
        // />


    )


}