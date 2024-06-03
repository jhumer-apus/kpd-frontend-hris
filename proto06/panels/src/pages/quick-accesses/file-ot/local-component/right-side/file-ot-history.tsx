import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import { QuickAccessOVERTIMEPageDescriptions, QuickAccessOVERTIMEPageColumns } from '@/data/pages-data/quick-accesses-data/overtime-data';
import ViewOVERTIMESingleModal from './local-components/main-modals/view-ot-single-modal';
import { OVERTIMEViewInterface } from '@/types/types-pages';
import { OVERTIMEViewFilterEmployeeAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function QuickAccessOVERTIMEPageHistory() {
  const [printing, setIsPrinting] = useState(false);
  const [singleOVERTIMEOpenModal, setSingleOVERTIMEOpenModal] = useState<boolean>(false);
  const [singleOVERTIMEDetailsData, setSingleOVERTIMEDetailsData] = useState<OVERTIMEViewInterface>({
    id: NaN,
    emp_no: NaN,
    ot_type: null,
    ot_remarks: null,
    ot_date_from: null,
    ot_date_to: null,
    ot_reason_disapproval: null,
    ot_date_approved1: null,
    ot_date_approved2: null,
    ot_approver1_empno: null,
    ot_approver2_empno: null,
    ot_date_filed: '',
    cutoff_code: NaN,
    applicant_rank: NaN,
    ot_approval_status: '',
    ot_total_hours: NaN,
  });
  const dispatch = useDispatch();
  const { OVERTIMEViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = OVERTIMEViewFilterEmployee;
  const OVERTIMEViewData = data as OVERTIMEViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((OVERTIMEViewData?.length <= 0 || OVERTIMEViewData === null || OVERTIMEViewData === undefined ) && curr_user){
      dispatch(OVERTIMEViewFilterEmployeeAction({emp_no: curr_user}))
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOVERTIMESingleModal setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} singleOVERTIMEOpenModal={singleOVERTIMEOpenModal} setSingleOVERTIMEOpenModal={setSingleOVERTIMEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{QuickAccessOVERTIMEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={OVERTIMEViewData? OVERTIMEViewData as OVERTIMEViewInterface[]:[]}
          columns={QuickAccessOVERTIMEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleOVERTIMEDetailsData(e.row);
            setSingleOVERTIMEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
