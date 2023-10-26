import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ASSETLISTViewInterface } from '@/types/types-payroll-eoy';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { ASSETLISTEditAction } from '@/store/actions/payroll-eoy';

interface EditASSETLISTModalInterface {
    singleASSETLISTDetailsData: ASSETLISTViewInterface;
    editASSETLISTOpenModal: boolean; 
    setEditASSETLISTOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleASSETLISTDetailsData: Dispatch<SetStateAction<ASSETLISTViewInterface>>;
}

export default function EditASSETLISTModal(props: EditASSETLISTModalInterface) {
  const dispatch = useDispatch();
  const ASSETLISTEditState = useSelector((state: RootState)=> state.payrollEOY.ASSETLISTEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editASSETLISTOpenModal, setEditASSETLISTOpenModal, singleASSETLISTDetailsData, setSingleASSETLISTDetailsData} = props;


  const editASSETLIST = () => { 
    dispatch(ASSETLISTEditAction({
      ...singleASSETLISTDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(ASSETLISTEditState.status){      
      if(ASSETLISTEditState.status === 'succeeded'){
        window.alert(`${ASSETLISTEditState.status.charAt(0).toUpperCase()}${ASSETLISTEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(ASSETLISTEditState.status === 'failed'){
        window.alert(`${ASSETLISTEditState.error}`)
      }
    }
  }, [ASSETLISTEditState.status])
  return (
    <Fragment>
      <Transition in={editASSETLISTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditASSETLISTOpenModal(false);
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
              ...editASSETLISTArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing ASSETLIST Details</Typography>
          <div className='flex flex-col items-center justify-around h-full mt-10' style={{zoom: '0.8'}}>
            <div className='flex flex-col w-full gap-2'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-6'>
                      {/* <EmployeeAutoCompleteRight editASSETLIST={singleASSETLISTDetailsData} setEditASSETLIST={setSingleASSETLISTDetailsData}/> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Asset List Name'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singleASSETLISTDetailsData?.asset_name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleASSETLISTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            asset_name: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Model:'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singleASSETLISTDetailsData?.model}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setSingleASSETLISTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            model: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Year:'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleASSETLISTDetailsData?.year}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleASSETLISTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            year: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            sx={{width: '100%'}} 
                            label='Batch no.:'
                            variant='outlined' 
                            type="text"
                            value={singleASSETLISTDetailsData?.batch_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setSingleASSETLISTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            batch_no: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Quantity:'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleASSETLISTDetailsData?.quantity}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleASSETLISTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            quantity: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            sx={{width: '100%'}} 
                            label='Remarks:'
                            variant='outlined' 
                            type="text"
                            value={singleASSETLISTDetailsData?.remarks}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value
                                setSingleASSETLISTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            remarks: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Description:'
                            aria-required  
                            variant='outlined' 
                            multiline
                            rows={4}
                            type="text"
                            value={singleASSETLISTDetailsData?.description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleASSETLISTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            description: value
                                        }
                                    )
                                })
                            }}
                        />
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editASSETLIST}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditASSETLISTOpenModal(false)}}>Cancel</Button>
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
const editASSETLISTArea = {
  height: '245.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};