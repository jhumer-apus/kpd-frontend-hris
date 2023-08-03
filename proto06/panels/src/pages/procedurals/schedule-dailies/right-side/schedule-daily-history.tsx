import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import { ProceduralSCHEDULEDAILYPageDescriptions, ProceduralSCHEDULEDAILYPageColumns } from '@/data/pages-data/procedural-data/schedule-daily-data';
import ViewSCHEDULEDAILYSingleModal from './local-components/main-modals/view-schedule-daily-single-modal';
import { SCHEDULEDAILYViewInterface } from '@/types/types-pages';
import { SCHEDULEDAILYViewAction, SCHEDULEDAILYViewFilterEmployeeAction } from '@/store/actions/procedurals';


interface ProceduralSCHEDULEDAILYPageHistoryInterface {
  currEmployee: number,
  setCurrEmployee: Dispatch<SetStateAction<number>>,
}

export default function ProceduralSCHEDULEDAILYPageHistory(props: ProceduralSCHEDULEDAILYPageHistoryInterface) {
  const {currEmployee, setCurrEmployee} = props;
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
    business_date: null,
    emp_no: null,
    is_restday: false,
  });
  const dispatch = useDispatch();
  const { spButtonIndex, dtrStatus } = useDtrState();
  const { SCHEDULEDAILYViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data } = SCHEDULEDAILYViewFilterEmployee;
  const SCHEDULEDAILYViewData = data as SCHEDULEDAILYViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    // if((SCHEDULEDAILYViewData?.length <= 0 || SCHEDULEDAILYViewData === null || SCHEDULEDAILYViewData === undefined ) && curr_user){
      dispatch(SCHEDULEDAILYViewFilterEmployeeAction({emp_no: currEmployee}))
    // }
  }, [currEmployee]);

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
          style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
          localeText={{ noRowsLabel: `${dtrStatus === 'loading' ? `${dtrStatus?.toUpperCase()}...` : dtrStatus === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (dtrStatus === null || dtrStatus === undefined) ? `No Daily Schedule found for Employee #${currEmployee}`: 'There is no SCHEDULEDAILY to generate. Double check with a Database Admin'}` }}
        />
      </div>
    </Fragment>
  );
}
