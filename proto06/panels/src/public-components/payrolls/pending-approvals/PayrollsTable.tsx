import { XMarkIcon } from "@heroicons/react/24/solid"
import { Box, Button, IconButton, Modal } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Fragment, useState } from "react"
import ViewPayroll from "./ViewPayroll"

interface Props {
    payrollList: any[]
    open: boolean
    handleClose: () => void
}
export default function PayrollsTable(props: Props) {
    const { payrollList, open, handleClose } = props
    const [selectedPayroll, setSelectedPayroll] = useState(null)
    const [showPayroll, setShowPayroll] = useState<boolean>(false)
    
    const columns: GridColDef[] = [
        {
            field: "emp_no",
            headerName: "Employee no.",
            flex:1
        },
        {
            field: "work_days_total",
            headerName: "Total Work Days",
            flex:1
        },
        {
            field: "work_days_total_pay",
            headerName: "Total Work Pay",
            flex:1
        }
    ]

    const handleClosePayroll = () => {
        setShowPayroll(curr => false)
    }

    const onSelectedRow = (row:any) => {
        setSelectedPayroll((curr:any) => row)
        setShowPayroll(curr => true)
    }
    return(
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="mt-20 h-full w-11/12 bg-white m-auto rounded-lg p-4">
                    <div className="flex justify-end">
                        <IconButton  
                            aria-label="close"
                            onClick={() => handleClose()}
                        >
                            <XMarkIcon className="w-8 text-black"/>
                        </IconButton>
                    </div>
                    <div className="p-8">
                        <Button variant="contained">Approved</Button>
                        <DataGrid 
                            rows={payrollList} 
                            columns={columns}
                            className="mt-8"
                            onRowSelectionModelChange={(params) => console.log(params)}
                        />
                    </div>
                    <ViewPayroll 
                        payrollData={selectedPayroll}
                        handleClose={handleClosePayroll}
                        // refreshTable={fetchPayrollByApprovers}
                        open={showPayroll}            
                    />
                </Box>
            </Modal>
        </Fragment>
    )
}