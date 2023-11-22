import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import {TextField} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { JSONServer, RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { OFFBOARDINGREQUIREMENTSViewInterface, OFFBOARDINGSTATUSCreateInterface } from '@/types/types-employee-and-applicants';
import { OFFBOARDINGREQUIREMENTSViewAction, OFFBOARDINGSTATUSCreateAction, OFFBOARDINGSTATUSCreateActionFailureCleanup } from '@/store/actions/employee-and-applicants';
import CutoffAutoComplete from './inner-ui-components/cutoff-code-autocomplete';
import BonusListAutoComplete from './inner-ui-components/bonus-type-autocomplete';
import MultiEmployeeAutoCompleteLeft from './inner-ui-components/employee-autocomplete';


import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
// import { Typography } from "@material-tailwind/react";
import { EAOFFBOARDINGSTATUSPageDescriptions, EAOFFBOARDINGSTATUSPageColumns, EAProcessOFFBOARDINGSTATUSPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-initialize-offboarding-data';
import { OFFBOARDINGSTATUSViewInterface } from '@/types/types-employee-and-applicants';
import { OFFBOARDINGSTATUSViewAction } from '@/store/actions/employee-and-applicants';
import { getEmployeesList } from '@/store/actions/employees';
import { GetEmployeesListsType } from '@/types/types-store';
import axios from 'axios';



interface CreateOFFBOARDINGSTATUSModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAOFFBOARDINGSTATUSCreate(props: CreateOFFBOARDINGSTATUSModalInterface) {
    const state = useSelector((state: RootState) => state.employees)
    const OFFBOARDINGREQUIREMENTSViewData = useSelector((state: RootState) => state.employeeAndApplicants.OFFBOARDINGREQUIREMENTSView.data);
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const OFFBOARDINGSTATUSCreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.OFFBOARDINGSTATUSCreate);
    const [createOFFBOARDINGSTATUS, setCreateOFFBOARDINGSTATUS] = useState<{emp_no: number[]}>({
        emp_no: [],
    });
    const [submitMode, setSubmitMode] = useState(0)

    const [ createOFFBOARDINGSTATUSPayload, setCreateOFFBOARDINGSTATUSPayload ] = useState<OFFBOARDINGSTATUSCreateInterface>({
        id: Math.random().toString(36).substring(2, 9),
        emp_no: NaN,
        start_date: '',
        status: 'Pending',
        final_remarks: '',
        date_added: (new Date()).toISOString(),
        requirements: OFFBOARDINGREQUIREMENTSViewData?.map((item) => {
            return(
                {
                    facilitator: item.facilitator,
                    offboarding_title: item.offboarding_title,
                    accomplished_date: '',
                    emp_remarks: '',
                    facilitator_remarks: '',
                    status: 'Pending'
                }
            )
        }) as Omit<OFFBOARDINGREQUIREMENTSViewInterface[], "id" | "added_by" |"date_added" | "date_deleted">
    })

    const onClickSubmit = () => {

        setSubmitMode(1)
    };


    useEffect(()=> {

        if(!!submitMode){
            createOFFBOARDINGSTATUS.emp_no.forEach((emp_no)=> {
                // await dispatch(OFFBOARDINGSTATUSCreateAction({
                //     ...createOFFBOARDINGSTATUSPayload,
                //     emp_no: emp_no
                // }))
                try {
                    axios.post(`${JSONServer}offboarding_status/`, {
                        id: Math.random().toString(36).substring(2, 9),
                        emp_no: emp_no,
                        start_date: '2022-08-13T05:54:22.523Z',
                        status: 'Completed',
                        final_remarks: '',
                        date_added: (new Date()).toISOString(),
                        added_by: curr_user,
                        requirements: OFFBOARDINGREQUIREMENTSViewData?.map((item) => {
                            return(
                                {
                                    facilitator: item.facilitator,
                                    offboarding_title: item.offboarding_title,
                                    accomplished_date: '2022-08-13T05:54:22.523Z',
                                    emp_remarks: '-',
                                    facilitator_remarks: 'Good',
                                    status: 'Completed'
                                }
                            )
                        }) as Omit<OFFBOARDINGREQUIREMENTSViewInterface[], "id" | "added_by" | "date_added" | "date_deleted">,
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
        if((OFFBOARDINGREQUIREMENTSViewData?.length <= 0 || OFFBOARDINGREQUIREMENTSViewData === null || OFFBOARDINGREQUIREMENTSViewData === undefined ) && curr_user){
          dispatch(OFFBOARDINGREQUIREMENTSViewAction())
        }
      }, [curr_user]);

    useEffect(()=> {
        if(state.employees_list?.length === 0 || !state.employees_list ){
            getEmployeesList()
        }
        
    }, [])
    useEffect(()=> {
        if(curr_user){
            setCreateOFFBOARDINGSTATUSPayload((prevState) => {
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
    //     if(OFFBOARDINGSTATUSCreatestate.status === 'succeeded'){
    //         window.alert('Request Successful');
    //         window.location.reload();
    //     }else if(OFFBOARDINGSTATUSCreatestate.status === 'failed'){
    //         window.alert(`Request Failed, ${OFFBOARDINGSTATUSCreatestate.error}`)
    //         setTimeout(()=> {
    //             dispatch(OFFBOARDINGSTATUSCreateActionFailureCleanup());
    //         }, 1000)
    //     }
    // }, [OFFBOARDINGSTATUSCreatestate.status])

    const handleSelection = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {
        let emp_no_locale = [] as Array<number>;
        newSelection.forEach((id) => {
          const row = state.employees_list?.find((row) => row.id === id);
          if (row) {
            emp_no_locale.push(row.emp_no);
          }
        });
    
        setCreateOFFBOARDINGSTATUS((prevState) => ({
          ...prevState,
          emp_no: emp_no_locale,
        }));
      };

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Initialize Offboarding Requirements Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-full'>
                    <Typography level="body2" className='flex justify-center text-center align-center italic'>You can choose one or more employees to notify facilitators the ongoing employee's offboarding requirements. You may also filter and check all that applies.</Typography>
                    <div style={{ height: '450px', width: '100%' }}>
                        <DataGrid
                        rows={state.employees_list as GetEmployeesListsType[]}
                        columns={EAProcessOFFBOARDINGSTATUSPageColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                            },
                        }}
                        pageSizeOptions={[25, 50, 75, 100]}
                        // onRowClick={(e) => {
                        //     setSingleOFFBOARDINGSTATUSDetailsData(e.row);
                        //     setSingleOFFBOARDINGSTATUSOpenModal(true);
                        // }}
                        onRowSelectionModelChange={handleSelection}
                        checkboxSelection
                        disableRowSelectionOnClick
                        localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  `${error}` : 'Data Loaded - Showing 0 Results'}` }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Initialize Offboarding Requirements</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAOFFBOARDINGSTATUSCreate;

