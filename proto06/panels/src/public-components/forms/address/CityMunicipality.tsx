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
}

export default function CityMunicipality(props:Props) {
    
    //PROPS
    const { setState, state } = props

    
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

    return (
        <Autocomplete
            key={resetKey}
            disablePortal
            id="city"
            options={cities}
            className='w-full'
            getOptionLabel={(city: CityMunicipalityInterface) => city.name}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="City (Select a province first)" />}
            disabled={!state.province.code}
        />
    )


}