import useFetchQuery from "@/custom-hooks/use-fetch-query";
import { UPDATE_RELATIVES } from "@/store/actions/personal-history";
import { APILink, RootState } from "@/store/configureStore";
import { Typography } from "@material-tailwind/react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    currEmpNo: number | null,
    isTableLoading: boolean,
    fetchRelatives: (emp_no: number) => Promise<void>
}

export default function TableRelatives(props: Props) {

    //PROPS
    const { currEmpNo, isTableLoading, fetchRelatives } = props

    //STATES
    const [currEmpSelected, setCurrEmpSelected] = useState<number | null>(currEmpNo)

    //REDUX
    const relativesState = useSelector((state:RootState) => state.personalHistory.relatives)

    //HOOKS
    const {data:employees, status: employeeStatus, error: employeeErr} = useFetchQuery(`${APILink}/employees/`, null)

    //USE EFFECTS
    useEffect(() => {
        fetchRelatives(currEmpSelected)
    }, [])

    //FUNCTIONS
    const selectedValue = (currEmpSelected: number | null) => {
        return Array.isArray(employees) ? employees.find((emp:any) => emp.emp_no == currEmpSelected): null
    }
    
    //STATIC
    const columns: GridColDef[] = [
        {
            field: 'full_name',
            headerName: 'Full Name',
            flex:1,
            valueGetter: (params: GridValueGetterParams): string => {
            return `${params.row.first_name} ${params.row.middle_name ?? ''} ${params.row.last_name} ${params.row.suffix}`;
            },
        },
        {
            field: 'age',
            headerName: 'Age',
            flex:1,
            valueGetter: (params: GridValueGetterParams): string => {
                return `${params.row.age}`;
            },
        },
        {
            field: 'relationship',
            headerName: 'Relationship',
            flex:1,
            valueGetter: (params: GridValueGetterParams): string => {
                return `${params.row.relation}`;
            },
        },
    ];

    return (
        <div>
            <Typography variant="h6">Relatives</Typography>
            <br></br>
            <div>
                <div className="flex gap-4 w-full">
                    <Autocomplete
                        disablePortal
                        id="emp_no"
                        options={Array.isArray(employees)? employees: []}
                        // sx={{ width: 'full' }}
                        className="grow"
                        getOptionLabel={(option:any) => `${option? option?.emp_no + ' - ' + option?.emp_full_name: ''}`}
                        loading={employeeStatus == 'loading'}
                        renderInput={(params) => <TextField {...params} label="Employee" />}
                        isOptionEqualToValue={(option, value) => option?.emp_no == value}
                        value={selectedValue(currEmpSelected)}
                        onChange={(e: any, newValue: any) => {
                            
                            newValue && setCurrEmpSelected(curr => newValue?.emp_no)
                        }}
                    />
                    <Button 
                        variant="outlined" 
                        onClick={() => {
                            currEmpSelected && fetchRelatives(currEmpSelected)
                        }}
                    >
                        View
                    </Button>
                </div>
                <br></br>
                <DataGrid 
                    columns={columns} 
                    rows={Array.isArray(relativesState)? relativesState: []}       
                    localeText={{ noRowsLabel: 'No Relatives' }}
                    loading={ isTableLoading }    
                    getRowHeight={(params) => 50} 
                />
            </div>

        </div>
    )
}