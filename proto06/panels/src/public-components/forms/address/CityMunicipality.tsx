import {useState, useEffect} from 'react'

//LIBARIES
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios'
import InputLabel from '@mui/material/InputLabel';

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
}

export default function CityMunicipality(props:Props) {
    
    //PROPS
    const { name, defaultCityId, isReadOnly, currentProvinceCode, updateAddress } = props

    //STATES
    const [cities, setCities] = useState<CityMunicipalityInterface[]>([])
    const [currentCity, setCurrentCity] = useState<CityMunicipalityInterface | null>(null)
    const [resetKey, setResetKey] = useState<number>(0);


    //USE EFFECTS
    useEffect(() => {

        setResetKey(curr => curr + 1)
        
        setCurrentCity(null)
        updateAddress(name, null)

        fetchCities()
        console.log(currentProvinceCode)
    }, [currentProvinceCode])

    useEffect(() => {

        if(cities.length > 0) {

            findCity(defaultCityId)

        }

    },[cities.length])

    //FUNCTIONS
    const fetchCities = async() => {

        console.log(currentProvinceCode)
        if(currentProvinceCode) {
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

    const handleChange = (e: any, newValue: CityMunicipalityInterface | null) => {

        if(newValue) {  

            setCurrentCity(curr => newValue)
            updateAddress(name, newValue)

        }
    }

    const findCity = (val:any) => {

        if(val) {

            const selectedCity = cities.find(city => city.id == val)

            if(selectedCity) {

                setCurrentCity(curr => selectedCity)
                updateAddress(name, selectedCity)

            }
        }
    }
    return (
        <div className='w-full'>
            {cities.length > 0 ?
                <Autocomplete
                    key={resetKey}
                    value={currentCity}
                    disablePortal
                    id="city"
                    options={cities}
                    className='w-full'
                    getOptionLabel={(city: CityMunicipalityInterface) =>  city?.name?? ''}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="City (Select a province first)" />}
                    disabled={cities.length == 0}
                    readOnly={isReadOnly}
                />:
                <Autocomplete
                    key={resetKey}
                    value={currentCity}
                    disablePortal
                    id="city"
                    options={cities}
                    className='w-full'
                    getOptionLabel={(city: CityMunicipalityInterface) => city?.name?? ''}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="City (Select a province first)" />}
                    disabled
                    readOnly={isReadOnly}
                />
            }
        </div>
    )


}