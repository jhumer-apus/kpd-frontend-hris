import axiosInstance from "@/helpers/axiosConfig";
import { Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    valueId: number,
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

    const { valueId } = props

    const [provinces, setProvinces] = useState<ProvinceInterface>(
        {
            data: [],
            loading: false
        }
    )

    useEffect(() => {
        fetchProvinces()
    },[])

    const categorizeProvinces = provinces.data.map((option) => {
        const firstLetter = provinces.data?.name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });

    const isOptionEqualToValue = (option: any, value: any) => option.id == value.id
    // const findValue = options.find(option => option.id == defaultValueId) ?? ""

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

    return (
        <Autocomplete
            options={categorizeOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => getOptionLabel(option)}
            onChange={(e:any, newValue: string | null) => handleChange(e, newValue)}
            className="w-full"
            renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                    <Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </Fragment>
                    ),
                  }}
                />
              )}
            isOptionEqualToValue={isOptionEqualToValue}
            value={findValue}
            disabled={disabled}
        />
    )
}