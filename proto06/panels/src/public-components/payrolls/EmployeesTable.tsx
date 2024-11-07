import { useOptionData } from "@/custom-hooks/use-option-data";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";

interface Props {
    onSelectedRow: (selectedRow:any) => void
}
export default function EmployeesTable(props: Props) {

    const { onSelectedRow } = props
    const { employees, fetchEmployees } = useOptionData()

    useEffect(() => {
        fetchEmployees()
    },[])

    const columns:GridColDef[] = [
        {
            field: "emp_no",
            headerName: "Employee No.",
            flex: 1
        },
        {
            field: "emp_full_name",
            headerName: "Full Name",
            flex: 1
        },
        {
            field: "branch",
            headerName: "Branch",
            flex: 1,
            valueGetter: (params:any) => {
                return params.row.branch_data.branch_name
            }
        }
    ]
    
    return (
        <div className="h-[700px]">
            <DataGrid 
                columns={columns} 
                rows={employees.data}
                loading={employees.loading}
                checkboxSelection
                localeText={{noRowsLabel: `No Employees`}}
                onRowSelectionModelChange={(rowID) => {
                    const selectedRows = employees.data.filter((employee:any) => rowID.includes(employee.id));
                    onSelectedRow(selectedRows)
                }}
            />
        </div>
    )
}