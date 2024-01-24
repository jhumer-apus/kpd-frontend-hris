import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { APILink, RootState, globalTime } from '@/store/configureStore';
// import { QuickAccessOBTPageColumns } from '@/data/pages-data/quick-accesses-data/obt-data';
import { OBTViewFilterEmployeeInitialState, OBTViewInterface } from '@/types/types-pages';

import { OBTViewFilterEmployeeAction } from '@/store/actions/procedurals';
import dayjs from 'dayjs';
import { PERFECTATTENDANCEViewInterface } from '@/types/types-employee-and-applicants';



interface Perfect_Attendance_Table_Props{
  state: PERFECTATTENDANCEViewInterface[]
}

export default function PerfectAttendanceTable(props: Perfect_Attendance_Table_Props) {
  const { state } = props;
  const [singleOBTOpenModal, setSingleOBTOpenModal] = useState<boolean>(false);
  const [singleOBTDetailsData, setSingleOBTDetailsData] = useState<OBTViewInterface>(OBTViewFilterEmployeeInitialState);
  const dispatch = useDispatch();
  const { OBTViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = OBTViewFilterEmployee;
  const OBTViewData = data as OBTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  const PerfectAttendanceField: GridColDef[] = 
  [
    {
      field: 'employee_image',
      headerName: 'Display Pic',
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
    { field: 'emp_no', headerName: 'Emp No:', width: 120 },
    { field: 'last_name', headerName: 'Last Name:', width: 120 },
    { field: 'first_name', headerName: 'First Name:', width: 120 },
    {
      field: 'datetime_bio_time',
      headerName: 'Time',
      width: 150,
      description: 'This column has a value getter and is not sortable. Use Filter instead, by clicking on the three dots beside this header.',
      sortable: true,
      valueGetter: (params: GridValueGetterParams) => {
        const shio = new Date(params.row.datetime_bio);
        return params.row.datetime_bio ? dayjs(shio).format(`${globalTime}`) : '-';
      },
    },
  ];

  useEffect(()=> {
    if((OBTViewData?.length <= 0 || OBTViewData === null || OBTViewData === undefined ) && curr_user){
      dispatch(OBTViewFilterEmployeeAction({emp_no: curr_user}))
    }
  }, [curr_user]);

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
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${error}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
