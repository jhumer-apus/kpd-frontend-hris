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
    currentProvinceCode: number | string | null
    isReadOnly?: boolean;
    name: string;
    isDisable?: boolean
}

export default function SelectCityMunicipality(props:Props) {
    
    //PROPS
    const { isReadOnly, isDisable, defaultCityId, currentProvinceCode, name, updateAddress } = props

    //STATES
    const [cities, setCities] = useState<CityMunicipalityInterface[]>([])
    const [resetKey, setResetKey] = useState<number>(0);

    const [currentCity, setCurrentCity] = useState<string | number| null| undefined>(null)

    //USE EFFECTS
    useEffect(() => {

        setResetKey(curr => curr + 1)
        setCurrentCity(curr => null)
        updateAddress(name, null)
        fetchCities()
        
    }, [currentProvinceCode])

    useEffect(() => {

        if(cities.length > 0) {
            const foundCity = findCity(defaultCityId)
            setCurrentCity(curr => defaultCityId)
            updateAddress(name, foundCity)

        }

    },[cities.length])


    //FUNCTIONS
    const fetchCities = async() => {

        if(currentProvinceCode) {
            console.log("hehe")
            await axios.get(`${APILink}city_municipality/`,{

                params: {
                    code: currentProvinceCode
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
            console.log(newValue)
            const cityFound = findCity(newValue)
            // setCurrentCity(curr => newValue)
            updateAddress(name, cityFound)
        }
    }

    // useEffect(() => {
    //     console.log(currentCity)
    // },[currentCity])

    return (
        <div className='w-full'>
            {cities.length > 0 &&
                <Select
                    key={resetKey}
                    label="City: (Select a province first)"
                    placeholder="Select City"
                    onChange={handleChange}
                    disabled={isDisable}
                    value={currentCity?.toString()}
                >
                    {cities.length > 0 ? cities.map((city: CityMunicipalityInterface, index:number) => (
                        <Option key={index} value={city.id.toString()}>{city.name}</Option>
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