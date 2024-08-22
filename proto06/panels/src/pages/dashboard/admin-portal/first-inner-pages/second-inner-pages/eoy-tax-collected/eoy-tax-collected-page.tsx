import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from '@mui/material';
import { EOYTAXCOLLECTEDPageDescriptions, EOYTAXCOLLECTEDPageColumns } from '@/data/pages-data/payroll-eoy-data/eoy-tax-collected-data';
import { TAXCOLLECTEDViewInterface, } from '@/types/types-payroll-eoy';
import { TAXCOLLECTEDViewAction } from '@/store/actions/payroll-eoy';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function EOYTAXCOLLECTEDPage() {
  // const [singleTAXCOLLECTEDOpenModal, setSingleTAXCOLLECTEDOpenModal] = useState<boolean>(false);
  // const [singleTAXCOLLECTEDDetailsData, setSingleTAXCOLLECTEDDetailsData] = useState<TAXCOLLECTEDViewInterface>(TAXCOLLECTEDViewFilterEmployeeInitialState);
  const dispatch = useDispatch();
  const { TAXCOLLECTEDView } = useSelector((state: RootState) => state.payrollEOY);
  const { data, status, error } = TAXCOLLECTEDView;
  const TAXCOLLECTEDViewData = data as TAXCOLLECTEDViewInterface[];

  useEffect(()=> {
    dispatch(TAXCOLLECTEDViewAction())
  }, []);

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          {/* <ViewTAXCOLLECTEDSingleModal setSingleTAXCOLLECTEDDetailsData={setSingleTAXCOLLECTEDDetailsData} singleTAXCOLLECTEDDetailsData={singleTAXCOLLECTEDDetailsData} singleTAXCOLLECTEDOpenModal={singleTAXCOLLECTEDOpenModal} setSingleTAXCOLLECTEDOpenModal={setSingleTAXCOLLECTEDOpenModal}/> */}
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {EOYTAXCOLLECTEDPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '650px', width: '100%' }}>
        <DataGrid
          rows={TAXCOLLECTEDViewData? TAXCOLLECTEDViewData as TAXCOLLECTEDViewInterface[]:[]}
          columns={EOYTAXCOLLECTEDPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          // onRowClick={(e) => {
          //   setSingleTAXCOLLECTEDDetailsData(e.row);
          //   setSingleTAXCOLLECTEDOpenModal(true);
          // }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
      </div>
    </Fragment>
  );
}
