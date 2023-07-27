import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVETYPEViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { LEAVETYPEEditAction, LEAVETYPEEditActionFailureCleanup } from '@/store/actions/procedurals';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



interface EditLEAVETYPEModalInterface {
    singleLEAVETYPEDetailsData: LEAVETYPEViewInterface;
    allowedDaysLEAVETYPEOpenModal: boolean; 
    setEditLEAVETYPEOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleLEAVETYPEDetailsData: Dispatch<SetStateAction<LEAVETYPEViewInterface>>;
}

export default function EditLEAVETYPEModal(props: EditLEAVETYPEModalInterface) {
  const dispatch = useDispatch();
  const LEAVETYPEEditState = useSelector((state: RootState)=> state.procedurals.LEAVETYPEEdit)
  const {allowedDaysLEAVETYPEOpenModal, setEditLEAVETYPEOpenModal, singleLEAVETYPEDetailsData, setSingleLEAVETYPEDetailsData} = props;

  const allowedDaysLEAVETYPE = () => { 
    if(singleLEAVETYPEDetailsData.name && !!(`${singleLEAVETYPEDetailsData.is_paid}`)){
        return(
            dispatch(LEAVETYPEEditAction(singleLEAVETYPEDetailsData))  
        )
      } else {
        window.alert('No value on Leave Name and Paid field is not allowed.');
      }
  }

  useEffect(()=>{
    if(LEAVETYPEEditState){      
      if(LEAVETYPEEditState.status === 'succeeded'){
        window.alert(`${LEAVETYPEEditState.status?.charAt(0).toUpperCase()}${LEAVETYPEEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      } else if(LEAVETYPEEditState.status === 'failed'){
        window.alert(`Request Failed, ${LEAVETYPEEditState.error}`)
        setTimeout(()=> {
            dispatch(LEAVETYPEEditActionFailureCleanup());
        }, 1000)
    }
    }
  }, [LEAVETYPEEditState])
  return (
    <Fragment>
      <Transition in={allowedDaysLEAVETYPEOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditLEAVETYPEOpenModal(false);
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
              ...allowedDaysLEAVETYPEArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Allowing Leave Usage</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-around w-full h-2/4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography>Edit the fields accordingly</Typography>
              </div>
              <div className='flex justify-center item-center gap-10'>
                <TextField
                  // sx={{width: '90%'}}
                  label='Leave Name (Less than 25 char)'
                  required
                  focused
                  value={singleLEAVETYPEDetailsData.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleLEAVETYPEDetailsData((prevState)=> {
                      return({
                        ...prevState,
                        name: event.target.value,
                      })
                    })
                  }}
                />
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Paid Leave</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={`${singleLEAVETYPEDetailsData.is_paid}`}
                    onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                      setSingleLEAVETYPEDetailsData((prevState)=> {
                        const value = (event.target.value === 'true' || event.target.value === 'Yes' ? true : false);
                        return({
                          ...prevState,
                          is_paid: value,
                        })
                      })
                    }}
                  >
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={allowedDaysLEAVETYPE}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditLEAVETYPEOpenModal(false)}}>Cancel</Button>
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
const allowedDaysLEAVETYPEArea = {
  height: '124.5mm',
  width: '140mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};