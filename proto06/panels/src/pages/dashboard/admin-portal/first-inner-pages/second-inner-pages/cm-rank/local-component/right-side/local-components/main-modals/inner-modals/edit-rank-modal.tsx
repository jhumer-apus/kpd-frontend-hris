import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { RANKViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { RANKEditAction } from '@/store/actions/categories';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



interface AllowedDaysRANKModalInterface {
    singleRANKDetailsData: RANKViewInterface;
    allowedDaysRANKOpenModal: boolean; 
    setAllowedDaysRANKOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleRANKDetailsData: Dispatch<SetStateAction<RANKViewInterface>>;
}

export default function AllowedDaysRANKModal(props: AllowedDaysRANKModalInterface) {
  const dispatch = useDispatch();
  const RANKAllowedDaysState = useSelector((state: RootState)=> state.categories.RANKEdit.status)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {allowedDaysRANKOpenModal, setAllowedDaysRANKOpenModal, singleRANKDetailsData, setSingleRANKDetailsData} = props;

  const allowedDaysRANK = () => { 
    dispatch(RANKEditAction({
      ...singleRANKDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(RANKAllowedDaysState){      
      if(RANKAllowedDaysState === 'succeeded'){
        window.alert(`${RANKAllowedDaysState.charAt(0).toUpperCase()}${RANKAllowedDaysState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [RANKAllowedDaysState])
  return (
    <Fragment>
      <Transition in={allowedDaysRANKOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysRANKOpenModal(false);
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
              ...allowedDaysRANKArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing Rank Details</Typography>
            <div className='flex flex-col gap-6 w-full items-center mt-8 p-6'>
                <TextField
                    required 
                    sx={{width: '100%'}} 
                    label='Rank Name'
                    aria-required  
                    variant='outlined' 
                    type="text"
                    value={singleRANKDetailsData?.rank_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setSingleRANKDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    rank_name: value
                                }
                            )
                        })
                    }}
                />

                <TextField
                    sx={{width: '100%'}} 
                    label='Description'
                    variant='outlined' 
                    type="text"
                    multiline
                    rows={4}
                    value={singleRANKDetailsData?.rank_description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value
                        setSingleRANKDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    rank_description: value
                                }
                            )
                        })
                    }}  
                />
                <FormControl className='w-full justify-center items-center'>
                    <FormLabel id="is-approver-manage-rank-create">Approval Authority Type</FormLabel>
                    <RadioGroup
                        className='flex w-full justify-around'
                        row
                        aria-labelledby="is-approver-manage-rank-create w-full"
                        name="name-is-approver-manage-rank-create"
                        value={`${singleRANKDetailsData.is_approver}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const value = (event.target.value=== 'true' ? true : false);
                            setSingleRANKDetailsData((prevState)=> {
                                return (
                                    {
                                        ...prevState,
                                        is_approver: value
                                    }
                                )
                            })
                        }}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Approver" />
                        <FormControlLabel value="false" control={<Radio />} label="Not Approver" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    sx={{width: '100%'}} 
                    label='Approver Level(1 Lowest - 5 Highest)'
                    variant='standard' 
                    type="number"
                    value={singleRANKDetailsData?.hierarchy}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(event.target.value)
                        setSingleRANKDetailsData((prevState)=> {
                            return (
                                {
                                    ...prevState,
                                    hierarchy: value
                                }
                            )
                        })
                    }}  
                />
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-around' style={{width:'400px'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={allowedDaysRANK}>Submit Changes</Button>
                        <Button variant={'outlined'} onClick={()=>{setAllowedDaysRANKOpenModal(false)}}>Cancel</Button>
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
const allowedDaysRANKArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};