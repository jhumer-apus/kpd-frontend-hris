import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import { QuickAccessLEAVEPageDescriptions, QuickAccessLEAVEPageColumns } from '@/data/pages-data/quick-accesses-data/leaves-data';
import ViewLEAVESingleModal from './local-components/main-modals/view-leave-single-modal';
import { LEAVEViewInterface } from '@/types/types-pages';
import { LEAVEViewFilterEmployeeAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function QuickAccessLEAVEPageHistory() {
  const [singleLEAVEOpenModal, setSingleLEAVEOpenModal] = useState<boolean>(false);
  const [singleLEAVEDetailsData, setSingleLEAVEDetailsData] = useState<LEAVEViewInterface>({
    id: NaN,
    emp_no: NaN,
    leave_type: null,
    leave_remarks: null,
    leave_date_from: null,
    leave_date_to: null,
    leave_reason_disapproval: null,
    leave_date_approved1: null,
    leave_date_approved2: null,
    leave_approver1_empno: null,
    leave_approver2_empno: null,
    leave_date_filed: '',
    cutoff_code: NaN,
    applicant_rank: NaN,
    leave_approval_status: '',
    leave_total_hours: NaN,
    leave_number_days: NaN,
  });
  const dispatch = useDispatch();
  const { LEAVEViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = LEAVEViewFilterEmployee;
  const LEAVEViewData = data as LEAVEViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((LEAVEViewData?.length <= 0 || LEAVEViewData === null || LEAVEViewData === undefined ) && curr_user){
      dispatch(LEAVEViewFilterEmployeeAction({emp_no: curr_user}))
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewLEAVESingleModal setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} singleLEAVEDetailsData={singleLEAVEDetailsData} singleLEAVEOpenModal={singleLEAVEOpenModal} setSingleLEAVEOpenModal={setSingleLEAVEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{QuickAccessLEAVEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={LEAVEViewData? LEAVEViewData as LEAVEViewInterface[]:[]}
          columns={QuickAccessLEAVEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleLEAVEDetailsData(e.row);
            setSingleLEAVEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
