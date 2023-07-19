import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import PrintTableButton from './local-components/additional-features/print-table-button';
import ExportToCsvButton from './local-components/additional-features/export-to-csv-button';
import { ProceduralOVERTIMEPageDescriptions, ProceduralOVERTIMEPageColumns } from '@/data/pages-data/procedural-data/overtime-data';
import CreateOVERTIMEComponent from './local-components/create-overtime-component';
import ViewOVERTIMESingleModal from './local-components/main-modals/view-overtime-single-modal';
import { OVERTIMEViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

// import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';
import { OVERTIMEViewAction } from '@/store/actions/procedurals';
import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';


export default function ProceduralOvertimePage() {
  const [printing, setIsPrinting] = useState(false);
  const [singleOVERTIMEOpenModal, setSingleOVERTIMEOpenModal] = useState<boolean>(false);
  const [singleOVERTIMEDetailsData, setSingleOVERTIMEDetailsData] = useState<OVERTIMEViewInterface>({
      id: NaN,
      ot_reason_disapproval: null,
      ot_date_approved1: null,
      ot_date_approved2: null,
      ot_date_filed: '',
      ot_type: '',
      ot_remarks: '',
      ot_date_from: '',
      ot_date_to: '',
      ot_approval_status: '',
      ot_total_hours: NaN,
      ot_approver1_empno: null,
      ot_approver2_empno: null,
      emp_no: NaN,
      cutoff_code: NaN,
  });
  const dispatch = useDispatch();
  const { spButtonIndex, dtrStatus, dtrData } = useDtrState();
  const { OVERTIMEView, OVERTIMEViewFilterEmployeeAndOVERTIME } = useSelector((state: RootState) => state.procedurals);
  const { data } = OVERTIMEView;
  const OVERTIMEViewData = data as OVERTIMEViewInterface[];

  useEffect(()=> {
    dispatch(OVERTIMEViewAction())
  }, []);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Hello, PDF!', 10, 10); // Modify the content of the PDF as needed
    doc.save('document.pdf');
  };

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(OVERTIMEViewData?.length && OVERTIMEViewData?.length >= 11){
      return OVERTIMEViewData?.length / 25 * 1400
    } else {
      return 700
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOVERTIMESingleModal setSingleOVERTIMEDetailsData={setSingleOVERTIMEDetailsData} singleOVERTIMEDetailsData={singleOVERTIMEDetailsData} singleOVERTIMEOpenModal={singleOVERTIMEOpenModal} setSingleOVERTIMEOpenModal={setSingleOVERTIMEOpenModal}/>
          <CreateOVERTIMEComponent />
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {ProceduralOVERTIMEPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
        {/* <div className='flex justify-between gap-6'>
          <ExportToCsvButton data={OVERTIMEViewData} />
          <PrintTableButton setIsPrinting={setIsPrinting}/>
        </div> */}
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={OVERTIMEViewData? OVERTIMEViewData as OVERTIMEViewInterface[]:[]}
          columns={ProceduralOVERTIMEPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleOVERTIMEDetailsData(e.row);
            setSingleOVERTIMEOpenModal(true);
          }}
          disableRowSelectionOnClick 
          style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
          localeText={{ noRowsLabel: `${dtrStatus === 'loading' ? `${dtrStatus?.toUpperCase()}...` : dtrStatus === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (dtrStatus === null || dtrStatus === undefined) ? 'The caller for OVERTIME Epic hasn\'t been set up, please contact your frontend developer': 'There is no OVERTIME to generate. Double check with a Database Admin'}` }}
        />
        {/* <GeneratePDFButton data={OVERTIMEViewData} columns={ProceduralOVERTIMEPageColumns} /> */}
      </div>
    </Fragment>
  );
}
