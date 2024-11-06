import { useOptionData } from "@/custom-hooks/use-option-data"
import SelectField from "@/public-components/forms/SelectField"
import dayjs from "dayjs"
import { useMemo } from "react"

export default function ProcessPayroll() {

    const { cutoffs, fetchCutOffs } = useOptionData()

    const currentYear = dayjs().format('YYYY')

    const getListOfYears = useMemo(() => {
        
    },[])
    return (
        <div>
            <SelectField 
                options={[]}
            />
                
        </div>
    )
}