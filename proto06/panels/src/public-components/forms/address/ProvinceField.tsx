import axiosInstance from "@/helpers/axiosConfig";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";

interface Props {
    valueId: number,
    label: string,
    name: string
    handleChange: (name:string , newValue: ProvinceData) => void
}

type ProvinceInterface = {
    data: ProvinceData[],
    loading: boolean
}

type ProvinceData = {
    id: number,
    name: string,
    code: string
}

export default function ProvinceField(props: Props) {

    const { valueId, label, name, handleChange } = props

    const [provinces, setProvinces] = useState<ProvinceInterface>(
        {
            data: [],
            loading: false
        }
    )

    useEffect(() => {
        fetchProvinces()
    },[])


    const fetchProvinces = async () => {
        await axiosInstance.get(`province/`).then(res => {
            setProvinces((curr:any) => (
                {
                    data: Array.isArray(res.data) ? res.data: [],
                    loading: false
                }
            ))
        })
        .catch(err => {
            console.error(err)
        })
    }

    const isOptionEqualToValue = (option: any, value: any) => option.id == value.id
    const findValue = useMemo(() => provinces.data.find(option => option.id == valueId) ?? "", [provinces.data, valueId])

    const categorizeProvinces = useMemo(() => provinces.data.map((option) => {
        const firstLetter = option?.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    }), [provinces.data]);

    return (
        <Autocomplete
            options={categorizeProvinces.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option?.name || ""}
            onChange={(e:any, newValue:any) => handleChange(name, newValue)}
            className="w-full"
            isOptionEqualToValue={isOptionEqualToValue}
            value={findValue}
            renderInput={(params) => (
                <TextField
                  {...params}
                  label={label ?? "Province"}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                    <Fragment>
                        {provinces.loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </Fragment>
                    ),
                  }}
                />
              )}
        />
    )
}