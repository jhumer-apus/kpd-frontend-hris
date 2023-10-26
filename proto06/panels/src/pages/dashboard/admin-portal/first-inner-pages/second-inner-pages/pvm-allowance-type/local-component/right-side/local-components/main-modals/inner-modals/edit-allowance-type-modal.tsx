import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ALLOWANCETYPEViewInterface } from '@/types/types-payroll-variables';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { ALLOWANCETYPEEditAction } from '@/store/actions/payroll-variables';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface EditALLOWANCETYPEModalInterface {
    singleALLOWANCETYPEDetailsData: ALLOWANCETYPEViewInterface;
    editALLOWANCETYPEOpenModal: boolean; 
    setEditALLOWANCETYPEOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleALLOWANCETYPEDetailsData: Dispatch<SetStateAction<ALLOWANCETYPEViewInterface>>;
}

export default function EditALLOWANCETYPEModal(props: EditALLOWANCETYPEModalInterface) {
  const dispatch = useDispatch();
  const ALLOWANCETYPEEditState = useSelector((state: RootState)=> state.payrollVariables.ALLOWANCETYPEEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editALLOWANCETYPEOpenModal, setEditALLOWANCETYPEOpenModal, singleALLOWANCETYPEDetailsData, setSingleALLOWANCETYPEDetailsData} = props;


  const editALLOWANCETYPE = () => { 
    dispatch(ALLOWANCETYPEEditAction({
      ...singleALLOWANCETYPEDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(ALLOWANCETYPEEditState.status){      
      if(ALLOWANCETYPEEditState.status === 'succeeded'){
        window.alert(`${ALLOWANCETYPEEditState.status.charAt(0).toUpperCase()}${ALLOWANCETYPEEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(ALLOWANCETYPEEditState.status === 'failed'){
        window.alert(`${ALLOWANCETYPEEditState.error}`)
      }
    }
  }, [ALLOWANCETYPEEditState.status])
  return (
    <Fragment>
      <Transition in={editALLOWANCETYPEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditALLOWANCETYPEOpenModal(false);
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
              ...editALLOWANCETYPEArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing ALLOWANCETYPE Details</Typography>
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
                            label='Allowance Type Name'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singleALLOWANCETYPEDetailsData?.allowance_name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleALLOWANCETYPEDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            allowance_name: value
                                        }
                                    )
                                })
                            }}
                        />
                        <FormControl className='w-full justify-center items-center'>
                            <FormLabel id="is-approver-manage-rank-create">Allowance - Taxable?</FormLabel>
                            <RadioGroup
                                className='flex w-full justify-around'
                                row
                                aria-labelledby="is-approver-manage-rank-create w-full"
                                name="name-is-approver-manage-rank-create"
                                value={`${singleALLOWANCETYPEDetailsData.taxable}`}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = (event.target.value=== 'true' ? true : false);
                                    setSingleALLOWANCETYPEDetailsData((prevState)=> {
                                        return (
                                            {
                                                ...prevState,
                                                taxable: value
                                            }
                                        )
                                    })
                                }}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editALLOWANCETYPE}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditALLOWANCETYPEOpenModal(false)}}>Cancel</Button>
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
const editALLOWANCETYPEArea = {
  height: '135.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};