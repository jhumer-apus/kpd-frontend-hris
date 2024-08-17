import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import DateFromToEMPHISTORYCreate from './inner-ui-components/date-from-to-field';
import { Typography } from '@mui/joy';
import { EMPHISTORYCreateInterface } from '@/types/types-employee-and-applicants';
import { EMPHISTORYCreateAction, EMPHISTORYCreateActionFailureCleanup, EMPHISTORYViewSpecificAction } from '@/store/actions/employee-and-applicants';
import EmployeeAutoCompleteFull from './inner-ui-components/employee-autocomplete-full';
import EmployeeListField from '@/public-components/EmployeeListField';

interface CreateEMPHISTORYModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
    currEmployee: number;
    setCurrEmployee: Dispatch<React.SetStateAction<number>>
}

function EMPHISTORYCreate(props: CreateEMPHISTORYModalInterface) {
    const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)
    const dispatch = useDispatch();
    const EMPHISTORYCreatestate = useSelector((state: RootState) => state.employeeAndApplicants.EMPHISTORYCreate);
    const [createEMPHISTORY, setCreateEMPHISTORY] = useState<EMPHISTORYCreateInterface>({
        employment_position: '',
        date_promoted: null,
        emp_no: NaN,
        added_by: NaN
    });

    useEffect(() => {
        if (curr_user) {
            setCreateEMPHISTORY((prevState) => ({
                ...prevState,
                added_by: curr_user,
            }));
        }
    }, [curr_user]);

    const onClickSubmit = () => {
        dispatch(EMPHISTORYCreateAction(createEMPHISTORY));

        // Reset employment position and date of changes fields after submission
        setCreateEMPHISTORY((prevState) => ({
            ...prevState,
            employment_position: '',
            date_promoted: null,
        }));
    };

    useEffect(() => {
        if (EMPHISTORYCreatestate.status === 'succeeded') {
            window.alert('Request Successful');
            props.setCurrEmployee(createEMPHISTORY.emp_no);
            dispatch(EMPHISTORYViewSpecificAction({ emp_no: createEMPHISTORY.emp_no }));
            setTimeout(() => {
                dispatch(EMPHISTORYCreateActionFailureCleanup());
            }, 300);
        } else if (EMPHISTORYCreatestate.status === 'failed') {
            window.alert(`Request Failed, ${EMPHISTORYCreatestate.error}`);
            setTimeout(() => {
                dispatch(EMPHISTORYCreateActionFailureCleanup());
            }, 300);
        }
    }, [EMPHISTORYCreatestate.status]);

    const handleChangeEmpField = (e:any, newValue:any) => {
        if(newValue) {
            setCreateEMPHISTORY((prevState:any)=> 
                (
                    {
                        ...prevState,
                        emp_no: newValue.emp_no
                    }
                )
            )
        }
    }

    return (
        <React.Fragment>
            <Typography style={{ border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '2px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)' }} variant='plain'>Create an Employment History Data</Typography>
            <div className='flex flex-col gap-3 overflow-auto relative'>
                <div className='flex flex-wrap gap-3 pt-4'>
                    <div className='flex flex-col gap-3' style={{ width: '100%' }}>
                        {/* <EmployeeAutoCompleteFull currEmployee={props.currEmployee} createEMPHISTORY={createEMPHISTORY} setCreateEMPHISTORY={setCreateEMPHISTORY} /> */}
                        <EmployeeListField 
                            label="For Employee No.:" 
                            handleChange={handleChangeEmpField} 
                            currentValue={createEMPHISTORY.emp_no} 
                        />
                        <TextField
                            required
                            sx={{ width: '100%' }}
                            label='Employment Position:'
                            variant='outlined'
                            multiline rows={4}
                            value={createEMPHISTORY?.employment_position}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setCreateEMPHISTORY((prevState) => ({
                                    ...prevState,
                                    employment_position: event.target.value
                                }));
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-6' style={{ width: '100%' }}>
                        <DateFromToEMPHISTORYCreate createEMPHISTORY={createEMPHISTORY} setCreateEMPHISTORY={setCreateEMPHISTORY} />
                    </div>
                </div>
                <div className='flex justify-center mt-6' container-name='ot_buttons_container'>
                    <div className='flex justify-between' style={{ width: '100%' }} container-name='ot_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Create an Employment History</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EMPHISTORYCreate;
