import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { POSITIONViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { POSITIONEditAction } from '@/store/actions/categories';



interface AllowedDaysPOSITIONModalInterface {
    singlePOSITIONDetailsData: POSITIONViewInterface;
    allowedDaysPOSITIONOpenModal: boolean; 
    setAllowedDaysPOSITIONOpenModal: Dispatch<SetStateAction<boolean>>;
    setSinglePOSITIONDetailsData: Dispatch<SetStateAction<POSITIONViewInterface>>;
}

export default function AllowedDaysPOSITIONModal(props: AllowedDaysPOSITIONModalInterface) {
  const dispatch = useDispatch();
  const POSITIONAllowedDaysState = useSelector((state: RootState)=> state.categories.POSITIONEdit.status)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {allowedDaysPOSITIONOpenModal, setAllowedDaysPOSITIONOpenModal, singlePOSITIONDetailsData, setSinglePOSITIONDetailsData} = props;

  const allowedDaysPOSITION = () => { 
    dispatch(POSITIONEditAction({
      ...singlePOSITIONDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(POSITIONAllowedDaysState){      
      if(POSITIONAllowedDaysState === 'succeeded'){
        window.alert(`${POSITIONAllowedDaysState.charAt(0).toUpperCase()}${POSITIONAllowedDaysState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [POSITIONAllowedDaysState])
  return (
    <Fragment>
      <Transition in={allowedDaysPOSITIONOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysPOSITIONOpenModal(false);
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
              ...allowedDaysPOSITIONArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing Position Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col justify-center items-center gap-5'>
                <TextField
                  key={`${singlePOSITIONDetailsData.pos_name}1`}
                  sx={{width: '90%'}}
                  label='Branch Name'
                  type='text'
                  required
                  value={singlePOSITIONDetailsData.pos_name}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSinglePOSITIONDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        pos_name: value,
                      })
                    })
                  }}
                />
                <TextField
                sx={{width: '90%'}}
                  label='Description (optional)'
                  type='text'
                  multiline
                  rows={6}
                  variant='outlined'
                  value={singlePOSITIONDetailsData.pos_description}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSinglePOSITIONDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        pos_description: value,
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={allowedDaysPOSITION}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setAllowedDaysPOSITIONOpenModal(false)}}>Cancel</Button>
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
const allowedDaysPOSITIONArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};