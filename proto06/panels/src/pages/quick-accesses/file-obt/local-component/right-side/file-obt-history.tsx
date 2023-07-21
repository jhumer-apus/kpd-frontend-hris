import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import useDtrState from '@/custom-hooks/use-dtr-state';
import PrintTableButton from './local-components/additional-features/print-table-button';
import ExportToCsvButton from './local-components/additional-features/export-to-csv-button';
import { QuickAccessOBTPageDescriptions, QuickAccessOBTPageColumns } from '@/data/pages-data/quick-accesses-data/obt-data';
import CreateOBTComponent from './local-components/create-obt-component';
import ViewOBTSingleModal from './local-components/main-modals/view-obt-single-modal';
import { OBTViewFilterEmployeeInitialState, OBTViewInterface, ViewPayrollPayPerEmployee } from '@/types/types-pages';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

// import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';
import { OBTViewAction, OBTViewFilterEmployeeAction } from '@/store/actions/procedurals';
import { GridColDef, GridValueGetterParams, GridCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import GeneratePDFButton from './local-components/additional-features/generate-pdf-button';

export default function QuickAccessOBTPageHistory() {
  const [printing, setIsPrinting] = useState(false);
  const [singleOBTOpenModal, setSingleOBTOpenModal] = useState<boolean>(false);
  const [singleOBTDetailsData, setSingleOBTDetailsData] = useState<OBTViewInterface>(OBTViewFilterEmployeeInitialState);
  const dispatch = useDispatch();
  const { spButtonIndex, dtrStatus, dtrData } = useDtrState();
  const { OBTViewFilterEmployee, OBTViewFilterEmployeeAndOBT } = useSelector((state: RootState) => state.procedurals);
  const { data } = OBTViewFilterEmployee;
  const OBTViewData = data as OBTViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((OBTViewData?.length <= 0 || OBTViewData === null || OBTViewData === undefined ) && curr_user){
      dispatch(OBTViewFilterEmployeeAction({emp_no: curr_user}))
    }
  }, [curr_user]);

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
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewOBTSingleModal setSingleOBTDetailsData={setSingleOBTDetailsData} singleOBTDetailsData={singleOBTDetailsData} singleOBTOpenModal={singleOBTOpenModal} setSingleOBTOpenModal={setSingleOBTOpenModal}/>
          {/* <CreateOBTComponent /> */}
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>Status: {QuickAccessOBTPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
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
          style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
          localeText={{ noRowsLabel: `${dtrStatus === 'loading' ? `${dtrStatus?.toUpperCase()}...` : dtrStatus === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (dtrStatus === null || dtrStatus === undefined) ? 'The caller for OBT Epic hasn\'t been set up, please contact your frontend developer': 'There is no OBT to generate. Double check with a Database Admin'}` }}
        />
        {/* <GeneratePDFButton data={OBTViewData} columns={QuickAccessOBTPageColumns} /> */}
      </div>
    </Fragment>
  );
}
