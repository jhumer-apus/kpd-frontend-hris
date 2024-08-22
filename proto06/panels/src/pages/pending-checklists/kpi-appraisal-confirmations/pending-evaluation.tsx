import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
// import { Typography } from "@material-tailwind/react";
import { Typography } from '@mui/material';
import { AppraisalConfirmationKPICOREPageDescriptions, AppraisalConfirmationKPICOREPageColumns } from '@/data/pages-data/your-approvals-data/appraisal-confirmation-data';
import ViewKPICORESingleModal from './local-components/main-modals/view-evaluation-single-modal';
import { KPICOREViewInterface } from '@/types/types-employee-and-applicants';
import { KPICOREViewAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function AppraisalConfirmationKPICOREPage() {
  const [printing, setIsPrinting] = useState(false);
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const [singleKPICOREOpenModal, setSingleKPICOREOpenModal] = useState<boolean>(false);
  const [singleKPICOREDetailsData, setSingleKPICOREDetailsData] = useState<KPICOREViewInterface>({
    id: NaN,
    date_added: '',
    emp_name: '',
    approver_name: '',
    date_evaluation_deadline: '',
    status: 'Pending',
    total_self_eval_points: NaN,
    total_approver_eval_points: NaN,
    total_core_compe_points: NaN,
    percentage_total: NaN,
    final_rating: null,
    emp_no: NaN,
    emp_no_approver: NaN,
    kpi_codes: [],
    corecompe_codes: [],
  });
  const dispatch = useDispatch();
  const { KPICOREView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status, error } = KPICOREView;
  const KPICOREViewData = data as KPICOREViewInterface[];

  const FilteredKPICOREViewData = Array.isArray(KPICOREViewData) ?  KPICOREViewData.filter((item) => item?.status === 'Pending' && item?.emp_no_approver === curr_user ) : [];

  useEffect(()=> {
    if(data?.length === 0){
      dispatch(KPICOREViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewKPICORESingleModal setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} singleKPICOREDetailsData={singleKPICOREDetailsData} singleKPICOREOpenModal={singleKPICOREOpenModal} setSingleKPICOREOpenModal={setSingleKPICOREOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {AppraisalConfirmationKPICOREPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '660px', width: '100%' }} id="printable-area">
        <DataGrid
          rows={KPICOREViewData? FilteredKPICOREViewData as KPICOREViewInterface[]:[]}
          columns={AppraisalConfirmationKPICOREPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleKPICOREDetailsData(e.row);
            setSingleKPICOREOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}
