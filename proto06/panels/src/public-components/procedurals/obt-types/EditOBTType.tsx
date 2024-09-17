import axiosInstance from "@/helpers/axiosConfig";
import { beautifyJSON } from "@/helpers/utils";
import { HandleAlertAction } from "@/store/actions/components";
import { APILink, RootState } from "@/store/configureStore";
import { Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    setSelectedRow: any
    selectedRow: any
    refreshTable: () => void
}

interface OBTTypeData {
    id: string | number
    obt_type_name: string
    date_added: string| Date| Dayjs | null
}

export default function ExportOBTType(props:Props) {

    const {selectedRow, setSelectedRow, refreshTable } = props
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const dispatch = useDispatch()

    
    const [data, setData] = useState<OBTTypeData>(
        {
            id: "",
            obt_type_name: "",
            date_added: ""
        }
    )

    useEffect(() => {
        fetchSpecificObtType()
    },[selectedRow?.id])

    const handleClose = () => {
        setSelectedRow((curr:any) => ({
            ...curr,
            type: ""
        }))
    }

    const fetchSpecificObtType = async() => {

        if(selectedRow?.type == "edit") {
            await axiosInstance.get(`obt_type/${selectedRow?.id}/`)
                .then(res => setData(
                    {
                        id: res?.data?.id || "",
                        obt_type_name: res?.data?.obt_type_name || "",
                        date_added: res?.data?.date_added || ""
                    }
                ))
                .catch(err => setData(
                    {
                        id: "",
                        obt_type_name:  "",
                        date_added: ""
                    }
                ))
        }
    }


    const handleChange = (e:any) => {
        setData((curr:any) => (
            {
                ...curr,
                [e.target.name]: e.target.value
            }
        ))
    }

    const editObtType = (e:any) => {
        e.preventDefault()

        const payload = {
            obt_type_name: data?.obt_type_name,
            added_by: currUser?.emp_no
        }

        putObtType(payload)
    }
    const putObtType = async (payload:any) => {
        await axiosInstance.put(`obt_type/${selectedRow?.id}/`,payload)
            .then(res => 
                {
                    dispatch(HandleAlertAction(
                        {
                            open:true,
                            status: "success",
                            message: "Update OBT Type Successfully"
                        }
                    ))
                    refreshTable()
                    handleClose()
                }
            )
        //     .catch(err => {
        //         dispatch(HandleAlertAction(
        //             {
        //                 open: true,
        //                 status: "error",
        //                 message: beautifyJSON(err.response.data)
        //             }
        //         ))

                 
        //     }
        // )   
    }

    return (
        <div>
            <Modal
                open={selectedRow?.type == "edit"}
                onClose={handleClose}
            >
                <div className="modal-content">
                    <form className="flex flex-col gap-4" onSubmit={editObtType}>
                        <TextField
                            name="obt_type_name"
                            required
                            label="OBT Type Name"
                            onChange={handleChange}
                            value={data?.obt_type_name || ""}

                        />
                        <div className="flex gap-4">
                            <Button onClick={() => handleClose()}>Cancel</Button>
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}