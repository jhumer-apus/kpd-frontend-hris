import {useState, useEffect} from 'react'

//LIBARIES
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios'
import InputLabel from '@mui/material/InputLabel';
import { Select, Option } from "@material-tailwind/react";

//REDUX
import { APILink, RootState } from '@/store/configureStore';
import useGetSpecificProvince from '@/custom-hooks/use-fetch-specific-province';

interface CityMunicipalityInterface {
    id: number,
    name: string,
    province_code: string
}

interface Props {

    updateAddress: (name: string, newValue: any) => void;
    defaultCityId? : number | null;
    currentProvinceCode: number | string
    isReadOnly?: boolean;
    name: string;
    isDisable?: boolean
}

export default function CityMunicipality(props:Props) {
    
    //PROPS
    const { isReadOnly, isDisable, defaultCityId, currentProvinceCode, name, updateAddress } = props

    //STATES
    const [cities, setCities] = useState<CityMunicipalityInterface[]>([])
    const [resetKey, setResetKey] = useState<number>(0);

    const [currentCity, setCurrentCity] = useState<number| null| undefined>(null)

    //HOOKS
    const {province, status, error} = useGetSpecificProvince(currentProvinceCode)

    //USE EFFECTS
    useEffect(() => {

        // setResetKey(curr => curr + 1)
        if(province) {
            fetchCities()
        }
        
    }, [province])

    // useEffect(() => {
    //     setCurrentCity(curr => null)

        
    // }, [resetKey])

    useEffect(() => {
        
        updateAddress(name, null)

    },[currentProvinceCode])

    useEffect(() => {
        updateAddress(name, currentCity);
    }, [currentCity]);

    // useEffect(() => {
        
    //     setCurrentCity(curr => defaultCityId)

    // },[defaultCityId])

    //FUNCTIONS
    const fetchCities = async() => {

        if(province) {

            await axios.get(`${APILink}city_municipality/`,{

                params: {
                    code: province?.code
                }
    
            }).then((res:AxiosResponse) => {
                
                const sortedCities = res.data.sort((a:any, b:any) => a.name.localeCompare(b.name));
                setCities(curr => sortedCities)
    
            }).catch((err:AxiosError) => {
    
                console.log(err)
    
            })
        }
    }

    // const findCity = (val:any) => {
    //     return cities.find(city => city.id == val)
    // }

    const handleChange = (newValue:any) => {

        if(newValue) {
            setCurrentCity(curr => newValue)
            // updateAddress(name, newValue)
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
                    value={defaultCityId}
                >
                    {cities.length > 0 ? cities.map((city: CityMunicipalityInterface, index:number) => (
                        <Option key={index} value={city.id}>{city.name}</Option>
                    )):
                        <Option disabled>No cities available on the selected province</Option>
                    }
        
                </Select>
            }
            {/* {cities.length < 1 &&
                <Select
                    key={resetKey}
                    label="City: (Select a province first)"
                    placeholder="Select City"
                    onChange={handleChange}
                    disabled={isDisable}
                    value={defaultCityId}
                >
                    {cities.length > 0 ? cities.map((city: CityMunicipalityInterface, index:number) => (
                        <Option key={index} value={city.id}>{city.name}</Option>
                    )):
                        <Option disabled>No cities available on the selected province</Option>
                    }
        
                </Select>
            } */}
        </div>
    
    )


}