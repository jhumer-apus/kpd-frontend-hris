import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ProceduralSCHEDULESHIFTPageDescriptions, ProceduralSCHEDULESHIFTPageColumns } from '@/data/pages-data/procedural-data/schedule-shift-data';
import ViewSCHEDULESHIFTSingleModal from './local-components/main-modals/view-schedule-shift-single-modal';
import { SCHEDULESHIFTViewInterface } from '@/types/types-pages';
import { SCHEDULESHIFTViewAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ProceduralSCHEDULESHIFTPageHistory() {
  const [singleSCHEDULESHIFTOpenModal, setSingleSCHEDULESHIFTOpenModal] = useState<boolean>(false);
  const [singleSCHEDULESHIFTDetailsData, setSingleSCHEDULESHIFTDetailsData] = useState<SCHEDULESHIFTViewInterface>({
    id: NaN,
    name: null,
    time_in: null,
    time_out: null,
    grace_period: null,
    with_overtime: null,
    is_night_shift: false,
    date_deleted: '', 
  });
  const dispatch = useDispatch();
  const { SCHEDULESHIFTView } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = SCHEDULESHIFTView;
  const SCHEDULESHIFTViewData = data as SCHEDULESHIFTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((SCHEDULESHIFTViewData?.length <= 0 || SCHEDULESHIFTViewData === null || SCHEDULESHIFTViewData === undefined ) && curr_user){
      dispatch(SCHEDULESHIFTViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewSCHEDULESHIFTSingleModal setSingleSCHEDULESHIFTDetailsData={setSingleSCHEDULESHIFTDetailsData} singleSCHEDULESHIFTDetailsData={singleSCHEDULESHIFTDetailsData} singleSCHEDULESHIFTOpenModal={singleSCHEDULESHIFTOpenModal} setSingleSCHEDULESHIFTOpenModal={setSingleSCHEDULESHIFTOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ProceduralSCHEDULESHIFTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={SCHEDULESHIFTViewData? SCHEDULESHIFTViewData as SCHEDULESHIFTViewInterface[]:[]}
          columns={ProceduralSCHEDULESHIFTPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleSCHEDULESHIFTDetailsData(e.row);
            setSingleSCHEDULESHIFTOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
