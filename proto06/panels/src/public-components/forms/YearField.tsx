import dayjs from "dayjs"
import { Fragment, useMemo } from "react"
import SelectField from "./SelectField"

interface Props {
    handleChange: (e:any) => void
    [key:string] : any
}
export default function YearField(props: Props) {

    const { handleChange, ...restProps } = props

    const currentYear = parseInt(dayjs().format('YYYY'))

    const getListOfYears = useMemo(() => {
        const listOfYears = []
        for(let year = currentYear; 1900 < year; year--) {
            listOfYears.push(
                {
                    value: year.toString(),
                    label: year.toString()
                }
            )
        }
        return listOfYears
    },[])

    return (
        <Fragment>
            <SelectField
                label="Year"
                options={getListOfYears}
                onChange={handleChange}
                {...restProps}
            />
        </Fragment>
    )
}