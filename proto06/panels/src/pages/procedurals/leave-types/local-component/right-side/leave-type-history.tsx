import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ProceduralLEAVETYPEPageDescriptions, ProceduralLEAVETYPEPageColumns } from '@/data/pages-data/procedural-data/leave-types-data';
import ViewLEAVETYPESingleModal from './local-components/main-modals/view-leave-type-single-modal';
import { LEAVETYPEViewInterface } from '@/types/types-pages';
import { LEAVETYPEViewAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ProceduralLEAVETYPEPageHistory() {
  const [singleLEAVETYPEOpenModal, setSingleLEAVETYPEOpenModal] = useState<boolean>(false);
  const [singleLEAVETYPEDetailsData, setSingleLEAVETYPEDetailsData] = useState<LEAVETYPEViewInterface>({
    id: null,
    name: null,
    is_paid: null,
    date_added: null,
    date_deleted: null,
  });
  const dispatch = useDispatch();
  const { LEAVETYPEView } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = LEAVETYPEView;
  const LEAVETYPEViewData = data as LEAVETYPEViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((LEAVETYPEViewData?.length <= 0 || LEAVETYPEViewData === null || LEAVETYPEViewData === undefined ) && curr_user){
      dispatch(LEAVETYPEViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewLEAVETYPESingleModal setSingleLEAVETYPEDetailsData={setSingleLEAVETYPEDetailsData} singleLEAVETYPEDetailsData={singleLEAVETYPEDetailsData} singleLEAVETYPEOpenModal={singleLEAVETYPEOpenModal} setSingleLEAVETYPEOpenModal={setSingleLEAVETYPEOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ProceduralLEAVETYPEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={LEAVETYPEViewData? LEAVETYPEViewData as LEAVETYPEViewInterface[]:[]}
          columns={ProceduralLEAVETYPEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleLEAVETYPEDetailsData(e.row);
            setSingleLEAVETYPEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
      </div>
    </Fragment>
  );
}
