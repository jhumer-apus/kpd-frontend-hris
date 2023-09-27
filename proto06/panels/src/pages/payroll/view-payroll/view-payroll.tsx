import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import {
  Typography,
} from "@material-tailwind/react";
import { viewPayrollDescriptions } from '@/data/pages-data/view-payroll-data/view-payroll';
import PrintTableButton from './local-components/print-table-button';
import ExportToCsvButton from './local-components/export-to-csv-button';
import { dynamicPayrollColumns } from '@/data/pages-data/view-payroll-data/view-payroll';
import { viewPayrollList } from '@/store/actions/payroll';
import GeneratePayslipMultiple from './local-components/generate-payslip-multiple';
import GeneratePayslipSingle from './local-components/generate-payslip-single';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';
import { PaySlipDataInitialState } from '@/types/types-pages';
import GeneratePDFButton from './local-components/generate-pdf-button';

export default function ViewPayroll() {
  const [printing, setIsPrinting] = useState(false);
  const [singlePayslipOpen, setSinglePayslipOpen] = useState<boolean>(false);
  const [singlePayslipData, setSinglePayslipData] = useState<ViewPayrollPayPerEmployee>(PaySlipDataInitialState);
  const dispatch = useDispatch();
  
  const { status: payrollStatus, data: payrollData, progress: payrollProgress, error: payrollError} = useSelector((state: RootState) => state.payroll.viewPayroll);

  useEffect(()=> {
    dispatch(viewPayrollList())
  }, []);


  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(payrollData?.length && payrollData?.length >= 11){
      return payrollData?.length / 25 * 1400
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
          <ExportToCsvButton data={payrollData} />
          <PrintTableButton setIsPrinting={setIsPrinting}/>
        </div>
      </div>
      <div style={{ height: `${printing? `${printableArea()}px` : '660px'}`, width: '100%' }} id="printable-area">
        <DataGrid
          rows={payrollData? payrollData: []}
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
          localeText={{ noRowsLabel: `${payrollStatus === 'loading' ? `${payrollStatus?.toUpperCase()}...` : payrollStatus === 'failed' ?  'No payroll found. Contact your administrator/support.' : (payrollStatus === null || payrollStatus === undefined) ? 'There is no payslip to generate. Create a cutoff summary first then process payroll': 'There is no payslip to generate. Create a cutoff summary first then process payroll'}` }}
        />
        <GeneratePDFButton data={payrollData} columns={dynamicPayrollColumns[0]} />
      </div>
    </Fragment>
  );
}
