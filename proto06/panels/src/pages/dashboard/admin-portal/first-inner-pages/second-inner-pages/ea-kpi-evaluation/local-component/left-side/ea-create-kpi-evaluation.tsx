import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { JSONServer, RootState } from '@/store/configureStore';
import EmployeeAutoComplete from './inner-ui-components/employee-autocomplete';
import { Typography } from '@mui/joy';
import { CORECOMPEViewInterface, EVALQUESTIONSViewInterface, KPICORECreateInterface } from '@/types/types-employee-and-applicants';
import { CORECOMPECreateActionSuccess, CORECOMPEViewAction, KPICORECreateAction, KPICORECreateActionFailureCleanup, KPICOREViewActionSuccess } from '@/store/actions/employee-and-applicants';
import CutoffAutoComplete from './inner-ui-components/cutoff-code-autocomplete';
import BonusListAutoComplete from './inner-ui-components/bonus-type-autocomplete';
import MultiEmployeeAutoCompleteLeft from './inner-ui-components/employee-autocomplete';
import { loremIpsum } from "lorem-ipsum";

import { DataGrid, GridCallbackDetails, GridRowSelectionModel } from '@mui/x-data-grid';
// import { Typography } from "@material-tailwind/react";
import { EAKPICOREPageDescriptions, EAKPICOREPageColumns, EAProcessKPICOREPageColumns } from '@/data/pages-data/employee-and-applicants-data/ea-kpi-core-data';
import { KPICOREViewInterface } from '@/types/types-employee-and-applicants';
import { KPICOREViewAction } from '@/store/actions/employee-and-applicants';
import { getEmployeesList } from '@/store/actions/employees';
import { GetEmployeesListsType } from '@/types/types-store';

import axios from 'axios';

