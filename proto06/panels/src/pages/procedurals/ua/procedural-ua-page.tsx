import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import PrintTableButton from './local-components/additional-features/print-table-button';
import ExportToCsvButton from './local-components/additional-features/export-to-csv-button';
import { ProceduralUAPageDescriptions, ProceduralUAPageColumns } from '@/data/pages-data/procedural-data/ua-data';
import CreateUAComponent from './local-components/create-ua-component';
import ViewUASingleModal from './local-components/main-modals/view-ua-single-modal';
import { UAViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

// import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';
import { UAViewAction } from '@/store/actions/procedurals';
import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';
import { globalServerErrorMsg } from '@/store/configureStore';
import useFetchFileApplicationByApprover from '@/custom-hooks/use-fetch-file-application-by-approver';
import { HandleModalAction } from '@/store/actions/components';



export default function ProceduralUAPage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleUAOpenModal, setSingleUAOpenModal] = useState<boolean>(false);
  const [singleUADetailsData, setSingleUADetailsData] = useState<UAViewInterface>({
      ua_description: '',
      ua_date_from: '',
      ua_date_to: '',
      emp_no: NaN,
      id: NaN,
      ua_reason_disapproval: null,
      ua_date_approved1: null,
      ua_date_approved2: null,
      ua_date_filed: '',
      ua_approval_status: '',
      ua_total_hours: NaN,
      ua_approver1_empno: null,
      ua_approver2_empno: null,
      cutoff_code: NaN,
      applicant_rank: NaN,
  });
  const dispatch = useDispatch();
  const { UAView } = useSelector((state: RootState) => state.procedurals);
  const currUser = useSelector((state: RootState) => state.auth.employee_detail);
  const { data, status, error } = currUser?.user?.role == 2? useFetchFileApplicationByApprover(`ua`): UAView;
  // const { data, status, error } = UAView;
  const UAViewData = data as UAViewInterface[];

  useEffect(()=> {
    dispatch(UAViewAction())
  }, []);

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(UAViewData?.length && UAViewData?.length >= 11){
      return UAViewData?.length / 25 * 1400
    } else {
      return 600
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewUASingleModal setSingleUADetailsData={setSingleUADetailsData} singleUADetailsData={singleUADetailsData} singleUAOpenModal={singleUAOpenModal} setSingleUAOpenModal={setSingleUAOpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ProceduralUAPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={UAViewData? UAViewData as UAViewInterface[]:[]}
          columns={ProceduralUAPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleUADetailsData(e.row);
            // setSingleUAOpenModal(true);
            dispatch(HandleModalAction({
              name:"viewUaModal",
              value:true
            }))
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
        />
        {/* <GeneratePDFButton data={UAViewData} columns={ProceduralUAPageColumns} /> */}
      </div>
    </Fragment>
  );
}
