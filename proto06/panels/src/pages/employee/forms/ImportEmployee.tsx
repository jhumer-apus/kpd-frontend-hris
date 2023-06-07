import { useEffect, useState } from 'react';
import axios from 'axios';
import { twMerge } from 'tailwind-merge';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { Input, Typography } from '@material-tailwind/react';
// import { TextField, Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
// import { fetchUserData, updateUserData } from './userDataActions'; // import your actions
import { getSpecificEmployeeInfo } from '@/store/actions/employees';
import { RootState } from '@/store/configureStore';
import { GetEmployeesListsType } from '@/types/types-store';


type ImportEmployee = {
  file: any;
};

export const ImportEmployee = () => {

    const [file, setFile] = useState<File | null>(null);
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : null);
    };

    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    // const { register, handleSubmit, setValue, formState: { errors } } = useForm<ImportEmployee>();
    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<ImportEmployee>({
        mode: 'onChange',
    });
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.employees.specific_employee_info);
    const [editMode, setEditMode] = useState(true);
    // console.log(userData, "maasd")


    useEffect(() => {
        // update form values when userData changes
        // if (userData) {
        //   for (const key in userData) {
        //     setValue(key as keyof FormData, userData[key]);
        //   }
        // }
    }, [userData, setValue]);

    // const onSubmit = async (data: ImportEmployee) => {
    // const formData = new FormData();
    // console.log("appending file:sss ", data)

    // if(data.file) {
    //     formData.append('file', data.file[0].name);
    //     console.log("appending file: ", data.file[0])
    //     console.log("formData111: ", formData);
    // }
    // // for (const key in data) {
    // //     // formData.append(key, data[key as keyof FormData]);
    // //     if (data[key as keyof ImportEmployee]) {
    // //         formData.append(key, data[key as keyof ImportEmployee], data[key as keyof ImportEmployee].name);
    // //     }
    // //     // formData.append(key, data[key as keyof ImportEmployee], data[key as keyof ImportEmployee].name);
    // // }
    // console.log("formData: ", formData);
    // try {
    //     const response = await axios.post(
    //       'http://172.16.168.155:8000/api/import_employee/',
    //       formData,
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     );
    
    //     console.log(response.data);
    //     // setTimeout(()=>{
    //     //     location.reload();
    //     // }, 1000)
    //   } catch (err) {
    //     console.error(err);
    //   }

    // // dispatch(updateUserData(data));
    // setEditMode(false);

    // };
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (!file) {
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await axios.post(
            'http://172.16.168.155:8000/api/import_employee/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
    
          console.log(response.data);
          setTimeout(() => {
            location.reload();
          }, 1000);
        } catch (err) {
          console.error(err);
        }
    };
  return (
    <form 
        onSubmit={onSubmit} 
        className="flex flex-col justify-between items-center h-52" 
        style={{}}
    >
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Bulk Import TSV File to Employee Records
        </Typography> 
        {/* <Controller
            control={control}
            name={"file"}
            rules={{ required: "file is required" }}
            render={({field: {value, onChange, ...field}}) =>{
                return (
                    <Input
                    {...field}
                    value={value?.fileName}
                    containerProps={{ className: twMerge("w-52 max-w-[300px]") }} 
                    type="file"
                    // style={{ display: 'none' }}
                    // {...register('file')}
                    accept=".tsv"
                    label="Upload File"
                    disabled={!editMode}
                    onChange={(event) => {
                        onChange(event.target.files[0]);
                    }}
                />
                )
            }}
            /> */}
      <input type="file" onChange={onFileChange} />

        {editMode ? (
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
            ) : (
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditMode(true)}
            >
                Edit
            </Button>
            )}
    </form>
  );
};