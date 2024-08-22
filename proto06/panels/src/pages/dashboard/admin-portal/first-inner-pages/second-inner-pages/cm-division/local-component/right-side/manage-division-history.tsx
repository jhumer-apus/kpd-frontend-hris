import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ManageDIVISIONPageDescriptions, ManageDIVISIONPageColumns } from '@/data/pages-data/manage-categories-data/manage-division-data';
import ViewDIVISIONSingleModal from './local-components/main-modals/view-division-single-modal';
import { DIVISIONViewInterface } from '@/types/types-pages';
import { DIVISIONViewAction } from '@/store/actions/categories';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ManageDIVISIONPageHistory() {
  const [singleDIVISIONOpenModal, setSingleDIVISIONOpenModal] = useState<boolean>(false);
  const [singleDIVISIONDetailsData, setSingleDIVISIONDetailsData] = useState<DIVISIONViewInterface>({
    id: NaN,
    date_added: '',
    date_deleted: null,
    div_name: '',
    div_lead: NaN,
    div_branch_code: NaN,
  });
  const dispatch = useDispatch();
  const { DIVISIONView } = useSelector((state: RootState) => state.categories);
  const { data, status, error } = DIVISIONView;
  const DIVISIONViewData = data as DIVISIONViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((DIVISIONViewData?.length <= 0 || DIVISIONViewData === null || DIVISIONViewData === undefined ) && curr_user){
      dispatch(DIVISIONViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewDIVISIONSingleModal setSingleDIVISIONDetailsData={setSingleDIVISIONDetailsData} singleDIVISIONDetailsData={singleDIVISIONDetailsData} singleDIVISIONOpenModal={singleDIVISIONOpenModal} setSingleDIVISIONOpenModal={setSingleDIVISIONOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ManageDIVISIONPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={DIVISIONViewData? DIVISIONViewData as DIVISIONViewInterface[]:[]}
          columns={ManageDIVISIONPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleDIVISIONDetailsData(e.row);
            setSingleDIVISIONOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
