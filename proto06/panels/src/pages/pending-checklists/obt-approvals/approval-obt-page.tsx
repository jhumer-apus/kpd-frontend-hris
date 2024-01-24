import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ApprovalOBTPageDescriptions, ApprovalOBTPageColumns } from '@/data/pages-data/your-approvals-data/obt-data';
import ViewOBTSingleModal from './local-components/main-modals/view-obt-single-modal';
import { OBTViewFilterEmployeeInitialState, OBTViewInterface, } from '@/types/types-pages';
import { OBTViewAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ApprovalOBTPage() {
  const [singleOBTOpenModal, setSingleOBTOpenModal] = useState<boolean>(false);
  const [singleOBTDetailsData, setSingleOBTDetailsData] = useState<OBTViewInterface>(OBTViewFilterEmployeeInitialState);
  const dispatch = useDispatch();
  const { OBTViewFilterApprover } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = OBTViewFilterApprover;
  const OBTViewData = data as OBTViewInterface[];

  useEffect(()=> {
    dispatch(OBTViewAction())
  }, []);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOBTSingleModal setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData} singleOBTOpenModal={singleOBTOpenModal} setSingleOBTOpenModal={setSingleOBTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ApprovalOBTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '650px', width: '100%' }}>
        <DataGrid
          rows={OBTViewData? OBTViewData as OBTViewInterface[]:[]}
          columns={ApprovalOBTPageColumns}
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
