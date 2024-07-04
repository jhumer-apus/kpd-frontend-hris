import { HandleAlertAction } from "@/store/actions/components";
import { APILink } from "@/store/configureStore";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
    currentDepartments: Departments []
}

interface Departments {
    id: number,
    name: string
}

export default function DepartmentListField(props: Props) {

    const { currentDepartments } = props
    const dispatch = useDispatch()

    const [departments, setDepartments] = useState<any>([])

    const handleChange = (e:any, value:any) => {
        console.log(value)
    }

    useEffect(() => {
        fetchDepartments()
    }, [])

    const fetchDepartments = async() => {
        await axios
            .get(`${APILink}department`)
            .then(res => setDepartments((curr:any) => Array.isArray(res.data)? res.data: []))
            .catch(err => dispatch(HandleAlertAction({
                open: true,
                status: "error",
                message: "Network Lost"
            })))

    }

    const equalityTest = (option: any, value: any) => {
        return option.label == value.label
    }

    const options = departments.map((option:any) => {
        const firstLetter = option.dept_name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });

    return (
        <Autocomplete
            multiple
            disablePortal
            // value={[
            //     { label: 'The Dark Knight', year: 2008 },
            //     { label: 'The Godfather: Part II', year: 1974 },
            // ]}
            getOptionLabel={(option) => option?.dept_name}
            onChange={handleChange}
            isOptionEqualToValue={equalityTest}
            options={options.sort((a:any, b:any) => -b.firstLetter.localeCompare(a.firstLetter))}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Departments" />}
            // renderOption={(params) => (
            //     <li key={params.key}>
            //       <div>{params.group}</div>
            //       <ul>{params.option.dept_name}</ul>
            //     </li>
            // )}
        />
    )
} 