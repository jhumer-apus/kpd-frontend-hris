import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { PVMCASHADVANCEPageDescriptions, PVMCASHADVANCEPageColumns } from '@/data/pages-data/payroll-variables-data/pvm-cash-advance-data';
import ViewCASHADVANCESingleModal from './local-components/main-modals/pvm-cash-advance-single-modal';
import { CASHADVANCEViewInterface } from '@/types/types-payroll-variables';
import { CASHADVANCEViewAction } from '@/store/actions/payroll-variables';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function PVMCASHADVANCEPageHistory() {
  const [singleCASHADVANCEOpenModal, setSingleCASHADVANCEOpenModal] = useState<boolean>(false);
  const [singleCASHADVANCEDetailsData, setSingleCASHADVANCEDetailsData] = useState<CASHADVANCEViewInterface>({
    id: NaN,
    cash_advance_total: NaN,
    cash_advance_remaining: NaN,
    payment_monthly: NaN,
    is_fully_paid: false,
    last_payment_amount: NaN,
    date_last_payment: null,
    date_added: '',
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { CASHADVANCEView } = useSelector((state: RootState) => state.payrollVariables);
  const { data, status, error } = CASHADVANCEView;
  const CASHADVANCEViewData = data as CASHADVANCEViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((CASHADVANCEViewData?.length <= 0 || CASHADVANCEViewData === null || CASHADVANCEViewData === undefined ) && curr_user){
      dispatch(CASHADVANCEViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewCASHADVANCESingleModal setSingleCASHADVANCEDetailsData={setSingleCASHADVANCEDetailsData} singleCASHADVANCEDetailsData={singleCASHADVANCEDetailsData} singleCASHADVANCEOpenModal={singleCASHADVANCEOpenModal} setSingleCASHADVANCEOpenModal={setSingleCASHADVANCEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{PVMCASHADVANCEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={CASHADVANCEViewData? CASHADVANCEViewData as CASHADVANCEViewInterface[]:[]}
          columns={PVMCASHADVANCEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleCASHADVANCEDetailsData(e.row);
            setSingleCASHADVANCEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
