import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { POSITIONViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, globalReducerFailed, globalReducerSuccess } from '@/store/configureStore';
import { POSITIONEditAction, POSITIONEditActionFailureCleanup, POSITIONViewAction } from '@/store/actions/categories';



interface AllowedDaysPOSITIONModalInterface {
    singlePOSITIONDetailsData: POSITIONViewInterface;
    allowedDaysPOSITIONOpenModal: boolean;
    setSinglePOSITIONOpenModal: Dispatch<SetStateAction<boolean>>;
    setAllowedDaysPOSITIONOpenModal: Dispatch<SetStateAction<boolean>>;
    setSinglePOSITIONDetailsData: Dispatch<SetStateAction<POSITIONViewInterface>>;
}

export default function AllowedDaysPOSITIONModal(props: AllowedDaysPOSITIONModalInterface) {
  const dispatch = useDispatch();
  const POSITIONState = useSelector((state: RootState)=> state.categories.POSITIONEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {
    allowedDaysPOSITIONOpenModal, 
    setAllowedDaysPOSITIONOpenModal, 
    singlePOSITIONDetailsData, 
    setSinglePOSITIONDetailsData,
    setSinglePOSITIONOpenModal
  } = props;

  const allowedDaysPOSITION = () => { 
    dispatch(POSITIONEditAction({
      ...singlePOSITIONDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{   
      if(POSITIONState.status === `${globalReducerSuccess}`){
        window.alert(`${POSITIONState.status.charAt(0).toUpperCase()}${POSITIONState.status.slice(1)}`)
        // window.location.reload();
        setAllowedDaysPOSITIONOpenModal(false);
        setSinglePOSITIONOpenModal(false);
        dispatch(POSITIONViewAction());
        setTimeout(()=>{
          dispatch(POSITIONEditActionFailureCleanup());
        }, 200)
      } else if (POSITIONState.status === `${globalReducerFailed}`){
        window.alert(`Failed: ${POSITIONState.error}`)
        setTimeout(()=>{
          dispatch(POSITIONEditActionFailureCleanup());
        }, 200)
      }
  }, [POSITIONState.status])
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
                  // Causes Bug on 
                  // key={`${singlePOSITIONDetailsData.pos_name}1`}
                  sx={{width: '90%'}}
                  label='Position Name'
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