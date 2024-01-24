import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
// import { Typography } from "@material-tailwind/react";
import { EOYBONUSENTRYPageDescriptions, EOYBONUSENTRYPageColumns } from '@/data/pages-data/payroll-eoy-data/eoy-bonus-entry-data';
import ViewBONUSENTRYSingleModal from './local-components/main-modals/eoy-bonus-entry-single-modal';
import { BONUSENTRYViewInterface } from '@/types/types-payroll-eoy';
import { BONUSENTRYViewAction } from '@/store/actions/payroll-eoy';
import { globalServerErrorMsg } from '@/store/configureStore';

export default function EOYBONUSENTRYPageHistory() {
  const [singleBONUSENTRYOpenModal, setSingleBONUSENTRYOpenModal] = useState<boolean>(false);
  const [singleBONUSENTRYDetailsData, setSingleBONUSENTRYDetailsData] = useState<BONUSENTRYViewInterface>({
    id: NaN,
    is_applied: false,
    bonus_code: NaN,
    emp_no: NaN,
    cutoff_code: NaN,
    date_added: ''
  });
  const dispatch = useDispatch();
  const { BONUSENTRYView } = useSelector((state: RootState) => state.payrollEOY);
  const { data, status, error } = BONUSENTRYView;
  const BONUSENTRYViewData = data as BONUSENTRYViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((BONUSENTRYViewData?.length <= 0 || BONUSENTRYViewData === null || BONUSENTRYViewData === undefined ) && curr_user){
      dispatch(BONUSENTRYViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewBONUSENTRYSingleModal setSingleBONUSENTRYDetailsData={setSingleBONUSENTRYDetailsData} singleBONUSENTRYDetailsData={singleBONUSENTRYDetailsData} singleBONUSENTRYOpenModal={singleBONUSENTRYOpenModal} setSingleBONUSENTRYOpenModal={setSingleBONUSENTRYOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EOYBONUSENTRYPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={BONUSENTRYViewData? BONUSENTRYViewData as BONUSENTRYViewInterface[]:[]}
          columns={EOYBONUSENTRYPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleBONUSENTRYDetailsData(e.row);
            setSingleBONUSENTRYOpenModal(true);
          }}
          disableRowSelectionOnClick
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
