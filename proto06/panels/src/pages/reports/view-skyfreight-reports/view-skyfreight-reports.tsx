import { Fragment, useEffect, useState } from 'react';

//LIBRARIES
import { DataGrid, GridRowsProp, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';

//STORES
import { APILink } from '@/store/configureStore';
import { globalServerErrorMsg } from '@/store/configureStore';

interface EmployeeData {
    id: number;
    emp_no: number;
    emp_full_name: string;
    [date: string]: string | number;
}
export default function ViewSkyFreightReports() {

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    // const [rows, setRows] = useState<any[]>([]);
    // dont need the local state because, better to declare the data coming from API into the central state?
    const [columnsApi, setColumnsApi] = useState<[]>([])

    useEffect(()=> {
        //set dispatch action here to get response from Marc's API with query of whatever month / year to check report
        //code here
        //setState setColumnsApi to list down all month of the queried request 
        //code here

        //dont forget to set the dependencies of useEffect
    }, [])

    const [month, setMonth] = useState<number>(10);
    const [year, setYear] = useState<number>(2023);

    const [listOfCurrentMonth, setListOfCurrentMonth] = useState<String[]>([]);

    const getLastDayOfMonth = (year: number, month: number) => {
        
        const lastDay = new Date(year, month, 0).getDate();
        return lastDay;
    }

    const getColumnsDailyOnSpecificMonth = (year: number, month: number): any[] => {

        const listOfDaysInMonth: any[] = []
        const lastDay = getLastDayOfMonth(year, month);

        for(let i = 1; i <= lastDay; i++) {
            const date = new Date(year, month - 1, i);

            const column = { 
                field: 'schedule' + i, 
                headerName: date.toLocaleDateString(), 
                width: 150 
            }
            listOfDaysInMonth.push(column)
        }
        return listOfDaysInMonth;
    }

    const columnGrid = getColumnsDailyOnSpecificMonth(year, month);

    // const getSkyFreightReports = async () => {

    //     setIsLoading(true);

    //     await axios.get(`${APILink}schedule_daily/?month=${month}&year=${year}`).then(response => {

    //         const data = response.data;

    //         columnGrid.forEach(date => {

    //             data.forEach((employee:any) => {

    //                 const foundEmployee = rows.find(emp => emp.emp_no == employee.emp_no)
    
    //                 if(foundEmployee){
    
    //                 } else {
    
    //                     const empScheduleData = {
    //                         id: employee.id,
    //                         full_name: employee.full_name,
    //                     }
                        
    //                     if(date == convertDateToLocalString(employee.business_date)) {

    //                     }
    //                     rows.push()
    //                 }
    
    //             });

    //         })
    
    //         // data.forEach((employee:any) => {

    //         //     const foundEmployee = rows.find(emp => emp.emp_no == employee.emp_no)

    //         //     if(foundEmployee){

    //         //     } else {

    //         //         const empScheduleData = {
    //         //             id: employee.id,
    //         //             full_name: employee.full_name,
    //         //         }

    //         //         columnGrid.forEach(date => {
    //         //             if()
    //         //         })
    //         //         rows.push()
    //         //     }

    //         // });

            
    //         // for (let i = 0; i < columnGrid.length; i++) {

    //         //     const row:any = {}
    //         //     const key = columnGrid[i];

    //         //     data.forEach((employee:any) => {

    //         //         const businessDate = convertDateToLocalString(employee.businessDate);
    //         //         if(key == businessDate) {

    //         //         }

    //         //     })

    //         //     if(key) {

    //         //     }

    //         //     row[key] = 'value'; 
    //         // }

    //         // setRows(currentRows => response.data);
    //         setIsLoading(false)
    //     })

    // }

    // const convertDateToLocalString = (date: Date) => {

    //     const dateObject = new Date(date);

    //     const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    //     const day = String(dateObject.getDate()).padStart(2, '0');
    //     const year = dateObject.getFullYear();

    //     const formattedDate = `${month}/${day}/${year}`;

    //     console.log(formattedDate);
    //     return formattedDate;
    // }



    // useEffect(() => {

    // },);

    // const organizeDailySchedulesOfemployees = () => {};

    // const result = data.reduce((acc, obj) => {
    //     const found = acc.find(item => item[0].id === obj.id);
    //     if (found) {
    //         found.push(obj);
    //     } else {
    //         acc.push([obj]);
    //     }
    //     return acc;
    // }, []);

    // useEffect(() => {
    //     console.log(rows);
    // }, [rows])


    const rows: EmployeeData[] = [
        {
          id: 1,
          emp_no: 1001,
          emp_full_name: "john_doe1",
          "10/01/2023": "7:00AM-5:45PM",
          "10/02/2023": "",
          "10/03/2023": "7:00AM-5:45PM",
          "10/04/2023": "7:00AM-5:45PM",
        },
        {
          id: 2,
          emp_no: 1002,
          emp_full_name: "john_doe2",
          "10/01/2023": "7:00AM-5:45PM",
          "10/02/2023": "",
          "10/03/2023": "7:00AM-5:45PM",
          "10/04/2023": "7:00AM-5:45PM",
        },
        {
          id: 3,
          emp_no: 1003,
          emp_full_name: "john_doe3",
          "10/04/2023": "7:00AM-5:45PM",
          "10/01/2023": "7:00AM-5:45PM",
          "10/02/2023": "",
          "10/03/2023": "7:00AM-5:45PM",

        },
        {
          id: 4,
          emp_no: 1004,
          emp_full_name: "john_doe4",
          "10/04/2023": "7:00AM-5:45PM",
          "10/01/2023": "7:00AM-5:45PM",
          "10/02/2023": "",
          "10/03/2023": "7:00AM-5:45PM",

        }
      ];


    // Extracting all unique date keys from the rows
    const allDates = rows.reduce((dates, row) => {
        Object.keys(row).forEach(key => {
        if (key !== 'id' && key !== 'emp_no' && key !== 'emp_full_name' && !dates.includes(key)) {
            dates.push(key);
        }
        });
        return dates;
    }, [] as string[]);
    console.log(allDates)
      
    // Generating column definitions for each date
    const dateColumns = allDates.map(date => ({
        field: date,
        headerName: date,
        width: 150,
    }));
    
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
  
    return (
        <Fragment>
            <div className="h-56 w-[1500px]">

                {/* add a loading interface here to indicate that the report needed is loading */}
                <DataGrid
                rows={rows}
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
                // localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
            />


            </div>
            
        </Fragment>
    )
}