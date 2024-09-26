import {useEffect, Dispatch, SetStateAction, ChangeEvent, Fragment, useState}from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';
import { CUTOFFPERIODViewInterface } from '@/types/types-pages';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import dayjs from 'dayjs';
import { CUTOFFPERIODCreateActionFailureCleanup, CUTOFFPERIODEditAction } from '@/store/actions/procedurals';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { CUTOFFPERIODCreateInterface } from '@/types/types-pages';
import axios from 'axios';
import AutoCompleteForm from '@/public-components/forms/AutoCompleteForm';
import axiosInstance from '@/helpers/axiosConfig';



interface AllowedDaysCUTOFFPERIODModalInterface {
    singleCUTOFFPERIODDetailsData: CUTOFFPERIODViewInterface;
    allowedDaysCUTOFFPERIODOpenModal: boolean; 
    setAllowedDaysCUTOFFPERIODOpenModal: Dispatch<SetStateAction<boolean>>;
    setSingleCUTOFFPERIODDetailsData: Dispatch<SetStateAction<CUTOFFPERIODViewInterface>>;
}

export default function AllowedDaysCUTOFFPERIODModal(props: AllowedDaysCUTOFFPERIODModalInterface) {
  const dispatch = useDispatch();
  const CUTOFFPERIODAllowedDaysState = useSelector((state: RootState)=> state.procedurals.CUTOFFPERIODEdit)
  const {allowedDaysCUTOFFPERIODOpenModal, setAllowedDaysCUTOFFPERIODOpenModal, singleCUTOFFPERIODDetailsData, setSingleCUTOFFPERIODDetailsData} = props;

  const [dropDownData, setDropDownData] = useState<any>({
    payroll_groups: [],
    divisions: []
  })

  const nullValues = Object.values(singleCUTOFFPERIODDetailsData).filter(
    value => typeof value === null
  );
  const allowedDaysCUTOFFPERIOD = () => { 
    if(nullValues.length === 0){
      dispatch(CUTOFFPERIODEditAction(singleCUTOFFPERIODDetailsData))
      } else {
      window.alert('A field has found to have no value, make sure to supplement it a value.');
    }
  }

  useEffect(() => {
    fetchDropDownData()
  }, [])
  useEffect(()=>{
    if(CUTOFFPERIODAllowedDaysState.status){      
      if(CUTOFFPERIODAllowedDaysState.status === 'succeeded'){
        window.alert(`${CUTOFFPERIODAllowedDaysState.status.charAt(0).toUpperCase()}${CUTOFFPERIODAllowedDaysState.status.slice(1)}`)
        setTimeout(()=>{
          window.location.reload();
        }, 800)
      }else if (CUTOFFPERIODAllowedDaysState.status === 'failed'){
        window.alert(`${CUTOFFPERIODAllowedDaysState.error}`)
        dispatch(CUTOFFPERIODCreateActionFailureCleanup());
      }
    }
  }, [CUTOFFPERIODAllowedDaysState.status])


  const fetchDropDownData = async () => {
    await axiosInstance.get(`payrollgroup/`).then(res => 
      setDropDownData((curr:any) => ({
        ...curr,
        payroll_groups: Array.isArray(res.data) ? res.data : []
      }))
    )
    await axiosInstance.get(`division/`).then(res => 
      setDropDownData((curr:any) => ({
        ...curr,
        divisions: Array.isArray(res.data) ? res.data : []
      }))
    )
  }

  const handleChangePayrollGroup = (e:any, newValue:any) => {
    setSingleCUTOFFPERIODDetailsData(curr => ({
      ...curr,
      payroll_group_code: newValue?.id
    }))
  }

  const handleChangeDivision = (e:any, newValue:any) => {
    setSingleCUTOFFPERIODDetailsData(curr => ({
      ...curr,
      division_code: newValue?.id
    }))
  }

  return (
    <Fragment>
      <Transition in={allowedDaysCUTOFFPERIODOpenModal} timeout={400}>
      {(state: string) => (
      <Modal
        open={!['exited', 'exiting'].includes(state)}
        onClose={() => {
          setAllowedDaysCUTOFFPERIODOpenModal(false);
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
              ...allowedDaysCUTOFFPERIODArea,
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                overflow: 'auto',
                maxHeight: '90vh', // Set a maximum height
                height: 'auto', // Allow height to adjust based on content
                marginBottom: '5vh', // Add margin at the bottom for spacing
            }}
            size='sm'
        > 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography variant='h6' className='border-b-2 border-green-700'>Editing Cutoff Period</Typography>
            <div className='flex gap-10 overflow-auto relative mt-4 p-4'>
                <div className='flex gap-6 flex-col'>
                    <DateTimePicker
                      label="Cutoff Credit(Pay) Date"
                      value={dayjs(singleCUTOFFPERIODDetailsData.credit_date)}
                      onChange={(newValue) => {
                          const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                          return (
                            setSingleCUTOFFPERIODDetailsData((prevState)=>{
                                  return(
                                      {
                                          ...prevState,
                                          credit_date: formattedDate
                                      }
                                  )
                              })
                          )
                      }}
                    />
                    <AutoCompleteForm 
                      id="payroll_group"
                      options={dropDownData.payroll_groups}
                      label={"Payroll Group"}
                      getOptionLabel={(option: any) => option?.name ?? ""}
                      handleChange={handleChangePayrollGroup}
                      optionTitle='name'
                      defaultValueId={singleCUTOFFPERIODDetailsData?.payroll_group_code} 
                      disabled={false}                    
                    />

                    {/* <AutoCompleteForm 
                      id="divisions"
                      options={dropDownData.divisions}
                      label={"Division"}
                      getOptionLabel={(option: any) => option?.div_name?? ""}
                      handleChange={handleChangeDivision}
                      optionTitle='div_name' 
                      defaultValueId={singleCUTOFFPERIODDetailsData?.division_code}                    
                    /> */}

                    {/* <TextField 
                      sx={{width: '100%'}} 
                      label='Payroll Group Code:'
                      type='number' 
                      value={(singleCUTOFFPERIODDetailsData?.payroll_group_code)}
                      onChange={(newValue)=> {
                        return (
                          setSingleCUTOFFPERIODDetailsData((prevState) => {
                            const value = parseInt(newValue.target.value);
                            return (
                              {
                                ...prevState,
                                payroll_group_code: value
                              }
                            )
                          })
                        )
                      }}  
                      variant='standard'
                    /> */}
                    {/* <TextField 
                      sx={{width: '100%'}} 
                      label='Division Code:'
                      type='number'  
                      value={(singleCUTOFFPERIODDetailsData?.division_code)}
                      onChange={(newValue)=> {
                        return (
                          setSingleCUTOFFPERIODDetailsData((prevState) => {
                            const value = parseInt(newValue.target.value);
                            return (
                              {
                                ...prevState,
                                division_code: value
                              }
                            )
                          })
                        )
                      }}
                      variant='standard'
                    /> */}
                </div>
                <div className='flex gap-5 flex-col'>
                    <DateTimePicker
                      label="Date Range From:"
                      value={dayjs(singleCUTOFFPERIODDetailsData.co_date_from)}
                      onChange={(newValue) => {
                          const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                          return (
                            setSingleCUTOFFPERIODDetailsData((prevState)=>{
                                  return(
                                      {
                                          ...prevState,
                                          co_date_from: formattedDate
                                      }
                                  )
                              })
                          )
                      }}
                    />
                    <DateTimePicker
                      label="Date Range Until:"
                      value={dayjs(singleCUTOFFPERIODDetailsData.co_date_to)}
                      onChange={(newValue) => {
                          const formattedDate = dayjs(newValue).format('YYYY-MM-DDTHH:mm:ss');
                          return (
                            setSingleCUTOFFPERIODDetailsData((prevState)=>{
                                  return(
                                      {
                                          ...prevState,
                                          co_date_to: formattedDate
                                      }
                                  )
                              })
                          )
                      }}
                    />
                    <TextField 
                      sx={{width: '100%'}} 
                      label='# of Regular (Non-Holiday) days' 
                      value={(singleCUTOFFPERIODDetailsData.reg_days_total)}  
                      variant='standard'
                      type='number'
                      onChange={(newValue)=> {
                        return (
                          setSingleCUTOFFPERIODDetailsData((prevState) => {
                            const value = parseInt(newValue.target.value);
                            return (
                              {
                                ...prevState,
                                reg_days_total: value
                              }
                            )
                          })
                        )
                      }}
                    />
                </div>
                <div className='flex gap-6 flex-col'>
                    <TextField 
                      sx={{width: '100%', minWidth: '160px'}} 
                      label='Cutoff Name:' 
                      value={singleCUTOFFPERIODDetailsData?.co_name}  
                      variant='outlined'
                      onChange={(newValue)=> {
                        return (
                          setSingleCUTOFFPERIODDetailsData((prevState) => {
                            const value = newValue.target.value;
                            return (
                              {
                                ...prevState,
                                co_name: value
                              }
                            )
                          })
                        )
                      }}
                    />
                    <TextField 
                      sx={{width: '100%', minWidth: '160px'}} 
                      label='Cutoff Period Description' 
                      value={singleCUTOFFPERIODDetailsData?.co_description} 
                      multiline rows={4}  
                      variant='outlined'
                      onChange={(newValue)=> {
                        return (
                          setSingleCUTOFFPERIODDetailsData((prevState) => {
                            const value = newValue.target.value;
                            return (
                              {
                                ...prevState,
                                co_description: value
                              }
                            )
                          })
                        )
                      }}
                    />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                <div className='flex justify-between' style={{width:'200px', marginTop: '20px'}} container-name='leave_buttons'>
                    <Button variant={'contained'} onClick={allowedDaysCUTOFFPERIOD}>Submit</Button>
                    <Button variant={'outlined'} onClick={()=>{setAllowedDaysCUTOFFPERIODOpenModal(false)}}>Cancel</Button>
                </div>
            </div>
            <div className='flex flex-col gap-0 justify-center items-center mt-2' style={{color: "rgba(81,26,26,0.7)"}}>
              <div className='text-xs italic'>
                Take Precaution When Editing the Dates of Cutoff Periods. Make sure
              </div>
              <div className='text-xs italic'>
                there are no dependent other records affected to prevent data inconsistencies. 
              </div>
            </div>
            
            </div>
        </LocalizationProvider>
        </ModalDialog>
      </Modal>
        )}
      </Transition>
    </Fragment>
  );
}


// Styles
const allowedDaysCUTOFFPERIODArea = {
  height: '148.5mm',
  width: '210mm',
  margin: '0 auto',
  background: 'white',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};