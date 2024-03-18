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

export default function CityMunicipality(props:Props) {
    
    //PROPS
    const { setState, state, city_id } = props

    console.log(state)
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
        
    }, [state.province])

    useEffect(() => {
        console.log(state)
        if(cities.length > 0) {
            findCity(city_id)
        }

    },[cities.length])

    //FUNCTIONS
    const fetchCities = async() => {

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

    const handleChange = (e: any, newValue: CityMunicipalityInterface | null) => {
        if(newValue) {
            setState((curr:any) => ({
                ...curr,
                city: newValue
            }))
        }
    }

    const findCity = (val:any) => {
        console.log(val)
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
            {cities.length > 0 &&
                <Autocomplete
                    key={resetKey}
                    value={state?.city}
                    disablePortal
                    id="city"
                    options={cities}
                    className='w-full'
                    getOptionLabel={(city: CityMunicipalityInterface) => city.name}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="City (Select a province first)" />}
                    disabled={!state.province?.code}
                />
            }
        </div>
    )


}