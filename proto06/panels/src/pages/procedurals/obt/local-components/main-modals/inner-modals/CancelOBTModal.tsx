import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { APILink, RootState } from '@/store/configureStore';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { beautifyJSON } from '@/helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { HandleAlertAction, HandleModalAction } from '@/store/actions/components';
import { OBTViewAction, OBTViewAllFilterApproverAction } from '@/store/actions/procedurals';
import useFetchFileApplicationByApprover from '@/custom-hooks/use-fetch-file-application-by-approver';
import axiosInstance from '@/helpers/axiosConfig';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props{
    isCancelModalOpen: boolean
    setIsCancelModalOpen: any
    data: any
}

export default function CancelOBTModal(props: Props) {

    //PROPS
    const { isCancelModalOpen, setIsCancelModalOpen, data } = props

    //REDUX
    const currUser = useSelector((state: RootState) => state.auth.employee_detail);
    const dispatch = useDispatch()

    //STATE
    const [cancelReason, setCancelReason] = useState<string>("")
    const isDepartmentManager =  currUser?.rank_hierarchy == 2
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //FUNCTIONS
    const validateCancel = () => {

        let errors:any = {}
        !cancelReason.trim() && (errors['Cancel Reason'] = 'Please insert the reason to cancel the approved the application');

        if(Object.keys(errors).length > 0) {

            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message:beautifyJSON(errors)
            }))
            return true
        }

        return false
    }

    const fetchOBTByApprover = async() => {
        await axiosInstance.get(`obt/`,{
          params:{
            approver: currUser?.emp_no
          }
        }).then(res => {
          dispatch(OBTViewAllFilterApproverAction({data: res.data}))
        })
    }
    const cancelApprovedOBT = async () => {

        setIsLoading(curr => true)

        if(validateCancel()) {
            setIsLoading(curr => false)
            return 
        }

        const payload = {
            ...data,
            approver_emp_no:currUser?.emp_no,
            status: "cancel",
            obt_reason_cancelled: `${cancelReason} (${currUser?.emp_no})`,
            added_by: currUser?.emp_no,

        }
        await axiosInstance.put(`obt_new/${data.id}/`, payload).then((res:AxiosResponse) => {
            
            isDepartmentManager? fetchOBTByApprover(): dispatch(OBTViewAction())

            dispatch(HandleModalAction({
                name: "viewObtModal",
                value: false
            }))

            dispatch(HandleAlertAction({
                open:true,
                status:"success",
                message:"Cancel approved OBT successfully"
            }))

            setIsCancelModalOpen((curr:any) => false)
            setIsLoading(curr => false)

        }).catch((err:any) => {
            
            isDepartmentManager? fetchOBTByApprover(): dispatch(OBTViewAction())

            dispatch(HandleModalAction({
                name: "viewObtModal",
                value: false
            }))

            dispatch(HandleAlertAction({
                open:true,
                status:"error",
                message:beautifyJSON(err.response?.data)
            }))

            setIsCancelModalOpen((curr:any) => false)
            setIsLoading(curr => false)
        })
    }

  return (
    <div>
      <Modal
        open={isCancelModalOpen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Cancel Approved OBT
            </Typography>
            <Typography id="modal-modal-description" className="text-red-500" sx={{ mt: 2 }}>
                Are you sure you want to <span className="font-bold">CANCEL</span> the approved OBT?
            </Typography>

            <div className='mt-4'>
                <TextField 
                    className="w-full" 
                    onChange={(e) => setCancelReason(curr => e.target.value)} 
                    multiline rows={4}
                    inputProps={{
                        maxLength:100
                    }}
                    label="Cancel Reasons"
                    helperText={`${cancelReason.length}/100`}
                />
            </div>
            <div className='m-auto'>
                <Button disabled={isLoading} className="" onClick={() => setIsCancelModalOpen(false)}>No</Button>
                <Button disabled={isLoading} className="" onClick={() => cancelApprovedOBT()}>Yes</Button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
