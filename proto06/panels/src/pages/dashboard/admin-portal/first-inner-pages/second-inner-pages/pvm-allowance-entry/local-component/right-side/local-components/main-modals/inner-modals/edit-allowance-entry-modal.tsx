import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ALLOWANCEENTRYViewInterface } from '@/types/types-payroll-variables';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { ALLOWANCEENTRYEditAction } from '@/store/actions/payroll-variables';
import EmployeeAutoCompleteRight from '../auto-complete-fields/employee-autocomplete-right';
import AllowanceAutoCompleteRight from '../auto-complete-fields/allowance-type-autocomplete-right';

interface EditALLOWANCEENTRYModalInterface {
    singleALLOWANCEENTRYDetailsData: ALLOWANCEENTRYViewInterface;
    editALLOWANCEENTRYOpenModal: boolean; 
    setEditALLOWANCEENTRYOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleALLOWANCEENTRYDetailsData: Dispatch<SetStateAction<ALLOWANCEENTRYViewInterface>>;
}

export default function EditALLOWANCEENTRYModal(props: EditALLOWANCEENTRYModalInterface) {
  const dispatch = useDispatch();
  const ALLOWANCEENTRYEditState = useSelector((state: RootState)=> state.payrollVariables.ALLOWANCEENTRYEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editALLOWANCEENTRYOpenModal, setEditALLOWANCEENTRYOpenModal, singleALLOWANCEENTRYDetailsData, setSingleALLOWANCEENTRYDetailsData} = props;


  const editALLOWANCEENTRY = () => { 
    dispatch(ALLOWANCEENTRYEditAction({
      ...singleALLOWANCEENTRYDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(ALLOWANCEENTRYEditState.status){      
      if(ALLOWANCEENTRYEditState.status === 'succeeded'){
        window.alert(`${ALLOWANCEENTRYEditState.status.charAt(0).toUpperCase()}${ALLOWANCEENTRYEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(ALLOWANCEENTRYEditState.status === 'failed'){
        window.alert(`${ALLOWANCEENTRYEditState.error}`)
      }
    }
  }, [ALLOWANCEENTRYEditState.status])
  return (
    <Fragment>
      <Transition in={editALLOWANCEENTRYOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditALLOWANCEENTRYOpenModal(false);
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
              ...editALLOWANCEENTRYArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing ALLOWANCEENTRY Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-6'>
                      {/* <EmployeeAutoCompleteRight editALLOWANCEENTRY={singleALLOWANCEENTRYDetailsData} setEditALLOWANCEENTRY={setSingleALLOWANCEENTRYDetailsData}/> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Allowance Amount'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleALLOWANCEENTRYDetailsData?.amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleALLOWANCEENTRYDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            amount: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Tax Rate'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleALLOWANCEENTRYDetailsData?.tax_rate}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleALLOWANCEENTRYDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tax_rate: value
                                        }
                                    )
                                })
                            }}
                        />
                      <AllowanceAutoCompleteRight editALLOWANCEENTRY={singleALLOWANCEENTRYDetailsData} setEditALLOWANCEENTRY={setSingleALLOWANCEENTRYDetailsData}/>
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editALLOWANCEENTRY}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditALLOWANCEENTRYOpenModal(false)}}>Cancel</Button>
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
const editALLOWANCEENTRYArea = {
  height: '145.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};