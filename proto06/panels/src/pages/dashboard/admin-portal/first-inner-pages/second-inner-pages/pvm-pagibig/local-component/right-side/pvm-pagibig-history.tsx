import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { PVMPAGIBIGPageDescriptions, PVMPAGIBIGPageColumns } from '@/data/pages-data/payroll-variables-data/pvm-pagibig-data';
import ViewPAGIBIGSingleModal from './local-components/main-modals/pvm-pagibig-single-modal';
import { PAGIBIGViewInterface } from '@/types/types-payroll-variables';
import { PAGIBIGViewAction } from '@/store/actions/payroll-variables';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function PVMPAGIBIGPageHistory() {
  const [singlePAGIBIGOpenModal, setSinglePAGIBIGOpenModal] = useState<boolean>(false);
  const [singlePAGIBIGDetailsData, setSinglePAGIBIGDetailsData] = useState<PAGIBIGViewInterface>({
    id: NaN,
    pagibig_no: NaN,
    pagibig_contribution_month: NaN,
    pagibig_with_cloan_amount: null,
    pagibig_rem_cloan_amount: null,
    pagibig_with_hloan_amount: null,
    pagibig_rem_hloan_amount: null,
    pagibig_with_calloan_amount: null,
    pagibig_rem_calloan_amount: null,
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { PAGIBIGView } = useSelector((state: RootState) => state.payrollVariables);
  const { data, status, error } = PAGIBIGView;
  const PAGIBIGViewData = data as PAGIBIGViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((PAGIBIGViewData?.length <= 0 || PAGIBIGViewData === null || PAGIBIGViewData === undefined ) && curr_user){
      dispatch(PAGIBIGViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewPAGIBIGSingleModal setSinglePAGIBIGDetailsData={setSinglePAGIBIGDetailsData} singlePAGIBIGDetailsData={singlePAGIBIGDetailsData} singlePAGIBIGOpenModal={singlePAGIBIGOpenModal} setSinglePAGIBIGOpenModal={setSinglePAGIBIGOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{PVMPAGIBIGPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={PAGIBIGViewData? PAGIBIGViewData as PAGIBIGViewInterface[]:[]}
          columns={PVMPAGIBIGPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSinglePAGIBIGDetailsData(e.row);
            setSinglePAGIBIGOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
