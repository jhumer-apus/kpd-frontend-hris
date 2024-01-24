import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { PVMPHILHEALTHPageDescriptions, PVMPHILHEALTHPageColumns } from '@/data/pages-data/payroll-variables-data/pvm-philhealth-data';
import ViewPHILHEALTHSingleModal from './local-components/main-modals/pvm-philhealth-single-modal';
import { PHILHEALTHViewInterface } from '@/types/types-payroll-variables';
import { PHILHEALTHViewAction } from '@/store/actions/payroll-variables';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function PVMPHILHEALTHPageHistory() {
  const [singlePHILHEALTHOpenModal, setSinglePHILHEALTHOpenModal] = useState<boolean>(false);
  const [singlePHILHEALTHDetailsData, setSinglePHILHEALTHDetailsData] = useState<PHILHEALTHViewInterface>({
    id: NaN,
    ph_no: NaN,
    ph_contribution_month: NaN,
    ph_category: '',
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { PHILHEALTHView } = useSelector((state: RootState) => state.payrollVariables);
  const { data, status, error } = PHILHEALTHView;
  const PHILHEALTHViewData = data as PHILHEALTHViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((PHILHEALTHViewData?.length <= 0 || PHILHEALTHViewData === null || PHILHEALTHViewData === undefined ) && curr_user){
      dispatch(PHILHEALTHViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewPHILHEALTHSingleModal setSinglePHILHEALTHDetailsData={setSinglePHILHEALTHDetailsData} singlePHILHEALTHDetailsData={singlePHILHEALTHDetailsData} singlePHILHEALTHOpenModal={singlePHILHEALTHOpenModal} setSinglePHILHEALTHOpenModal={setSinglePHILHEALTHOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{PVMPHILHEALTHPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={PHILHEALTHViewData? PHILHEALTHViewData as PHILHEALTHViewInterface[]:[]}
          columns={PVMPHILHEALTHPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSinglePHILHEALTHDetailsData(e.row);
            setSinglePHILHEALTHOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
