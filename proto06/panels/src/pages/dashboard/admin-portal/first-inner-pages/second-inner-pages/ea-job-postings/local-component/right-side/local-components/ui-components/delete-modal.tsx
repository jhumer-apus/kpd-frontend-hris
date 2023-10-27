import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { JOBPOSTINGSViewInterface } from '@/types/types-employee-and-applicants';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { beautifyJSON } from '@/helpers/utils';
import { JOBPOSTINGSDeleteAction } from '@/store/actions/employee-and-applicants';



interface DeleteJOBPOSTINGSModalInterface {
    singleJOBPOSTINGSDetailsData: JOBPOSTINGSViewInterface;
    deleteJOBPOSTINGSOpenModal: boolean; 
    setDeleteJOBPOSTINGSOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSingleJOBPOSTINGSDetailsData?: React.Dispatch<React.SetStateAction<JOBPOSTINGSViewInterface>>;
}

export default function DeleteJOBPOSTINGSModal(props: DeleteJOBPOSTINGSModalInterface) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState)=> state.auth.employee_detail);
  const JOBPOSTINGSDeleteState = useSelector((state: RootState)=> state.employeeAndApplicants.JOBPOSTINGSDeleteSpecific)
  const {deleteJOBPOSTINGSOpenModal, setDeleteJOBPOSTINGSOpenModal, singleJOBPOSTINGSDetailsData} = props;

  const deleteJOBPOSTINGS = () => { 
    dispatch(JOBPOSTINGSDeleteAction({jp_id: singleJOBPOSTINGSDetailsData.id, curr_user: (state?.emp_no as number)}))
    //dispatch delete entry 
    }

  React.useEffect(()=>{
    if(JOBPOSTINGSDeleteState){      
      if(JOBPOSTINGSDeleteState.status === 'succeeded'){
        window.alert(beautifyJSON(JOBPOSTINGSDeleteState.data as JSON))
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      } else if (JOBPOSTINGSDeleteState.status === 'failed'){
        window.alert(beautifyJSON(JOBPOSTINGSDeleteState.data as JSON))
      }
    }
  }, [JOBPOSTINGSDeleteState])
  return (
    <React.Fragment>
      <Transition in={deleteJOBPOSTINGSOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        keepMounted
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setDeleteJOBPOSTINGSOpenModal(false);
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
              ...deleteJOBPOSTINGSArea,
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
          <Typography variant='h6' className='border-b-2 border-red-700'>Deleting Job Postings</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <div className='flex flex-col justify-around w-full h-2/4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography>Are you sure you want to delete this Job Post?</Typography>
              </div>
              <div className='flex justify-center item-center'>
                {/* <TextField
                sx={{width: '90%'}}
                  label='Reason'
                  multiline
                  rows={4}
                  required
                  focused
                  value={singleJOBPOSTINGSDetailsData.obt_reason_disapproval}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
                    setSingleJOBPOSTINGSDetailsData((prevState)=> {
                      return({
                        ...prevState,
                        obt_reason_disapproval: `${event.target.value}`
                      })
                    })
                  }}
                /> */}
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} onClick={deleteJOBPOSTINGS}>Delete</Button>
                <Button variant={'outlined'} onClick={()=>{setDeleteJOBPOSTINGSOpenModal(false)}}>Cancel</Button>
              </div>
            </div>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}


// Styles
const deleteJOBPOSTINGSArea = {
  height: '124.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};