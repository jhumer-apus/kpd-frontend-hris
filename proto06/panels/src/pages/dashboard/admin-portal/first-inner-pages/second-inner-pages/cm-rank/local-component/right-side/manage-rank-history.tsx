import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ManageRANKPageDescriptions, ManageRANKPageColumns } from '@/data/pages-data/manage-categories-data/manage-rank-data';
import ViewRANKSingleModal from './local-components/main-modals/view-rank-single-modal';
import { RANKViewInterface } from '@/types/types-pages';
import { RANKViewAction } from '@/store/actions/categories';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ManageRANKPageHistory() {
  const [singleRANKOpenModal, setSingleRANKOpenModal] = useState<boolean>(false);
  const [singleRANKDetailsData, setSingleRANKDetailsData] = useState<RANKViewInterface>({
    id: NaN,
    date_added: '',
    date_deleted: null,
    rank_name: '',
    rank_description: '',
    is_approver: false,
    hierarchy: NaN,
  });
  const dispatch = useDispatch();
  const { RANKView } = useSelector((state: RootState) => state.categories);
  const { data, status, error } = RANKView;
  const RANKViewData = data as RANKViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((RANKViewData?.length <= 0 || RANKViewData === null || RANKViewData === undefined ) && curr_user){
      dispatch(RANKViewAction())
    }
  }, [curr_user]);
  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewRANKSingleModal setSingleRANKDetailsData={setSingleRANKDetailsData} singleRANKDetailsData={singleRANKDetailsData} singleRANKOpenModal={singleRANKOpenModal} setSingleRANKOpenModal={setSingleRANKOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ManageRANKPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={RANKViewData? RANKViewData as RANKViewInterface[]:[]}
          columns={ManageRANKPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleRANKDetailsData(e.row);
            setSingleRANKOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
