import { Fragment, useEffect, useState } from 'react';

//LIBRARIES
import { DataGrid, GridRowsProp, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';

//STORES
import { APILink } from '@/store/configureStore';
import { globalServerErrorMsg } from '@/store/configureStore';

//COMPONENTS
import ExportToCsvButton from './local-components/export-to-csv-button';
import SelectForm from '../../../public-components/forms/SelectForm';
import InputForm from '../../../public-components/forms/InputForm';

interface EmployeeData {
    id: number;
    emp_no: number;
    full_name: string;
    [date: string]: string | number;
}

export default function ViewSkyFreightReports() {

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    
    // dont need the local state because, better to declare the data coming from API into the central state?
    // const [columnsApi, setColumnsApi] = useState<[]>([])

    //STATES
    const [dateColumns, setDateColumns] = useState<GridColDef []>([]);
    const [dataRows, setDataRows] = useState<EmployeeData[]>([]);
    const [month, setMonth] = useState<number | string | undefined>();
    const [year, setYear] = useState<number | string | undefined>();
    const [isFetchReportError, setIsFetchReportError] = useState<Boolean>(false);


    // useEffect(()=> {
    //     //set dispatch action here to get response from Marc's API with query of whatever month / year to check report
    //     //code here
    //     //setState setColumnsApi to list down all month of the queried request 
    //     //code here

    //     //dont forget to set the dependencies of useEffect
    // }, [])

    const handleMonthChange = (e:any) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e:any) => {
        setYear(e.target.value);
    };

    const getLastDayOfMonth = (year: number, month: number) => {
        
        const lastDay = new Date(year, month, 0).getDate();
        return lastDay;
    }

    

    const getColumnsDailyOnSpecificMonth = (year:any, month:any): any[] => {

        const listOfDaysInMonth: any[] = []
        const lastDay = getLastDayOfMonth(year, month);

        for(let i = 1; i <= lastDay; i++) {
            const date = new Date(year, month - 1, i);

            const convertedDateToLocaleString = convertDateToLocalString(date);
            const column = { 
                field: convertedDateToLocaleString, 
                headerName: convertedDateToLocaleString, 
                width: 200 
            }
            listOfDaysInMonth.push(column)
        }
        return listOfDaysInMonth;
    }

    const convertTimeToAMPMFormat = (timeString:string): string => {

        if(!timeString) {
            return ""
        }
        // Split the time string into hours, minutes, and seconds
        const [hours, minutes, seconds] = timeString.split(':');
    
        // Convert hours to AM/PM format
        let formattedHours = parseInt(hours, 10) % 12;
        formattedHours = formattedHours === 0 ? 12 : formattedHours;
    
        // Add leading zeros to minutes and seconds
        const formattedMinutes = minutes.padStart(2, '0');
        const formattedSeconds = seconds.padStart(2, '0');
    
        // Determine whether it's AM or PM
        const amOrPm = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
    
        // Construct the formatted time string
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    };

    const getSkyFreightReports = async () => {

        setIsLoading(true);

        await axios.get(`${APILink}schedule_daily/?month=${month}&year=${year}`).then(response => {

            const data = response.data ? response.data: []
            console.log(data);
            const rows:any = [];

            data?.forEach((emp_orig:any) => {

                const foundEmployeeIndex = rows.findIndex((emp_struct:any) => emp_struct.emp_no == emp_orig.emp_no);

                const timeIn = emp_orig.schedule_shift_code?.time_in
                const timeOut = emp_orig.schedule_shift_code?.time_out

                if(foundEmployeeIndex > -1) {

                    const dateKey = convertDateToLocalString(emp_orig.business_date);
                    rows[foundEmployeeIndex][dateKey] = timeIn || timeOut? convertTimeToAMPMFormat(timeIn) + " - " + convertTimeToAMPMFormat(timeOut): "OFF"
                    // rows[foundEmployeeIndex][dateKey] = emp_orig.schedule_shift_code?.time_in + "-" + emp_orig.schedule_shift_code?.time_out
                    
                } else {

                    const dateKey = convertDateToLocalString(emp_orig.business_date);
                    
                    let employee: EmployeeData = {
                        id: emp_orig.id,
                        full_name: emp_orig.full_name,
                        emp_no: emp_orig.emp_no,
                    } 

                    employee[dateKey] = timeIn || timeOut? convertTimeToAMPMFormat(timeIn) + " - " + convertTimeToAMPMFormat(timeOut): "OFF"
                    // employee[dateKey] = emp_orig.schedule_shift_code?.time_in + "-" + emp_orig.schedule_shift_code?.time_out;
                    
                    rows.push(employee);
                }
            })
            setDataRows((curr:any) => rows);
            setIsLoading(false)

        }).catch((error: any) => {
            setIsFetchReportError(true)
        })

    }

    const convertDateToLocalString = (date: Date) => {

        const dateObject = new Date(date);

        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(dateObject.getDate()).padStart(2, '0');
        const year = dateObject.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;

        return formattedDate;
    }

    const fetchApiSkyFreightReports = ():void => {

    } 

    useEffect(() => {

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        setMonth(currentMonth);
        setYear(currentYear);
        // setRows([
        //     {
        //       id: 1,
        //       emp_no: 1001,
        //       emp_full_name: "john_doe1",
        //       "10/01/2023": "7:00AM-5:45PM",
        //       "10/02/2023": "",
        //       "10/03/2023": "7:00AM-5:45PM",
        //       "10/04/2023": "7:00AM-5:45PM",
        //     },
        //     {
        //       id: 2,
        //       emp_no: 1002,
        //       emp_full_name: "john_doe2",
        //       "10/01/2023": "7:00AM-5:45PM",
        //       "10/02/2023": "",
        //       "10/03/2023": "7:00AM-5:45PM",
        //       "10/04/2023": "7:00AM-5:45PM",
        //     },
        //     {
        //       id: 3,
        //       emp_no: 1003,
        //       emp_full_name: "john_doe3",
        //       "10/01/2023": "7:00AM-5:45PM",
        //       "10/02/2023": "",
        //       "10/03/2023": "7:00AM-5:45PM",
        //       "10/04/2023": "7:00AM-5:45PM",
    
        //     },
        //     {
        //       id: 4,
        //       emp_no: 1004,
        //       emp_full_name: "john_doe4",
        //       "10/01/2023": "7:00AM-5:45PM",
        //       "10/02/2023": "",
        //       "10/03/2023": "7:00AM-5:45PM",
        //       "10/04/2023": "7:00AM-5:45PM",
    
        //     }
        //   ]);
    }, [])


    // Extracting all unique date keys from the rows
    // const allDates = rows.reduce((dates, row) => {
    //     Object.keys(row).forEach(key => {
    //     if (key !== 'id' && key !== 'emp_no' && key !== 'emp_full_name' && !dates.includes(key)) {
    //         dates.push(key);
    //     }
    //     });
    //     return dates;
    // }, [] as string[]);
      
    // // Generating column definitions for each date
    // const dateColumns = allDates.map(date => ({
    //     field: date,
    //     headerName: date,
    //     width: 150,
    // }));

    useEffect(() => {
        if(year && month) {
            setDateColumns(() => getColumnsDailyOnSpecificMonth(year, month));
            getSkyFreightReports();
        }
    }, [month, year]);
    
    const columns: GridColDef[] = [
        { 
            field: 'id', 
            headerName: 'Employee #', 
            width: 150,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.emp_no as number;
            },
        },
        { 
            field: 'full_name', 
            headerName: 'Full Name', 
            width: 150 
        },
        ...dateColumns,

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
  
    return (
        <Fragment>
            <div className="my-10">

                <ExportToCsvButton data={dataRows} />

                <div className="md:flex md:space-x-4">
                    <SelectForm         
                        label="Select Month"
                        variant="standard"
                        placeholder="Select A Month"
                        currValue={month?.toString()}
                        setState={setMonth}
                        options={options}
                    />
                    <InputForm 
                        val={year?.toString()}
                        label="Year"
                        variant="standard"
                        placeholder="Enter A Year"

                    />


                </div>

                <div className="my-6 h-[500PX] w-[1500px]">
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
                    localeText={{ noRowsLabel: 'No Data'}}
                    />


                </div>
            </div>
        </Fragment>
    )
}