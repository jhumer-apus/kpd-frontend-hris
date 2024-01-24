import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { PVMSSSPageDescriptions, PVMSSSPageColumns } from '@/data/pages-data/payroll-variables-data/pvm-sss-data';
import ViewSSSSingleModal from './local-components/main-modals/pvm-sss-single-modal';
import { SSSViewInterface } from '@/types/types-payroll-variables';
import { SSSViewAction } from '@/store/actions/payroll-variables';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function PVMSSSPageHistory() {
  const [singleSSSOpenModal, setSingleSSSOpenModal] = useState<boolean>(false);
  const [singleSSSDetailsData, setSingleSSSDetailsData] = useState<SSSViewInterface>({
    id: NaN,
    sss_no: NaN,
    sss_contribution_month: NaN,
    sss_with_cashloan_amount: null,
    sss_rem_cashloan_amount: null,
    sss_with_calloan_amount: null,
    sss_rem_calloan_amount: null,
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { SSSView } = useSelector((state: RootState) => state.payrollVariables);
  const { data, status, error } = SSSView;
  const SSSViewData = data as SSSViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((SSSViewData?.length <= 0 || SSSViewData === null || SSSViewData === undefined ) && curr_user){
      dispatch(SSSViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewSSSSingleModal setSingleSSSDetailsData={setSingleSSSDetailsData} singleSSSDetailsData={singleSSSDetailsData} singleSSSOpenModal={singleSSSOpenModal} setSingleSSSOpenModal={setSingleSSSOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{PVMSSSPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={SSSViewData? SSSViewData as SSSViewInterface[]:[]}
          columns={PVMSSSPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleSSSDetailsData(e.row);
            setSingleSSSOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
