import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { EOYBONUSLISTPageDescriptions, EOYBONUSLISTPageColumns } from '@/data/pages-data/payroll-eoy-data/eoy-bonus-list-data';
import ViewBONUSLISTSingleModal from './local-components/main-modals/eoy-bonus-list-single-modal';
import { BONUSLISTViewInterface } from '@/types/types-payroll-eoy';
import { BONUSLISTViewAction } from '@/store/actions/payroll-eoy';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function EOYBONUSLISTPageHistory() {
  const [singleBONUSLISTOpenModal, setSingleBONUSLISTOpenModal] = useState<boolean>(false);
  const [singleBONUSLISTDetailsData, setSingleBONUSLISTDetailsData] = useState<BONUSLISTViewInterface>({
    id: NaN,
    name: '',
    description: '',
    amount: NaN,
    date_added: '',
  });
  const dispatch = useDispatch();
  const { BONUSLISTView } = useSelector((state: RootState) => state.payrollEOY);
  const { data, status, error } = BONUSLISTView;
  const BONUSLISTViewData = data as BONUSLISTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((BONUSLISTViewData?.length <= 0 || BONUSLISTViewData === null || BONUSLISTViewData === undefined ) && curr_user){
      dispatch(BONUSLISTViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewBONUSLISTSingleModal setSingleBONUSLISTDetailsData={setSingleBONUSLISTDetailsData} singleBONUSLISTDetailsData={singleBONUSLISTDetailsData} singleBONUSLISTOpenModal={singleBONUSLISTOpenModal} setSingleBONUSLISTOpenModal={setSingleBONUSLISTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{EOYBONUSLISTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={BONUSLISTViewData? BONUSLISTViewData as BONUSLISTViewInterface[]:[]}
          columns={EOYBONUSLISTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleBONUSLISTDetailsData(e.row);
            setSingleBONUSLISTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
