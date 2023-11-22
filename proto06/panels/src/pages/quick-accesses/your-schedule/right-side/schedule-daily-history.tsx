import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ProceduralSCHEDULEDAILYPageColumns } from '@/data/pages-data/procedural-data/schedule-daily-data';
import ViewSCHEDULEDAILYSingleModal from './local-components/main-modals/view-schedule-daily-single-modal';
import { SCHEDULEDAILYViewInterface } from '@/types/types-pages';
import { SCHEDULEDAILYViewFilterEmployeeAction } from '@/store/actions/procedurals';


interface ProceduralSCHEDULEDAILYPageHistoryInterface {
  currEmployee: number,
  setCurrEmployee: Dispatch<SetStateAction<number>>,
}

export default function ProceduralSCHEDULEDAILYPageHistory(props: ProceduralSCHEDULEDAILYPageHistoryInterface) {
  const {currEmployee} = props;
  const [singleSCHEDULEDAILYOpenModal, setSingleSCHEDULEDAILYOpenModal] = useState<boolean>(false);
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
    emp_no: NaN,
    is_restday: false,
    business_date: ''
  });
  const dispatch = useDispatch();
  const { SCHEDULEDAILYViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, status } = SCHEDULEDAILYViewFilterEmployee;
  const SCHEDULEDAILYViewData = data as SCHEDULEDAILYViewInterface[];

  useEffect(()=> {
      dispatch(SCHEDULEDAILYViewFilterEmployeeAction({emp_no: currEmployee}))
  }, [currEmployee]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewSCHEDULEDAILYSingleModal setSingleSCHEDULEDAILYDetailsData={setSingleSCHEDULEDAILYDetailsData} singleSCHEDULEDAILYDetailsData={singleSCHEDULEDAILYDetailsData} singleSCHEDULEDAILYOpenModal={singleSCHEDULEDAILYOpenModal} setSingleSCHEDULEDAILYOpenModal={setSingleSCHEDULEDAILYOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{'On this table, you will find your shift schedule history and their details each.'}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={SCHEDULEDAILYViewData? SCHEDULEDAILYViewData as SCHEDULEDAILYViewInterface[]:[]}
          columns={ProceduralSCHEDULEDAILYPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleSCHEDULEDAILYDetailsData(e.row);
            setSingleSCHEDULEDAILYOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'Fetching Failed. Contact your administrator/support.' : (status === null || status === undefined) ? `Fetch Undefined. Refresh Page.`: `No Daily Schedule found for Employee #${currEmployee}`}` }}
        />
      </div>
    </Fragment>
  );
}
