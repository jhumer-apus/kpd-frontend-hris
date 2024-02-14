import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { USERViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { USEREditAction } from '@/store/actions/users';
import EmployeeAutoCompleteRight from './autocomplete-fields/employee-autocomplete-right';
import RoleAutoCompleteRight from './autocomplete-fields/role-autocomplete-right';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


interface EditUSERModalInterface {
    singleUSERDetailsData: USERViewInterface;
    editUSEROpenModal: boolean; 
    setEditUSEROpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleUSERDetailsData: Dispatch<SetStateAction<USERViewInterface>>;
}

export default function EditUSERModal(props: EditUSERModalInterface) {
  const dispatch = useDispatch();
  const USEREditState = useSelector((state: RootState)=> state.users.USEREdit.status)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editUSEROpenModal, setEditUSEROpenModal, singleUSERDetailsData, setSingleUSERDetailsData} = props;


  const editUSER = () => { 
    dispatch(USEREditAction({
      ...singleUSERDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(USEREditState){      
      if(USEREditState === 'succeeded'){
        window.alert(`${USEREditState.charAt(0).toUpperCase()}${USEREditState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [USEREditState])
  return (
    <Fragment>
      <Transition in={editUSEROpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditUSEROpenModal(false);
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
              ...editUSERArea,
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
              <div className='flex flex-col justify-center items-center gap-5'>
                <TextField
                sx={{width: '90%'}}
                  label='Username'
                  type='text'
                  required
                  value={singleUSERDetailsData.username}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleUSERDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        username: value,
                      })
                    })
                  }}
                />
                <RoleAutoCompleteRight createUSER={singleUSERDetailsData} setCreateUSER={setSingleUSERDetailsData}/>
                {/* <EmployeeAutoCompleteRight createUSER={singleUSERDetailsData} setCreateUSER={setSingleUSERDetailsData}/> */}
                {/* <BranchAutoCompleteRight createUSER={singleUSERDetailsData} setCreateUSER={setSingleUSERDetailsData}/> */}
                <FormControl className='w-3/4 justify-center items-center'>
                    <FormLabel id="is-locked-manage-user-edit">Account Locked Status</FormLabel>
                    <RadioGroup
                        className='flex w-full justify-around'
                        row
                        aria-labelledby="is-locked-manage-user-edit w-full"
                        name="name-is-locked-manage-user-edit"
                        value={`${singleUSERDetailsData.is_locked}`}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const value = (event.target.value=== 'true' ? true : false);
                            setSingleUSERDetailsData((prevState)=> {
                                return (
                                    {
                                        ...prevState,
                                        is_locked: value
                                    }
                                )
                            })
                        }}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Locked" />
                        <FormControlLabel value="false" control={<Radio />} label="Not Locked" />
                    </RadioGroup>
                </FormControl>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editUSER}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditUSEROpenModal(false)}}>Cancel</Button>
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
const editUSERArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};