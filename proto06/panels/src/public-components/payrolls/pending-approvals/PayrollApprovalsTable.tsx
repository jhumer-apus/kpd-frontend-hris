import usePayrollList from "@/custom-hooks/payrolls/use-payroll-list";
import axiosInstance from "@/helpers/axiosConfig";
import { ClipboardDocumentListIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import PayrollsTable from "./PayrollsTable";

interface Props {
    rows: any[]
    loading: boolean,
}
export default function PayrollApprovalsTable(props: Props) {
    const { rows, loading:loadingPendingPayrolls } = props

    const {payrollList, fetchPayrollList, loading:loadingPayrolls} = usePayrollList()
    const [showPayrollList, setShowPayrollList] = useState<boolean>(false)

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
                    // onClick={(e:any) => handleClick(id, "edit")}
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
            width: 150,
        },
        {
            field: 'branch_id',
            headerName: "Branch",
            width: 150,
        },
        {
            field: 'cutoff_id',
            headerName: "Cut Off",
            width: 150,
        },
        // {
        //     field: 'approver1',
        //     headerName: "Approver 1",
        //     width: 150,
        // },
        // {
        //     field: 'approver2',
        //     headerName: "Approver 2",
        //     width: 150,
        // },
        // {
        //     field: 'approver3',
        //     headerName: "Approver 3",
        //     width: 150,
        // },
        {
            field: 'approved1_date',
            headerName: "Date Approver 1",
            width: 150,
        },
        {
            field: 'approved2_date',
            headerName: "Date Approver 2",
            width: 150,
        },
        {
            field: 'approved3_date',
            headerName: "Date Approver 3",
            width: 200,
        },
        {
            field: 'disapproved_by',
            headerName: "Disapproved By",
            width: 200,
        },
    ]

    const viewPayrollList = (selectedRow:any) => {
        setShowPayrollList(curr => true)
        fetchPayrollList(selectedRow.id)
    }

    const handleClosePayrollList = () => {
        setShowPayrollList(curr => false)
    }
    
    return (
        <div className="h-[500px] mt-4">
            <Typography variant="h6" className="text-gray-700">
                Select Pending Payrolls
            </Typography>
            <DataGrid 
                columns={columns}
                rows={rows}
                loading={loadingPendingPayrolls}
                localeText={{noRowsLabel: "No Pending Approvals"}}
                // onRowClick={(params) => onSelectedRow(params?.row)}
            />
            <PayrollsTable 
                payrollList={payrollList} 
                open={showPayrollList}
                handleClose={handleClosePayrollList}
            />
        </div>
    )
}