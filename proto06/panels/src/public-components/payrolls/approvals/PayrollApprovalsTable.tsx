import usePayrollList from "@/custom-hooks/payrolls/use-payroll-list";
import axiosInstance from "@/helpers/axiosConfig";
import { ClipboardDocumentListIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import PayrollsTable from "./PayrollsTable";
import ViewPayrollApprover from "./ViewPayrollApprover";

interface Props {
    rows: any[]
    loading: boolean,
    refreshPayrollApprovers: () => void
}
export default function PayrollApprovalsTable(props: Props) {
    const { rows, loading:loadingApprovals, refreshPayrollApprovers } = props

    const {payrollList, fetchPayrollList, loading:loadingPayrolls} = usePayrollList()
    const [showPayrollList, setShowPayrollList] = useState<boolean>(false)
    const [showPayrollApprover, setShowPayrollApprover] = useState<boolean>(false)
    const [selectedPayrollApprover, setSelectedPayrollApprover] = useState<any>(null)

    const columns: GridColDef[] = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 130,
            cellClassName: 'actions',
            getActions: ({ row }) => {
                return [
                  <GridActionsCellItem
                    icon={<EyeIcon className="transition-all h-6 w-6 text-gray-600 hover:h-8 hover:w-8" />}
                    label="Save"
                    sx={{
                      color: 'primary.main',
                    }}
                    onClick={(e:any) => viewPayrollApprover(row)}
                  />,
                  <GridActionsCellItem
                    icon={<ClipboardDocumentListIcon className="transition-all h-6 w-6 text-gray-600 hover:h-8 hover:w-8" />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={(e:any) => viewPayrollList(row)}
                    color="inherit"
                  />,
                ];
            },
          },
        {
            field: 'status',
            headerName: "Status",
            width: 130,
        },
        {
            field: 'branch_name',
            headerName: "Branch",
            width: 150,
        },
        {
            field: 'cutoff_name',
            headerName: "Cut Off",
            width: 150,
        },
        {
            field: 'payroll_total',
            headerName: "Payroll Total (₱)",
            width: 180,
            valueFormatter: (params) => Number(params.value)?.toLocaleString()

        },
        {
            field: 'approved1_date',
            headerName: "Date Approver 1",
            width: 150,
            valueGetter: (params) => {
                return params?.row?.approved1_date? dayjs(params.row.approved1_date).format("MMM DD, YYYY"): ""
            }
        },
        {
            field: 'approved2_date',
            headerName: "Date Approver 2",
            width: 150,
            valueGetter: (params) => {
                return params?.row?.approved2_date? dayjs(params.row.approved2_date).format("MMM DD, YYYY"): ""
            }
        },
        {
            field: 'approved3_date',
            headerName: "Date Approver 3",
            width: 200,
            valueGetter: (params) => {
                return params?.row?.approved3_date? dayjs(params.row.approved3_date).format("MMM DD, YYYY"): ""
            }
        },
        {
            field: 'disapproved_by',
            headerName: "Disapproved By",
            width: 200,
        },
    ]

    const viewPayrollList = (selectedRow:any) => {
        setShowPayrollList(curr => true)
        setSelectedPayrollApprover(selectedRow)
        fetchPayrollList(selectedRow.id)
    }

    const viewPayrollApprover = (selectedRow:any) => {
        setSelectedPayrollApprover(selectedRow)
        setShowPayrollApprover(curr => true)
    }

    const handleClosePayrollList = () => {
        setShowPayrollList(curr => false)
    }

    const handleClosePayrollApprover = () => {
        setShowPayrollApprover(curr => false)
    }
    
    return (
        <div className="h-[500px] mt-4">
            {/* <Typography variant="h6" className="text-gray-700">
                Select  Payrolls
            </Typography> */}
            <DataGrid 
                columns={columns}
                rows={rows}
                loading={loadingPayrolls}
                localeText={{noRowsLabel: "No  Approvals"}}
                // onRowClick={(params) => onSelectedRow(params?.row)}
            />
            <PayrollsTable 
                payrollList={payrollList}
                loading={loadingApprovals}
                open={showPayrollList}
                handleClose={handleClosePayrollList}
                payrollApprover={selectedPayrollApprover}
                refreshPayrollApprovers={refreshPayrollApprovers}
            />
            <ViewPayrollApprover 
                open={showPayrollApprover} 
                handleClose={handleClosePayrollApprover} 
                data={selectedPayrollApprover} 
            />
        </div>
    )
}