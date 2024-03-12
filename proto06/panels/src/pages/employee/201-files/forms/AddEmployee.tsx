import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import { APILink } from '@/store/configureStore';
import { beautifyJSON } from '@/helpers/utils';
import InputLabel from '@mui/material/InputLabel';

import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Icons
import {
  PlusIcon,
} from "@heroicons/react/24/solid";

// COMPONENTS
import Province from '@/public-components/forms/address/Province'
import CityMunicipality from '@/public-components/forms/address/CityMunicipality'
// import SelectForm from '@/public-components/forms/SelectForm'
import DatePicker from '@/public-components/forms/DatePickerForm'

//Interface
// interface FormSelectData {
//   branch_code?: string;
//   // Add other properties as needed
// }

interface DropDownData {
  branches: any[],
  departments: any[],
  payrollGroups: any[],
  employmentStatuses: any[],
  positions: any[],
  approvers: any[]
}

export const UserProfile = () => {

    // const { register, handleSubmit, formState: { errors } } = useForm<EMPLOYEESViewInterface>();
    const [editMode, setEditMode] = useState(true);
    const [employeeData, setEmployeeData] = useState({
      civil_status: null,
      division_code:null,
      gender: null,
      payroll_group_code:null,
      employee_image: null,
      branch_code: null,
      position_code: null,
      department_code: null,
      rank_code: null,
      approver1: null,
      approver2: null,
      province: {
        id: null,
        name: null,
        code: null
      },
      city: {
        id: null,
        name: null,
        code: null
      }
    })
    const [profileImage, setProfileImage] = useState<any>(null);

    const [dropDownData, setDropDownData] = useState<DropDownData>({
      branches:[],
      departments:[],
      payrollGroups:[],
      employmentStatuses:[],
      positions:[],
      approvers:[],
    })


    // USE EFFECTS
    useEffect(() => {
      fetchBranches()
      fetchPayrollGroups()
      fetchEmploymentStatus()
      fetchPositions()
      fetchDepartments()
    }, [])

    // useEffect(() =>  {
    //   console.log(employeeData.department_code)
    //   if(employeeData.department_code) {
    //     fetchApprovers(employeeData.department_code)
    //   }
    // },[employeeData.department_code])

    // FETCH SELECTS INFORMATION
    const fetchPayrollGroups = () => {
      axios.get(`${APILink}payrollgroup`).then((response:any) => {
        const responsePayrollGroups = response.data.map((payroll:any) => {
          return {
            id: payroll.id,
            name: payroll.name
          }
        })
        setDropDownData((curr:any) => ({...curr, payrollGroups: responsePayrollGroups}));
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
        setDropDownData((curr:any) => ({...curr, branches: responseBranches}));
      })
    }

    const fetchDepartments = () => {

      axios.get(`${APILink}department/`).then((response:any) => {
        
        const responseDepartments = response.data.map((department:any) => {
          return {
            id: department.id,
            name: department.dept_name
          }
        })
        setDropDownData((curr:any) => ({...curr, departments: responseDepartments}));
      })
    }

    // const fetchDepartments = (id:number) => {

    //   axios.get(`${APILink}department/`).then((response:any) => {
        
    //     const responseDepartments = response.data
    //     .filter((department:any) => department.dept_branch_code == id)
    //     .map((department:any) => {
    //       return {
    //         id: department.id,
    //         name: department.dept_name
    //       }
    //     })
    //     setDropDownData((curr:any) => ({...curr, departments: responseDepartments}));
    //   })
    // }

    const fetchEmploymentStatus = () => {
      axios.get(`${APILink}emp_status_type/`).then((response:any) => {
        const responseEmploymentStatuses = response.data.map((employmentStatus:any) => {
          return {
            id: employmentStatus.id,
            name: employmentStatus.name
          }
        })
        setDropDownData((curr:any) => ({...curr, employmentStatuses: responseEmploymentStatuses}));
      })
    }

    const fetchPositions = () => {
      axios.get(`${APILink}position/`).then((response:any) => {
        const responsePositions = response.data.map((position:any) => {
          return {
            id: position.id,
            name: position.pos_name
          }
        })

        setDropDownData((curr:any) => ({...curr, positions: responsePositions}));
      })
    }

    const fetchApprovers = (department: number) => {
      axios.get(`${APILink}approvers/`,{
        params:{
          department: department
        }
      }).then((response:any) => {

        const responseApprovers = response.data.map((approver:any) => {
          return {
            emp_no: approver.emp_no,
            full_name: approver.full_name
          }
        })

        setDropDownData((curr:any) => ({...curr, approvers: responseApprovers}));

      })
    }

    // const fetchApprovers = () => {
    //   axios.get(`${APILink}position/`).then((response:any) => {
    //     const responsePositions = response.data.map((position:any) => {
    //       return {
    //         id: position.id,
    //         name: position.pos_name
    //       }
    //     })

    //     setPositions(curr => responsePositions);
    //   })
    // }

    // const fetchDivisions = () => {
    //   axios.get(`${APILink}division/`).then((response:any) => {
    //     const responseDivisions = response.data.map((div:any) => {
    //       return {
    //         id: div.id,
    //         name: position.pos_name
    //       }
    //     })

    //     setPositions(curr => responsePositions);
    //   })
    // }

    // const handleProfilePic = (e:any) => {
    //   const file = e.target.files[0];
    //   setEmployeeData((curr:any) => ({...curr, employee_image:file}))
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       setProfileImage(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // }

    const handleProfilePic = (e:any) => {

      const file = e.target.files[0];
      const MAX_FILE_SIZE_MB = 5;
  
      if (file) {
  
        if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
  
            setEmployeeData((curr:any) => ({...curr, employee_image:file}))
  
            const reader = new FileReader();
            reader.onload = () => {
              setProfileImage(reader.result);
            };
      
            reader.readAsDataURL(file);
  
        } else {
  
          window.alert('Image should be not more than 5MB');
  
        }
      }
    }

  const handleChangeUserData = (e:any) => {
    setEmployeeData(curr => (
      {
        ...curr,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    console.log(employeeData)

    const formData = new FormData();

    const finalData: EMPLOYEESViewInterface = {

      // user: USERViewInterface | null
      employee_image: employeeData.employee_image,
      age: employeeData.age,
      // tax_data:
      // pagibig_data:
      // sss_data:
      // philhealth_data:
      emp_no: employeeData.emp_no,
      first_name: employeeData.first_name,
      middle_name: employeeData.middle_name,
      last_name: employeeData.last_name,
      suffix: employeeData.suffix,
      birthday: employeeData.birthday,
      birth_place: employeeData.birth_place,
      civil_status: employeeData.civil_status,
      gender: employeeData.gender,
      address: employeeData.address,
      mobile_phone: employeeData.mobile_phone,
      email_address: employeeData.email_address,
      bio_id: employeeData.bio_id,
      telephone: employeeData.telephone,
      blood_type: employeeData.blood_type,
      graduated_school: employeeData.graduated_school,
      profession: employeeData.profession,
      license_no: employeeData.license_no,
      emergency_contact_person: employeeData.emergency_contact_person,
      emergency_contact_number: employeeData.emergency_contact_number,
      hmo: employeeData.hmo,
      other_duties_responsibilities: employeeData.other_duties_responsibilities,
      payroll_no: employeeData.payroll_no,
      date_hired: employeeData.date_hired,
      // date_resigned: employeeData.date_resigned,
      accnt_no: employeeData.accnt_no,
      emp_salary_basic: employeeData.emp_salary_basic,
      emp_salary_type: employeeData.emp_salary_type,
      insurance_life: employeeData.insurance_life,
      other_deductible: employeeData.other_deductible,
      ecola: employeeData.ecola,
      approver1: employeeData.approver1,
      approver2: employeeData.approver2,
      province_code: employeeData.province.id,
      city_code: employeeData.city.id,
      branch_code: employeeData.branch_code,
      department_code: employeeData.department_code,
      division_code: employeeData.division_code,
      position_code: employeeData.position_code,
      rank_code: employeeData.rank_code,
      payroll_group_code: employeeData.payroll_group_code,
      employment_status: employeeData.employment_status,
      division_code: 1
      // tax_code: string | null
      // pagibig_code: string | null
      // sssid_code: string
      // philhealth_code: string | null
      // rank_data: RankDataInterface //deprecated
    }
    // data = {
    //   ...data,
    //   ...employeeData
    // }
    console.log(employeeData)
    console.log(finalData)
    for (const key in finalData) {
        
        formData.append(key, finalData[key as keyof EMPLOYEESViewInterface]);
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

  //STATIC
  const appStatus = import.meta.env.VITE_APP_STATUS?? "production"

  return (
    <form onSubmit={handleSubmit}>

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
          <div>
            <label 
              htmlFor="fileInput" 
              className="w-24 h-24 m-auto rounded-full border border-4 border-slate-900 cursor-pointer flex items-center justify-center"
              style={{ backgroundImage: `url(${profileImage})`, backgroundSize: 'cover' }}
            >
              <div className='w-fit h-fit rounded-full p-2'>
                {!profileImage && <PlusIcon className="h-12 text-gray-500" />}
              </div>
            </label>
            <input 
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleProfilePic}
              accept="image/jpeg, image/jpg, image/png, image/webp"
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-4 font-medium"
            >
            Upload Profile Picture
        </Typography>  
          </div>
        </div>

        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <OutlinedInput
              id="firstname"
              label="First Name"
              onChange={handleChangeUserData}
              name="first_name"
              // inputProps={{
              //   step:"0.01",
              //   min:"0",
              // }}
              disabled={!editMode}            
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="middlename">Middle Name</InputLabel>
            <OutlinedInput
              id="middlename"
              onChange={handleChangeUserData}
              name="middle_name"
              label="Middle Name"
              disabled={!editMode}            
            />
          </FormControl>

          <FormControl className='w-full'>

            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <OutlinedInput
              id="lastname"
              className='w-full'
              onChange={handleChangeUserData}
              name="last_name"
              label="Last Name"
              disabled={!editMode}            
            />
          </FormControl>

          <FormControl className='w-full'>
            <InputLabel htmlFor="suffix">Suffix: (optional)</InputLabel>
            <OutlinedInput
              id="suffix"
              className='w-full'  
              onChange={handleChangeUserData}
              name="suffix"
              label="Suffix: (optional)"
              disabled={!editMode}            
            />
          </FormControl>

          <FormControl className='w-full'>
            <InputLabel htmlFor="sex">Sex</InputLabel>
            <Select
              onChange={(e:any) => setEmployeeData(curr => ({
                ...curr,
                gender: e.target.value
              }))}
              placeholder="Select Sex"
              name="gender"
              variant="outlined"
              label="Sex"
              aria-required
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <Province 
            setState={setEmployeeData}
          />
          <CityMunicipality
            state={employeeData}
            setState={setEmployeeData}
          />

          <FormControl className='w-full'>
              <InputLabel htmlFor="address">Street Address</InputLabel>
              <OutlinedInput
                id="address"
                className='w-full'
                onChange={handleChangeUserData}
                name="address"
                label="Street Address: (required)"
                disabled={!editMode}                
              />
          </FormControl>

          <FormControl className='w-full'>
              <InputLabel htmlFor="email_address">Email Address</InputLabel>
              <OutlinedInput
                id="email_address"
                onChange={handleChangeUserData}
                className='w-full'
                inputProps={{

                }}
                name="email_address"
                label="Email Address: *"
                disabled={!editMode}                
              />
          </FormControl>
          <FormControl className='w-full'>
              <InputLabel htmlFor="url_google_map">URL Google Map</InputLabel>
              <OutlinedInput
                id="url_google_map"
                className='w-full'
                onChange={handleChangeUserData}
                name="url_google_map"
                label="URL Google Map:"
                disabled={!editMode}                
              />

          </FormControl>
        </div>

        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
              <InputLabel htmlFor="mobile_phone">Mobile Phone #*: (091234567890)</InputLabel>
              <OutlinedInput
                id="mobile_phone"
                className='w-full'
                onChange={handleChangeUserData}
                name="mobile_phone"
                label="Mobile Phone #: (091234567890)"
                disabled={!editMode}     
                inputProps={{
                  maxLength:11
                }}        
              />
          </FormControl>
          <FormControl className='w-full'>
              <InputLabel htmlFor="telephone">Telephone</InputLabel>
              <OutlinedInput
                id="telephone"
                className='w-full'
                onChange={handleChangeUserData}
                name="telephone"
                label="Telephone # (optional):"
                inputProps={{
                  maxLength:15,
                  pattern: '^[0-9]+$'
                }}
                type='text'
                disabled={!editMode}                
              />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="emergency_contact_person">Emergency Contact Person</InputLabel>
            <OutlinedInput
              id="emergency_contact_person"
              className='w-full'
              onChange={handleChangeUserData}
              name="emergency_contact_person"
              label="Emergency Contact Person (required):"
              type='text'
              disabled={!editMode}                
            />
          </FormControl>
          <FormControl className='w-full'>
              <InputLabel htmlFor="emergency_contact_number">Emergency Contact Number</InputLabel>
              <OutlinedInput
                id="emergency_contact_number"
                className='w-full'
                onChange={handleChangeUserData}
                name="emergency_contact_number"
                label="Emergency Contact # (required):"
                inputProps={{
                  maxLength:15,
                  pattern: '^[0-9]+$'
                }}
                type='tel'
                disabled={!editMode}                
              />
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
              <InputLabel htmlFor="civil_status">Civil Status</InputLabel>
              <Select
                  onChange={(e:any) => setEmployeeData(curr => ({...curr, civil_status: e.target.value}))}
                  placeholder="Select Civil Status"
                  name="civil_status"
                  variant="outlined"
                  label="Civil Status"
                  aria-required
                >
                  <MenuItem value="S">Single</MenuItem>
                  <MenuItem value="M">Married</MenuItem>
                  <MenuItem value="A">Anulled</MenuItem>
                  <MenuItem value="W">Widowed</MenuItem>
              </Select>
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="blood_type">Blood Type</InputLabel>
            <OutlinedInput
              id="blood_type"
              className='w-full'
              onChange={handleChangeUserData}
              name="blood_type"
              label="Blood Type (optional):"
              type='string'
              disabled={!editMode}                
            />
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            {/* <DatePicker 
              setState={setEmployeeData}
            /> */}
            <InputLabel htmlFor="birthday">Birthday</InputLabel>
            <OutlinedInput 
              id="birthday"
              className='w-full'
              onChange={handleChangeUserData}
              name="birthday"
              label="Birthday: YYYY-MM-DD (required)"
              type='date'
              required
              disabled={!editMode}                
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="birth_place">Birth Place</InputLabel>
            <OutlinedInput
              id="birth_place"
              className='w-full'
              onChange={handleChangeUserData}
              name="birth_place"
              label="Birth Place (required)"
              type='text'
              disabled={!editMode}                
          />
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <InputLabel htmlFor="graduated_school">School Graduated</InputLabel>
            <OutlinedInput
              id="graduated_school"
              className='w-full'
              onChange={handleChangeUserData}
              name="graduated_school"
              label="School Graduated (required)"
              type='text'
              disabled={!editMode}                
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="profession">Profession</InputLabel>
            <OutlinedInput
              id="profession"
              className='w-full'
              onChange={handleChangeUserData}
              name="profession"
              label="Profession"
              type='text'
              disabled={!editMode}                
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="license_no">License #</InputLabel>
            <OutlinedInput
              id="license_no"
              className='w-full'
              onChange={handleChangeUserData}
              name="license_no"
              label="License # (optional)"
              type='text'
              disabled={!editMode}                
            />
          </FormControl>
        </div>

        {/* sss,pagibig, tax, philhealth */}
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          {/* <div style={{position: 'relative', width: '100%'}}>
            <OutlinedInput
              label="Tax #:"
              type='text'
              disabled={!editMode}                />
            {errors.tax_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Tax # is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <OutlinedInput
              label="Pagibig ID:"
              type='text'
              disabled={!editMode}                />
            {errors.pagibig_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Pagibig ID is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <OutlinedInput
              label="SSS ID:"
              type='text'
              disabled={!editMode}                />
            {errors.sssid_code && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>SSS ID is required.</sub>}
          </div>
          <div style={{position: 'relative', width: '100%'}}>
            <OutlinedInput
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
            <FormControl className='w-full'>
              <InputLabel htmlFor="date_hired">Date Hired</InputLabel>
              <OutlinedInput
                id="date_hired"
                className='w-full'
                onChange={handleChangeUserData}
                inputProps={{
                  type:"date"
                }}
                name="date_hired"
                label="Date Hired: YYYY-MM-DD*"
                disabled={!editMode}
                // pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'                
              />
            </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <FormControl className='w-full'>
              <InputLabel htmlFor="emp_no">Assigned employee No:* (max 7 digits)</InputLabel>
              <OutlinedInput
                id="emp_no"
                className='w-full'
                onChange={handleChangeUserData}
                name="emp_no"
                label="Assigned Employee No:* (max 7 digits)"
                disabled={!editMode}
                inputProps={{
                  maxLength: 7
                }}      
              />
            </FormControl>
            <FormControl className='w-full'>
              <InputLabel htmlFor="bio_id">Biometrics ID:* (can be same as emp_no)</InputLabel>
              <OutlinedInput
                id="bio_id"
                className='w-full'
                onChange={handleChangeUserData}
                name="bio_id"
                label="Biometrics ID:* (can be same as emp_no)"
                disabled={!editMode}                
              />
            </FormControl>
            <FormControl className='w-full'>
              <InputLabel htmlFor="rank">Rank</InputLabel>
              <Select
                onChange={(e:any) => setEmployeeData(curr => ({
                  ...curr,
                  rank_code: e.target.value
                }))}
                placeholder="Rank"
                name="rank_code"
                variant="outlined"
                label="Rank"
                aria-required
            >
                <MenuItem value="1">Announcer</MenuItem>
                <MenuItem value="2">Employee</MenuItem>
                <MenuItem value="3">Manager/Director</MenuItem>
                <MenuItem value="4">HR Staff</MenuItem>
                <MenuItem value="5">HR Manager/Director</MenuItem>
                <MenuItem value="6">HR Super Admin</MenuItem>
                {appStatus == "development" && <MenuItem value="7">Development</MenuItem>}
              </Select>
            </FormControl>
        </div>    
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <FormControl className='w-full'>
              <InputLabel htmlFor="accnt_no">Account number: (Bank acct / Gcash acct)</InputLabel>
              <OutlinedInput
                id="accnt_no"
                className='w-full'
                onChange={handleChangeUserData}
                name="accnt_no"
                label="Account number: (Bank acct / Gcash acct)"
                disabled={!editMode}                
              />
            </FormControl>
            <FormControl className='w-full'>
              <InputLabel htmlFor="emp_salary_basic">Basic Salary Amount: </InputLabel>
              <OutlinedInput
                id="emp_salary_basic"
                className='w-full'
                onChange={handleChangeUserData}
                name="emp_salary_basic"
                label="Basic Salary Amount:"
                inputProps={{
                  min:0,
                  type:"number"
                }}
                disabled={!editMode}                
              />
            </FormControl>
            <FormControl className='w-full'>
              <InputLabel htmlFor="salary_type">Salary Type</InputLabel>
              <Select
                  onChange={(e:any) => setEmployeeData(curr => ({
                    ...curr,
                    emp_salary_type: e.target.value
                  }))}
                  placeholder="Select Salary Type"
                  name="emp_salary_type"
                  variant="outlined"
                  label="Salary Type"
              >
                  <MenuItem value="1">Monthly</MenuItem>
                  <MenuItem value="2">Semi-Monthly</MenuItem>
                  <MenuItem value="3">Project-Based</MenuItem>
                  <MenuItem value="4">Weekly</MenuItem>
              </Select>
            </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <FormControl className='w-full'>
              <InputLabel htmlFor="payroll_group">Payroll Group</InputLabel>
              <Select
                  onChange={(e:any) => setEmployeeData(curr => ({...curr, payroll_group_code: e.target.value}))}
                  placeholder="Select Payroll Group"
                  name="payroll_group_code"
                  variant="outlined"
                  label="Payroll Group"
                >
                  {
                    dropDownData.payrollGroups.length > 0 ? dropDownData.payrollGroups.map((payroll:any) => (
                      <MenuItem value={payroll.id}>{payroll.name}</MenuItem>
                    ))
                    : <MenuItem disabled>No payrolls available</MenuItem>
                  }
              </Select>
            </FormControl>
            <FormControl className='w-full'>

            {/* <Autocomplete
              // disableCloseOnSelect
              noOptionsText={'Loading... Please Wait.'}
              options={branches}
              // groupBy={(option:any) => option.name}
              getOptionLabel={(option:any) => option.name}
              // onChange={(event, value) => setEmployeeData({ ...employeeData, branch_code: value?.id })}
              // sx={{ width: 300 }}
              // isOptionEqualToValue={isOptionEqualToValue}
              renderInput={(params) => 
                  {   
                      return(
                        <OutlinedInput
                          {...params} label="Branch" 
                        />
                      )

                  }

              }
            /> */}
                <InputLabel htmlFor="branch">Branch</InputLabel>
                <Select
                  onChange={(e:any) => setEmployeeData(curr => ({
                    ...curr,
                    branch_code: e.target.value
                  }))}
                  placeholder="Select Branch"
                  name="branch_code"
                  variant="outlined"
                  label="Branch"
                >
                  {dropDownData.branches.length > 0 ? dropDownData.branches.map((branch:any)=> (
                    <MenuItem value={branch.id}>{branch.name}</MenuItem>
                  )): (
                    <MenuItem disabled>No branch available</MenuItem>
                  )}
                </Select>
            </FormControl>
            <FormControl className='w-full'>
              <InputLabel htmlFor="department">Department</InputLabel>
              <Select
                onChange={(e:any) => 
                  {
                    
                    fetchApprovers(e.target.value)
                    setEmployeeData(curr => 
                    (
                      {
                        ...curr,
                        department_code: e.target.value
                      }
                    )
                  )}
                }
                placeholder="Select Department"
                name="department_code"
                variant="outlined"
                label="Department"
              >
                {dropDownData.departments.length > 0 ? dropDownData.departments.map((department:any)=> (
                  <MenuItem value={department.id}>{department.name}</MenuItem>
                )): (
                  <MenuItem disabled>No department available</MenuItem>
                )}
              </Select>
            </FormControl>
        </div>

        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <InputLabel htmlFor="hmo">HMO Account #:</InputLabel>
            <OutlinedInput
              id="hmo"
              className='w-full'
              onChange={handleChangeUserData}
              name="hmo"
              label="HMO Account #:"
              disabled={!editMode}
              type='text'                
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="payroll_no">Payroll #:</InputLabel>
            <OutlinedInput
              id="payroll_no"
              className='w-full'
              onChange={handleChangeUserData}
              name="payroll_no"
              label="Payroll #:"
              disabled={!editMode}
              type='text'                
            />
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="employee_type">Employee Type</InputLabel>
            <Select
                onChange={(e:any) => setEmployeeData(curr => ({...curr, employee_type: e.target.value}))}
                placeholder="Select Employee Type"
                name="employee_type"
                variant="outlined"
                label="Employee Type:"
              >
                <MenuItem value="Compressed">Compressed</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                {/* <MenuItem value="Field-Auto">Field-Auto</MenuItem> */}
                <MenuItem value="Field">Field</MenuItem>
            </Select>
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="employment_status">Employment Status</InputLabel>
            <Select
                onChange={(e:any) => setEmployeeData(curr => ({...curr, employment_status: e.target.value}))}
                placeholder="Select Employment Status"
                name="employment_status"
                variant="outlined"
                label="Employment status"
              >
                {dropDownData.employmentStatuses.map((employmentStatus:any) => (
                  <MenuItem value={employmentStatus.id}>{employmentStatus.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
            <InputLabel htmlFor="odr">Other Duty Responsibilities:</InputLabel>
            <OutlinedInput
              id="odr"
              className='w-full'
              onChange={handleChangeUserData}
              name="other_duties_responsibilities"
              label="Other Duty Responsibilities:"
              disabled={!editMode}
              type='text'                />
            {/* {errors.other_duties_responsibilities && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Other Duty Responsibilities is required.</sub>} */}
          </FormControl>

          <FormControl className='w-full'>
              <InputLabel htmlFor="od">Other Deductible:</InputLabel>
              <OutlinedInput
                id="od"
                className='w-full'
                onChange={handleChangeUserData}
                name="other_deductible"
                label="Other Deductible (optional):"
                disabled={!editMode}
                inputProps={{
                  min:"0",
                  step:"0.01" ,
                  type:'number'
                }}
              />
            </FormControl>
        </div>
        <Typography
            variant="small"
            color="gray"
            className="mb-4 font-medium italic"
        >
        </Typography>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
            <FormControl className='w-full'>
              <InputLabel htmlFor="approver1">Approver #1: (required)</InputLabel>
              <Select
                onChange={(e:any) => setEmployeeData(curr => ({
                  ...curr,
                  approver1: e.target.value
                }))}
                placeholder="Select Approver 1"
                name="approver1"
                variant="outlined"
                label="Approver #1 (required, employee number)"
                aria-required
              >
                {dropDownData.approvers.length > 0 ? dropDownData.approvers.map((approver:any)=> (
                  // ![employeeData.approver1, employeeData.approver2].includes(approver.emp_no) && <MenuItem value={approver.emp_no}>{approver.full_name}</MenuItem>
                  <MenuItem value={approver.emp_no}>{approver.full_name}</MenuItem>
                  )): (
                  <MenuItem disabled>No Approvers available on the selected department</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl className='w-full'>
              <InputLabel htmlFor="approver2">Approver #2: (required)</InputLabel>
              <Select
                onChange={(e:any) => setEmployeeData(curr => ({
                  ...curr,
                  approver2: e.target.value
                }))}
                placeholder="Select Approver 2"
                name="approver2"
                variant="outlined"
                label="Approver #2 (required, employee number)"
                aria-required
              >
                {dropDownData.approvers.length > 0 ? dropDownData.approvers.map((approver:any)=> 
                  (
                    // ![employeeData.approver1, employeeData.approver2].includes(approver.emp_no) && <MenuItem value={approver.emp_no}>{approver.full_name}</MenuItem>
                    <MenuItem value={approver.emp_no}>{approver.full_name}</MenuItem>
                  )): (
                  <MenuItem disabled>No Approvers available on the selected department</MenuItem>
                  )
                }
              </Select>
            </FormControl>
        </div> 
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
              <InputLabel htmlFor="position">Position: (required)</InputLabel>
              <Select
                onChange={(e:any) => setEmployeeData(curr => ({
                  ...curr,
                  position_code: e.target.value
                }))}
                placeholder="Select Position"
                name="position_code"
                variant="outlined"
                label="Position: (required)"
              >
                {dropDownData.positions.length > 0 ? dropDownData.positions.map((pos:any)=> (
                  <MenuItem value={pos.id}>{pos.name}</MenuItem>
                )): (
                  <MenuItem disabled>No positions available</MenuItem>
                )}
            </Select>
          </FormControl>
          <FormControl className='w-full'>
            <InputLabel htmlFor="insurance_life">Insurance Life: (optional)</InputLabel>
            <OutlinedInput
              id="insurance_life"
              className='w-full'
              onChange={handleChangeUserData}
              name="insurance_life"
              inputProps={{
                step:"0.01",
                min:"0",
              }}
              label="Insurance Life: (optional)"
              type="number"
              disabled={!editMode}                
            />
          </FormControl>
        </div>
        <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6 xl:gap-4">
          <FormControl className='w-full'>
              <InputLabel htmlFor="ecola">Ecola:</InputLabel>
              <OutlinedInput
                id="ecola"
                className='w-full'
                onChange={handleChangeUserData}
                name="ecola"
                label="Ecola: (optional)"
                type="number"
                inputProps={{
                  step:"0.01",
                  min:"0"
                }}
                disabled={!editMode}                
              />
          </FormControl>
        </div> 
        
        <Button variant="contained" color="primary" type="submit">
            Submit
        </Button>
    </form>
  );
};