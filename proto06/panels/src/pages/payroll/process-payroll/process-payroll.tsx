import {  Fragment, useEffect, useState }from 'react';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Paper, useTheme, useMediaQuery } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getCutoffListEmployee } from '@/store/actions/dtr';
import CutOffListTable from './local-components/cutoff-list-table';
import CutOffListEmployees from './local-components/cutoff-list-employees';
import { CutoffListMergeSelectionState, ProcessPayroll } from '@/types/types-pages';
import { RootState } from '@/store/configureStore';
import ApplyPayrollDeductions from './local-components/apply-payroll-deductions';
import CustomizedSnackbars from './local-components/snackbar-error';


const PaperStyle = {
    padding: "20px",
    height: "700px",
    overflow: 'hidden'
}

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    height: "100%",
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
}));


export default function ProcessPayrollPage() {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState<ProcessPayroll>({
    emp_no: null,
    cutoff_code: NaN,
    is_disabled_loan: false,
    is_ca: false,
    is_pagibig_house: false,
    is_pagibig_cal: false,
    is_pagibig_cash: false,
    is_sss_cal: false,
    is_sss_cash: false,
    is_disabled_deduction: false,
    is_30: false,
    is_70: false,
  });
  const { employees } = useSelector((state: RootState) => state.dtr.getCutoffListEmployees);

  useEffect(()=> {
      dispatch(getCutoffListEmployee({cutoff_period:selectedRows?.cutoff_code}));
  }, [selectedRows?.cutoff_code])

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Fragment>
        <form>
        <ApplyPayrollDeductions selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
        <Grid container direction={matches ? 'column' : 'row'} spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <CutOffListTable selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} style={PaperStyle}>
                    <CutOffListEmployees employees={employees} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
                </Paper>
            </Grid>
        </Grid>
        </form>
        <CustomizedSnackbars/>
    </Fragment>
  );
}