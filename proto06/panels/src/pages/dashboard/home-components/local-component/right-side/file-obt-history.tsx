import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { QuickAccessOBTPageDescriptions, QuickAccessOBTPageColumns } from '@/data/pages-data/quick-accesses-data/obt-data';
import ViewOBTSingleModal from './local-components/main-modals/view-obt-single-modal';
import { OBTViewFilterEmployeeInitialState, OBTViewInterface } from '@/types/types-pages';

import { OBTViewFilterEmployeeAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';



export default function QuickAccessOBTPageHistory() {
  const [singleOBTOpenModal, setSingleOBTOpenModal] = useState<boolean>(false);
  const [singleOBTDetailsData, setSingleOBTDetailsData] = useState<OBTViewInterface>(OBTViewFilterEmployeeInitialState);
  const dispatch = useDispatch();
  const { OBTViewFilterEmployee } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = OBTViewFilterEmployee;
  const OBTViewData = data as OBTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((OBTViewData?.length <= 0 || OBTViewData === null || OBTViewData === undefined ) && curr_user){
      dispatch(OBTViewFilterEmployeeAction({emp_no: curr_user}))
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOBTSingleModal setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData} singleOBTOpenModal={singleOBTOpenModal} setSingleOBTOpenModal={setSingleOBTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{QuickAccessOBTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={OBTViewData? OBTViewData as OBTViewInterface[]:[]}
          columns={QuickAccessOBTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleOBTDetailsData(e.row);
            setSingleOBTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
