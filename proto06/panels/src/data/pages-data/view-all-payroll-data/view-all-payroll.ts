import { globalDate } from "@/store/configureStore";
import { GridColDef, GridValueGetterParams, GridValueFormatterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";

export const viewPayrollOptions = [
  "View Payroll Per Employee",
  "No Other Payroll View Options",
];

export const viewPayrollDescriptions = [
  "Click on Employee Details to View Individual Payslips. Otherwise, click the generate payslips - multiple.",
];

export const dynamicPayrollColumns: Array<GridColDef[]> = 
[
  [
    {
      field: 'credit_date',
      headerName: 'Credit Date',
      width: 120,
      valueGetter: (params: GridValueGetterParams) => {
        const date = new Date(params.row.cutoff.credit_date);
        return dayjs(date).format(`${globalDate}`);
      },
    },
    { field: 'emp_cname', headerName: 'Employee Name', width: 160 },
    {
      field: 'net_pay',
      headerName: 'Net Pay',
      width: 120,
      valueFormatter: (params: GridValueFormatterParams) => {
        const netpay = params.value as number;
        return netpay.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        })
      },
    },
    {
      field: 'gross_pay',
      headerName: 'Gross Pay',
      width: 120,
      valueFormatter: (params: GridValueFormatterParams) => {
        const grosspay = params.value as number;
        return grosspay.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        })
      },
    },
    { 
      field: 'total_deductions', 
      headerName: 'Total Deductions', 
      width: 120,
      valueGetter: (params: GridValueGetterParams) => {
        const net_deductions = (params.row.sssc_amount_d + params.row.sss_cashloan_d + params.row.sss_calloan_d) + (params.row.philhealthc_amount_d) + (params.row.pagibigc_amount_d + params.row.pagibig_calloan_d + params.row.pagibig_cloan_d + params.row.pagibig_hloan_d) + (params.row.tax_amount_d) + (params.row.lates_amount_d) + (params.row.utime_amount_d) +  (params.row.cash_advance_amount_d + params.row.insurance_d + params.row.other_d) || 0;
        return net_deductions;
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
    { 
      field: 'sss_deductions', 
      headerName: 'SSS', 
      width: 80,
      valueGetter: (params: GridValueGetterParams) => {
        const sssc_amount_d = params.row.sssc_amount_d || 0;
        const sss_cashloan_d = params.row.sss_cashloan_d || 0;
        const sss_calloan_d = params.row.sss_calloan_d || 0;
        const sss_total = sssc_amount_d + sss_cashloan_d + sss_calloan_d;
        return sss_total;
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
    { 
      field: 'philhealth_deductions', 
      headerName: 'Philhealth', 
      width: 80,
      valueGetter: (params: GridValueGetterParams) => {
        const philhealth_total = params.row.philhealthc_amount_d || 0; 
        return philhealth_total;
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
    { 
      field: 'pagibig_deductions', 
      headerName: 'Pagibig', 
      width: 80,
      valueGetter: (params: GridValueGetterParams) => {
        const pagibigc_amount_d = params.row.pagibigc_amount_d || 0;
        const pagibig_calloan_d =  params.row.pagibig_calloan_d || 0;
        const pagibig_cloan_d = params.row.pagibig_cloan_d || 0;
        const pagibig_hloan_d = params.row.pagibig_hloan_d || 0;
        const pagibig_total = pagibigc_amount_d + pagibig_calloan_d + pagibig_cloan_d + pagibig_hloan_d;
        return pagibig_total;
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
    { 
      field: 'tax_deductions', 
      headerName: 'Tax', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        const tax_total = params.row.tax_amount_d || 0;
        return tax_total;
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
    { 
      field: 'lates_deduction', 
      headerName: 'Lates', 
      width: 80,
      valueGetter: (params: GridValueGetterParams) => {
        const lates_total = params.row.lates_amount_d || 0;
        return lates_total
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
    { 
      field: 'undertime_deduction', 
      headerName: 'Undertime', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        const undertime_total = (params.row.utime_amount_d || 0);
        return undertime_total;
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
    { 
      field: 'other_deductions', 
      headerName: 'Other Deductions', 
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        const other_deductions = (params.row.cash_advance_amount_d + params.row.insurance_d + params.row.other_d) || 0;
        return other_deductions;
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
    { 
      field: 'ot_amount_a', 
      headerName: 'OT Pay', 
      width: 100,
      valueGetter: (params: GridValueGetterParams) => {
        const ot_amount = (params.row.ot_amount_a) || 0;
        return ot_amount;
      }, 
      valueFormatter: (params: GridValueFormatterParams) => {
        const value = params.value as number;
        return value.toLocaleString(undefined, {
          style: 'currency',
          currency: 'PHP',
        });
      },
    },
  ],
];
  
export default {
  viewPayrollOptions,
  viewPayrollDescriptions,
  dynamicPayrollColumns
};
  