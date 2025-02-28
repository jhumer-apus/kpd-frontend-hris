import React, { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { APILink, RootState } from '@/store/configureStore';
import CUTOFFPERIODDateCreate from './inner-ui-components/cutoff-period-date-field';
import { Typography } from '@mui/joy';
import { CUTOFFPERIODCreateInterface } from '@/types/types-pages';
import { CUTOFFPERIODCreateAction, CUTOFFPERIODCreateActionFailureCleanup } from '@/store/actions/procedurals';
import CUTOFFPERIODCreditDateCreate from './inner-ui-components/cutoff-period-credit-date-field';
import AutoCompleteForm from '@/public-components/forms/AutoCompleteForm';
import axios from 'axios';
import axiosInstance from '@/helpers/axiosConfig';

interface CreateCUTOFFPERIODModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ProceduralCUTOFFPERIODCreate(props: CreateCUTOFFPERIODModalInterface) {

    const dispatch = useDispatch();
    const CUTOFFPERIODCreatestate = useSelector((state: RootState)=> state.procedurals.CUTOFFPERIODCreate);
    const [createCUTOFFPERIOD, setCreateCUTOFFPERIOD] = useState<CUTOFFPERIODCreateInterface>({
        co_name: null,
        co_description: null,
        datetime_from: null,
        datetime_to: null,
        reg_days_total: null,
        credit_date: null,
        payroll_group_code: null,
        division_code: null,
    });

    // remove after debugging -osama
    console.log(createCUTOFFPERIOD);

    const [dropDownData, setDropDownData] = useState<any>({
        payroll_groups: [],
        divisions: []
      })

    const onClickSubmit = () => {
        dispatch(CUTOFFPERIODCreateAction(createCUTOFFPERIOD))
    };

    useEffect(() => {
        fetchDropDownData();
    },[])

    useEffect(()=>{
        if(CUTOFFPERIODCreatestate.status === 'succeeded'){
            window.alert('Request Successful');
            window.location.reload();
        }else if(CUTOFFPERIODCreatestate.status === 'failed'){
            window.alert(`Request Failed, ${CUTOFFPERIODCreatestate.error}`)
            setTimeout(()=> {
                dispatch(CUTOFFPERIODCreateActionFailureCleanup());
            }, 1000)
        }
    }, [CUTOFFPERIODCreatestate.status])

    const fetchDropDownData = async () => {
        await axiosInstance.get(`payrollgroup/`).then(res => 
          setDropDownData((curr:any) => ({
            ...curr,
            payroll_groups: Array.isArray(res.data) ? res.data : []
          }))
        )

        // unnecesarry query since theres no more division category
        // comment query below -osama 
        await axiosInstance.get(`division/`).then(res => 
          setDropDownData((curr:any) => ({
            ...curr,
            divisions: Array.isArray(res.data) ? res.data : []
          }))
        )
    }

    const handleChangePayrollGroup = (e: any, newValue: any) => {
        setCreateCUTOFFPERIOD(curr => ({
          ...curr,
          payroll_group_code: newValue?.id
        }))
    }
    
    //   const handleChangeDivision = (e:any, newValue:any) => {
    //     setCreateCUTOFFPERIOD(curr => ({
    //       ...curr,
    //       division_code: newValue?.id
    //     }))
    //   }

    // handles all the form elements to avoid multile methods for each fields. /osama
    const handleChanges = (e: ChangeEvent<HTMLInputElement>): void => {
        let { name, value }: any = e.target;
        console.log(e.target);
        name === 'reg_days_total' ? value = parseInt(value) : '';
        setCreateCUTOFFPERIOD((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain'>Create a Cutoff Period Data</Typography>
            <div className='flex flex-col justify-center items-center gap-6 overflow-auto relative w-full'>
                <div className='flex flex-col justify-center items-center w-full gap-6 pt-10 custom_breakpoint_500:flex-row'>
                    <div className='flex flex-col gap-6 !w-full'>
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Total Regular Days (Non-Holiday):'  
                            variant='outlined' 
                            type="number"
                            name='reg_days_total'
                            value={createCUTOFFPERIOD?.reg_days_total}
                            onChange={handleChanges}
                        />
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Cutoff Name(Max 25 char)'  
                            variant='outlined' 
                            // type="number"
                            name='co_name'
                            value={`${createCUTOFFPERIOD?.co_name ?? ''}`}
                            onChange={handleChanges}
                        />
                        {/* <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Division Group Code:'  
                            variant='outlined' 
                            type="number"
                            value={createCUTOFFPERIOD?.division_code}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateCUTOFFPERIOD((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            division_code: value
                                        }
                                    )
                                })
                            }}
                        /> */}
                        {/* <AutoCompleteForm 
                            id="divisions"
                            options={dropDownData.divisions}
                            label={"Division"}
                            getOptionLabel={(option: any) => option?.div_name?? ""}
                            handleChange={handleChangeDivision}
                            optionTitle='div_name' 
                            defaultValueId={createCUTOFFPERIOD.division_code}                    
                        /> */}
                        <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Description: (Max 100 char)'  
                            variant='outlined' 
                            multiline rows={5}
                            value={`${createCUTOFFPERIOD?.co_description ?? ''}`}
                            name='co_description'
                            onChange={handleChanges} 
                        />
                    </div>
                    <div className='flex flex-col gap-6 !w-full'>
                        <CUTOFFPERIODDateCreate createCUTOFFPERIOD={createCUTOFFPERIOD} setCreateCUTOFFPERIOD={setCreateCUTOFFPERIOD}/>
                        <AutoCompleteForm 
                            id="payroll_group"
                            options={dropDownData.payroll_groups}
                            label={"Payroll Group"}
                            getOptionLabel={(option: any) => option?.name ?? ""}
                            handleChange={handleChangePayrollGroup}
                            optionTitle='name'
                            defaultValueId={createCUTOFFPERIOD.payroll_group_code} 
                            disabled={false}                        
                        />
                        {/* <TextField
                            required 
                            sx={{width: '100%'}} 
                            label='Payroll Group Code:'  
                            variant='outlined' 
                            type="number"
                            value={createCUTOFFPERIOD?.payroll_group_code}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value)
                                setCreateCUTOFFPERIOD((prevState)=> {
                                    return (
                                        {
                                            ...prevState,
                                            payroll_group_code: value
                                        }
                                    )
                                })
                            }}
                        /> */}
                        <CUTOFFPERIODCreditDateCreate createCUTOFFPERIOD={createCUTOFFPERIOD} setCreateCUTOFFPERIOD={setCreateCUTOFFPERIOD}/>
                    </div>
                </div>
                <div className='flex justify-center mt-6 mb-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create CUTOFF PERIOD</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProceduralCUTOFFPERIODCreate;

