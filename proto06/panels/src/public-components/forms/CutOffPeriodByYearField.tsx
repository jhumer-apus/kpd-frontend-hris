import { useOptionData } from "@/custom-hooks/use-option-data"
import AutocompleteField from "./AutoCompleteField"
import { useEffect } from "react"

interface Props {
    handleChange: (key:string, newValue:any) => void,
    year: number
    defaultId: number
    [key:string]:any
}
export default function CutOffPeriodByYearField (props: Props) {

    const { handleChange, year, defaultId, ...restProps } = props
    const { cutoffs, fetchCutOffs } = useOptionData()

    useEffect(() => {
        fetchCutOffs(year)
    },[year])

    return (
        <AutocompleteField 
            id="cutoff"
            options={cutoffs.data} 
            label="Cut Off Periods" 
            getOptionLabel={(option:any) => option?.name ?? ""} 
            handleChange={handleChange} 
            value={defaultId} 
            disabled={false} 
            loading={cutoffs.loading} 
            optionNameKey="name" 
            stateKey="cutOffID"
            {...restProps}
        />
    )
}