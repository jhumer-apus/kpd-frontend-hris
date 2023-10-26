import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { CASHADVANCEViewInterface } from '@/types/types-payroll-variables';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { CASHADVANCEEditAction } from '@/store/actions/payroll-variables';

interface EditCASHADVANCEModalInterface {
    singleCASHADVANCEDetailsData: CASHADVANCEViewInterface;
    editCASHADVANCEOpenModal: boolean; 
    setEditCASHADVANCEOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleCASHADVANCEDetailsData: Dispatch<SetStateAction<CASHADVANCEViewInterface>>;
}

export default function EditCASHADVANCEModal(props: EditCASHADVANCEModalInterface) {
  const dispatch = useDispatch();
  const CASHADVANCEEditState = useSelector((state: RootState)=> state.payrollVariables.CASHADVANCEEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editCASHADVANCEOpenModal, setEditCASHADVANCEOpenModal, singleCASHADVANCEDetailsData, setSingleCASHADVANCEDetailsData} = props;


  const editCASHADVANCE = () => { 
    dispatch(CASHADVANCEEditAction({
      ...singleCASHADVANCEDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(CASHADVANCEEditState.status){      
      if(CASHADVANCEEditState.status === 'succeeded'){
        window.alert(`${CASHADVANCEEditState.status.charAt(0).toUpperCase()}${CASHADVANCEEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(CASHADVANCEEditState.status === 'failed'){
        window.alert(`${CASHADVANCEEditState.error}`)
      }
    }
  }, [CASHADVANCEEditState.status])
  return (
    <Fragment>
      <Transition in={editCASHADVANCEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditCASHADVANCEOpenModal(false);
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
              ...editCASHADVANCEArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing CASHADVANCE Details</Typography>
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
                            label='Monthly Payment'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleCASHADVANCEDetailsData?.payment_monthly}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleCASHADVANCEDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            payment_monthly: value
                                        }
                                    )
                                })
                            }}
                        />
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editCASHADVANCE}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditCASHADVANCEOpenModal(false)}}>Cancel</Button>
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
const editCASHADVANCEArea = {
  height: '135.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};