interface CreateKPICOREModalInterface {
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function EAKPICORECreate(props: CreateKPICOREModalInterface) {
    const state = useSelector((state: RootState) => state.employees)
    const coreCompeState = useSelector((state: RootState)=> state.employeeAndApplicants.CORECOMPEView)
    const KPICoreState = useSelector((state: RootState)=> state.employeeAndApplicants.KPICOREView)
    const dispatch = useDispatch();
    const curr_user = useSelector((state: RootState)=> state.auth.employee_detail?.emp_no);
    const KPICORECreatestate = useSelector((state: RootState)=> state.employeeAndApplicants.KPICORECreate);
    const [createKPICORE, setCreateKPICORE] = useState<{emp_details: {emp_no: number, emp_name: string}[]}>({
        emp_details: [],
    });
    const [submitMode, setSubmitMode] = useState<boolean>(false);
    const [coreCompe, setCoreCompe] = useState<CORECOMPEViewInterface[]>();
    const [evalQuestions, setEvalQuestions] = useState<EVALQUESTIONSViewInterface[]>();

    const onClickSubmit = () => {
        // dispatch(KPICORECreateAction(createKPICORE))
        setSubmitMode(true);
    };

    useEffect(()=> {
        if(state.employees_list?.length === 0 || !state.employees_list ){
            getEmployeesList()
        }
        async function getCoreCompe() {
            try {
                const value = await axios.get(`${JSONServer}core_compe/`);
                setCoreCompe(value.data);

            } catch(err){
                console.error("Core Compe Err", err)
            }
        }
        async function getEvalQuestions() {
            try {
                const value = await axios.get(`${JSONServer}eval_questions/`); 
                setEvalQuestions(value.data);
            } catch(err){
                console.error("Core Compe Err", err)
            }
        }
        getCoreCompe();
        getEvalQuestions();
    }, [])

    useEffect(()=> {
        if(submitMode){
            createKPICORE.emp_details.forEach((element, index) => {
                // const _self_eval_points = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
                // const _sup_eval_points =  Math.floor(Math.random() * (120 - 80 + 1)) + 80;

                const _coreCompe = coreCompe?.map((item)=> {
                    return (
                        {
                            checklist_title: item.checklist_title,
                            checklist_limits: item.checklist_limits,
                            points:  (Math.floor(Math.random() * (10 - 8 + 1)) + 8) * 0,
                        }
                    )
                })
                const _questions = evalQuestions?.map((item)=> {
                    return (
                        {
                            question: item.question,
                            answer: loremIpsum({
                                count: 1,               
                                format: "plain",         
                                paragraphLowerBound: 3,  
                                paragraphUpperBound: 6,  
                                random: Math.random,     
                                sentenceLowerBound: 5,   
                                sentenceUpperBound: 8,  
                                suffix: "\n",            
                                units: "paragraph",      
                            }),
                            self_eval_points:  (Math.floor(Math.random() * (10 - 9 + 1)) + 9) * 0,
                            sup_eval_points: (Math.floor(Math.random() * (10 - 9 + 1)) + 9) * 0,
                        }
                    )
                })
                const _core_compe_points = _coreCompe?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.points;
                }, 0);
                const _self_eval_points = _questions?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.self_eval_points;
                }, 0);
                const _sup_eval_points = _questions?.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.sup_eval_points;
                }, 0);
                const _percentage_total = Math.floor((((_sup_eval_points ?? 0) + (_core_compe_points ?? 0)) / 180) * 100) 
                const payload: KPICORECreateInterface = {
                    id: Math.random().toString(36).substring(2, 9),
                    date_added: "2023-10-10T00:00:00Z",
                    emp_no: element.emp_no,
                    emp_name: element.emp_name,
                    sup_name: 'Matthew Blasco',
                    sup_no: 1,
                    eval_date: "2023-10-25T00:00:00Z",
                    status: 'Pending',
                    final_rating: (_percentage_total <= 79 ? 'C' : _percentage_total <= 90 ? 'B' : 'A'),
                    percentage_total: _percentage_total,
                    self_eval_points: _self_eval_points ?? 0,
                    core_compe_points: _core_compe_points ?? 0,
                    sup_eval_points: _sup_eval_points ?? 0,
                    questions: _questions,
                    core_competencies: _coreCompe,
                    current_user: curr_user
                }
                async function createKPICoreEntry() {

                    await setTimeout(async ()=> {
                        try {
                            const value = await axios.post(`${JSONServer}kpi_core/`, payload);
                            setCoreCompe(value.data);
                        } catch(err){
                            console.error("Core Compe Err", err)
                        }
                    }, 3000)
                }
                return createKPICoreEntry()
            });
        }
        return (()=> {
            setSubmitMode(false)
        })
    }, [submitMode])

    useEffect(()=> {
        if(curr_user){
            setCreateKPICORE((prevState) => {
                return (
                    {
                        ...prevState,
                        current_user: curr_user
                    }
                )
            })
        }
    }, [curr_user]) 

    useEffect(()=>{
        if(KPICORECreatestate.status === 'succeeded'){
            // window.alert('Request Successful');
            // window.location.reload();
        }else if(KPICORECreatestate.status === 'failed'){
            window.alert(`Request Failed, ${KPICORECreatestate.error}`)
            setTimeout(()=> {
                dispatch(KPICORECreateActionFailureCleanup());
            }, 1000)
        }
    }, [KPICORECreatestate.status])

    const handleSelection = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {
        let emp_no_locale = [] as Array<{emp_no: number, emp_name: string}>;
        newSelection.forEach((id) => {
          const row = state.employees_list?.find((row) => row.id === id);
          if (row) {
            emp_no_locale.push({emp_no: row.emp_no, emp_name: `${row.first_name} ${row.last_name}`});
          }
        });
    
        setCreateKPICORE((prevState) => ({
          ...prevState,
          emp_details: emp_no_locale
        }));
      };

    return (
        <React.Fragment>
            <Typography style={{border: '2px solid rgb(25, 118, 210)', width: '100%', textAlign: 'center', padding: '6px', background: 'rgb(245,247,248)', boxShadow: '4px 4px 10px rgb(200, 200, 222)'}} variant='plain' level="h6">Initialize KPI Evaluation Data</Typography>
            <div className='flex flex-col gap-6 overflow-auto w-full'>
                    <p>You can choose one or more employees (or all) to initialize their KPI Evaluation.</p>
                    <div style={{ height: '450px', width: '100%' }}>
                        <DataGrid
                        rows={state.employees_list as GetEmployeesListsType[]}
                        columns={EAProcessKPICOREPageColumns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                            },
                        }}
                        pageSizeOptions={[25, 50, 75, 100]}
                        // onRowClick={(e) => {
                        //     setSingleKPICOREDetailsData(e.row);
                        //     setSingleKPICOREOpenModal(true);
                        // }}
                        onRowSelectionModelChange={handleSelection}
                        checkboxSelection
                        disableRowSelectionOnClick
                        localeText={{ noRowsLabel: `Loading...` }}
                        />
                    </div>
                <div className='flex justify-center mt-6' container-name='leave_buttons_container'>
                    <div className='flex justify-between' style={{width:'100%'}} container-name='leave_buttons'>
                        <Button variant='contained' onClick={onClickSubmit}>Initialize KPI Evaluation Data</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EAKPICORECreate;

