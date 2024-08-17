import EmployeeListField from "@/public-components/EmployeeListField";
import { EMPLOYMENTSSTATUSViewAction } from "@/store/actions/categories";
import { APILink, RootState } from "@/store/configureStore";

import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type CreateEmpStatusType = {
    name: string,
    added_by: string | number | null | undefined
}
export default function CreateEmploymentStatusType() {

    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail);
    const [createType, setCreateType] = useState<CreateEmpStatusType>({
        name:"",
        added_by: curr_user?.emp_no,

    });

    const handleChange = (e:any) => {
        setCreateType(curr => ({
            ...curr,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e:any) => {
        e.preventDefault()

        const payload = {
            name: createType.name,
            emp_no: curr_user?.emp_no,
            added_by: curr_user?.emp_no,
        }

        createEmpStatusType(payload)
    }

    const createEmpStatusType = async (payload:CreateEmpStatusType) => {
        await axios.post(`${APILink}emp_status_type/`, payload).then(res => {
            fetchAllEmploymentStatus()
            setCreateType((curr:CreateEmpStatusType) => (
                {
                    name:"",
                    added_by: curr_user?.emp_no,
                }
            ))
        })
    }

    const fetchAllEmploymentStatus = async () => {
        await axios.get(`${APILink}emp_status_type/`).then(res => {
          const data = Array.isArray(res.data) ? res.data: []
          dispatch(EMPLOYMENTSSTATUSViewAction(data))
        })
      }

    return (
        <Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Employment Status Data</Typography>
            <form onSubmit={onSubmit} className='flex flex-col gap-3 overflow-auto relative'>
                    {/* <div className='flex flex-col gap-3 pt-4'>
                        <EmployeeListField 
                            label={""} 
                            handleChange={handleChangeEmployee} 
                            currentValue={null} 
                        />
                    </div> */}
                    <div className=''>
                        <TextField
                            name="name"
                            sx={{width: '100%'}} 
                            label='Employment Status Type'
                            aria-required  
                            variant='standard' 
                            type="text"
                            onChange={handleChange}
                            value={createType.name}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' type="submit">Create Employment Status Type</Button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}

