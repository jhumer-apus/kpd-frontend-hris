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

interface relativeType {
    emp_no: string | number | null,
    firstName: string | null,
    middleName: string | null,
    lastName: string | null,
    suffix: string | null,
    age: number | null,
    relationship: string | null
}
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
        age: null,
        relationship: null
    })

    const [currViewEmpNo, setCurrViewEmpNo] = useState< number | null >(user?.emp_no as number)
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
                    first_name: relative.firstName,
                    middle_name: relative.middleName,
                    last_name: relative.lastName,
                    suffix: relative.suffix,
                    age: relative.age,
                    relation: relative.relationship
                }
                
            ]
        }
        await axios.post(`${APILink}/family_bg/`, payload)
            .then((res:any) => {
                    setCurrViewEmpNo(payload?.emp_no)
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

    const fetchRelatives = async (emp_no:string | number | null) => {
        if(emp_no) {
            setIsLoading(true)
            dispatch(UPDATE_RELATIVES([]))

            const payload = {
                emp_no: emp_no
            }

            await axios.get(`${APILink}/family_bg`, {params: payload})
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
                    />
                </CardContent>
            </Card>

            <Card
                sx={{ flex: 1 }}
            >
                <CardContent>
                    <TableRelatives 
                        fetchRelatives={fetchRelatives}
                        currEmpNo={currViewEmpNo}
                        isTableLoading={isLoading}
                    />
                </CardContent>
            </Card>

        </div>
    )
}
