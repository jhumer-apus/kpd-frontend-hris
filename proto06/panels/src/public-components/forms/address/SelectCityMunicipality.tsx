import {useState, useEffect} from 'react'

//LIBARIES
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios'
import InputLabel from '@mui/material/InputLabel';
import { Select, Option } from "@material-tailwind/react";

//REDUX
import { APILink, RootState } from '@/store/configureStore';

interface CityMunicipalityInterface {
    id: number,
    name: string,
    province_code: string
}

interface Props {
    state:any
    setState: any;
    isDisable: boolean
    city_code?: any
    province_code: number | string
    customKey: number | string | null | undefined
}

export default function CityMunicipality(props:Props) {
    
    //PROPS
    const { setState, state, isDisable, city_code, province_code, customKey } = props

    
    //STATES
    const [cities, setCities] = useState<CityMunicipalityInterface[]>([])
    const [resetKey, setResetKey] = useState<number>(0);

    //USE EFFECTS
    useEffect(() => {

        setResetKey(curr => curr + 1)
        setState((curr:any) => ({
            ...curr,
            city: null
        }))
        fetchCities()
        
    }, [province_code])

    //FUNCTIONS
    const fetchCities = async() => {

        if(province_code) {

            await axios.get(`${APILink}city_municipality/`,{

                params: {
                    code: state.province.code
                }
    
            }).then((res:AxiosResponse) => {
    
                const sortedCities = res.data.sort((a:any, b:any) => a.name.localeCompare(b.name));
                setCities(curr => sortedCities)
    
            }).catch((err:AxiosError) => {
    
                console.log(err)
    
            })
        }
    }

    const findCity = (val:any) => {
        return cities.find(city => city.id == val)
    }

    const handleChange = (newValue:any) => {

        if(newValue) {

            if(customKey) {

                setState((curr:any) => ({
                    ...curr,
                    [customKey]: findCity(newValue)
                }))
                
            } else {

                setState((curr:any) => ({
                    ...curr,
                    city: findCity(newValue)
                }))
            }
        }
    }

    return (
        <div className='w-full'>
            {cities.length > 0 &&
                <Select
                    key={resetKey}
                    label="City: (Select a province first)"
                    placeholder="Select City"
                    onChange={handleChange}
                    disabled={isDisable}
                    value={city_code}
                >
                    {cities.length > 0 ? cities.map((city: CityMunicipalityInterface, index:number) => (
                        <Option key={index} value={city.id}>{city.name}</Option>
                    )):
                        <Option disabled>No cities available on the selected province</Option>
                    }
        
                </Select>
            }
        </div>
    
    )


}