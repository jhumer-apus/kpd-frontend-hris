import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
// import { Typography } from "@material-tailwind/react";
import { EAOFFBOARDINGSTATUSPageDescriptions, EAOFFBOARDINGSTATUSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-initialize-offboarding-data';
import ViewOFFBOARDINGSTATUSSingleModal from './local-components/main-modals/eoy-pay-13th-single-modal';
import { OFFBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { OFFBOARDINGSTATUSViewAction } from '@/store/actions/employee-and-applicants';


export default function EAOFFBOARDINGSTATUSPageHistory() {
  const [singleOFFBOARDINGSTATUSOpenModal, setSingleOFFBOARDINGSTATUSOpenModal] = useState<boolean>(false);
  const [singleOFFBOARDINGSTATUSDetailsData, setSingleOFFBOARDINGSTATUSDetailsData] = useState<OFFBOARDINGSTATUSViewInterface>({
    id: NaN,
    emp_no: NaN,
    start_date: '',
    status: 'Pending',
    final_remarks: '',
    date_added: '',
    requirements: []
  });
  const dispatch = useDispatch();
  const { OFFBOARDINGSTATUSView } = useSelector((state: RootState) => state.employeeAndApplicants);
  const { data, status } = OFFBOARDINGSTATUSView;
  const OFFBOARDINGSTATUSViewData = data as OFFBOARDINGSTATUSViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((OFFBOARDINGSTATUSViewData?.length <= 0 || OFFBOARDINGSTATUSViewData === null || OFFBOARDINGSTATUSViewData === undefined ) && curr_user){
      dispatch(OFFBOARDINGSTATUSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          {/* <ViewOFFBOARDINGSTATUSSingleModal setSingleOFFBOARDINGSTATUSDetailsData={setSingleOFFBOARDINGSTATUSDetailsData} singleOFFBOARDINGSTATUSDetailsData={singleOFFBOARDINGSTATUSDetailsData} singleOFFBOARDINGSTATUSOpenModal={singleOFFBOARDINGSTATUSOpenModal} setSingleOFFBOARDINGSTATUSOpenModal={setSingleOFFBOARDINGSTATUSOpenModal}/> */}
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EAOFFBOARDINGSTATUSPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={OFFBOARDINGSTATUSViewData? OFFBOARDINGSTATUSViewData as OFFBOARDINGSTATUSViewInterface[]:[]}
          columns={EAOFFBOARDINGSTATUSPageColumns}
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
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No 13th Month Pay found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for 13th Month Pay Epic hasn\'t been set up, please contact your frontend developer': 'There is no 13th Month Pay to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
