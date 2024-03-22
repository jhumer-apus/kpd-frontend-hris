import {useState, useEffect} from 'react'

//LIBARIES
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios'
import InputLabel from '@mui/material/InputLabel';

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
    city_id?: any
}

export default function AllCityMunicipality(props:Props) {

    //PROPS
    const { setState, state, city_id } = props
    
    //STATES
    const [cities, setCities] = useState<CityMunicipalityInterface[]>([])

    //USE EFFECTS
    useEffect(() => {
        fetchAllCities()
    },[])

    useEffect(() => {

        if(cities.length > 0) {
            findCity(city_id)
        }

    },[cities.length])


    const fetchAllCities = async () => {

        await axios.get(`${APILink}city_municipality/`).then((res:AxiosResponse) => {
            const sortedCities = res.data.sort((a:any, b:any) => a.name.localeCompare(b.name));
            setCities(curr => sortedCities)

        }).catch((err: AxiosError) => {
            console.log(err)
        })
    }

    const handleChange = (e: any, newValue: CityMunicipalityInterface | null) => {
        if(newValue) {
            setState((curr:any) => ({
                ...curr,
                city: newValue
            }))
        }
    }
    const findCity = (val:any) => {
        const selectedCity = cities.find(city => city.id == val)
        if(selectedCity) {
            setState((curr:any) => ({
                ...curr,
                city: selectedCity
            }))
            return selectedCity
        }
    }
    
    return (
        <div className='w-full'>
            <Autocomplete
                value={state?.city}
                disablePortal
                id="city"
                options={cities}
                className='w-full'
                getOptionLabel={(city: CityMunicipalityInterface) => city.name}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label="City" />}
            />
        </div>
    )


}