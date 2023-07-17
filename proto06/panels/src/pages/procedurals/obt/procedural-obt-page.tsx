import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import {
  Typography,
} from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import PrintTableButton from './local-components/print-table-button';
import ExportToCsvButton from './local-components/export-to-csv-button';
import { ProceduralOBTPageDescriptions } from '@/data/pages-data/procedural-data/obt-data';
// import { dynamicPayrollColumns } from '@/data/pages-data/view-payroll-data/view-payroll';
import GeneratePayslipMultiple from './local-components/generate-payslip-multiple';
import GeneratePayslipSingle from './local-components/view-obt-single-modal';
import { OBTViewFilterEmployeeInitialState, OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import jsPDF from 'jspdf';
import GeneratePDFButton from './local-components/generate-pdf-button';
import { OBTViewAction } from '@/store/actions/procedurals';
import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";

export const ProceduralOBTPageColumns: GridColDef[] = 
[
  {
    field: 'obt_date_filed',
    headerName: 'Date Filed',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      const date = new Date(params.row.obt_date_filed);
      return date.toLocaleDateString();
    }
  },
  { field: 'emp_no', headerName: 'Filed By:', width: 120 },
  { field: 'obt_approval_status', headerName: 'Status', width: 100,
    renderCell: (params: GridCellParams) => {
      console.log(params, "maoaoa");
      const status = params.row?.obt_approval_status as string;

      let cellColor = '';
      if (status === 'P1' || status === 'P2') {
        cellColor = '#ff9100'; // Orange
      } else if ( status==='DIS' ){
        cellColor = '#aa2e25'; // Red
      }

      return(
      // <div style={{ height: '100%', width: '10%', alignItems: 'center' }}>
        // 
        <div className='relative'>
          <div style={{ top:'', left: '26px', position: 'absolute', backgroundColor: cellColor, height:'5px', width: '5px', borderRadius: '100px'}}></div>
          {status}
        </div>
      // </div>
      );
    }  
  },
  { field: 'obt_approver1_empno', headerName: 'Approver #1', width: 120 },
  {
    field: 'obt_date_approved1',
    headerName: 'Date Approved #1',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.obt_date_approved1){
        const date = new Date(params.row.obt_date_approved1);
        return date.toLocaleDateString();
      } else {
        return '-'
      }
    }
  },
  { field: 'obt_approver2_empno', headerName: 'Approver #2', width: 120 },
  {
    field: 'obt_date_approved2',
    headerName: 'Date Approved #2',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => {
      if(params.row.obt_date_approved2){
        const date = new Date(params.row.obt_date_approved2);
        return date.toLocaleDateString();
      } else {
        return '-'
      }
    }
  },
  { field: 'obt_reason_disapproval', headerName: 'Disapproval Reason',  width: 300 },
];

export default function ProceduralOBTPage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleOBTOpenModal, setSingleOBTOpenModal] = useState<boolean>(false);
  const [singleOBTDetailsData, setSingleOBTDetailsData] = useState<OBTViewInterface>(OBTViewFilterEmployeeInitialState);
  const dispatch = useDispatch();
  const { spButtonIndex, dtrStatus, dtrData } = useDtrState();

  const { OBTView, OBTViewFilterEmployeeAndOBT } = useSelector((state: RootState) => state.procedurals);
  const { data } = OBTView;
  const OBTViewData = data as OBTViewInterface[];

  useEffect(()=> {
    dispatch(OBTViewAction())
  }, []);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Hello, PDF!', 10, 10); // Modify the content of the PDF as needed
    doc.save('document.pdf');
  };

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(OBTViewData?.length && OBTViewData?.length >= 11){
      return OBTViewData?.length / 25 * 1400
    } else {
      return 700
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <GeneratePayslipSingle setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData} singleOBTOpenModal={singleOBTOpenModal} setSingleOBTOpenModal={setSingleOBTOpenModal}/>
          <GeneratePayslipMultiple />
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ProceduralOBTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
        <div className='flex justify-between gap-6'>
          <ExportToCsvButton data={OBTViewData} />
          <PrintTableButton setIsPrinting={setIsPrinting}/>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={OBTViewData? OBTViewData as OBTViewInterface[]: []}
          columns={ProceduralOBTPageColumns}
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
          style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
          localeText={{ noRowsLabel: `${dtrStatus === 'loading' ? `${dtrStatus?.toUpperCase()}...` : dtrStatus === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (dtrStatus === null || dtrStatus === undefined) ? 'The caller for OBT Epic hasn\'t been set up, please contact your frontend developer': 'There is no OBT to generate. Double check with a Database Admin'}` }}
        />
        <GeneratePDFButton data={OBTViewData} columns={ProceduralOBTPageColumns} />
      </div>
    </Fragment>
  );
}
