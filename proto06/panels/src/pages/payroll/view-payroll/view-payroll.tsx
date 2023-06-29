import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/reducers';
import { RootState } from '@/store/configureStore';
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { Modal, Box, } from '@mui/material';

import {
  Typography,
} from "@material-tailwind/react";

import { SpecificEmployee } from './forms/SpecificEmployee';
import SplitButton from '@/widgets/split-button/split-button';
import { viewDTROptions, viewDTRDescriptions } from '@/data/pages-data/dtr-data/view-dtr-reports';
import useDtrState from '@/custom-hooks/use-dtr-state';
import { dynamicDTRColumns } from '@/data/pages-data/dtr-data/view-dtr-reports';
import { viewAllDtrLogs, viewCutoffDtrSummary, viewMergedDtrLogs } from '@/store/actions/dtr';
import PrintTableButton from './local-components/print-table-button';
import ExportToCsvButton from './local-components/export-to-csv-button';
import { dynamicPayrollColumns } from '@/data/pages-data/view-payroll-data/view-dtr-reports';
import { viewPayrollList } from '@/store/actions/payroll';
import GeneratePayslipMultiple from './local-components/generate-payslip-multiple';
import FadeModalDialog from './local-components/new-modal';
import GeneratePayslipSingle from './local-components/generate-payslip-single';
import { ViewPayrollPayPerEmployee } from '@/types/types-pages';

export default function ViewPayroll() {
  const [printing, setIsPrinting] = useState(false);
  const [singlePayslipOpen, setSinglePayslipOpen] = useState<boolean>(false);
  const [singlePayslipData, setSinglePayslipData] = useState<GridRowParams<ViewPayrollPayPerEmployee> | null>(null);
  const dispatch = useDispatch();
  const { spButtonIndex, dtrStatus, dtrData } = useDtrState();
  
  const { status: payrollStatus, data: payrollData, progress: payrollProgress, error: payrollError} = useSelector((state: RootState) => state.payroll.viewPayroll);
  


  useEffect(()=> {
    dispatch(viewPayrollList())
  }, [])

  const printableArea = () => {
    // Calculate px; solves printable area bug, Do not easily modify
    if(payrollData?.length && payrollData?.length >= 11){
      return payrollData?.length / 25 * 1400
    } else {
      return 700
    }
  };

  return (
    <Fragment>
      <div className="my-10 flex flex-wrap justify-between items-start gap-6">
        <div>
          <GeneratePayslipSingle singlePayslipData={singlePayslipData} singlePayslipOpen={singlePayslipOpen} setSinglePayslipOpen={setSinglePayslipOpen}/>
          <GeneratePayslipMultiple />
        {/* <SplitButton options={viewDTROptions}/> */}
        {/* <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>{viewDTRDescriptions[spButtonIndex === null ? 0 : spButtonIndex]}</i>
        </Typography> */}
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
            setSinglePayslipData(e);
            console.log(e, "this is pancit")
            setSinglePayslipOpen(true);
            // spButtonIndex === 2 ? gridRowClick(e) : null
          }}
          checkboxSelection
          disableRowSelectionOnClick
          // disableSelectionOnClick 
          style={{ cursor: spButtonIndex === 2 ? 'pointer': 'default'}}
          localeText={{ noRowsLabel: `${dtrStatus === 'loading' ? `${dtrStatus?.toUpperCase()}...` : dtrStatus === 'failed' ?  'No cutoff lists found. Contact your administrator/support.' : (dtrStatus === null || dtrStatus === undefined) ? 'Choose a cutoff period to display employee list': 'SUCCEEDED...'}` }}
        />
      </div>
    </Fragment>

  );
}
