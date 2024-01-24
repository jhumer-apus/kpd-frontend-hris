import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
// import { Typography } from "@material-tailwind/react";
import { EOYPAY13THPageDescriptions, EOYPAY13THPageColumns } from '@/data/pages-data/payroll-eoy-data/eoy-pay-13th-data';
import ViewPAY13THSingleModal from './local-components/main-modals/eoy-pay-13th-single-modal';
import { PAY13THViewInterface } from '@/types/types-payroll-eoy';
import { PAY13THViewAction } from '@/store/actions/payroll-eoy';
import { globalServerErrorMsg } from '@/store/configureStore';

export default function EOYPAY13THPageHistory() {
  const [singlePAY13THOpenModal, setSinglePAY13THOpenModal] = useState<boolean>(false);
  const [singlePAY13THDetailsData, setSinglePAY13THDetailsData] = useState<PAY13THViewInterface>({
    id: NaN,
    coverage_from: '',
    coverage_to: '',
    total_pay: NaN,
    is_printed: false,
    emp_no: NaN,
  });
  const dispatch = useDispatch();
  const { PAY13THView } = useSelector((state: RootState) => state.payrollEOY);
  const { data, status, error } = PAY13THView;
  const PAY13THViewData = data as PAY13THViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((PAY13THViewData?.length <= 0 || PAY13THViewData === null || PAY13THViewData === undefined ) && curr_user){
      dispatch(PAY13THViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewPAY13THSingleModal setSinglePAY13THDetailsData={setSinglePAY13THDetailsData} singlePAY13THDetailsData={singlePAY13THDetailsData} singlePAY13THOpenModal={singlePAY13THOpenModal} setSinglePAY13THOpenModal={setSinglePAY13THOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EOYPAY13THPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={PAY13THViewData? PAY13THViewData as PAY13THViewInterface[]:[]}
          columns={EOYPAY13THPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSinglePAY13THDetailsData(e.row);
            setSinglePAY13THOpenModal(true);
          }}
          disableRowSelectionOnClick
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
