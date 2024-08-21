import { HandleModalAction } from "@/store/actions/components";
import { APILink, RootState } from "@/store/configureStore";
import { Button, Modal } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutocompleteForm from "../forms/AutoCompleteForm";
import axios from "axios";

interface Props {
    emp_nos: number[] | []
}
export default function EditBulkEmployeeSched(props:Props) {

    const { emp_nos } = props
    const { editBulkEmployeeSchedModal } = useSelector((state:RootState) => state.component)
    const currUser = useSelector((state:RootState) => state.auth.employee_detail)
    const [scheduleShifts, setScheduleShifts] = useState<any[]>([])

    const [shiftData, setShiftData] = useState<any>({
        emp_schedule_daily: emp_nos,
        schedule_shift_code: null,
        is_restday: true,
        added_by: currUser?.emp_no
    })
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(HandleModalAction({
            name: "editBulkEmployeeSchedModal",
            value: false
        }))
    }

    useEffect(() => {
        if(editBulkEmployeeSchedModal) fetchScheduleShifts()
    },[editBulkEmployeeSchedModal])

    const fetchScheduleShifts = async () => {
        await axios
            .get(`${APILink}schedule_shift/`)
            .then(res => setScheduleShifts(curr => Array.isArray(res.data) ? res.data: []))
    }

    const handleChangeShift = (e:any, newValue:any) => {
        setShiftData(curr => ({
            ...curr,
            schedule_shift_code: newValue?.id
        }))
    }
    return (
        <Fragment>
            <Modal
                open={editBulkEmployeeSchedModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                // className='overflow-auto'
            >
                <div className='modal-content flex flex-col gap-4 w-[300px]'>
                    <p>Number of Selected Employees: {emp_nos.length}</p>
                    <AutocompleteForm 
                        id="sched_shifts"
                        options={scheduleShifts} 
                        label="Schedule Shifts"
                        getOptionLabel={(option:any) => option?.name?? ""} 
                        handleChange={handleChangeShift} 
                        optionTitle={"name"} 
                        defaultValueId={shiftData?.schedule_shift_code} 
                    />
                    <div>
                        <Button onClick={() => handleClose()}>Cancel</Button>
                        <Button type="submit">Update</Button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}