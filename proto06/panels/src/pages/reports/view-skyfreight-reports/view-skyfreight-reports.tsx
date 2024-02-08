import { Fragment, useEffect, useState } from 'react';

//LIBRARIES
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

//STORES
import { APILink } from '@/store/configureStore';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ViewSkyFreightReports() {

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [rows, setRows] = useState<GridRowsProp[]>([]);

    const [month, setMonth] = useState<Number|null>(10);
    const [year, setYear] = useState<Number|null>(2023);

    const [listOfCurrentMonth, setListOfCurrentMonth] = useState<String[]>([]);

    const getLastDayOfMonth = (year: number, month: number) => {
        
        const lastDay = new Date(year, month, 0).getDate();
        return lastDay;
    }

    const getSkyFreightReports = async () => {

        setIsLoading(true);

        await axios.get(`${APILink}schedule_daily/?month=${month}&year=${year}`).then(response => {
            setRows(currentRows => response.data);
            setIsLoading(false)
        })

    }

    useEffect(() => {
        getSkyFreightReports();
    }, []);

    const organizeDailySchedulesOfemployees = () => {};

    // const result = data.reduce((acc, obj) => {
    //     const found = acc.find(item => item[0].id === obj.id);
    //     if (found) {
    //         found.push(obj);
    //     } else {
    //         acc.push([obj]);
    //     }
    //     return acc;
    // }, []);

    useEffect(() => {
        console.log(rows);
    }, [rows])

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', width: 150 },
        { field: 'full_name', headerName: 'NAME', width: 150 },
    ];
      
      
    return (
        <Fragment>
            <div className="h-56 w-fit">
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