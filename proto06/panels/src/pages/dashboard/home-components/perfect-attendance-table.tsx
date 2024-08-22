import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { APILink, RootState, globalTime } from '@/store/configureStore';
// import { QuickAccessOBTPageColumns } from '@/data/pages-data/quick-accesses-data/obt-data';
import { OBTViewFilterEmployeeInitialState, OBTViewInterface } from '@/types/types-pages';

import { OBTViewFilterEmployeeAction } from '@/store/actions/procedurals';
import dayjs from 'dayjs';
import { PERFECTATTENDANCEViewInterface } from '@/types/types-employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


interface Perfect_Attendance_Table_Props<T, Status>{
  state: T[]
  status: Status
}

export default function PerfectAttendanceTable<T, Status>(props: Perfect_Attendance_Table_Props<T, Status>) {
  const { state, status } = props;
  const [singleOBTOpenModal, setSingleOBTOpenModal] = useState<boolean>(false);
  const [singleOBTDetailsData, setSingleOBTDetailsData] = useState<OBTViewInterface>(OBTViewFilterEmployeeInitialState);
  const { OBTViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, error } = OBTViewFilterEmployee;

  const PerfectAttendanceField: GridColDef[] = 
  [
    {
      field: 'Image_Source',
      headerName: 'Profile Picture',
      width: 150,
      renderCell: (params: GridCellParams) => {
        if (params.value){
          return(
            
            <img src={`${APILink.replace('/api/v1/', '')}${params.value as string}`} alt="" width="50" height="50" style={{borderRadius: "10px", height: "40px", width: "40px", objectFit: "cover", border: "1px solid white", boxShadow: "1px 1px 10px gray"}}/>
            )
        } else {
          return (
            null
          )    
        }
      },
    },
    
    { field: 'Department_ID', headerName: 'Department ID', width: 120 },
    { field: 'Division_ID', headerName: 'Division ID', width: 120 },
    // {
    //   field: 'datetime_bio_time',
    //   headerName: 'Time',
    //   width: 150,
    //   description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
    //   sortable: true,

    // },
    { field: 'Position_ID', headerName: 'Position ID', width: 120 },
    { field: 'Employee_Name', headerName: 'Employee Full Name:', width: 300 },
  ];

  return (
    <Fragment>
      <div style={{ height: '600px', width: '100%' , padding: "10px"}}>
        <DataGrid
          rows={state ? state : []}
          // rows={[]}
          columns={PerfectAttendanceField}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 15 },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          onRowClick={(e) => {
            setSingleOBTDetailsData(e.row);
            setSingleOBTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${typeof status === 'string' ? status.toUpperCase() : status}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
