import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Input, Typography, Select, Option } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { APILink } from '@/store/configureStore';
import { beautifyJSON } from '@/helpers/utils';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//Components
// import SelectForm from '@/public-components/forms/SelectForm'

//Interace
// interface FormSelectData {
//   branch_code?: string;
//   // Add other properties as needed
// }

export const UserProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<EMPLOYEESViewInterface>();
    const [editMode, setEditMode] = useState(true);
    const [formSelectData, setFormSelectData] = useState({
      gender: null,
      branch_code: null,
      department_code: null,

    })


    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [payrollGroups, setPayrollGroups] = useState([]);
    const [employmentStatuses, setEmploymentstatuses] = useState([]);
    const [aprrovers, setApprovers] = useState([]);

    // useEffects
    useEffect(() => {
      fetchBranches()
      fetchPayrollGroups()
    }, [])

    useEffect(() => {
      if(formSelectData?.branch_code) {
        fetchDepartments(formSelectData.branch_code)
      }
    },[formSelectData]);

    // Fetch selects information
    const fetchPayrollGroups = () => {
      axios.get(`${APILink}payrollgroup`).then((response:any) => {
        const responsePayrollGroups = response.data.map((payroll:any) => {
          return {
            id: payroll.id,
            name: payroll.name
          }
        })
        setPayrollGroups(curr => responsePayrollGroups);
      })
    }
    const fetchBranches = () => {
      axios.get(`${APILink}branch`).then((response:any) => {
        const responseBranches = response.data.map((branch:any) => {
          return {
            id: branch.id,
            name: branch.branch_name
          }
        })
        setBranches(curr => responseBranches);
      })
    }

    const fetchDepartments = (id:number) => {
      axios.get(`${APILink}department/`).then((response:any) => {
        
        const responseDepartments = response.data
        .filter((department:any) => department.dept_branch_code == id)
        .map((department:any) => {
          return {
            id: department.id,
            name: department.dept_name
          }
        })
        setDepartments(curr => responseDepartments);
      })
    }


  const onSubmit = async (data: EMPLOYEESViewInterface) => {
    const formData = new FormData();
    data = {
      ...data,
      ...formSelectData
    }
    console.log(data);
    for (const key in data) {
        formData.append(key, data[key as keyof EMPLOYEESViewInterface]);
    }
    // try {
    //     const response = await axios.post(
    //       `${APILink}employees/`,
    //       formData,
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     );
    //     window.alert(`${response.status >= 200 && response.status < 300 && 'Request Successful'}`)
    //     setTimeout(()=>{
    //         location.reload();
    //     }, 800)
    //   } catch (err: any) {
    //     console.error(err);
    //     window.alert(`${beautifyJSON(err.response?.data)}`)
    //     setEditMode(true);
    //   }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Personal Information
        </Typography>   
        {/* <Typography
            variant="small"
            color="black"
            className="mb-4 font-medium italic"
        >
            Required Information
        </Typography> */}

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
            <Select
              onChange={(val:any) => setFormSelectData(curr => ({
                ...curr,
                gender: val
              }))}
              placeholder="Select Sex"
              name="gender"
              variant="outlined"
              label="Sex"
            >
              <Option value="M">Male</Option>
              <Option value="F">Female</Option>
          </Select>
              {/* <Input
                crossOrigin={undefined} {...register('gender', { required: true })}
                type='text'
                maxLength={1}
                pattern='(M|F)'
                label="Sex: M/F (required)"
                containerProps={{ className: "min-w-[20px]" }}
                disabled={!editMode}                />
              {errors.gender && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Gender is required.</sub>} */}
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
          <div style={{position: 'relative', width: '100%'}}>
              <Input
                crossOrigin={undefined} {...register('url_google_map', { required: false })}
                label="URL Google Map:"
                disabled={!editMode}                />
              {/* {errors.url_google_map && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>URL Google Map is required.</sub>} */}
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
                maxLength={15}
                pattern='^[0-9]+$'
                type='text'
                disabled={!editMode}                />
              {errors.telephone && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Telephone # should be numbers</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
              <Input
                crossOrigin={undefined} {...register('emergency_contact_person', { required: true })}
                label="Emergency Contact Person (required):"
                type='text'
                disabled={!editMode}                />
              {errors.emergency_contact_person && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Emergency contact person should be required</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
              <Input
                crossOrigin={undefined} {...register('emergency_contact_number', { required: true })}
                label="Emergency Contact # (required):"
                pattern='^[0-9]+$'
                type='text'
                disabled={!editMode}                />
              {errors.emergency_contact_number && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Emergency contact number should be required</sub>}
          </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <div style={{position: 'relative', width: '100%'}}>
                <Select
                    onChange={(val:any) => setFormSelectData(curr => ({...curr, civil_status: val}))}
                    placeholder="Select Civil Status"
                    name="civil_status"
                    variant="outlined"
                    label="Civil Status"
                  >
                    <Option value="S">Single</Option>
                    <Option value="M">Married</Option>
                    <Option value="A">Anull</Option>
                    <Option value="W">Widowed</Option>
                    <Option value="D">Divorced</Option>
                </Select>
                {/* <Input
                  crossOrigin={undefined} {...register('civil_status', { required: true })}
                  label="Civil Status: S/M/A/W/D (required)"
                  type='string'
                  maxLength={1}
                  pattern='(S|W|A|D|M)'
                  disabled={!editMode}                />
                {errors.civil_status && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Civil Status is required.</sub>} */}
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
              type='text'
              disabled={!editMode}                />
            {errors.birth_place && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Birth place is required.</sub>}
          </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('graduated_school', { required: true })}
              label="School Graduated (required)"
              type='text'
              disabled={!editMode}                />
            {errors.graduated_school && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>School graduated is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('profession', { required: true })}
              label="Profession (required)"
              type='text'
              disabled={!editMode}                />
            {errors.profession && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Profession is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('license_no', { required: false })}
              label="License # (optional)"
              type='text'
              disabled={!editMode}                />
            {errors.license_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>License # is required.</sub>}
          </div>
        </div>

        {/* sss,pagibig, tax, philhealth */}
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          {/* <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('tax_code', { required: true })}
              label="Tax #:"
              type='text'
              disabled={!editMode}                />
            {errors.tax_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Tax # is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('pagibig_code', { required: true })}
              label="Pagibig ID:"
              type='text'
              disabled={!editMode}                />
            {errors.pagibig_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Pagibig ID is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('sssid_code', { required: true })}
              label="SSS ID:"
              type='text'
              disabled={!editMode}                />
            {errors.sssid_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>SSS ID is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('philhealth_code', { required: true })}
              label="Philhealth ID:"
              type='text'
              disabled={!editMode}                />
            {errors.philhealth_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Philhealth ID is required.</sub>}
          </div> */}
        </div>




        <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 font-medium"
        >
            Employee Information
        </Typography>   
        {/* <Typography
            variant="small"
            color="black"
            className="mb-4 font-medium italic"
        >
            Required Information
        </Typography> */}


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
                <Select
                    onChange={(val:any) => setFormSelectData(curr => ({
                      ...curr,
                      emp_salary_type: val
                    }))}
                    placeholder="Select Salary Type"
                    name="emp_salary_type"
                    variant="outlined"
                    label="Salary Type"
                >
                    <Option value="monthly">Monthly</Option>
                    <Option value="yearly">Yearly</Option>
                </Select>
                {/* <Input
                  crossOrigin={undefined} {...register('emp_salary_type', { required: true })}
                  label="Salary Type: (monthly / daily) "
                  disabled={!editMode}
                  type='text'                />
                {errors.emp_salary_type && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Salary Type is required.</sub>} */}
            </div>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Select
                    onChange={(val:any) => setFormSelectData(curr => ({...curr, payroll_group_code: val}))}
                    placeholder="Select Payroll Group"
                    name="payroll_group_code"
                    variant="outlined"
                    label="Payroll Group"
                  >
                    {
                      payrollGroups.length > 0 ? payrollGroups.map((payroll:any) => (
                        <Option value={payroll.id}>{payroll.name}</Option>
                      ))
                      : <Option disabled>No payrolls available</Option>
                    }
                </Select>
                {/* <Input
                  crossOrigin={undefined} {...register('payroll_group_code', { required: true })}
                  label="Payroll Group Code: (ID) "
                  disabled={!editMode}
                  type='text'                />
                {errors.payroll_group_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Payrollgroup ID is required.</sub>} */}
            </div>
            <div style={{position: 'relative', width: '100%'}}>

            {/* <Autocomplete
              // disableCloseOnSelect
              noOptionsText={'Loading... Please Wait.'}
              options={branches}
              // groupBy={(option:any) => option.name}
              getOptionLabel={(option:any) => option.name}
              // onChange={(event, value) => setFormSelectData({ ...formSelectData, branch_code: value?.id })}
              // sx={{ width: 300 }}
              // isOptionEqualToValue={isOptionEqualToValue}
              renderInput={(params) => 
                  {   
                      return(
                        <TextField
                          {...params} label="Branch" 
                          // crossOrigin={undefined} {...register('branch_code', { required: true })}
                        />
                      )

                  }

              }
            /> */}
                <Select
                  onChange={(val:any) => setFormSelectData(curr => ({
                    ...curr,
                    branch_code: val
                  }))}
                  placeholder="Select Branch"
                  name="branch_code"
                  variant="outlined"
                  label="Branch"
                >
                  {branches.length > 0 ? branches.map((branch:any)=> (
                    <Option value={branch.id}>{branch.name}</Option>
                  )): (
                    <Option disabled>No branch available</Option>
                  )}
                </Select>
                {/* <Input
                  crossOrigin={undefined} {...register('branch_code', { required: true })}
                  label="Branch Code:"
                  disabled={!editMode}
                  type='text'                />
                {errors.branch_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Branch code is required.</sub>} */}
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Select
                  onChange={(val:any) => setFormSelectData(curr => ({
                    ...curr,
                    department_code: val
                  }))}
                  placeholder="Select Department"
                  name="department_code"
                  variant="outlined"
                  label="Department"
                >
                  {departments.length > 0 ? departments.map((department:any)=> (
                    <Option value={department.id}>{department.name}</Option>
                  )): (
                    <Option disabled>No branch available</Option>
                  )}
                </Select>
  
                {/* <Input
                  crossOrigin={undefined} {...register('department_code', { required: true })}
                  label="Department Code:"
                  disabled={!editMode}
                  type='text'                />
                {errors.department_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Department code is required.</sub>} */}
            </div>

            {/* Pending */}
            {/* <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('city_code', { required: true })}
                  label="City Code:"
                  disabled={!editMode}
                  type='text'                />
                {errors.city_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>City code is required.</sub>}
            </div> */}
        </div>

        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <div style={{position: 'relative', width: '100%'}}>
              <Input
                crossOrigin={undefined} {...register('hmo', { required: true })}
                label="HMO Account #:"
                disabled={!editMode}
                type='text'                />
              {errors.hmo && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>HMO Account # is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
              <Input
                crossOrigin={undefined} {...register('payroll_no', { required: true })}
                label="Payroll #:"
                disabled={!editMode}
                type='text'                />
              {errors.payroll_no && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Payroll # is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
              <Input
                crossOrigin={undefined} {...register('employee_type', { required: true })}
                label="Employee Type:"
                disabled={!editMode}
                type='text'                />
              {errors.employee_type && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Employee Type is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
              <Input
                crossOrigin={undefined} {...register('employment_status', { required: true })}
                label="Employment Status:"
                disabled={!editMode}
                type='text'                />
              {errors.employment_status && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Employment Status is required.</sub>}
          </div>
        </div>

        {/* <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('date_resigned', { required: false })}
              label="Date Resigned:"
              disabled={!editMode}
              type='date'                />
            {errors.date_resigned && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Date Resigned is required.</sub>}
          </div>
        </div> */}
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <div style={{position: 'relative', width: '100%'}}>
            <Input
              crossOrigin={undefined} {...register('other_duties_responsibilities', { required: false })}
              label="Other Duty Responsibilities:"
              disabled={!editMode}
              type='text'                />
            {/* {errors.other_duties_responsibilities && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Other Duty Responsibilities is required.</sub>} */}
          </div>

          <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('other_deductible', { required: false })}
                  label="Other Deductible (optional):"
                  disabled={!editMode}
                  min="0"
                  type='number'
                  step="0.01" 
                />
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
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('insurance_life', { required: false })}
                  label="Insurance Life: (optional)"
                  type="number"
                  step="0.01" 
                  min="0"
                  disabled={!editMode}                />
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <Input
                  crossOrigin={undefined} {...register('ecola', { required: false })}
                  label="Ecola: (optional)"
                  type="number"
                  step="0.01" 
                  min="0"
                  disabled={!editMode}                />
            </div>
        </div> 
        
        <Button variant="contained" color="primary" type="submit">
            Submit
        </Button>
    </form>
  );
};