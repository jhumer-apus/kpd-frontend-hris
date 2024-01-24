import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ManageDEPARTMENTPageDescriptions, ManageDEPARTMENTPageColumns } from '@/data/pages-data/manage-categories-data/manage-department-data';
import ViewDEPARTMENTSingleModal from './local-components/main-modals/view-department-single-modal';
import { DEPARTMENTViewInterface } from '@/types/types-pages';
import { DEPARTMENTViewAction } from '@/store/actions/categories';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ManageDEPARTMENTPageHistory() {
  const [singleDEPARTMENTOpenModal, setSingleDEPARTMENTOpenModal] = useState<boolean>(false);
  const [singleDEPARTMENTDetailsData, setSingleDEPARTMENTDetailsData] = useState<DEPARTMENTViewInterface>({
    id: NaN,
    date_added: '',
    date_deleted: null,
    dept_name: '',
    dept_lead: NaN,
    dept_branch_code: NaN,
  });
  const dispatch = useDispatch();
  const { DEPARTMENTView } = useSelector((state: RootState) => state.categories);
  const { data, status, error } = DEPARTMENTView;
  const DEPARTMENTViewData = data as DEPARTMENTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((DEPARTMENTViewData?.length <= 0 || DEPARTMENTViewData === null || DEPARTMENTViewData === undefined ) && curr_user){
      dispatch(DEPARTMENTViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewDEPARTMENTSingleModal setSingleDEPARTMENTDetailsData={setSingleDEPARTMENTDetailsData} singleDEPARTMENTDetailsData={singleDEPARTMENTDetailsData} singleDEPARTMENTOpenModal={singleDEPARTMENTOpenModal} setSingleDEPARTMENTOpenModal={setSingleDEPARTMENTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ManageDEPARTMENTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={DEPARTMENTViewData? DEPARTMENTViewData as DEPARTMENTViewInterface[]:[]}
          columns={ManageDEPARTMENTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleDEPARTMENTDetailsData(e.row);
            setSingleDEPARTMENTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
