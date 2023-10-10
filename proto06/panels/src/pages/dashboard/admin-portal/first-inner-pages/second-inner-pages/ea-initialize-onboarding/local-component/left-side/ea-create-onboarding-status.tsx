import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { JSONServer, RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { ONBOARDINGREQUIREMENTSViewInterface, ONBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';
import { ONBOARDINGREQUIREMENTSViewAction, ONBOARDINGSTATUSCreateAction, ONBOARDINGSTATUSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import CutoffAutoComplete from './inner-ui-components/cutoff-code-autocomplete';
import BonusListAutoComplete from './inner-ui-components/bonus-type-autocomplete';
import MultiEmployeeAutoCompleteLeft from './inner-ui-components/employee-autocomplete';


import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
// import { Typography } from "@material-tailwind/react";
import { EAONBOARDINGSTATUSPageDescriptions, EAONBOARDINGSTATUSPageColumns, EAProcessONBOARDINGSTATUSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-initialize-onboarding-data';
import { ONBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { ONBOARDINGSTATUSViewAction } from '@/store/actions/employee-and-applicants';
import { getEmployeesList } from '@/store/actions/employees';
import { GetEmployeesListsType } from '@/types/types-store';
import axios from 'axios';



interface CreateONBOARDINGSTATUSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAONBOARDINGSTATUSCreate(props: CreateONBOARDINGSTATUSModalInterface) {
    const state = useSelector((state: RootState) => state.employees)
    const ONBOARDINGREQUIREMENTSViewData = useSelector((state: RootState) => state.employeeAndApplicants.ONBOARDINGREQUIREMENTSView.data);
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const ONBOARDINGSTATUSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.ONBOARDINGSTATUSCreate);
    const [createONBOARDINGSTATUS, setCreateONBOARDINGSTATUS] = useState<{emp_no: number[]}>({
        emp_no: [],
    });
    const [submitMode, setSubmitMode] = useState(0)

    const [ createONBOARDINGSTATUSPayload, setCreateONBOARDINGSTATUSPayload ] = useState<ONBOARDINGSTATUSCreateInterface>({
        id: Math.random().toString(36).substring(2, 9),
        emp_no: NaN,
        start_date: '',
        status: 'Pending',
        final_remarks: '',
        date_added: (new Date()).toISOString(),
        requirements: ONBOARDINGREQUIREMENTSViewData?.map((item) => {
            return(
                {
                    facilitator: item.facilitator,
                    onboarding_title: item.onboarding_title,
                    commencement_date: '',
                    emp_remarks: '',
                    facilitator_remarks: '',
                    status: 'Pending'
                }
            )
        }) as Omit<ONBOARDINGREQUIREMENTSViewInterface[], "id" | "added_by" | "date_added" | "date_deleted">
    })

    const onClickSubmit = () => {

        setSubmitMode(1)
    };


    useEffect(()=> {

        if(!!submitMode){
            createONBOARDINGSTATUS.emp_no.forEach((emp_no)=> {
                // await dispatch(ONBOARDINGSTATUSCreateAction({
                //     ...createONBOARDINGSTATUSPayload,
                //     emp_no: emp_no
                // }))
                try {
                    axios.post(`${JSONServer}onboarding_status/`, {
                        id: Math.random().toString(36).substring(2, 9),
                        emp_no: emp_no,
                        start_date: '2022-08-13T05:54:22.523Z',
                        status: 'Completed',
                        final_remarks: '',
                        date_added: (new Date()).toISOString(),
                        added_by: curr_user,
                        requirements: ONBOARDINGREQUIREMENTSViewData?.map((item) => {
                            return(
                                {
                                    facilitator: item.facilitator,
                                    onboarding_title: item.onboarding_title,
                                    commencement_date: '2022-08-13T05:54:22.523Z',
                                    emp_remarks: '-',
                                    facilitator_remarks: 'Good',
                                    status: 'Completed'
                                }
                            )
                        }) as Omit<ONBOARDINGREQUIREMENTSViewInterface[], "id" | "added_by" | "date_added" | "date_deleted">,
                    })
                } catch (error) {
                    throw console.error("Creation of Status Failed:", error)
                }

            })
        }
        return(()=> {
            setSubmitMode(0)
        })
    }, [submitMode])
    useEffect(()=> {
        if((ONBOARDINGREQUIREMENTSViewData?.length <= 0 || ONBOARDINGREQUIREMENTSViewData === null || ONBOARDINGREQUIREMENTSViewData === undefined ) && curr_user){
          dispatch(ONBOARDINGREQUIREMENTSViewAction())
        }
      }, [curr_user]);

    useEffect(()=> {
        if(state.employees_list?.length === 0 || !state.employees_list ){
            getEmployeesList()
        }
        
    }, [])
    useEffect(()=> {
        if(curr_user){
            setCreateONBOARDINGSTATUSPayload((prevState) => {
                return (
                    {
                        ...prevState,
                        added_by: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    // useEffect(()=>{
    //     if(ONBOARDINGSTATUSCreatestate.status === 'succeeded'){
    //         window.alert('Request Successful');
    //         window.location.reload();
    //     }else if(ONBOARDINGSTATUSCreatestate.status === 'failed'){
    //         window.alert(`Request Failed, ${ONBOARDINGSTATUSCreatestate.error}`)
    //         setTimeout(()=> {
    //             dispatch(ONBOARDINGSTATUSCreateActionFailureCleanup());
    //         }, 1000)
    //     }
    // }, [ONBOARDINGSTATUSCreatestate.status])

    const handleSelection = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {
        let emp_no_locale = [] as Array<number>;
        newSelection.forEach((id) => {
          const row = state.employees_list?.find((row) => row.id === id);
          if (row) {
            emp_no_locale.push(row.emp_no);
          }
        });
    
        setCreateONBOARDINGSTATUS((prevState) => ({
          ...prevState,
          emp_no: emp_no_locale,
        }));
      };

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Initialize Onboarding Requirements Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-full'>
                    <Typography level="body2" className='flex justify-center text-center align-center italic'>You can choose one or more employees to notify facilitators the ongoing employee's onboarding requirements. You may also filter and check all that applies.</Typography>
                    <div style={{ height: '450px', width: '100%' }}>
                        <DataGrid
                        rows={state.employees_list as GetEmployeesListsType[]}
                        columns={EAProcessONBOARDINGSTATUSPageColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                            },
                        }}
                        pageSizeOptions={[25, 50, 75, 100]}
                        // onRowClick={(e) => {
                        //     setSingleONBOARDINGSTATUSDetailsData(e.row);
                        //     setSingleONBOARDINGSTATUSOpenModal(true);
                        // }}
                        onRowSelectionModelChange={handleSelection}
                        checkboxSelection
                        disableRowSelectionOnClick
                        localeText={{ noRowsLabel: `Loading...` }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Initialize Onboarding Requirements</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAONBOARDINGSTATUSCreate;

