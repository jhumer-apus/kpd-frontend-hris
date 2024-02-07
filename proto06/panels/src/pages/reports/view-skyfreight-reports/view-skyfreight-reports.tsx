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

    const getSkyFreightReports = async () => {
        setIsLoading(true);
        await axios.get(`${APILink}schedule_daily/?month=10&year=2023`).then(response => {
            setRows(currentRows => response.data);
            setIsLoading(false)
        })
    }
    // getSkyFreightReports();

    useEffect(() => {
        getSkyFreightReports();
    }, []);


    useEffect(() => {
        console.log(rows);
    }, [rows])

    const columns: GridColDef[] = [
        { field: 'col1', headerName: 'Column 1', width: 150 },
        { field: 'col2', headerName: 'Column 2', width: 150 },
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
                    localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
                />
            </div>
            
        </Fragment>
    )
}