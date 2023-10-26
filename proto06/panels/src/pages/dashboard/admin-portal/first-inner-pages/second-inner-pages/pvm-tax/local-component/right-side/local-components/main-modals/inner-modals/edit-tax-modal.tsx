import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { TAXViewInterface } from '@/types/types-payroll-variables';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { TAXEditAction } from '@/store/actions/payroll-variables';
import PaymentFrequencyAutoCompleteRight from './autocomplete-fields/payment-frequency-autocomplete-right';


interface EditTAXModalInterface {
    singleTAXDetailsData: TAXViewInterface;
    editTAXOpenModal: boolean; 
    setEditTAXOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleTAXDetailsData: Dispatch<SetStateAction<TAXViewInterface>>;
}

export default function EditTAXModal(props: EditTAXModalInterface) {
  const dispatch = useDispatch();
  const TAXEditState = useSelector((state: RootState)=> state.payrollVariables.TAXEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editTAXOpenModal, setEditTAXOpenModal, singleTAXDetailsData, setSingleTAXDetailsData} = props;


  const editTAX = () => { 
    dispatch(TAXEditAction({
      ...singleTAXDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(TAXEditState.status){      
      if(TAXEditState.status === 'succeeded'){
        window.alert(`${TAXEditState.status.charAt(0).toUpperCase()}${TAXEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(TAXEditState.status === 'failed'){
        window.alert(`${TAXEditState.error}`)
      }
    }
  }, [TAXEditState.status])
  return (
    <Fragment>
      <Transition in={editTAXOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditTAXOpenModal(false);
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
              ...editTAXArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing User Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-6 pt-4'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='TIN Number'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singleTAXDetailsData?.tin_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleTAXDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tin_no: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Tax Form (max: 15 char)'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singleTAXDetailsData?.tax_form}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setSingleTAXDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tax_form: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Tax Description'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singleTAXDetailsData?.tax_description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setSingleTAXDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tax_description: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Tax Percentage (number only, no sign %)'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleTAXDetailsData?.tax_percentage}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseFloat(event.target.value)
                                setSingleTAXDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            tax_percentage: value
                                        }
                                    )
                                })
                            }}
                        />
                        <PaymentFrequencyAutoCompleteRight createTAX={singleTAXDetailsData} setCreateTAX={setSingleTAXDetailsData}/>
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editTAX}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditTAXOpenModal(false)}}>Cancel</Button>
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
const editTAXArea = {
  height: '204.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};