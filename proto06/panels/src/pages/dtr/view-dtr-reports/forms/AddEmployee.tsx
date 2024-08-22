import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Input, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { APILink } from '@/store/configureStore';

export const UserProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<EMPLOYEESViewInterface>();
    const [editMode, setEditMode] = useState(true);


  const onSubmit = async (data: EMPLOYEESViewInterface) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key as keyof EMPLOYEESViewInterface]);
    }

    try {
        const response = await axios.post(
          `${APILink}employees/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setTimeout(()=>{
            location.reload();
        }, 1000)
      } catch (err) {
        console.error(err);
      }
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Add New Employee
        </Typography>   
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Required Information
        </Typography>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '30%'}}>
                <Input
                  crossOrigin={undefined} {...register('date_hired', { required: true })}
                  label="Date Hired: YYYYMMDD *"
                  disabled={!editMode}                />
                {errors.date_hired && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Date Hired is required.</sub>}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('emp_no', { required: true })}
                  label="Assigned Employee No:*"
                  disabled={!editMode}                />
                {errors.emp_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Emp # is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('approver', { required: true })}
                  label="Approver: *"
                  disabled={!editMode}                />
                {errors.approver && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Approver # is required.</sub>}
            </div>
        </div>    
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
            <Input
                  crossOrigin={undefined} {...register('first_name', { required: true })}
                  label="First Name: *"
                  disabled={!editMode}            />
            {errors.first_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>First name is required.</sub>}
            </div>

            <Input
              crossOrigin={undefined} {...register('middle_name')}
              label="Middle Name:"
              disabled={!editMode}            />
            <div style={{position: 'relative', width: '100%'}}>
            <Input
                  crossOrigin={undefined} {...register('last_name', { required: true })}
                  label="Last Name: *"
                  disabled={!editMode}            />
            {errors.last_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Last name is required.</sub>}
            </div>
            <Input
              crossOrigin={undefined} {...register('suffix')}
              label="Suffix:"
              disabled={!editMode}            />
            <Input
              crossOrigin={undefined} {...register('gender')}
              label="Gender: M/F *"
              containerProps={{ className: "min-w-[20px]" }}
              disabled={!editMode}            />
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('address', { required: true })}
                  label="Address: *"
                  disabled={!editMode}                />
                {errors.address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Address is required.</sub>}
            </div>
            <Input
              crossOrigin={undefined} {...register('provincial_address')}
              label="Provincial Address:"
              disabled={!editMode}            />
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('email_address', { required: true })}
                  label="Email Address: *"
                  disabled={!editMode}                />
                {errors.email_address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Email is required.</sub>}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('mobile_phone', { required: true })}
                  label="Mobile Phone #: *"
                  disabled={!editMode}                />
                {errors.mobile_phone && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Phone # is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('birthday', { required: true })}
                  label="Birthday: YYYYMMDD *"
                  disabled={!editMode}                />
                {errors.birthday && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Birthday is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('civil_status', { required: true })}
                  label="Civil Status: S/M/W/D *"
                  disabled={!editMode}                />
                {errors.civil_status && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Civil Status is required.</sub>}
            </div>
        </div>
        <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Optional Information
        </Typography>
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