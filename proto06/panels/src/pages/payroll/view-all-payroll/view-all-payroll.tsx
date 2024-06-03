import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import {
  Typography,
} from "@material-tailwind/react";
import { viewPayrollDescriptions } from '@/data/pages-data/view-all-payroll-data/view-all-payroll';
import PrintTableButton from './local-components/print-table-button';
import ExportToCsvButton from './local-components/export-to-csv-button';
import { dynamicPayrollColumns } from '@/data/pages-data/view-all-payroll-data/view-all-payroll';
import { viewPayrollList } from '@/store/actions/payroll';
import GeneratePayslipMultiple from './local-components/generate-payslip-multiple';
import GeneratePayslipSingle from './local-components/generate-payslip-single';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { PaySlipDataInitialState } from '@/types/types-pages';
import GeneratePDFButton from './local-components/generate-pdf-button';
import { globalServerErrorMsg } from '@/store/configureStore';


export default function ViewPayroll() {
  const [printing, setIsPrinting] = useState(false);
  const [singlePayslipOpen, setSinglePayslipOpen] = useState<boolean>(false);
  const [singlePayslipData, setSinglePayslipData] = useState<ViewPayrollPayPerEmployee>(PaySlipDataInitialState);
  const dispatch = useDispatch();
  
  const { status, data, progress, error } = useSelector((state: RootState) => state.payroll.viewPayroll);

  useEffect(()=> {
    dispatch(viewPayrollList())
  }, []);


  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(data?.length && data?.length >= 11){
      return data?.length / 25 * 1400
    } else {
      return 600
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <GeneratePayslipSingle singlePayslipData={singlePayslipData} singlePayslipOpen={singlePayslipOpen} setSinglePayslipOpen={setSinglePayslipOpen}/>
          <GeneratePayslipMultiple />
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>{viewPayrollDescriptions[0]}</i>
        </Typography>
        </div>
        <div className='flex justify-between gap-6'>
          <ExportToCsvButton data={data} />
          <PrintTableButton setIsPrinting={setIsPrinting}/>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={data? data: []}
          columns={dynamicPayrollColumns[0]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSinglePayslipData(e.row);
            setSinglePayslipOpen(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${globalServerErrorMsg}` : 'Data Loaded - Showing 0 Results'}` }}
          />
        <GeneratePDFButton data={data} columns={dynamicPayrollColumns[0]} />
      </div>
    </Fragment>
  );
}
