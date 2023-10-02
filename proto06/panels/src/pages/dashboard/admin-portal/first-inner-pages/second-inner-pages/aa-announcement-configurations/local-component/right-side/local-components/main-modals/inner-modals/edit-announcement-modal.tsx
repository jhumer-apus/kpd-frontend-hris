import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ANNOUNCEMENTViewInterface } from '@/types/types-payroll-eoy';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { ANNOUNCEMENTEditAction } from '@/store/actions/payroll-eoy';
import DateAssignedANNOUNCEMENTEdit from './fields/date-fields-right';

interface EditANNOUNCEMENTModalInterface {
    singleANNOUNCEMENTDetailsData: ANNOUNCEMENTViewInterface;
    editANNOUNCEMENTOpenModal: boolean; 
    setEditANNOUNCEMENTOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleANNOUNCEMENTDetailsData: Dispatch<SetStateAction<ANNOUNCEMENTViewInterface>>;
}

export default function EditANNOUNCEMENTModal(props: EditANNOUNCEMENTModalInterface) {
  const dispatch = useDispatch();
  const ANNOUNCEMENTEditState = useSelector((state: RootState)=> state.payrollEOY.ANNOUNCEMENTEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editANNOUNCEMENTOpenModal, setEditANNOUNCEMENTOpenModal, singleANNOUNCEMENTDetailsData, setSingleANNOUNCEMENTDetailsData} = props;


  const editANNOUNCEMENT = () => { 
    dispatch(ANNOUNCEMENTEditAction({
      ...singleANNOUNCEMENTDetailsData,
      emp_no: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(ANNOUNCEMENTEditState.status){      
      if(ANNOUNCEMENTEditState.status === 'succeeded'){
        window.alert(`${ANNOUNCEMENTEditState.status.charAt(0).toUpperCase()}${ANNOUNCEMENTEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(ANNOUNCEMENTEditState.status === 'failed'){
        window.alert(`${ANNOUNCEMENTEditState.error}`)
      }
    }
  }, [ANNOUNCEMENTEditState.status])
  return (
    <Fragment>
      <Transition in={editANNOUNCEMENTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditANNOUNCEMENTOpenModal(false);
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
              ...editANNOUNCEMENTArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing ANNOUNCEMENT Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-6'>
                      <DateAssignedANNOUNCEMENTEdit editANNOUNCEMENT={singleANNOUNCEMENTDetailsData} setEditANNOUNCEMENT={setSingleANNOUNCEMENTDetailsData}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Order By No.'
                            aria-required  
                            variant='outlined' 
                            type="number"
                            value={singleANNOUNCEMENTDetailsData?.order_by_no}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleANNOUNCEMENTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            order_by_no: value
                                        }
                                    )
                                })
                            }}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Announcement Message:'
                            aria-required  
                            variant='outlined' 
                            multiline
                            rows={4}
                            type="text"
                            value={singleANNOUNCEMENTDetailsData?.message}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleANNOUNCEMENTDetailsData((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            message: value
                                        }
                                    )
                                })
                            }}
                        />
                      </div>
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={editANNOUNCEMENT}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditANNOUNCEMENTOpenModal(false)}}>Cancel</Button>
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
const editANNOUNCEMENTArea = {
  height: '165.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};