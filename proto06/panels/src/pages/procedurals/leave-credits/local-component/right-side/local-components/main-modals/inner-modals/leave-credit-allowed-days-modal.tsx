import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment, useState}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { LEAVECREDITViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { LEAVECREDITEditAction, LEAVECREDITViewAction } from '@/store/actions/procedurals';
import { beautifyJSON, clearFields } from '@/helpers/utils';
import axios from 'axios';
import useFetchQuery from '@/custom-hooks/use-fetch-query';
import AddSubstractNumber from '@/public-components/AddSubstractNumber';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



interface AllowedDaysLEAVECREDITModalInterface {
    singleLEAVECREDITDetailsData: LEAVECREDITViewInterface;
    allowedDaysLEAVECREDITOpenModal: boolean; 
    setAllowedDaysLEAVECREDITOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleLEAVECREDITDetailsData: Dispatch<SetStateAction<LEAVECREDITViewInterface>>;
}

export default function AllowedDaysLEAVECREDITModal(props: AllowedDaysLEAVECREDITModalInterface) {

  const currUser = useSelector((state:RootState) => state.auth.employee_detail)
  const dispatch = useDispatch();
  const LEAVECREDITAllowedDaysState = useSelector((state: RootState)=> state.procedurals.LEAVECREDITEdit)
  const {allowedDaysLEAVECREDITOpenModal, setAllowedDaysLEAVECREDITOpenModal, singleLEAVECREDITDetailsData, setSingleLEAVECREDITDetailsData} = props;
  const {data:leaveTypeData, error: leaveTypeError, status: leaveTypeStatus} = useFetchQuery(`${APILink}leave_type/${singleLEAVECREDITDetailsData.leave_type_code}`, null)
  
  const [previousState, setPreviousState] = useState<any>(null)
  //for rollback
  useEffect(() => {
    setPreviousState((curr:LEAVECREDITViewInterface) => ({
      ...singleLEAVECREDITDetailsData
    }))
    console.log(previousState)
  },[])

  //Leave Type Max Credit;
  let leaveTypeMaxCredit = null

  if((leaveTypeData?.is_sl || leaveTypeData?.is_vl)) {

    leaveTypeMaxCredit = 30

  } else if (leaveTypeData?.is_el) {

    leaveTypeMaxCredit = 5

  }

  const onUpdate = (newValue:number, name:string) => {

    setSingleLEAVECREDITDetailsData((curr:any) => ({
      ...curr,
      [name]: newValue
    }))

  }

  const validateCredit = (data:any) => {
    const errors:any = {

    }
    if(leaveTypeData.is_paid) {

      if(singleLEAVECREDITDetailsData.credit_max) {

       (singleLEAVECREDITDetailsData.credit_max < (singleLEAVECREDITDetailsData.credit_remaining??0)) && (errors['Max Credit'] = 'Remaining Credits should be lesser than Max Credits')

      } else {

        errors['Max Credit'] = 'Max Credit is required'

      }

    }

    if(Object.keys(errors).length > 0) {
      window.alert(beautifyJSON(errors))
      return true
    }
    return false
  }

  const allowedDaysLEAVECREDIT = (e:any) => { 
    e.preventDefault()

    if(validateCredit(singleLEAVECREDITDetailsData)) return
    // updateLeaveCredits()

    const payload:any = {
      ...singleLEAVECREDITDetailsData,
      added_by: currUser?.emp_no
    }
    dispatch(LEAVECREDITEditAction(payload)) 
    // if(singleLEAVECREDITDetailsData.credit_max){
    //     return(
    //       setSingleLEAVECREDITDetailsData((prevState)=> {
    //         const value = prevState.credit_max as number;
    //         dispatch(LEAVECREDITEditAction({
    //           ...prevState,
    //           credit_max: value,
    //           added_by: currUser?.emp_no
    //         }))  
    //         return({
    //           ...prevState,
    //           credit_max: value,
    //           added_by: currUser?.emp_no
    //         })
    //       })
    //     )
    //   } else {
    //     window.alert('Please insert max credits');
    //   }
  }

  useEffect(()=>{
    if(LEAVECREDITAllowedDaysState.status) {      

      if(LEAVECREDITAllowedDaysState.status == 'succeeded') {

        window.alert(`${LEAVECREDITAllowedDaysState.status.charAt(0).toUpperCase()}${LEAVECREDITAllowedDaysState.status.slice(1)}`)
        dispatch(LEAVECREDITViewAction())
        setAllowedDaysLEAVECREDITOpenModal(false)
        setTimeout(()=>{
          window.location.reload();
        }, 800)

      }  else if (LEAVECREDITAllowedDaysState.status == 'failed') {


        window.alert(LEAVECREDITAllowedDaysState?.error)
        setAllowedDaysLEAVECREDITOpenModal(false)
      }
    }
  }, [LEAVECREDITAllowedDaysState])

  // const updateLeaveCredits = async  () => {
  //   const payload = {
  //     ...singleLEAVECREDITDetailsData
  //   }
  //   console.log(payload)
  //   await axios.put(`${APILink}leave_credit/${singleLEAVECREDITDetailsData.emp_no}/${singleLEAVECREDITDetailsData.id}/`, payload).then(res => {
      
  //     window.alert("Request Succesful")
  //     window.location.reload()

  //   }).catch((err:any) => {

  //     window.alert(beautifyJSON(err.response.data))
  //   })
  // }

  return (
    <Fragment>
      <Transition in={allowedDaysLEAVECREDITOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysLEAVECREDITOpenModal(false);
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
              ...allowedDaysLEAVECREDITArea,
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
          <Typography variant='h6' className='border-b-2 border-blue-700'>Edit Leave Credits</Typography>
          <div className='flex justify-center flex-col item-center h-full'>
            <form onSubmit={allowedDaysLEAVECREDIT} className='flex flex-col justify-around w-full p-4 gap-14'>
              <div className='flex justify-center item-center'>
                <Typography variant='h6'>Leave Name: {singleLEAVECREDITDetailsData.leave_name}</Typography>
              </div>
              <div className='flex flex-wrap gap-4  justify-center item-center'>
                
              {leaveTypeData?.is_paid && 
                <>
                  <TextField
                      sx={{width: '100%'}} 
                      label='Credit Remaining:'  
                      variant='outlined' 
                      InputProps={{
                          inputProps:{
                              min:0,
                              max:singleLEAVECREDITDetailsData.credit_max,
                              type:"number"
                          }
                          
                      }}
                      value={singleLEAVECREDITDetailsData?.credit_remaining}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setSingleLEAVECREDITDetailsData((prevState)=> {
                              return (
                                  {
                                      ...prevState,
                                      credit_remaining: parseFloat(event.target.value)
                                  }
                              )
                          })
                      }}
                      
                  />
                  <TextField
                      sx={{width: '100%'}} 
                      label='Max Credit:'
                      InputProps={{
                          inputProps:{
                              min:0,
                              max:leaveTypeMaxCredit,
                              type:"number"
                          }
                          
                      }}
                      value={singleLEAVECREDITDetailsData?.credit_max}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setSingleLEAVECREDITDetailsData((prevState)=> {
                              return (
                                  {
                                      ...prevState,
                                      credit_max: parseFloat(event.target.value)
                                  }
                              )
                          })
                      }}
                  />
                  {/* <AddSubstractNumber 
                    min={0}
                    max={singleLEAVECREDITDetailsData.credit_max}
                    currentValue={singleLEAVECREDITDetailsData.credit_remaining}
                    onUpdate={onUpdate}
                    name='credit_remaining'
                    label='Remaining Credits:'
                  />
                  <AddSubstractNumber 
                    min={0}
                    max={leaveTypeMaxCredit}
                    currentValue={singleLEAVECREDITDetailsData.credit_max}
                    onUpdate={onUpdate}
                    name='credit_max'
                    label='Max Credit:'
                  /> */}
                </>
              }
              
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    sx={{width: '100%'}} 
                    label="Expiry Date"
                    value={singleLEAVECREDITDetailsData?.expiry && dayjs(singleLEAVECREDITDetailsData?.expiry)}
                    minDate={dayjs()}
                    onChange={(newValue) => {
                        const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                        return (
                            setSingleLEAVECREDITDetailsData((prevState)=>{
                                return(
                                    {
                                        ...prevState,
                                        expiry: formattedDate
                                    }
                                )
                            })
                        )
                    }}
                  />
                </LocalizationProvider>
                {/* <TextField
                  label='New Max Credits'
                  type='number'
                  required
                  focused
                  value={singleLEAVECREDITDetailsData.allowed_days}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleLEAVECREDITDetailsData((prevState)=> {
                      const value = parseInt(event.target.value);
                      return({
                        ...prevState,
                        allowed_days: value,
                      })
                    })
                  }}
                /> */}
                {/* <TextField
                  label='New Total Allowed Days'
                  type='number'
                  required
                  focused
                  value={singleLEAVECREDITDetailsData.allowed_days}
                  onChange={(event: ChangeEvent<HTMLInputElement>)=> {
                    setSingleLEAVECREDITDetailsData((prevState)=> {
                      const value = parseInt(event.target.value);
                      return({
                        ...prevState,
                        allowed_days: value,
                      })
                    })
                  }}
                /> */}
              </div>
              <div className='flex justify-around'>
                <Button variant={'contained'} type="submit">Submit</Button>
                <Button variant={'outlined'} onClick={()=>{
                  // clearFields(setSingleLEAVECREDITDetailsData, ['credit_max'], [null])
                  setSingleLEAVECREDITDetailsData((curr:any) => ({
                    ...previousState
                  }))
                  setAllowedDaysLEAVECREDITOpenModal(false)
                }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const allowedDaysLEAVECREDITArea = {
  height: '124.5mm',
  width: '100mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};