import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { YourKPICOREPageDescriptions, YourKPICOREPageColumns } from '@/data/pages-data/quick-accesses-data/your-evaluation-data';
import ViewKPICORESingleModal from './local-components/main-modals/view-evaluation-single-modal';
import { KPICOREViewInterface } from '@/types/types-employee-and-applicants';
import { KPICOREViewAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function YourKPICOREPage() {
  const [printing, setIsPrinting] = useState(false);
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
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
    corecompe_codes: [],
    kpi_codes: []
  });
  const dispatch = useDispatch();
  const { KPICOREView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status,error } = KPICOREView;
  const KPICOREViewData = data as KPICOREViewInterface[];

  const FilteredKPICOREViewData = Array.isArray(KPICOREViewData) ? KPICOREViewData?.filter((item) => item?.emp_no === curr_user ) : [];
  // Backend throwing  204 No Content changes the data from array type to a string type... added isArray to make sure it is as intended


  useEffect(()=> {
    dispatch(KPICOREViewAction())
  }, []);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewKPICORESingleModal setSingleKPICOREDetailsData={setSingleKPICOREDetailsData} singleKPICOREDetailsData={singleKPICOREDetailsData} singleKPICOREOpenModal={singleKPICOREOpenModal} setSingleKPICOREOpenModal={setSingleKPICOREOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {YourKPICOREPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '660px', width: '100%' }} id="printable-area">
        <DataGrid
          rows={KPICOREViewData? FilteredKPICOREViewData as KPICOREViewInterface[]:[]}
          columns={YourKPICOREPageColumns}
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
