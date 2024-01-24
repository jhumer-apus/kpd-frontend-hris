import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { AAANNOUNCEMENTPageDescriptions, AAANNOUNCEMENTPageColumns } from '@/data/pages-data/payroll-eoy-data/aa-announcement-data';
import ViewANNOUNCEMENTSingleModal from './local-components/main-modals/aa-announcement-configuration-single-modal';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';
import { ANNOUNCEMENTViewAction } from '@/store/actions/payroll-eoy';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function AAANNOUNCEMENTPageHistory() {
  const [singleANNOUNCEMENTOpenModal, setSingleANNOUNCEMENTOpenModal] = useState<boolean>(false);
  const [singleANNOUNCEMENTDetailsData, setSingleANNOUNCEMENTDetailsData] = useState<ANNOUNCEMENTViewInterface>({
    id: NaN,
    date_added: '',
    is_posted: false,
    date_posted: null,
    expiry_date: null,
    order_by_no: null,
    message: '',
    for_departments_code: [],
    for_ranks_code: [],
    emp_image: '',
    emp_name: '',
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { ANNOUNCEMENTView } = useSelector((state: RootState) => state.payrollEOY);
  const { data, status, error } = ANNOUNCEMENTView;
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
          <ViewANNOUNCEMENTSingleModal setSingleANNOUNCEMENTDetailsData={setSingleANNOUNCEMENTDetailsData} singleANNOUNCEMENTDetailsData={singleANNOUNCEMENTDetailsData} singleANNOUNCEMENTOpenModal={singleANNOUNCEMENTOpenModal} setSingleANNOUNCEMENTOpenModal={setSingleANNOUNCEMENTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{AAANNOUNCEMENTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '800px', width: '100%' }}>
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
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
