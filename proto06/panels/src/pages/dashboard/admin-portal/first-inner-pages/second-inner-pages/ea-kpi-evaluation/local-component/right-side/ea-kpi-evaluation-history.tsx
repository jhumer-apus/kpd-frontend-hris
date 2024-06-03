import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
// import { Typography } from "@material-tailwind/react";
import { EAKPICOREPageDescriptions, EAKPICOREPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-kpi-core-data';
import ViewKPICORESingleModal from './local-components/main-modals/eoy-pay-13th-single-modal';
import { KPICOREViewInterface } from '@/types/types-employee-and-applicants';
import { KPICOREViewAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function EAKPICOREPageHistory() {
  const [singleKPICOREOpenModal, setSingleKPICOREOpenModal] = useState<boolean>(false);
  const [singleKPICOREDetailsData, setSingleKPICOREDetailsData] = useState<KPICOREViewInterface>({
    id: NaN,
    date_added: '',
    emp_no: NaN,
    emp_name: '',
    approver_name: '',
    emp_no_approver: NaN,
    date_evaluation_deadline: '',
    status: 'Pending',
    final_rating: null,
    total_self_eval_points: NaN,
    total_approver_eval_points: NaN,
    total_core_compe_points: NaN,
    percentage_total: NaN,
    kpi_codes: [],
    corecompe_codes: [],
  });
  const dispatch = useDispatch();
  const { KPICOREView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status, error } = KPICOREView;
  const KPICOREViewData = data as KPICOREViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)
  useEffect(()=> {
    if((KPICOREViewData?.length <= 0 || KPICOREViewData === null || KPICOREViewData === undefined ) && curr_user){
      dispatch(KPICOREViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          {/* <ViewKPICORESingleModal setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} singleKPICOREDetailsData={singleKPICOREDetailsData} singleKPICOREOpenModal={singleKPICOREOpenModal} setSingleKPICOREOpenModal={setSingleKPICOREOpenModal}/> */}
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EAKPICOREPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={KPICOREViewData? KPICOREViewData as KPICOREViewInterface[]:[]}
          columns={EAKPICOREPageColumns}
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
