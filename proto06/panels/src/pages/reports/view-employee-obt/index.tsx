import { Fragment, useEffect, useState } from 'react';

//LIBRARIES
import { DataGrid, GridRowsProp, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from "@material-tailwind/react";
import axios from 'axios';

//STORES
import { APILink } from '@/store/configureStore';
import { globalServerErrorMsg } from '@/store/configureStore';

//COMPONENTS
import ExportToCsvButton from '../../../public-components/ExportToCSVButton';
import SelectForm from '../../../public-components/forms/SelectForm';
import InputForm from '../../../public-components/forms/InputForm';
import axiosInstance from '@/helpers/axiosConfig';

export default function ViewEmployeeObt() {

    //STATES
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [dataRows, setDataRows] = useState([]);

    const [month, setMonth] = useState<number | string>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number | string>(new Date().getFullYear());

    const [isFetchReportError, setIsFetchReportError] = useState<Boolean>(false);

    const getEmployeeObt = async () => {

        setDataRows(curr => []);
        setIsFetchReportError(false)
        setIsLoading(true);

        await axiosInstance.get(`obt/?month=${month}&year=${year}&status=APD`).then(response => {

            setDataRows(curr => response.data);
            setIsLoading(false)

        }).catch((error: any) => {

            setDataRows(curr => []);
            setIsFetchReportError(true)
            setIsLoading(false)

        })
    }

    const convertDateToLocalString = (date: Date | string) => {

        const dateObject = new Date(date);

        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(dateObject.getDate()).padStart(2, '0');
        const year = dateObject.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;

        return formattedDate;
    }

    useEffect(() => {

        getEmployeeObt();

    }, [])

    const viewReports = () => {

        getEmployeeObt();

    }

    const convertMinuteToHours = (value:number) => {
        return value/60
    }

    const exportCsvData = dataRows? dataRows.map((obj:any) => {
        return {
            "Employee No.": obj.emp_no,
            "Employee Name": obj.emp_name,
            "Date Start": obj.obt_date_from,
            "Date End": obj.obt_date_to,
            "OBT Type": obj.obt_type,
            "OBT Location": obj.obt_remarks,
            "OBT Hours": convertMinuteToHours(obj.obt_total_hours),
        }

    }): [];

  

    
    const columns: GridColDef[] = [
        { 
            field: 'emp_no', 
            headerName: 'Employee No.', 
            width: 150,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.emp_no as number;
            },
        },
        { 
            field: 'emp_name', 
            headerName: 'Employee Name', 
            width: 150,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.emp_name as string;
            },
        },
        {
            field: 'obt_date_from', 
            headerName: 'Date Start', 
            width: 150,
            valueGetter: (params: GridValueGetterParams) => {
                return convertDateToLocalString(params.row.obt_date_from);
            },
        },
        {
            field: 'obt_date_to', 
            headerName: 'Date End',
            width: 150,
            valueGetter: (params: GridValueGetterParams) => {
                return convertDateToLocalString(params.row.obt_date_to);
            },
        },
        {
            field: 'obt_type', 
            headerName: 'Over Type', 
            width: 150,
        },
        {
            field: 'obt_total_hours', 
            headerName: 'OBT Hours', 
            width: 150,
        },

    ];

    
    const options= [
        {
            name: "January",
            value: "1"
        },
        {
            name: "February",
            value: "2"
        },
        {
            name: "March",
            value: "3"
        },
        {
            name: "April",
            value: "4"
        },
        {
            name: "May",
            value: "5"
        },
        {
            name: "June",
            value: "6"
        },
        {
            name: "July",
            value: "7"
        },
        {
            name: "August",
            value: "8"
        },
        {
            name: "September",
            value: "9"
        },
        {
            name: "October",
            value: "10"
        },
        {
            name: "November",
            value: "11"
        },
        {
            name: "December",
            value: "12"
        }
    ]

    // const csvHeader = columns.map(column => column.headerName);

    
  
    return (
        <Fragment>
            <div className="my-10">

                <ExportToCsvButton
                    data={exportCsvData}
                    defaultName={`Employee-OBT-${options[(month as number) -1].name}-${year}`}
                    isDisable={!dataRows || dataRows.length == 0}
                />

                <div className="md:flex md:space-x-4 md:items-center">
                    <SelectForm         
                        label="Select Month"
                        variant="standard"
                        placeholder="Select A Month"
                        currValue={month?.toString()}
                        setState={setMonth}
                        options={options}
                        isDisable={isLoading}
                    />
                    <InputForm 
                        currVal={year?.toString()}
                        label="Year"
                        variant="standard"
                        placeholder="Enter A Year"
                        setState={setYear}
                        isDisable={isLoading}
                    />
                    <Button 
                        variant="filled"
                        size="lg"
                        color='indigo'
                        onClick={() => viewReports()}
                        disabled={isLoading}
                    >
                        View
                    </Button>


                </div>

                <div className="my-6 h-[500PX] w-full">
                    {/* add a loading interface here to indicate that the report needed is loading */}
                    <DataGrid
                    rows={dataRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 100 },
                        },
                    }}
                    pageSizeOptions={[25, 50, 75, 100]}
                    // onRowClick={(e) => {
                    //     setSingleUSERDetailsData(e.row);
                    //     setSingleUSEROpenModal(true);
                    // }}
                    // disableRowSelectionOnClick 
                    localeText={{ noRowsLabel: isFetchReportError? 'Something Went Wrong': isLoading? 'Loading Data...': 'No Data'}}
                    />


                </div>
            </div>
        </Fragment>
    )
}