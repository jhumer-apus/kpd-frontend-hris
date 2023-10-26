import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { BONUSLISTViewInterface } from '@/types/types-payroll-eoy';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { BONUSLISTEditAction } from '@/store/actions/payroll-eoy';

interface EditBONUSLISTModalInterface {
    singleBONUSLISTDetailsData: BONUSLISTViewInterface;
    editBONUSLISTOpenModal: boolean; 
    setEditBONUSLISTOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleBONUSLISTDetailsData: Dispatch<SetStateAction<BONUSLISTViewInterface>>;
}

export default function EditBONUSLISTModal(props: EditBONUSLISTModalInterface) {
  const dispatch = useDispatch();
  const BONUSLISTEditState = useSelector((state: RootState)=> state.payrollEOY.BONUSLISTEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editBONUSLISTOpenModal, setEditBONUSLISTOpenModal, singleBONUSLISTDetailsData, setSingleBONUSLISTDetailsData} = props;


  const editBONUSLIST = () => { 
    dispatch(BONUSLISTEditAction({
      ...singleBONUSLISTDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(BONUSLISTEditState.status){      
      if(BONUSLISTEditState.status === 'succeeded'){
        window.alert(`${BONUSLISTEditState.status.charAt(0).toUpperCase()}${BONUSLISTEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(BONUSLISTEditState.status === 'failed'){
        window.alert(`${BONUSLISTEditState.error}`)
      }
    }
  }, [BONUSLISTEditState.status])
  return (
    <Fragment>
      <Transition in={editBONUSLISTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditBONUSLISTOpenModal(false);
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
              ...editBONUSLISTArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing BONUSLIST Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-6'>
                      {/* <EmployeeAutoCompleteRight editBONUSLIST={singleBONUSLISTDetailsData} setEditBONUSLIST={setSingleBONUSLISTDetailsData}/> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Bonus Type Name'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singleBONUSLISTDetailsData?.name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleBONUSLISTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            name: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Bonus Type Amount (in PH Peso):'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleBONUSLISTDetailsData?.amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleBONUSLISTDetailsData((prevState)=> {
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
                            label='Bonus Type Description:'
                            aria-required  
                            variant='outlined' 
                            multiline
                            rows={4}
                            type="text"
                            value={singleBONUSLISTDetailsData?.description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleBONUSLISTDetailsData((prevState)=> {
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
                <Button variant={'contained'} onClick={editBONUSLIST}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditBONUSLISTOpenModal(false)}}>Cancel</Button>
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
const editBONUSLISTArea = {
  height: '145.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};