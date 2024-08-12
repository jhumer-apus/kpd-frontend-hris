import { EMPLOYMENTSSTATUSViewAction } from "@/store/actions/categories";
import { HandleModalAction } from "@/store/actions/components";
import { APILink, RootState } from "@/store/configureStore";
import { Typography } from "@material-tailwind/react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewEmploymentStatusType from "./ViewEmploymentStatusType";

export default function EmploymentStatusTypesTable () {

    const allEmploymentStatus = useSelector((state:RootState) => state.categories.EMPLOYMENTSTATUSView)
    const [selectedRow, setSelectedRow] = useState<any>(null)
    const dispatch = useDispatch()

    useEffect(() => {
      fetchAllEmploymentStatus()
    },[])

    const fetchAllEmploymentStatus = async () => {
      await axios.get(`${APILink}emp_status_type/`).then(res => {
        const data = Array.isArray(res.data) ? res.data: []
        dispatch(EMPLOYMENTSSTATUSViewAction(data))
      })
    }

    const columns:GridColDef[] = [
      {
        field: "name",
        headerName: "Type Name",
        flex:1
      },
      {
        field: "date_added",
        headerName: "Date Added",
        flex:1,
        valueGetter:(params) => dayjs(params.row.date_added).format("MMMM DD, YYYY")
      }
    ]

    return (
          <Fragment>
            <Typography variant="h6">List of Employment Status Type</Typography>
            <DataGrid
                rows={allEmploymentStatus.data}
                columns={columns}
                onRowClick={(e) => {
                  setSelectedRow((curr:any) => e.row)
                  dispatch(HandleModalAction({
                    name: "viewEmploymentStatusTypeModal",
                    value: true
                  }))
                }}
            />
            <ViewEmploymentStatusType selectedRow={selectedRow}/>
          </Fragment>
    )
}