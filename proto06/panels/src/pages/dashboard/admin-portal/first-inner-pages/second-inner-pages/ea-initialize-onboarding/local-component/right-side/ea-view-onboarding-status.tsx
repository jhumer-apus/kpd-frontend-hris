import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
// import { Typography } from "@material-tailwind/react";
import { EAONBOARDINGSTATUSPageDescriptions, EAONBOARDINGSTATUSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-initialize-onboarding-data';
import ViewONBOARDINGSTATUSSingleModal from './local-components/main-modals/ea-initialize-onboarding-single-modal';
import { ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { ONBOARDINGSTATUSViewAction } from '@/store/actions/employee-and-applicants';


export default function EAONBOARDINGSTATUSPageHistory() {
  const [singleONBOARDINGSTATUSOpenModal, setSingleONBOARDINGSTATUSOpenModal] = useState<boolean>(false);
  const [singleONBOARDINGSTATUSDetailsData, setSingleONBOARDINGSTATUSDetailsData] = useState<ONBOARDINGSTATUSViewInterface>({
    id: NaN,
    date_added: '',
    date_start: '',
    status: 'Pending',
    final_remarks: '',
    emp_no: NaN,
    emp_onboard_reqs: [{
      id: NaN,
      date_added: '',
      onboarding_title: '',
      emp_remarks: '',
      facilitator_remarks: '',
      date_commencement: '',
      status: 'Pending',
      emp_no: NaN,
      onboarding_requirement_code: NaN,
      onboarding_facilitator: NaN,
      added_by: NaN,
    }],
    onboarding_codes: [],
    added_by: NaN,
  });
  const dispatch = useDispatch();
  const { ONBOARDINGSTATUSView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status } = ONBOARDINGSTATUSView;
  const ONBOARDINGSTATUSViewData = data as ONBOARDINGSTATUSViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((ONBOARDINGSTATUSViewData?.length <= 0 || ONBOARDINGSTATUSViewData === null || ONBOARDINGSTATUSViewData === undefined ) && curr_user){
      dispatch(ONBOARDINGSTATUSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewONBOARDINGSTATUSSingleModal setSingleONBOARDINGSTATUSDetailsData={setSingleONBOARDINGSTATUSDetailsData} singleONBOARDINGSTATUSDetailsData={singleONBOARDINGSTATUSDetailsData} singleONBOARDINGSTATUSOpenModal={singleONBOARDINGSTATUSOpenModal} setSingleONBOARDINGSTATUSOpenModal={setSingleONBOARDINGSTATUSOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EAONBOARDINGSTATUSPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={ONBOARDINGSTATUSViewData? ONBOARDINGSTATUSViewData as ONBOARDINGSTATUSViewInterface[]:[]}
          columns={EAONBOARDINGSTATUSPageColumns}
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
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No 13th Month Pay found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for 13th Month Pay Epic hasn\'t been set up, please contact your frontend developer': 'There is no 13th Month Pay to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
