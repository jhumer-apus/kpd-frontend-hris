import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { AAANNOUNCEMENTPageDescriptions, AAANNOUNCEMENTPageColumns } from '@/data/pages-data/payroll-eoy-data/aa-asset-account-data';
import ViewANNOUNCEMENTSingleModal from './local-components/main-modals/eoy-bonus-list-single-modal';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';
import { ANNOUNCEMENTViewAction } from '@/store/actions/payroll-eoy';

export default function AAANNOUNCEMENTPageHistory() {
  const [singleANNOUNCEMENTOpenModal, setSingleANNOUNCEMENTOpenModal] = useState<boolean>(false);
  const [singleANNOUNCEMENTDetailsData, setSingleANNOUNCEMENTDetailsData] = useState<ANNOUNCEMENTViewInterface>({
    id: NaN,
    message: '',
    order_by_no: NaN,
    date_posted: null,
    expiry_date: null,
    date_added: '',
    is_posted: false,
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { ANNOUNCEMENTView } = useSelector((state: RootState) => state.payrollEOY);
  const { data, status } = ANNOUNCEMENTView;
  const ANNOUNCEMENTViewData = data as ANNOUNCEMENTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((ANNOUNCEMENTViewData?.length <= 0 || ANNOUNCEMENTViewData === null || ANNOUNCEMENTViewData === undefined ) && curr_user){
      dispatch(ANNOUNCEMENTViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          {/* <ViewANNOUNCEMENTSingleModal setSingleANNOUNCEMENTDetailsData={setSingleANNOUNCEMENTDetailsData} singleANNOUNCEMENTDetailsData={singleANNOUNCEMENTDetailsData} singleANNOUNCEMENTOpenModal={singleANNOUNCEMENTOpenModal} setSingleANNOUNCEMENTOpenModal={setSingleANNOUNCEMENTOpenModal}/> */}
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{AAANNOUNCEMENTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={ANNOUNCEMENTViewData? ANNOUNCEMENTViewData as ANNOUNCEMENTViewInterface[]:[]}
          columns={AAANNOUNCEMENTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleANNOUNCEMENTDetailsData(e.row);
            setSingleANNOUNCEMENTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for ANNOUNCEMENT Epic hasn\'t been set up, please contact your frontend developer': 'There is no ANNOUNCEMENT to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
