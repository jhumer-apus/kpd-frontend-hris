import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Fragment, useState } from "react";
import EditOBTType from "./EditOBTType";

interface Props {
    rows: any[]
    refreshTable: () => void
}
export default function ListOBTType(props: Props) {

    const { rows = [], refreshTable } = props

    const [selectedRow, setSelectedRow] = useState<any>(
        {
            id: "",
            type: ""
        }
    )

    const handleClick = (id:number|string, type: "edit" | "delete") => {
        setSelectedRow((curr:any) => (
            {
                id: id,
                type: type
            }
        ))
    }

    const columns: GridColDef[] = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width:90
        },
        {
            field: 'obt_type_name',
            headerName: 'OBT Type',
            editable: true,
            flex:1
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                
                return [
                  <GridActionsCellItem
                    icon={<PencilSquareIcon className="h-6 w-6 text-gray-700 hover:text-blue-500" />}
                    label="Save"
                    sx={{
                      color: 'primary.main',
                    }}
                    onClick={(e:any) => handleClick(id, "edit")}
                  />,
                  <GridActionsCellItem
                    icon={<TrashIcon className="h-6 w-6 text-red-500 hover:text-blue-300" />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={(e:any) => handleClick(id, "delete")}
                    color="inherit"
                  />,
                ];
            
            },
          },
    ];
    
    return (
        <Fragment>
            <div className="my-2 flex flex-wrap justify-between items-start gap-6">
                <div>
                    <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
                        <p></p>
                    </Typography>
                    <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
                    <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
                    </Typography>
                </div>
            </div>
            <EditOBTType 
                setSelectedRow={setSelectedRow} 
                selectedRow={selectedRow}
                refreshTable={refreshTable}
            />
            <div className="h-[500px]">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 100 },
                        },
                    }}
                    pageSizeOptions={[25, 50, 75, 100]}
                    // onRowClick={(e) => {
                    //     setSingleLEAVECREDITDetailsData(e.row);
                    //     setSingleLEAVECREDITOpenModal(true);
                    // }}
                    disableRowSelectionOnClick 
                    localeText={
                        { 
                            noRowsLabel: "No Data Available"
                        }
                    }
                />
            </div>
        </Fragment>
    )
}