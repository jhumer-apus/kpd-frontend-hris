import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ALLSCHEDULESPageDescriptions, ALLSCHEDULESPageColumns } from '@/data/pages-data/procedural-data/all-schedule-data';
// import ViewLEAVESingleModal from './local-components/main-modals/view-leaves-single-modal';
import { LEAVEViewInterface } from '@/types/types-pages';
import { LEAVEViewAction } from '@/store/actions/procedurals';
import { globalServerErrorMsg } from '@/store/configureStore';

export default function ALLSCHEDULESPage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleLEAVEOpenModal, setSingleLEAVEOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { LEAVEView } = useSelector((state: RootState) => state.procedurals);
  const { data, status, error } = LEAVEView;
  const LEAVEViewData = data as LEAVEViewInterface[];

  useEffect(()=> {
    dispatch(LEAVEViewAction())
  }, []);

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(LEAVEViewData?.length && LEAVEViewData?.length >= 11){
      return LEAVEViewData?.length / 25 * 1400
    } else {
      return 600
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          {/* <ViewLEAVESingleModal setSingleLEAVEDetailsData={setSingleLEAVEDetailsData} singleLEAVEDetailsData={singleLEAVEDetailsData} singleLEAVEOpenModal={singleLEAVEOpenModal} setSingleLEAVEOpenModal={setSingleLEAVEOpenModal}/> */}
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ALLSCHEDULESPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={LEAVEViewData? LEAVEViewData as LEAVEViewInterface[]:[]}
          columns={ALLSCHEDULESPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
        //   onRowClick={(e) => {
        //   }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
        {/* <GeneratePDFButton data={LEAVEViewData} columns={ALLSCHEDULESPageColumns} /> */}
      </div>
    </Fragment>
  );
}
