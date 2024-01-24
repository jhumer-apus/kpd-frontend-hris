import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ManagePAYROLLGROUPPageDescriptions, ManagePAYROLLGROUPPageColumns } from '@/data/pages-data/manage-categories-data/manage-payrollgroup-data';
import ViewPAYROLLGROUPSingleModal from './local-components/main-modals/view-payrollgroup-single-modal';
import { PAYROLLGROUPViewInterface } from '@/types/types-pages';
import { PAYROLLGROUPViewAction } from '@/store/actions/categories';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ManagePAYROLLGROUPPageHistory() {
  const [singlePAYROLLGROUPOpenModal, setSinglePAYROLLGROUPOpenModal] = useState<boolean>(false);
  const [singlePAYROLLGROUPDetailsData, setSinglePAYROLLGROUPDetailsData] = useState<PAYROLLGROUPViewInterface>({
    id: NaN,
    date_added: '',
    date_deleted: null,
    name: '',
    payroll_description: '',
    payroll_freq: NaN,
    used_account: NaN,
  });
  const dispatch = useDispatch();
  const { PAYROLLGROUPView } = useSelector((state: RootState) => state.categories);
  const { data, status, error } = PAYROLLGROUPView;
  const PAYROLLGROUPViewData = data as PAYROLLGROUPViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((PAYROLLGROUPViewData?.length <= 0 || PAYROLLGROUPViewData === null || PAYROLLGROUPViewData === undefined ) && curr_user){
      dispatch(PAYROLLGROUPViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewPAYROLLGROUPSingleModal setSinglePAYROLLGROUPDetailsData={setSinglePAYROLLGROUPDetailsData} singlePAYROLLGROUPDetailsData={singlePAYROLLGROUPDetailsData} singlePAYROLLGROUPOpenModal={singlePAYROLLGROUPOpenModal} setSinglePAYROLLGROUPOpenModal={setSinglePAYROLLGROUPOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ManagePAYROLLGROUPPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={PAYROLLGROUPViewData? PAYROLLGROUPViewData as PAYROLLGROUPViewInterface[]:[]}
          columns={ManagePAYROLLGROUPPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSinglePAYROLLGROUPDetailsData(e.row);
            setSinglePAYROLLGROUPOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
