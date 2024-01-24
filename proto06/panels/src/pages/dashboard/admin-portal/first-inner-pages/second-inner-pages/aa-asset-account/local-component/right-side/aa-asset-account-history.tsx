import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { AAASSETACCOUNTPageDescriptions, AAASSETACCOUNTPageColumns } from '@/data/pages-data/payroll-eoy-data/aa-asset-account-data';
import ViewASSETACCOUNTSingleModal from './local-components/main-modals/eoy-asset-account-single-modal';
import { ASSETACCOUNTViewInterface } from '@/types/types-payroll-eoy';
import { ASSETACCOUNTViewAction } from '@/store/actions/payroll-eoy';
import { globalServerErrorMsg } from '@/store/configureStore';

export default function AAASSETACCOUNTPageHistory() {
  const [singleASSETACCOUNTOpenModal, setSingleASSETACCOUNTOpenModal] = useState<boolean>(false);
  const [singleASSETACCOUNTDetailsData, setSingleASSETACCOUNTDetailsData] = useState<ASSETACCOUNTViewInterface>({
    id: NaN,
    serial_no_internal: '',
    serial_no_manufacturer: '',
    remarks: '',
    asset_list_code: NaN,
    assigned_to: NaN,
    date_assigned: ''
  });
  const dispatch = useDispatch();
  const { ASSETACCOUNTView } = useSelector((state: RootState) => state.payrollEOY);
  const { data, status, error } = ASSETACCOUNTView;
  const ASSETACCOUNTViewData = data as ASSETACCOUNTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((ASSETACCOUNTViewData?.length <= 0 || ASSETACCOUNTViewData === null || ASSETACCOUNTViewData === undefined ) && curr_user){
      dispatch(ASSETACCOUNTViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewASSETACCOUNTSingleModal setSingleASSETACCOUNTDetailsData={setSingleASSETACCOUNTDetailsData} singleASSETACCOUNTDetailsData={singleASSETACCOUNTDetailsData} singleASSETACCOUNTOpenModal={singleASSETACCOUNTOpenModal} setSingleASSETACCOUNTOpenModal={setSingleASSETACCOUNTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{AAASSETACCOUNTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={ASSETACCOUNTViewData? ASSETACCOUNTViewData as ASSETACCOUNTViewInterface[]:[]}
          columns={AAASSETACCOUNTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleASSETACCOUNTDetailsData(e.row);
            setSingleASSETACCOUNTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
