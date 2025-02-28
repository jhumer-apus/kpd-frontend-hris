import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Button, Typography } from "@material-tailwind/react";
import { ProceduralSCHEDULEDAILYPageDescriptions, ProceduralSCHEDULEDAILYPageColumns } from '@/data/pages-data/procedural-data/schedule-daily-data';
import ViewSCHEDULEDAILYSingleModal from './local-components/main-modals/view-schedule-daily-single-modal';
import { SCHEDULEDAILYViewInterface } from '@/types/types-pages';
import { SCHEDULEDAILYViewFilterEmployeeAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';
import { HandleModalAction } from '@/store/actions/components';
import EditBulkEmployeeSched from '@/public-components/modals/EditBulkEmployeeSched';


interface ProceduralSCHEDULEDAILYPageHistoryInterface {
  currEmployee: number,
  setCurrEmployee: Dispatch<SetStateAction<number>>,
}

export default function ProceduralSCHEDULEDAILYPageHistory(props: ProceduralSCHEDULEDAILYPageHistoryInterface) {
  const {currEmployee} = props;
  const [singleSCHEDULEDAILYOpenModal, setSingleSCHEDULEDAILYOpenModal] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any[] | []>([])
  const [singleSCHEDULEDAILYDetailsData, setSingleSCHEDULEDAILYDetailsData] = useState<SCHEDULEDAILYViewInterface>({
    id: NaN,
    is_processed: null,
    sched_default: null,
    schedule_shift_code: {
      name: null,
      time_in: null,
      time_out: null,
      grace_period: null,
      with_overtime: null,
      id: NaN,
      is_night_shift: false,
      date_deleted: '',
    },
    business_date: '',
    emp_no: NaN,
    is_restday: false,
  });
  const dispatch = useDispatch();
  const { SCHEDULEDAILYViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = SCHEDULEDAILYViewFilterEmployee;
  const SCHEDULEDAILYViewData = data as SCHEDULEDAILYViewInterface[];

  useEffect(()=> {
      dispatch(SCHEDULEDAILYViewFilterEmployeeAction({emp_no: currEmployee}))
  }, [currEmployee]);

  const filterSelectedRows = (arrayRowId: GridRowSelectionModel, details: GridCallbackDetails) => {
    const filteredRows = SCHEDULEDAILYViewData.filter((data:any, index:number) => {
      if(arrayRowId.includes(data.id)) return data
    }).map(filterObj => filterObj.id)
    setSelectedRows(curr => filteredRows)
  }

  const editOpenModal = () => {
      dispatch(HandleModalAction({
        name: "editBulkEmployeeSchedModal",
        value: true
    }))
  }

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewSCHEDULEDAILYSingleModal setSingleSCHEDULEDAILYDetailsData={setSingleSCHEDULEDAILYDetailsData} singleSCHEDULEDAILYDetailsData={singleSCHEDULEDAILYDetailsData} singleSCHEDULEDAILYOpenModal={singleSCHEDULEDAILYOpenModal} setSingleSCHEDULEDAILYOpenModal={setSingleSCHEDULEDAILYOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ProceduralSCHEDULEDAILYPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div 
        // style={{ width: '100%' }} 
        className="w-full"
      >
        <Button className='mb-2 px-4 py-2' onClick={() => editOpenModal()} disabled={selectedRows.length < 2}>Bulk Update Schedule</Button>
        <DataGrid
          autoHeight
          // autoPageSize
          loading={status === 'loading'}
          sx={{ '--DataGrid-overlayHeight': '465px' }}
          rows={SCHEDULEDAILYViewData? SCHEDULEDAILYViewData as SCHEDULEDAILYViewInterface[]:[]}
          columns={ProceduralSCHEDULEDAILYPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleSCHEDULEDAILYDetailsData(e.row);
            setSingleSCHEDULEDAILYOpenModal(true);
          }}
          disableRowSelectionOnClick
          checkboxSelection
          onRowSelectionModelChange={filterSelectedRows}
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
        <EditBulkEmployeeSched 
          selectedRows={selectedRows}
          emp_no={currEmployee}
        />
      </div>
    </Fragment>
  );
}
