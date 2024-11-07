import { useOptionData } from "@/custom-hooks/use-option-data"
import CutOffPeriodByYearField from "@/public-components/forms/CutOffPeriodByYearField"
import YearField from "@/public-components/forms/YearField"
import { DataGrid } from "@mui/x-data-grid"
import dayjs from "dayjs"
import { useEffect, useState } from "react"


export default function ProcessPayroll() {

    const { cutoffs, employees, fetchCutOffs, fetchEmployees } = useOptionData()

    const [filter, setFilter] = useState<any>(
        {
            year: dayjs().format('YYYY'),
            cutOffID: null
        }
    )

    const handleChangeFilter = (e:any) => {
        const { name, value } = e.target 
        setFilter((curr:any) => (
            {
                ...curr,
                [name]: value
            }
        ))
    }

    useEffect(() => {
        fetchEmployees()
    },[])

    const columns = [
        {
            field: "emp_no",
            headerName: "Employee No."
        },
        {
            field: "emp_no",
            headerName: "Employee No."
        },
    ]

    return (
        <div>
            <div id="payroll-process-wrapper" className="mt-20">
                <div className="flex gap-4">
                    <YearField 
                        handleChange={handleChangeFilter}
                        name="year"
                        className="w-56"
                    />
                    <CutOffPeriodByYearField 
                        handleChange={handleChangeFilter}
                        year={filter.year} 
                        defaultId={filter?.cutOffID}
                        className="w-64"             
                    />
                </div>
                <br></br>
                <div>
                    <DataGrid 
                        columns={[]} 
                        rows={[]}
                    />
                </div>
            </div>
        </div>
    )
}