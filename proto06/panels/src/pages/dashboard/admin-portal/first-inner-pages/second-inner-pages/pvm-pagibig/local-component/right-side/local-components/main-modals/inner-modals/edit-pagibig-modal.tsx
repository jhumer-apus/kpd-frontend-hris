import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { PAGIBIGViewInterface } from '@/types/types-payroll-variables';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import { PAGIBIGEditAction, PAGIBIGEditActionFailureCleanup, PAGIBIGViewAction } from '@/store/actions/payroll-variables';
import { cleanTextNumber } from '@/helpers/utils';

interface EditPAGIBIGModalInterface {
    singlePAGIBIGDetailsData: PAGIBIGViewInterface;
    editPAGIBIGOpenModal: boolean; 
    setSinglePAGIBIGOpenModal: Dispatch<SetStateAction<boolean>>; 
    setEditPAGIBIGOpenModal: Dispatch<SetStateAction<boolean>>;
    setSinglePAGIBIGDetailsData: Dispatch<SetStateAction<PAGIBIGViewInterface>>;
}

export default function EditPAGIBIGModal(props: EditPAGIBIGModalInterface) {
  const dispatch = useDispatch();
  const PAGIBIGEditState = useSelector((state: RootState)=> state.payrollVariables.PAGIBIGEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {
    editPAGIBIGOpenModal, 
    setEditPAGIBIGOpenModal, 
    singlePAGIBIGDetailsData, 
    setSinglePAGIBIGDetailsData,
    setSinglePAGIBIGOpenModal
  } = props;


  const editPAGIBIG = () => { 
    dispatch(PAGIBIGEditAction({
      ...singlePAGIBIGDetailsData,
      added_by: curr_user || NaN
    }))
  }

  const handlePagibigDetails = (e:any) => {

    let value = cleanTextNumber(e.target.value)
    const key = e.target.name

    setSinglePAGIBIGDetailsData((curr:any) => (
      {
        ...curr,
        [key]: key == 'pagibig_no'? String(value): Number(value)
      }
    ))
  }

  useEffect(()=>{      
    if(PAGIBIGEditState.status === `${globalReducerSuccess}`){
      window.alert(`${PAGIBIGEditState.status.charAt(0).toUpperCase()}${PAGIBIGEditState.status.slice(1)}`)
      // window.location.reload();
      setEditPAGIBIGOpenModal(false);
      setSinglePAGIBIGOpenModal(false);
      dispatch(PAGIBIGViewAction());
      setTimeout(()=>{
        dispatch(PAGIBIGEditActionFailureCleanup());
      }, 200)
    }else if(PAGIBIGEditState.status === `${globalReducerFailed}`){
      window.alert(`${PAGIBIGEditState.error}`)
      setTimeout(()=>{
        dispatch(PAGIBIGEditActionFailureCleanup());
      }, 200)
    }
  }, [PAGIBIGEditState.status])
  return (
    <Fragment>
      <Transition in={editPAGIBIGOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditPAGIBIGOpenModal(false);
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
              ...editPAGIBIGArea,
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
                            name="pagibig_no"
                            value={singlePAGIBIGDetailsData?.pagibig_no}
                            onChange={handlePagibigDetails}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Monthly Contribution'
                            aria-required  
                            variant='outlined' 
                            name="pagibig_contribution_month"
                            value={singlePAGIBIGDetailsData?.pagibig_contribution_month}
                            onChange={handlePagibigDetails}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Cash Loan Deduction/Month'
                            aria-required  
                            variant='outlined' 
                            name="pagibig_with_cloan_amount"
                            value={singlePAGIBIGDetailsData?.pagibig_with_cloan_amount}
                            onChange={handlePagibigDetails}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Cash Loan Balance'
                            aria-required  
                            variant='outlined' 
                            name="pagibig_rem_cloan_amount"
                            value={singlePAGIBIGDetailsData?.pagibig_rem_cloan_amount}
                            onChange={handlePagibigDetails}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Housing Loan Deduction/Month'
                            aria-required  
                            variant='outlined' 
                            name="pagibig_with_hloan_amount"
                            value={singlePAGIBIGDetailsData?.pagibig_with_hloan_amount}
                            onChange={handlePagibigDetails}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Housing Loan Balance'
                            aria-required  
                            variant='outlined' 
                            name="pagibig_rem_hloan_amount"
                            value={singlePAGIBIGDetailsData?.pagibig_rem_hloan_amount}
                            onChange={handlePagibigDetails}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Calamity Loan Deduction/Month'
                            aria-required  
                            variant='outlined' 
                            name="pagibig_with_calloan_amount"
                            value={singlePAGIBIGDetailsData?.pagibig_with_calloan_amount}
                            onChange={handlePagibigDetails}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Calamity Loan Balance'
                            aria-required  
                            variant='outlined' 
                            name="pagibig_rem_calloan_amount"
                            value={singlePAGIBIGDetailsData?.pagibig_rem_calloan_amount}
                            onChange={handlePagibigDetails}
                        />
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editPAGIBIG}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditPAGIBIGOpenModal(false)}}>Cancel</Button>
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
const editPAGIBIGArea = {
  height: '224.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};