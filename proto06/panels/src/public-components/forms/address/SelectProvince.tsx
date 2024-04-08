import {useState, useEffect, Dispatch, SetStateAction } from 'react'

//LIBARIES
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios'
import InputLabel from '@mui/material/InputLabel';
import { Select, Option } from "@material-tailwind/react";

//REDUX
import { APILink, RootState } from '@/store/configureStore';

interface ProvinceInterface {
    id: number,
    name: string,
    code: string
}

interface Props {
    province_code?: any,
    setState: any
    isDisable: boolean
    customKey: string | null | undefined
}
export default function SelectProvince(props: Props) {

    //PROPS
    const { setState, province_code, isDisable, customKey } = props

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
    const findProvince = (val:any) => {
        return provinces.find(prov => prov.id == val)
    }

    const handleChange = (newValue: string | number) => {

        if(newValue) {

            if(customKey) {

                setState((curr:any) => ({
                    ...curr,
                   [customKey]: findProvince(newValue)
                }))

            } else {

                setState((curr:any) => ({
                    ...curr,
                    province: findProvince(newValue)
                }))

            }
        }
    }

    return (
        <div className='w-full'>
            {provinces.length > 0 &&
                <Select
                    label="Province:"
                    placeholder="Select Province"
                    onChange={handleChange}
                    value={province_code}
                    disabled={isDisable}
                >
                    {provinces.length > 0 ? provinces.map((province: ProvinceInterface) => (
                        <Option value={province.id}>{province.name}</Option>
                    )):
                        <Option disabled>No cities available on the selected province</Option>
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