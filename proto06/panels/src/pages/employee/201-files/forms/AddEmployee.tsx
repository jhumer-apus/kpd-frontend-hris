import { useState } from 'react';

//HELPER
import { beautifyJSON } from '@/helpers/utils';

//STORE
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { APILink } from '@/store/configureStore';

//LIBARIES
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { Input, Typography } from '@material-tailwind/react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const UserProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<EMPLOYEESViewInterface>();

  // const { registerPersonalInfo, handleSubmitPersonalInfo, formState: { errors } } = useForm<EMPLOYEESViewInterface>();
  const [currentTab, setCurrentTab] = useState<String>('personal_information')
  const [editMode, setEditMode] = useState(true);


  


  const submitPersonalInformation = (data:any) => {

  }

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
        window.alert(`${response.status >= 200 && response.status < 300 && 'Request Successful'}`)
        setTimeout(()=>{
            location.reload();
        }, 800)
      } catch (err: any) {
        console.error(err);
        window.alert(`${beautifyJSON(err.response?.data)}`)
        setEditMode(true);
      }
  };

  const headers = [
    {
      label: "Personal Information",
      value: 'personal_information'
    },
    {
      label: "Employee Information",
      value: 'pemployee_information'
    }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs value={currentTab}>
        <TabsHeader>
          {headers.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <TabPanel key='personal_information' value='personal_information'>
            <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
              <div style={{position: 'relative', width: '100%'}}>
                <Input
                      crossOrigin={undefined} {...register('first_name', { required: true })}
                      label="First Name: (required)"
                      disabled={!editMode}            />
                {errors.first_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>First name is required.</sub>}
              </div>

                <Input
                  crossOrigin={undefined} {...register('middle_name')}
                  label="Middle Name: (optional)"
                  disabled={!editMode}            />
              <div style={{position: 'relative', width: '100%'}}>
                <Input
                      crossOrigin={undefined} {...register('last_name', { required: true })}
                      label="Last Name: (required)"
                      disabled={!editMode}            />
                {errors.last_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Last name is required.</sub>}
              </div>
                <Input
                  crossOrigin={undefined} {...register('suffix')}
                  label="Suffix: (optional)"
                  disabled={!editMode}            />
              <div style={{position: 'relative', width: '100%'}}>
                  <Input
                    crossOrigin={undefined} {...register('gender', { required: true })}
                    type='text'
                    maxLength={1}
                    pattern='(M|F)'
                    label="Gender: M/F (required)"
                    containerProps={{ className: "min-w-[20px]" }}
                    disabled={!editMode}                />
                  {errors.gender && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Gender is required.</sub>}
              </div>
            </div>

            <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
              <div style={{position: 'relative', width: '100%'}}>
                  <Input
                    crossOrigin={undefined} {...register('address', { required: true })}
                    label="Address: (required)"
                    disabled={!editMode}                />
                  {errors.address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Address is required.</sub>}
              </div>
              <Input
                crossOrigin={undefined} {...register('provincial_address')}
                label="Provincial Address: (optional)"
                disabled={!editMode}            />
              <div style={{position: 'relative', width: '100%'}}>
                  <Input
                    crossOrigin={undefined} {...register('email_address', { required: true })}
                    label="Email Address: *"
                    disabled={!editMode}                />
                  {errors.provincial_address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Email is required.</sub>}
              </div>
            </div>

            <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
              <div style={{position: 'relative', width: '100%'}}>
                  <Input
                    crossOrigin={undefined} {...register('mobile_phone', { required: true })}
                    label="Mobile Phone #: (required)"
                    disabled={!editMode}                />
                  {errors.email_address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Phone # is required.</sub>}
              </div>
              <div style={{position: 'relative', width: '100%'}}>
                  <Input
                    crossOrigin={undefined} {...register('telephone', { required: false })}
                    label="Telephone # (optional):"
                    pattern='^[0-9]+$'
                    type='string'
                    disabled={!editMode}                />
                  {errors.telephone && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Telephone # should be numbers</sub>}
              </div>
              <div style={{position: 'relative', width: '100%'}}>
                  <Input
                    crossOrigin={undefined} {...register('emergency_contact_person', { required: true })}
                    label="Emergency Contact Person (required):"
                    type='string'
                    disabled={!editMode}                />
                  {errors.emergency_contact_person && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Emergency contact person should be required</sub>}
              </div>
              <div style={{position: 'relative', width: '100%'}}>
                  <Input
                    crossOrigin={undefined} {...register('emergency_contact_number', { required: true })}
                    label="Emergency Contact # (required):"
                    type='string'
                    disabled={!editMode}                />
                  {errors.emergency_contact_number && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Emergency contact number should be required</sub>}
              </div>
            </div>
            <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
              <div style={{position: 'relative', width: '100%'}}>
                    <Input
                      crossOrigin={undefined} {...register('civil_status', { required: true })}
                      label="Civil Status: S/M/A/W/D (required)"
                      type='string'
                      maxLength={1}
                      pattern='(S|W|A|D|M)'
                      disabled={!editMode}                />
                    {errors.civil_status && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Civil Status is required.</sub>}
                </div>
                <div style={{position: 'relative', width: '100%'}}>
                    <Input
                      crossOrigin={undefined} {...register('blood_type', { required: false })}
                      label="Blood Type (optional):"
                      type='string'
                      disabled={!editMode}                />
                    {/* {errors.telephone && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Blood type should be true</sub>} */}
                </div>
            </div>
            <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
              <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('birthday', { required: true })}
                  label="Birthday: YYYY-MM-DD (required)"
                  type='string'
                  disabled={!editMode}                />
                {errors.birthday && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Birthday is required.</sub>}
              </div>
              <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('birth_place', { required: true })}
                  label="Birth Place (required)"
                  type='string'
                  disabled={!editMode}                />
                {errors.birth_place && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Birth place is required.</sub>}
              </div>
            </div>
            <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
              <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('graduated_school', { required: true })}
                  label="School Graduated (required)"
                  type='string'
                  disabled={!editMode}                />
                {errors.graduated_school && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>School graduated is required.</sub>}
              </div>
              <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('profession', { required: true })}
                  label="Profession (required)"
                  type='string'
                  disabled={!editMode}                />
                {errors.profession && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Profession is required.</sub>}
              </div>
              <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('license_no', { required: false })}
                  label="License # (optional)"
                  type='string'
                  disabled={!editMode}                />
                {errors.license_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>License # is required.</sub>}
              </div>
            </div>
          </TabPanel>
          <TabPanel key='employee_information' value='employee_information'>
            
          </TabPanel>
        </TabsBody>
      </Tabs>






        <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Add New Employee (Single Entry)
        </Typography>   
        <Typography
            variant="small"
            color="black"
            className="mb-4 font-medium italic"
        >
            Required Information
        </Typography>
        
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '40%'}}>
                <Input
                  crossOrigin={undefined} {...register('date_hired', { required: true })}
                  label="Date Hired: YYYY-MM-DD*"
                  type='text'
                  disabled={!editMode}
                  pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'                />
                {errors.date_hired && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Date Hired is required.</sub>}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
            <Input
                  crossOrigin={undefined} {...register('first_name', { required: true })}
                  label="First Name: (required)"
                  disabled={!editMode}            />
            {errors.first_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>First name is required.</sub>}
            </div>

            <Input
              crossOrigin={undefined} {...register('middle_name')}
              label="Middle Name: (optional)"
              disabled={!editMode}            />
            <div style={{position: 'relative', width: '100%'}}>
            <Input
                  crossOrigin={undefined} {...register('last_name', { required: true })}
                  label="Last Name: (required)"
                  disabled={!editMode}            />
            {errors.last_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Last name is required.</sub>}
            </div>
            <Input
              crossOrigin={undefined} {...register('suffix')}
              label="Suffix: (optional)"
              disabled={!editMode}            />
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('gender', { required: true })}
                  type='text'
                  maxLength={1}
                  pattern='(M|F)'
                  label="Gender: M/F (required)"
                  containerProps={{ className: "min-w-[20px]" }}
                  disabled={!editMode}                />
                {errors.gender && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Gender is required.</sub>}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('emp_no', { required: true })}
                  label="Assigned Employee No:* (max 5 digits)"
                  disabled={!editMode}                />
                {errors.emp_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Emp # is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('bio_id', { required: true })}
                  label="Biometrics ID:* (can be same as emp_no)"
                  disabled={!editMode}                />
                {errors.bio_id && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Bio ID is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('rank_code', { required: true })}
                  type='number'
                  maxLength={1}
                  max={5}
                  label="Rank Code: (required, 1-lowest & 5-highest)"
                  disabled={!editMode}                />
                {errors.approver && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Approver # is required.</sub>}
            </div>
        </div>    
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('address', { required: true })}
                  label="Address: (required)"
                  disabled={!editMode}                />
                {errors.address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Address is required.</sub>}
            </div>
            <Input
              crossOrigin={undefined} {...register('provincial_address')}
              label="Provincial Address: (optional)"
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
                  label="Mobile Phone #: (required)"
                  disabled={!editMode}                />
                {errors.email_address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Phone # is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('birthday', { required: true })}
                  label="Birthday: YYYY-MM-DD (required)"
                  disabled={!editMode}                />
                {errors.email_address && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Birthday is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('civil_status', { required: true })}
                  label="Civil Status: S/M/A/W/D (required)"
                  type='string'
                  maxLength={1}
                  pattern='(S|W|A|D|M)'
                  disabled={!editMode}                />
                {errors.civil_status && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Civil Status is required.</sub>}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('accnt_no', { required: true })}
                  label="Account number: (Bank acct / Gcash acct)"
                  disabled={!editMode}                />
                {errors.accnt_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Account number is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('emp_salary_basic', { required: true })}
                  label="Basic Salary Amount: (no commas)"
                  disabled={!editMode}                />
                {errors.emp_salary_basic && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Basic Salary Amount is required.</sub>}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('emp_salary_type', { required: true })}
                  label="Salary Type: (monthly / daily) "
                  disabled={!editMode}
                  type='text'                />
                {errors.emp_salary_type && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Salary Type is required.</sub>}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('payroll_group_code', { required: true })}
                  label="Payroll Group Code: (ID) "
                  disabled={!editMode}
                  type='text'                />
                {errors.payroll_group_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Payrollgroup ID is required.</sub>}
            </div>
        </div>
        <Typography
            variant="small"
            color="gray"
            className="mb-4 font-medium italic"
        >
            Optional Information
        </Typography>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('approver1', { required: false })}
                  label="Approver #1: (optional, emp_no)"
                  disabled={!editMode}                />
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('approver2', { required: false })}
                  label="Approver #2: (optional, emp_no)"
                  disabled={!editMode}                />
            </div>
        </div> 
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('division_code', { required: false })}
                  label="Division Code: (optional, ID)"
                  disabled={!editMode}                />
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('position_code', { required: false })}
                  label="Position Code: (optional, ID)"
                  disabled={!editMode}                />
            </div>
        </div> 
        <Button variant="contained" color="primary" type="submit">
            Submit
        </Button>
    </form>
  );
};