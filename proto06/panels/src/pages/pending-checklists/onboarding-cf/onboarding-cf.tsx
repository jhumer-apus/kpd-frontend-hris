import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
// import { Typography } from "@material-tailwind/react";
import { Typography } from '@mui/material';
import { OnboardingCFDescriptions, OnboardingCFColumns } from '@/data/pages-data/your-approvals-data/onboarding-cf-data';
import ViewONBOARDINGSTATUSSingleModal from './local-components/main-modals/view-onboarding-status-single-modal';
import { ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { ONBOARDINGSTATUSViewAction } from '@/store/actions/employee-and-applicants';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function OnboardingCF() {
  const [printing, setIsPrinting] = useState(false);
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const [singleONBOARDINGSTATUSOpenModal, setSingleONBOARDINGSTATUSOpenModal] = useState<boolean>(false);
  const [singleONBOARDINGSTATUSDetailsData, setSingleONBOARDINGSTATUSDetailsData] = useState<ONBOARDINGSTATUSViewInterface>({
    id: NaN,
    date_added: '',
    date_start: null,
    status: 'Pending',
    final_remarks: '',
    emp_no: NaN,
    emp_onboard_reqs: [{
      id: NaN,
      onboarding_title: '',
      onboarding_facilitator: NaN,
      date_commencement: null,
      emp_remarks: null,
      facilitator_remarks: null,
      status: 'Pending',
      date_added: '',
      emp_no: NaN,
      onboarding_requirement_code: NaN,
      added_by: NaN
    }],
    onboarding_codes: []
  });
  const dispatch = useDispatch();
  const { ONBOARDINGSTATUSView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status, error } = ONBOARDINGSTATUSView;
  const ONBOARDINGSTATUSViewData = data as ONBOARDINGSTATUSViewInterface[];

  const FilteredONBOARDINGSTATUSViewData = Array.isArray(ONBOARDINGSTATUSViewData) ?  ONBOARDINGSTATUSViewData.filter((item) => item?.emp_onboard_reqs?.some((item) => item.onboarding_facilitator === curr_user)) : [];

  useEffect(()=> {
    if(data?.length === 0){
      dispatch(ONBOARDINGSTATUSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewONBOARDINGSTATUSSingleModal setSingleONBOARDINGSTATUSDetailsData={setSingleONBOARDINGSTATUSDetailsData} singleONBOARDINGSTATUSDetailsData={singleONBOARDINGSTATUSDetailsData} singleONBOARDINGSTATUSOpenModal={singleONBOARDINGSTATUSOpenModal} setSingleONBOARDINGSTATUSOpenModal={setSingleONBOARDINGSTATUSOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {OnboardingCFDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '660px', width: '100%' }} id="printable-area">
        <DataGrid
          rows={ONBOARDINGSTATUSViewData? FilteredONBOARDINGSTATUSViewData as ONBOARDINGSTATUSViewInterface[]:[]}
          columns={OnboardingCFColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleONBOARDINGSTATUSDetailsData(e.row);
            setSingleONBOARDINGSTATUSOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}
