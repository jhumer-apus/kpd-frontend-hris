import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
// import { Typography } from "@material-tailwind/react";
import { Typography } from '@mui/material';
import { OffboardingCFDescriptions, OffboardingCFColumns } from '@/data/pages-data/your-approvals-data/offboarding-cf-data';
import ViewOFFBOARDINGSTATUSSingleModal from './local-components/main-modals/view-offboarding-status-single-modal';
import { OFFBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { OFFBOARDINGSTATUSViewAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function OffboardingCF() {
  const [printing, setIsPrinting] = useState(false);
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const [singleOFFBOARDINGSTATUSOpenModal, setSingleOFFBOARDINGSTATUSOpenModal] = useState<boolean>(false);
  const [singleOFFBOARDINGSTATUSDetailsData, setSingleOFFBOARDINGSTATUSDetailsData] = useState<OFFBOARDINGSTATUSViewInterface>({
    id: NaN,
    date_added: '',
    date_offboard: '',
    status: 'Pending',
    final_remarks: '',
    emp_no: NaN,
    emp_offboard_reqs: [{
      id: NaN,
      offboarding_title: '',
      offboarding_facilitator: NaN,
      date_accomplished: null,
      emp_remarks: null,
      facilitator_remarks: null,
      status: 'Pending',
      date_added: '',
      emp_no: NaN,
      offboarding_requirement_code: NaN,
      added_by: NaN
    }],
    offboarding_codes: []
  });
  const dispatch = useDispatch();
  const { OFFBOARDINGSTATUSView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status, error } = OFFBOARDINGSTATUSView;
  const OFFBOARDINGSTATUSViewData = data as OFFBOARDINGSTATUSViewInterface[];

  const FilteredOFFBOARDINGSTATUSViewData = Array.isArray(OFFBOARDINGSTATUSViewData) ?  OFFBOARDINGSTATUSViewData.filter((item) => item?.emp_offboard_reqs?.some((item) => item.offboarding_facilitator === curr_user)) : [];

  useEffect(()=> {
    if(data?.length === 0){
      dispatch(OFFBOARDINGSTATUSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOFFBOARDINGSTATUSSingleModal setSingleOFFBOARDINGSTATUSDetailsData={setSingleOFFBOARDINGSTATUSDetailsData} singleOFFBOARDINGSTATUSDetailsData={singleOFFBOARDINGSTATUSDetailsData} singleOFFBOARDINGSTATUSOpenModal={singleOFFBOARDINGSTATUSOpenModal} setSingleOFFBOARDINGSTATUSOpenModal={setSingleOFFBOARDINGSTATUSOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {OffboardingCFDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '660px', width: '100%' }} id="printable-area">
        <DataGrid
          rows={OFFBOARDINGSTATUSViewData? FilteredOFFBOARDINGSTATUSViewData as OFFBOARDINGSTATUSViewInterface[]:[]}
          columns={OffboardingCFColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleOFFBOARDINGSTATUSDetailsData(e.row);
            setSingleOFFBOARDINGSTATUSOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}
