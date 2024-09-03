import useFetchQuery from '@/custom-hooks/use-fetch-query';
import FormAddRelative from '@/public-components/personal-history/FormAddRelative';
import { APILink, RootState } from '@/store/configureStore';
import { Autocomplete, Button, Card, CardContent, FormControl, OutlinedInput, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_RELATIVES } from '@/store/actions/personal-history';
import TableRelatives from '@/public-components/personal-history/TableRelatives';
import dayjs, { Dayjs } from 'dayjs';

interface relativeType {
    emp_no: CurrEmpNo,
    firstName: string | null,
    middleName: string | null,
    lastName: string | null,
    suffix: string | null,
    birthday: Date | Dayjs | null,
    relationship: string | null
}

type CurrEmpNo = number | string | null | undefined

export default function FamilyBackground() {

    //REDUX
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.auth.employee_detail)

    //STATES
    const [relative, setRelative] = useState<relativeType>({
        emp_no: null, 
        firstName: null,
        middleName: null,
        lastName: null,
        suffix: null,
        birthday: null,
        relationship: null
    })

    const [currViewEmpNo, setCurrViewEmpNo] = useState< number | string | null| undefined >(user?.emp_no)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    //FUNCTIONS 
    const handleSubmitAdd = (e:any) => {
        e.preventDefault()
        addRelative()
        
    }

    const addRelative = async () => {

        const payload = {
            emp_no: relative?.emp_no,
            added_by: user?.emp_no,
            family_bg: [
                {
                    first_name: relative.firstName ?? "",
                    middle_name: relative.middleName ?? "",
                    last_name: relative.lastName ?? "",
                    suffix: relative.suffix ?? "",
                    birthday: relative.birthday? dayjs(relative.birthday).format("YYYY-MM-DD"): "",
                    relation: relative.relationship ?? ""
                }
                
            ]
        }
        await axios.post(`${APILink}family_bg/`, payload)
            .then((res:any) => {
                    setCurrViewEmpNo(curr => payload?.emp_no)
                    payload?.emp_no && fetchRelatives(payload.emp_no)
                }
            )
            .catch(err => console.error(err))
    }

    const handleChangeField = (e:any) => {
        setRelative((curr:relativeType) => ({
            ...curr,
            [e.target.name]: e.target.value
        }))
    }

    const fetchRelatives = async (emp_no: CurrEmpNo) => {
        if(emp_no) {
            setIsLoading(true)
            dispatch(UPDATE_RELATIVES([]))

            const payload = {
                emp_no: emp_no
            }

            await axios.get(`${APILink}family_bg`, {params: payload})
                .then(res => {

                    const data: any[] = Array.isArray(res.data) ? res.data : [];
                    dispatch(UPDATE_RELATIVES(data))
                    setIsLoading(false)

                })
                .catch(err => {

                    setIsLoading(false)

                })
        }
    }

    return (
        <div className='mt-16 flex md:flex-row flex-col gap-4'>
            <Card 
                sx={{ flex: 1 }}
            >
                <CardContent>
                    <FormAddRelative 
                        handleChangeField={handleChangeField}
                        handleSubmitAdd={handleSubmitAdd} 
                        setRelative={setRelative}                    
                    />
                </CardContent>
            </Card>

            <Card
                sx={{ flex: 1 }}
            >
                <CardContent>
                    <TableRelatives 
                        fetchRelatives={fetchRelatives}
                        currEmpNo={relative?.emp_no?? currViewEmpNo}
                        isTableLoading={isLoading}
                    />
                </CardContent>
            </Card>

        </div>
    )
}
