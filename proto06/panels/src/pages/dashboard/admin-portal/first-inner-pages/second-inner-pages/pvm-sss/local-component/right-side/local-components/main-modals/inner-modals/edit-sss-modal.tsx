import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { SSSViewInterface } from '@/types/types-payroll-variables';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { SSSEditAction } from '@/store/actions/payroll-variables';

interface EditSSSModalInterface {
    singleSSSDetailsData: SSSViewInterface;
    editSSSOpenModal: boolean; 
    setEditSSSOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleSSSDetailsData: Dispatch<SetStateAction<SSSViewInterface>>;
}

export default function EditSSSModal(props: EditSSSModalInterface) {
  const dispatch = useDispatch();
  const SSSEditState = useSelector((state: RootState)=> state.payrollVariables.SSSEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editSSSOpenModal, setEditSSSOpenModal, singleSSSDetailsData, setSingleSSSDetailsData} = props;


  const editSSS = () => { 
    dispatch(SSSEditAction({
      ...singleSSSDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(SSSEditState.status){      
      if(SSSEditState.status === 'succeeded'){
        window.alert(`${SSSEditState.status.charAt(0).toUpperCase()}${SSSEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(SSSEditState.status === 'failed'){
        window.alert(`${SSSEditState.error}`)
      }
    }
  }, [SSSEditState.status])
  return (
    <Fragment>
      <Transition in={editSSSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditSSSOpenModal(false);
        }}
        slotProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: 'none',
                transition: `opacity 400ms, backdrop-filter 400ms`,
                ...{
                  entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                  entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                }[state],
              },
            },
          }}
          sx={{
            visibility: state === 'exited' ? 'hidden' : 'visible',
          }}
      >
        <ModalDialog 
            aria-labelledby="dialog-vertical-scroll-title" 
            layout={'center'}
            sx={{
              ...editSSSArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
            }}
            size='sm'
        > 
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing Pagibig Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-6'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Pagibig Number'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleSSSDetailsData?.sss_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleSSSDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            sss_no: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Monthly Contribution'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleSSSDetailsData?.sss_contribution_month}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleSSSDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            sss_contribution_month: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Cash Loan Deduction/Month'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleSSSDetailsData?.sss_with_cashloan_amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleSSSDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            sss_with_cashloan_amount: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Cash Loan Balance'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleSSSDetailsData?.sss_rem_cashloan_amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleSSSDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            sss_rem_cashloan_amount: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Calamity Loan Deduction/Month'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleSSSDetailsData?.sss_with_calloan_amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleSSSDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            sss_with_calloan_amount: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Calamity Loan Balance'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleSSSDetailsData?.sss_rem_calloan_amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleSSSDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            sss_rem_calloan_amount: value
                                        }
                                    )
                                })
                            }}
                        />
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editSSS}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditSSSOpenModal(false)}}>Cancel</Button>
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const editSSSArea = {
  height: '224.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};