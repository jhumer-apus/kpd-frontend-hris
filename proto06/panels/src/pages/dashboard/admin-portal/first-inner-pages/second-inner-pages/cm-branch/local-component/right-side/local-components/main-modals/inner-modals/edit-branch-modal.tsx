import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { BRANCHViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { BRANCHEditAction } from '@/store/actions/categories';



interface AllowedDaysBRANCHModalInterface {
    singleBRANCHDetailsData: BRANCHViewInterface;
    allowedDaysBRANCHOpenModal: boolean; 
    setAllowedDaysBRANCHOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleBRANCHDetailsData: Dispatch<SetStateAction<BRANCHViewInterface>>;
}

export default function AllowedDaysBRANCHModal(props: AllowedDaysBRANCHModalInterface) {
  const dispatch = useDispatch();
  const BRANCHAllowedDaysState = useSelector((state: RootState)=> state.categories.BRANCHEdit.status)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {allowedDaysBRANCHOpenModal, setAllowedDaysBRANCHOpenModal, singleBRANCHDetailsData, setSingleBRANCHDetailsData} = props;


  const allowedDaysBRANCH = () => { 
    // setSingleBRANCHDetailsData((prevState)=> {
    //   const value = prevState.allowed_days as number;
    //   dispatch(BRANCHEditAction({
    //     ...prevState,
    //     allowed_days: value
    //   }))  
    //   return({
    //     ...prevState,
    //     allowed_days: value
    //   })
    // })
    dispatch(BRANCHEditAction({
      ...singleBRANCHDetailsData,
      added_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(BRANCHAllowedDaysState){      
      if(BRANCHAllowedDaysState === 'succeeded'){
        window.alert(`${BRANCHAllowedDaysState.charAt(0).toUpperCase()}${BRANCHAllowedDaysState.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }
    }
  }, [BRANCHAllowedDaysState])
  return (
    <Fragment>
      <Transition in={allowedDaysBRANCHOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysBRANCHOpenModal(false);
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
              ...allowedDaysBRANCHArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing Branch Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col justify-center items-center gap-5'>
                <TextField
                sx={{width: '90%'}}
                  label='Branch Name'
                  type='text'
                  required
                  focused
                  value={singleBRANCHDetailsData.branch_name}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleBRANCHDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        branch_name: value,
                      })
                    })
                  }}
                />
                <TextField
                sx={{width: '90%'}}
                  label='Branch OIC'
                  type='number'
                  required
                  focused
                  value={singleBRANCHDetailsData.branch_oic}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleBRANCHDetailsData((prevState)=> {
                      const value = parseInt(event.target.value);
                      return({
                        ...prevState,
                        branch_oic: value,
                      })
                    })
                  }}
                />
                <TextField
                sx={{width: '90%'}}
                  label='Branch Contact #'
                  type='text'
                  required
                  focused
                  value={singleBRANCHDetailsData.branch_contact_number}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleBRANCHDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        branch_contact_number: value,
                      })
                    })
                  }}
                />
                <TextField
                sx={{width: '90%'}}
                  label='Branch Email'
                  type='text'
                  required
                  focused
                  value={singleBRANCHDetailsData.branch_email}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleBRANCHDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        branch_email: value,
                      })
                    })
                  }}
                />
                <TextField
                sx={{width: '90%'}}
                  label='Branch Address'
                  type='text'
                  required
                  focused
                  value={singleBRANCHDetailsData.branch_address}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleBRANCHDetailsData((prevState)=> {
                      const value = event.target.value;
                      return({
                        ...prevState,
                        branch_address: value,
                      })
                    })
                  }}
                />
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={allowedDaysBRANCH}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setAllowedDaysBRANCHOpenModal(false)}}>Cancel</Button>
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
const allowedDaysBRANCHArea = {
  height: '164.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};