import axiosInstance from "@/helpers/axiosConfig";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";

interface CityDataInterface {
    id: number | string,
    name: string,
    province_code: string
}

interface CityInterface {
    data: CityDataInterface[],
    loading: boolean
}

interface Props {
    valueId: number,
    provinceCode: string | number
    label: string,
    name: string
    disabled: boolean
    handleChange: (name:string , newValue: CityDataInterface | string) => void
}


export default function CityField(props:Props) {

    const { valueId, label, name, provinceCode, disabled, handleChange } = props

    const [cities, setCities] = useState<CityInterface>(
        {
            data: [],
            loading: false
        }
    )

    useEffect(() => {
        fetchCities()
    },[provinceCode])

    const fetchCities = async () => {

        setCities(curr => (
            {
                data: [],
                loading: true
            }
        ))

        await axiosInstance.get(`city_municipality/`, 
            {
                params: {
                    code: provinceCode
                }
            }
        )
            .then(res => {
                Array.isArray(res.data) 
                    ? setCities(curr => (
                        {
                            data: res.data,
                            loading: false
                        }
                    ))
                    : setCities(curr => (
                        {
                            data: [],
                            loading: false
                        }
                    ))
            })
            .catch(err => {
                console.error(err)
                setCities(curr => (
                    {
                        data: [],
                        loading: false
                    }
                ))
            })
    }

    const categorizeCities = useMemo(() => cities.data.map((option) => {
        const firstLetter = option?.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    }), [cities.data]);

    const isOptionEqualToValue = (option: any, value: any) => option.id == value.id
    const findValue = useMemo(() => {
        const foundValue = cities.data.find(option => option.id == valueId) ?? ""
        if(foundValue) handleChange(name, foundValue)
        return foundValue
    }, [cities.data, valueId])

    return (
        <Autocomplete
            options={categorizeCities.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option?.name || ""}
            onChange={(e:any, newValue:any) => handleChange(name, newValue)}
            className="w-full"
            isOptionEqualToValue={isOptionEqualToValue}
            value={findValue}
            disabled={disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label ?? "City/Municipality"}
                    InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <Fragment>
                            {cities.loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}