import axiosInstance from "@/helpers/axiosConfig";
import { HandleAlertAction } from "@/store/actions/components";
import { APILink } from "@/store/configureStore";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
    currentDepartments: number[] | null
    handleChange?: (e:any, value:any) => void
    isReadonly?: boolean
}

export default function DepartmentListFieldAnnouncement(props: Props) {

    const { currentDepartments, handleChange, isReadonly} = props

    // REDUX
    const dispatch = useDispatch()
    
    // STATES
    const [departments, setDepartments] = useState<any>([])

    // USEEFFECTS
    useEffect(() => {
        fetchDepartments()
    }, [])



    // FUNCTIONS
    const fetchDepartments = async() => {
        await axiosInstance.get(`ann_department`)
            .then(res => setDepartments((curr:any) => Array.isArray(res.data)? res.data: []))
            .catch(err => dispatch(HandleAlertAction({
                open: true,
                status: "error",
                message: "Network Lost"
            })))

    }

    const equalityTest = (option: any, value: any) => {
        return option.id == value.id
    }

    const options = departments.map((option:any) => {
        const firstLetter = option.dept_name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });

    const selectedDepartments = departments.filter((dept:any) => currentDepartments?.includes(dept.id)) ?? [];

    return (
        <Autocomplete
            multiple
            disableCloseOnSelect
            defaultValue={selectedDepartments ?? []}
            value={selectedDepartments ?? []}
            groupBy={(option:any) => option.firstLetter}
            getOptionLabel={(option:any) => option?.dept_name}
            onChange={handleChange}
            isOptionEqualToValue={equalityTest}
            options={options.sort((a:any, b:any) => -b.firstLetter.localeCompare(a.firstLetter))}
            renderInput={(params) => <TextField {...params} label="Departments" />}
            className="w-full"
            readOnly={isReadonly}
        />
    )
} 