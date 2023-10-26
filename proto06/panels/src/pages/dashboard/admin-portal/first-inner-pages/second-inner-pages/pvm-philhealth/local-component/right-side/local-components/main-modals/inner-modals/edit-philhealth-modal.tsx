import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { PHILHEALTHViewInterface } from '@/types/types-payroll-variables';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { PHILHEALTHEditAction } from '@/store/actions/payroll-variables';

interface EditPHILHEALTHModalInterface {
    singlePHILHEALTHDetailsData: PHILHEALTHViewInterface;
    editPHILHEALTHOpenModal: boolean; 
    setEditPHILHEALTHOpenModal: Dispatch<SetStateAction<boolean>>;
    setSinglePHILHEALTHDetailsData: Dispatch<SetStateAction<PHILHEALTHViewInterface>>;
}

export default function EditPHILHEALTHModal(props: EditPHILHEALTHModalInterface) {
  const dispatch = useDispatch();
  const PHILHEALTHEditState = useSelector((state: RootState)=> state.payrollVariables.PHILHEALTHEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editPHILHEALTHOpenModal, setEditPHILHEALTHOpenModal, singlePHILHEALTHDetailsData, setSinglePHILHEALTHDetailsData} = props;


  const editPHILHEALTH = () => { 
    dispatch(PHILHEALTHEditAction({
      ...singlePHILHEALTHDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(PHILHEALTHEditState.status){      
      if(PHILHEALTHEditState.status === 'succeeded'){
        window.alert(`${PHILHEALTHEditState.status.charAt(0).toUpperCase()}${PHILHEALTHEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(PHILHEALTHEditState.status === 'failed'){
        window.alert(`${PHILHEALTHEditState.error}`)
      }
    }
  }, [PHILHEALTHEditState.status])
  return (
    <Fragment>
      <Transition in={editPHILHEALTHOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditPHILHEALTHOpenModal(false);
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
              ...editPHILHEALTHArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing PHILHEALTH Details</Typography>
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
                            value={singlePHILHEALTHDetailsData?.ph_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSinglePHILHEALTHDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ph_no: value
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
                            value={singlePHILHEALTHDetailsData?.ph_contribution_month}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSinglePHILHEALTHDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ph_contribution_month: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='PHILHEALTH Category:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singlePHILHEALTHDetailsData?.ph_category}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setSinglePHILHEALTHDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            ph_category: value
                                        }
                                    )
                                })
                            }}
                        />
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editPHILHEALTH}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditPHILHEALTHOpenModal(false)}}>Cancel</Button>
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
const editPHILHEALTHArea = {
  height: '135.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};