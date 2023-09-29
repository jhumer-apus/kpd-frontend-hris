import {useEffect, Dispatch, SetStateAction, Fragment}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { ASSETACCOUNTViewInterface } from '@/types/types-payroll-eoy';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { ASSETACCOUNTEditAction } from '@/store/actions/payroll-eoy';
import AssetListAutoCompleteRight from './fields/asset-list-autocomplete-right';
import EmployeeAutoCompleteRight from './fields/employee-autocomplete';

interface EditASSETACCOUNTModalInterface {
    singleASSETACCOUNTDetailsData: ASSETACCOUNTViewInterface;
    editASSETACCOUNTOpenModal: boolean; 
    setEditASSETACCOUNTOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleASSETACCOUNTDetailsData: Dispatch<SetStateAction<ASSETACCOUNTViewInterface>>;
}

export default function EditASSETACCOUNTModal(props: EditASSETACCOUNTModalInterface) {
  const dispatch = useDispatch();
  const ASSETACCOUNTEditState = useSelector((state: RootState)=> state.payrollEOY.ASSETACCOUNTEdit)
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no);
  const {editASSETACCOUNTOpenModal, setEditASSETACCOUNTOpenModal, singleASSETACCOUNTDetailsData, setSingleASSETACCOUNTDetailsData} = props;


  const editASSETACCOUNT = () => { 
    dispatch(ASSETACCOUNTEditAction({
      ...singleASSETACCOUNTDetailsData,
      assigned_by: curr_user || NaN
    }))
  }

  useEffect(()=>{
    if(ASSETACCOUNTEditState.status){      
      if(ASSETACCOUNTEditState.status === 'succeeded'){
        window.alert(`${ASSETACCOUNTEditState.status.charAt(0).toUpperCase()}${ASSETACCOUNTEditState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if(ASSETACCOUNTEditState.status === 'failed'){
        window.alert(`${ASSETACCOUNTEditState.error}`)
      }
    }
  }, [ASSETACCOUNTEditState.status])
  return (
    <Fragment>
      <Transition in={editASSETACCOUNTOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setEditASSETACCOUNTOpenModal(false);
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
              ...editASSETACCOUNTArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Editing ASSETACCOUNT Details</Typography>
          <div className='flex flex-col items-center justify-around h-full'>
            <div className='flex flex-col w-full gap-10'>
              <div className='flex justify-center item-center'>
                <Typography>Please Enter New Details</Typography>
              </div>
              <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-6'>
                      <EmployeeAutoCompleteRight editASSETACCOUNT={singleASSETACCOUNTDetailsData} setEditASSETACCOUNT={setSingleASSETACCOUNTDetailsData}/>
                      <AssetListAutoCompleteRight editASSETACCOUNT={singleASSETACCOUNTDetailsData} setEditASSETACCOUNT={setSingleASSETACCOUNTDetailsData}/>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Bonus Type Name'
                            aria-required  
                            variant='outlined' 
                            type="text"
                            value={singleASSETACCOUNTDetailsData?.name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleASSETACCOUNTDetailsData((prevState)=> {
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
                            value={singleASSETACCOUNTDetailsData?.amount}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setSingleASSETACCOUNTDetailsData((prevState)=> {
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
                            value={singleASSETACCOUNTDetailsData?.description}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.value;
                                setSingleASSETACCOUNTDetailsData((prevState)=> {
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
                <Button variant={'contained'} onClick={editASSETACCOUNT}>Submit</Button>
                <Button variant={'outlined'} onClick={()=>{setEditASSETACCOUNTOpenModal(false)}}>Cancel</Button>
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
const editASSETACCOUNTArea = {
  height: '145.5mm',
  width: '180mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};