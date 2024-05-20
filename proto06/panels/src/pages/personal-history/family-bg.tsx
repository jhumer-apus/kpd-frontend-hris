import useFetchQuery from '@/custom-hooks/use-fetch-query';
import FormAddRelative from '@/public-components/personal-history/FormAddRelative';
import { APILink, RootState } from '@/store/configureStore';
import { Button, FormControl, OutlinedInput } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_RELATIVES } from '@/store/actions/personal-history';

interface relativeType {
    firstName: string | null,
    middleName: string | null,
    lastName: string | null,
    suffix: string | null,
    relationship: string | null
}
export default function FamilyBackground() {

    //REDUX
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.auth.employee_detail)
    const relativesState = useSelector((state:RootState) => state.personalHistory.relatives)
    console.log(relativesState)

    //STATES
    const [relative, setRelative] = useState<relativeType>({
        firstName: null,
        middleName: null,
        lastName: null,
        suffix: null,
        relationship: null
    })

    //HOOKS
    const payload = {
        emp_no: user?.emp_no
    }
    const {data:relatives, status, error} = useFetchQuery(`${APILink}/family_bg`, payload)
    console.log(relatives)

    //USE EFFECTS
    useEffect(() => {

        dispatch(UPDATE_RELATIVES(relatives))

    }, [relatives])
    

    //FUNCTIONS 
    const handleSubmitAdd = (e:any) => {
        e.preventDefault()
        addRelative()
        
    }

    const addRelative = async () => {
        const payload = {
            emp_no: user?.emp_no,
            added_by: user?.emp_no,
            family_bg: [
                {
                    first_name: relative.firstName,
                    middle_name: relative.middleName,
                    last_name: relative.lastName,
                    suffix: relative.suffix,
                    age: 0,
                    relation: relative.relationship
                }
                
            ]
        }
        await axios.post(`${APILink}/family_bg/`, payload)
            .then(res => console.log("succesfull add relative"))
            .catch(err => console.error(err))
    }

    const handleChangeField = (e:any) => {
        setRelative((curr:relativeType) => ({
            ...curr,
            [e.target.name]: e.target.value
        }))
    }
    
    return (
        <div className='mt-16'>
            
            <FormAddRelative 
                handleChangeField={handleChangeField} 
                handleSubmitAdd={handleSubmitAdd} 
            />
            <DataGrid 
                columns={[]} 
                rows={Array.isArray(relativesState)? relativesState: []}            
            />

        </div>
    )
}