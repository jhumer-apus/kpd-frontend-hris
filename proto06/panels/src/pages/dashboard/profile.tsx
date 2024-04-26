  import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Tabs,
    TabsHeader,
    Tab,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
  import { Typography } from "@mui/material";
  import Box from '@mui/material/Box';    
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
  } from "@heroicons/react/24/solid";

  import { Link } from "react-router-dom";
  import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
  import { platformSettingsData, conversationsData, projectsData } from "@/data";
  import { Routes, Route } from "react-router-dom";
  import React, { useState, useEffect } from 'react';
  import TextField from '@mui/material/TextField'; // Import TextField from Material-UI
  import { beautifyJSON } from '@/helpers/utils';

  import axios from 'axios';
  import { useSelector } from "react-redux";
  import { APILink, RootState } from "@/store/configureStore";
  import styled from "@emotion/styled/types/base";

  // import {Select, Option } from "@material-tailwind/react";

  // COMPONENTS
  import ProfileAutocomplete from "./profile-components/ProfileAutocomplete";
  import DatePickerForm from "@/public-components/forms/DatePickerForm";
  import Province from "@/public-components/forms/address/Province";
  import CityMunicipality from "@/public-components/forms/address/CityMunicipality";

  //LIBRARIES
  import FormControl, { useFormControl } from '@mui/material/FormControl';
  import Select, { SelectChangeEvent } from '@mui/material/Select';
  import MenuItem from '@mui/material/MenuItem';
  import InputLabel from '@mui/material/InputLabel';
  import { INTERNAL_USER_ROLE } from "@/types/types-store";
  import dayjs from "dayjs";
  import useGetSpecificProvince from "@/custom-hooks/use-fetch-specific-province";

  const apiUrl = 'https://bitversecorporation.pythonanywhere.com/api/v1/'; // Replace with your actual API endpoint

  // async function getAllUserData() {
  //   try {
  //     const response = await axios.get(`${APILink}`);
  //     const userData = response.data;
  //     return userData;
  //   } catch (error) {
  //     console.error('Error fetching user data:', error.message);
  //     throw error;
  //   }
  // }


  interface DropDownData {
    branches: any[],
    departments: any[],
    payrollGroups: any[],
    employmentStatuses: any[],
    positions: any[]
}

  export function Profile() {
    const [activeTab, setActiveTab] = useState('personal');
    const [isEdit, setIsEdit] =useState<boolean>(false)
    const curr_user = useSelector((state: RootState) => state.auth.employee_detail);
    console.log(curr_user)

    // const [file, setFile] = useState<File | null>(null);
    const [profileImage, setProfileImage] = useState<any>(null);
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false)
    const [address, setAddress] = useState({
      permanent_province: {
        id: '',
        name: '',
        code: ''
      },
      permanent_city: {
        id: '',
        name: '',
        code: ''
      },
      current_province: {
        id: '',
        name: '',
        code: ''
      },
      current_city: {
        id: '',
        name: '',
        code: ''
      }
    })

    // const [codeName, setCodeName] = useState();

    // const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //       const selectedFile = event.target.files ? event.target.files[0] : null;
    //       setFile(selectedFile);
      
    //       if (selectedFile) {
    //         const reader = new FileReader();
    //       reader.onloadend = () => {
    //           setPreviewUrl(reader.result as string);
    //         };
    //         reader.readAsDataURL(selectedFile);
    //       } else {
    //         setPreviewUrl(null);
    //       }
    //   };

    const placeholderImageUrl = 'placeholder_image_url.jpg';
    const [userData, setUserData] = useState<any>(null);

    const [dropDownData, setDropDownData] = useState<DropDownData>({
      branches:[],
      departments:[],
      payrollGroups:[],
      employmentStatuses:[],
      positions:[]
    })

    const [roles, setRoles] = useState([
        {
            id: INTERNAL_USER_ROLE.Developer,
            role_name: "Developer"
        },
        {
            id: INTERNAL_USER_ROLE.HR_Super_Admin,
            role_name: "HR Super Admin"
        },
        {
            id: INTERNAL_USER_ROLE.HR_Director_Manager,
            role_name: "HR Director / Manager"
        },
        {
            id: INTERNAL_USER_ROLE.HR_Staff,
            role_name: "HR Staff"
        },
        {
            id: INTERNAL_USER_ROLE.Manager,
            role_name: "Department Manager / Director"
        },
        {
            id: INTERNAL_USER_ROLE.Employee,
            role_name: "Employee"
        },
      ]
    )

    //HOOKS
    // const {province, status, error} = useGetSpecificProvince(userData?.permanent_province_code)
    // const permanentProvince = useGetSpecificProvince(userData?.permanent_province_code)
    // const currentProvince = useGetSpecificProvince(userData?.current_province_code)

    // useEffect(() => {

    //   setAddress(curr => ({
    //     ...curr,
    //     permanent_province: permanentProvince.province,
    //     current_province: currentProvince.province
    //   }))
    // },[])


    const handleTabClick = (tab:any) => {
      setIsEdit(false)
      setActiveTab(tab);
    };

    // USE EFFECTS

    useEffect(() => {
      fetchBranches()
      fetchPayrollGroups()
      fetchEmploymentStatus()
      fetchPositions()

    }, [])

    // useEffect(() => {
    //   if(address.city?.id && address.province?.id) {
    //     setUserData((curr:any) => ({
    //       ...curr,
    //       province_code: address.province?.id,
    //       city_code: address.city?.id
    //     }))
    //   }
    // },[address])


    useEffect(() => {
      // fetchUserData()
      setUserData((curr:any) => (
        {
          ...curr_user,
          added_by: curr_user?.emp_no
        }
      ))
      // console.log('natrigger')
    }, [curr_user]);

    useEffect(() => {

      if(userData) {

        userData.branch_code && fetchDepartments()

      } else {

        // fetchUserData()
        setUserData((curr:any) => (
          {
            ...curr_user,
            added_by: curr_user?.emp_no
          }

        ))
      }

    },[userData])

    const rollBackData = () => {

      setUserData((curr:any) => ({
        ...curr_user,
        added_by: curr_user?.emp_no
      }))

      // setAddress(curr => ({
      //   province:{
      //     id: null,
      //     name:null,
      //     code:null
      //   },
      //   city:{
      //     id:null,
      //     name:null,
      //     code:null
      //   }
      // }))
      // fetchUserData()
      setProfileImage(null);
    }

    // FETCH SELECT DATA
    // const  fetchUserData = () => {
    //   axios.get(`${APILink}employees/${curr_user?.emp_no}`).then(res => {
    //     setUserData((curr:any) => (
    //       {
    //         ...res.data,
    //         added_by: curr_user?.emp_no
    //       }
    //       ))
    //   })
    // }

    const findEmpStatus = () => {
      const foundEmpStatus = dropDownData.employmentStatuses.find((status:any) => status.id == userData.employment_status)
      return foundEmpStatus.name
    }
    const fetchPayrollGroups = () => {
      axios.get(`${APILink}payrollgroup`).then((response:any) => {
          const responsePayrollGroups = response.data.map((payroll:any) => {
          return {
              id: payroll.id.toString(),
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
              id: branch.id.toString(),
              name: branch.branch_name
          }
          })
          setDropDownData((curr:any) => ({...curr, branches: responseBranches}));
        })
      }
  
    const fetchDepartments = () => {

    axios.get(`${APILink}department/`).then((response:any) => {
        
        const responseDepartments = response.data.filter((obj:any) => obj.dept_branch_code == userData?.branch_code).map((department:any) => {
        return {
            id: department.id.toString(),
            name: department.dept_name
        }
        })
            setDropDownData((curr:any) => ({...curr, departments: responseDepartments}));
        })
      }
  
    const fetchEmploymentStatus = () => {
      axios.get(`${APILink}emp_status_type/`).then((response:any) => {
          const responseEmploymentStatuses = response.data.map((employmentStatus:any) => {
          return {
              id: employmentStatus.id.toString(),
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
              id: position.id.toString(),
              name: position.pos_name
          }
          })

          setDropDownData((curr:any) => ({...curr, positions: responsePositions}));
      })
    }

    const handleInputChange = (e:any) => {
      const { name, value } = e.target;
      setUserData((curr:any) => ({
        ...curr,
        [name]: value
      }));
    };

    // const fetchApprovers = () => {
    //   axios.get()
    // }

    const findRole = roles.find(role => role.id == curr_user?.user?.role)
    
    const getImageSrc = () => {

      if (curr_user?.employee_image) {

        return `${APILink.replace('/api/v1', '')}${curr_user.employee_image}`;

      } else {

        return '/img/default.png'; //default image

      }
    };

    const handleSubmitPersonal = (event:any) => {

      event.preventDefault();
      updatePersonalInfo()
    };

    const updateAddress = (name:string, newValue:any) => {

      setAddress((curr:any) => ({
          ...curr,
          [name]: newValue
      }))
    
    }


  const handleProfilePic = (e:any) => {

    const file = e.target.files[0];
    const MAX_FILE_SIZE_MB = 3;

    if (file) {

      if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {

          setUserData((curr:any) => ({...curr, employee_image:file}))

          const reader = new FileReader();
          reader.onload = () => {
            setProfileImage(reader.result);
          };
    
          reader.readAsDataURL(file);

      } else {

        window.alert('Image should be not more than 3MB');

      }
    }
  }

    const updatePersonalInfo = async () => {


      setIsSubmittingRequest(true)
      // console.log(userData.middle_name)
      const formData = new FormData ();

      formData.append('permanent_province_code', address?.permanent_province?.id)
      formData.append('permanent_city_code', address?.permanent_city?.id)
      formData.append('current_province_code', address?.current_province?.id)
      formData.append('current_city_code', address?.current_city?.id)

      const finalUserData = {
        ...userData,
        permanent_province_code: address?.permanent_province?.id,
        permanent_city_code: address?.permanent_city?.id,
        current_province_code: address?.current_province?.id,
        current_city_code: address?.current_city?.id
      }
      
      for(const key in finalUserData) {

        switch(key) {

          case "employee_image":

            const isFile = finalUserData.employee_image instanceof File

            if(isFile) {

              formData.append('employee_image', finalUserData.employee_image)

            } else {

              formData.append('employee_image', '')
            }

            break;

          default:

            formData.append(key, finalUserData[key])

            break;
        }

      }

      formData.append('added_by', curr_user?.emp_no)

      await axios.put(`${APILink}update_personal_profile/${finalUserData.emp_no}/`, formData).then(res => {

        setIsSubmittingRequest(false)
        setIsEdit(false)
        window.alert("Update personal information successful")

      }).catch(err => {

        setIsSubmittingRequest(false)
        setIsEdit(false)
        console.log(err)
        window.alert(`Error: ${beautifyJSON(err.response?.data)}`);

      });
    }

    const civilStatusOptions = [
      {
        id: "S",
        name: "Single"
      },
      {
        id: "M",
        name: "Married"
      },
      {
        id: "W",
        name: "Widowed"
      },
      {
        id: "A",
        name: "Anull"
      },
    ]

    const sexOptions = [
      {
        id: "M",
        name: "Male"
      },
      {
        id: "F",
        name: "Female"
      }
    ]

    const salaryTypes = [
      {
        id:"1",
        name:"Monthly"
      },
      {
        id:"2",
        name:"Semi-Monthly"
      },
      {
        id:"3",
        name:"Project-Based"
      },
      {
        id:"4",
        name:"Weekly"
      }
    ]

    return (
      <div>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover bg-center">
          <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6 flex-wrap md:items-center md:justify-between md:gap-6">
                <div className="flex md:flex-row flex-col items-center gap-6">
                  <div className="h-fit relative w-28">
                        <img
                          src={profileImage ?? getImageSrc()}
                          alt="Profile Picture"
                          className="border rounded p-2 w-48 my-4"
                        />
                        {isEdit && (
                          <div className="absolute inset-0 flex flex-wrap items-center justify-center">
                            <label
                              htmlFor="uploadImage"
                              className={`block text-center text-white p-2 rounded-md ${
                                !isSubmittingRequest ? 'bg-blue-600 cursor-pointer' : 'bg-gray-500'
                              }`}
                              style={{ zIndex: 1 ,opacity:0 }} // Ensure the label is on top of the image
                            >
                              Edit Photo
                            </label>
                            <input
                              id="uploadImage"
                              type="file"
                              className="hidden"
                              onChange={handleProfilePic}
                              accept="image/jpeg, image/jpg, image/png, image/webp"
                              disabled={!isEdit || isSubmittingRequest}
                            />
                          </div>
                        )}
                    </div>

                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1 md:whitespace-nowrap">
                    {`${curr_user?.first_name }`} {`${curr_user?.middle_name }`} {`${curr_user?.last_name }`} {`${curr_user?.suffix}`}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  ></Typography>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="w-full" style={{ maxWidth: '500px', width: '100%' }}>
                  <Tabs value={activeTab}>
                    <TabsHeader className='flex md:flex-row flex-col'>
                      <Tab value="personal" onClick={() => handleTabClick('personal')} className="flex items-center">
                        <div className="w-full flex items-center">
                          <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                          <span>Personal</span>
                        </div>
                      </Tab>
                      <Tab value="static_info" onClick={() => handleTabClick('static_info')} className="flex items-center">
                        <div className="w-full flex items-center">
                          <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                          <span>Account</span>
                        </div>
                      </Tab>
                      <Tab value="employment" onClick={() => handleTabClick('employment')} className="flex items-center">
                        <div className="w-full flex items-center">
                          <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                          <span>Employment</span>
                        </div>
                      </Tab>  
                    </TabsHeader>
                  </Tabs>
                </div>
              </div>
            </div>

            {activeTab === 'personal' && userData && (
              <form onSubmit={handleSubmitPersonal}>
                <div className="" style={{ marginTop: '-10px', marginBottom: '20px', position: 'relative' }}>
                  <div className="mb-10">
                    <Typography
                      variant="h5"
                      className="font-normal text-blue-gray-600"
                    >
                      {!isEdit? 'View Mode': 'Edit Mode'}
                    </Typography>
                  </div>
                  <div className="md:flex md:space-x-4 mb-2">
                    <TextField 
                      onChange={handleInputChange} 
                      InputProps={{
                        readOnly: !isEdit || isSubmittingRequest,
                      }}
                      id="Firstname" 
                      name="first_name" 
                      label="Firstname" 
                      variant="outlined" 
                      style={{marginBottom:"20px"}} 
                      className="w-full" 
                      value={userData.first_name} 
                      InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                    />


                    <TextField 
                      onChange={handleInputChange} 
                      InputProps={{
                        readOnly: !isEdit || isSubmittingRequest,
                      }}
                      id="Middlename" 
                      name="middle_name" 
                      label="Middlename" 
                      variant="outlined" 
                      style={{marginBottom:"20px"}}
                      className="w-full" 
                      value={userData.middle_name }  
                      InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                    />


                    <TextField 
                      onChange={handleInputChange} 
                      InputProps={{
                        readOnly: !isEdit || isSubmittingRequest,
                      }}
                      id="Lastname" 
                      name="last_name" 
                      label="Lastname" 
                      variant="outlined" 
                      style={{marginBottom:"20px"}} 
                      className="w-full" 
                      value={userData.last_name}  
                      InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                    />

                    <TextField 
                      onChange={handleInputChange} 
                      InputProps={{
                        readOnly: !isEdit || isSubmittingRequest,
                      }}
                      id="Suffix" 
                      name="suffix" 
                      label="Suffix" 
                      variant="outlined" 
                      style={{marginBottom:"20px"}}
                      className="w-full" 
                      value={userData.suffix}  
                      InputLabelProps={{ style: { fontWeight: 'bold' }}}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <FormControl className='w-full'>
                      <InputLabel htmlFor="civil_status">Civil Status:</InputLabel>
                      <Select
                        onChange={handleInputChange}
                        value={userData?.civil_status}
                        placeholder="Select Civil Status"
                        name="civil_status"
                        variant="outlined"
                        label="Civil Status:"
                        inputProps={{ readOnly: !isEdit }}
                      >
                        <MenuItem value="S">Single</MenuItem>
                        <MenuItem value="M">Married</MenuItem>
                        <MenuItem value="W">Widowed</MenuItem>
                        <MenuItem value="A">Annulled</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <ProfileAutocomplete
                        id='civil_status'
                        options={civilStatusOptions}
                        label="Civil Status:"
                        setState={setUserData}
                        value={userData?.civil_status}
                        customKey="civil_status"
                        disabled={!isEdit}
                    /> */}
                    <FormControl className='w-full'>
                      <InputLabel htmlFor="blood_type">Blood Type: (optional)</InputLabel>
                      <Select
                        onChange={handleInputChange}
                        value={userData?.blood_type}
                        placeholder="Select Blood Type"
                        name="blood_type"
                        variant="outlined"
                        label="Blood Type: (optional)"
                        inputProps={{ readOnly: !isEdit }}
                      >
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {/* <TextField onChange={handleInputChange} disabled={!isEdit} id="blood_type" name="blood_type" label="Blood Type" variant="outlined" style={{marginBottom:"20px"}} className="w-full" value={userData.blood_type}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                    /> */}
                    <FormControl className='w-full'>
                      <InputLabel htmlFor="sex">Sex:</InputLabel>
                      <Select
                        onChange={handleInputChange}
                        placeholder="Select Sex"
                        name="gender"
                        variant="outlined"
                        label="Sex:"
                        value={userData?.gender}
                        inputProps={{ readOnly: !isEdit }}
                        required
                      >
                        <MenuItem value="M">Male</MenuItem>
                        <MenuItem value="F">Female</MenuItem>
                      </Select>
                    </FormControl>
                    {/* <ProfileAutocomplete
                        id='gender'
                        options={sexOptions}
                        label="Sex:"
                        setState={setUserData}
                        value={userData?.gender}
                        customKey="gender"
                        disabled={!isEdit}
                      /> */}
                  </div>
                    <div className="md:flex md:space-x-4 mb-2">
                        <DatePickerForm 
                          label="Birthday"
                          defaultValue={userData?.birthday}
                          setState={setUserData}
                          customKey="birthday"
                          isReadOnly={!isEdit}
                        />

                      <TextField 
                        onChange={handleInputChange} 
                        InputProps={{
                          readOnly: !isEdit,
                        }}
                        id="Birthplace" 
                        name="birth_place" 
                        label="Birthplace" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }} 
                        value={userData?.birth_place} 
                        InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />

                      <TextField 
                        onChange={handleInputChange} 
                        InputProps={{
                          readOnly: !isEdit,
                        }}
                        id="graduated_school" 
                        name="graduated_school" 
                        label="School Graduated" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }} 
                        value={userData?.graduated_school} 
                        InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />

                    </div>
                    <div className="md:flex md:space-x-4">

                      <TextField 
                        onChange={handleInputChange} 
                        type="tel" 
                        InputProps={{
                          readOnly: !isEdit,
                          inputProps:{
                            maxLength:11,
                            minLength:11,
                            pattern: '^[0-9]+$'
                          }  
                        }}  
                        id="mobile_phone" 
                        name="mobile_phone" 
                        label="Mobile Phone" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }} 
                        value={userData.mobile_phone} 
                        InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />

                      <TextField 
                        onChange={handleInputChange} 
                        type="tel" 
                        InputProps={{
                          readOnly: !isEdit,
                          inputProps:{
                            maxLength:15,
                            minLength:11,
                            pattern: '^[0-9]+$'
                          } 
                        }}
                        id="telephone" 
                        name="telephone" 
                        label="Telephone" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }} 
                        value={userData.telephone} 
                        InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />

                      <TextField 
                        onChange={handleInputChange} 
                        type="email" 
                        InputProps={{
                          readOnly: !isEdit,
                        }}
                        id="Email Address" 
                        name="email_address" 
                        label="Email Address" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }} 
                        value={userData.email_address}  
                        InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />

                    </div>
                    
                    <hr></hr>
                    <div className="mb-6">
                      <div className="mb-2">
                        <Typography variant="subtitle1" color="gray" className="font-bold text-base">
                          Permanent Address:
                        </Typography>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 mt-4">
                        {/* <TextField onChange={handleInputChange} disabled={!isEdit} id="Present Address" name="present_address" label="Present Address" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} value={userData.present_address} InputLabelProps={{ style: { fontWeight: 'bold' }}}  /> */}

                        {/* <TextField onChange={handleInputChange} disabled={!isEdit} id="Provincial Address" name="provincial_address" label="Provincial Address" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} value={userData.provincial_address}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  /> */}
                        <Province 
                          updateAddress={updateAddress}
                          defaultProvinceId={userData.permanent_province_code}
                          name="permanent_province"
                          isReadOnly={!isEdit}
                        />
                        <CityMunicipality 
                          currentProvinceCode={address?.permanent_province?.code}
                          updateAddress={updateAddress}
                          defaultCityId={userData.permanent_city_code}
                          name="permanent_city"
                          isReadOnly={!isEdit}
                        />

                        <TextField 
                          type="text" 
                          onChange={handleInputChange} 
                          InputProps={{
                            readOnly: !isEdit,
                          }}
                          id="permanent_address" 
                          name="permanent_address" 
                          label="Permanent Street Address" 
                          variant="outlined" 
                          style={{ width: '100%'}} value={userData.permanent_address}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="mb-2">
                        <Typography variant="subtitle1" color="gray" className="font-bold text-base">
                          Current Address:
                        </Typography>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 mt-4">
                        {/* <TextField onChange={handleInputChange} disabled={!isEdit} id="Present Address" name="present_address" label="Present Address" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} value={userData.present_address} InputLabelProps={{ style: { fontWeight: 'bold' }}}  /> */}

                        {/* <TextField onChange={handleInputChange} disabled={!isEdit} id="Provincial Address" name="provincial_address" label="Provincial Address" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} value={userData.provincial_address}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  /> */}
                        <Province 
                          updateAddress={updateAddress}
                          defaultProvinceId={userData.current_province_code}
                          name="current_province"
                          isReadOnly={!isEdit}
                        />
                        <CityMunicipality 
                          currentProvinceCode={address?.current_province?.code}
                          updateAddress={updateAddress}
                          defaultCityId={userData.current_city_code}
                          name="current_city"
                          isReadOnly={!isEdit}
                        />

                        <TextField 
                          type="text" 
                          onChange={handleInputChange} 
                          InputProps={{
                            readOnly: !isEdit,
                          }}
                          id="current_address" 
                          name="current_address" 
                          label="Current Street Address" 
                          variant="outlined" 
                          style={{ width: '100%'}} value={userData.current_address}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                        />
                      </div>
                    </div>
                    <hr></hr>

                    <div className="md:flex md:space-x-4 my-4">
                      <TextField 
                        type="url" 
                        onChange={handleInputChange} 
                        InputProps={{
                          readOnly: !isEdit,
                        }}
                        id="url_google_map" 
                        name="url_google_map" 
                        label="URL Google Map" 
                        variant="outlined" 
                        style={{ width: '100%'}} value={userData.url_google_map}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />
                    </div>

                    <div className="md:flex md:space-x-4">

                      <TextField 
                        onChange={handleInputChange} 
                        type="text" 
                        InputProps={{
                          readOnly: !isEdit,
                        }}
                        id="profession" 
                        name="profession" 
                        label="Profession" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }} 
                        value={userData.profession} 
                        InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />

                      <TextField 
                        onChange={handleInputChange} 
                        type="text" 
                        InputProps={{
                          readOnly: !isEdit,
                        }} 
                        id="license_no" name="license_no" 
                        label="License No" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }} 
                        value={userData.license_no} 
                        InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />

                    </div>

                    <div className="md:flex md:space-x-4">

                      <TextField 
                        onChange={handleInputChange} 
                        type="text" 
                        InputProps={{
                          readOnly: !isEdit,
                        }} 
                        name="emergency_contact_person" 
                        id="emergency_contact_person" 
                        label="Emergency Contact Person" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }}
                        value={userData.emergency_contact_person} 
                        InputLabelProps={{ style: { fontWeight: 'bold' }}} 
                      />

                      <TextField 
                        onChange={handleInputChange} 
                        type="tel" 
                        InputProps={{
                          readOnly: !isEdit,
                        }}
                        id="emergency_contact_number" 
                        name="emergency_contact_number" 
                        label="Emergency Contact Number" 
                        variant="outlined" 
                        style={{ width: '100%', marginBottom:"20px" }} 
                        value={userData.emergency_contact_number} 
                        InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                      />

                    </div>
                    <div>

                      {isEdit?
                        (
                          <div className="md:flex md:space-x-2">
                            <Button className="w-24" onClick={()=> {
                              setIsEdit(false)
                              rollBackData()
                            }}
                            disabled={isSubmittingRequest}
                            >
                              Cancel
                            </Button>
                            <Button className="w-24" type="submit" disabled={isSubmittingRequest}>
                              Save
                            </Button>
                          </div>
                        ):
                        (
                          <Button className="w-24"  onClick={()=>setIsEdit(true)}>
                          Edit
                          </Button>
                        )

                      }
                  </div>
                </div>
              </form>
              
            )}
           {activeTab === 'static_info' && userData && (
            <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3" style={{ marginTop: '-10px', marginBottom: '20px', position: 'relative' }}>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField            InputProps={{
            readOnly: true,
          }} id="Username" label="Username" variant="outlined" style={{ width: '100%' }} value={curr_user?.user?.username || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}> 
                  <TextField            InputProps={{
            readOnly: true,
          }} id="Account Active" label="Account Active" variant="outlined" style={{ width: '100%' }} value={ curr_user?.user?.is_active   } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField            InputProps={{
            readOnly: true,
          }} id="Last Login" label="Last Login" variant="outlined" style={{ width: '100%' }} value={curr_user?.user?.last_login ? dayjs(curr_user.user?.last_login).format('MMMM DD, YYYY hh:mm a') : '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField            InputProps={{
            readOnly: true,
          }} id="Date Deactivated" label="Date Deactivated" variant="outlined" style={{ width: '100%' }} value={ curr_user?.user?.date_deleted || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                
              </div>     
              <div>

                  <TextField            InputProps={{
            readOnly: true,
          }} id="bio-id" label="Biometric ID" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.bio_id || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


                  <TextField            
                    InputProps={{
                      readOnly: true,
                    }} 
                    id="Role" 
                    label="Role" 
                    variant="outlined" style={
                      { width: '100%', marginBottom: '20px' }} 
                      value={curr_user?.user?.role? findRole?.role_name: '-' } 
                      InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                  />
 

                  <TextField            InputProps={{
            readOnly: true,
          }} id="Email Address" label="Email Address" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.email_address || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
 

                  <TextField            InputProps={{
            readOnly: true,
          }} id="Date Password Changed" label="Date Password Changed" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={ curr_user?.user?.date_password_changed ? new Date (curr_user?.user?.date_password_changed).toLocaleDateString() : '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

              </div>  
              <div>

                  <TextField            InputProps={{
            readOnly: true,
          }} id="Employee Number" label="Employee Number" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.emp_no || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                  <TextField            InputProps={{
            readOnly: true,
          }} id="Bio ID" label="Bio ID" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.bio_id || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                  <TextField            InputProps={{
            readOnly: true,
          }} id="Account Lock Status" label="Account Lock Status" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={ curr_user?.user?.is_locked   } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


                  <TextField            
                    InputProps={{
                      readOnly: true,
                    }} 
                    id="Date Added" 
                    label="Date Added" 
                    variant="outlined" 
                    style={{ width: '100%', marginBottom: '20px' }} 
                    value={ curr_user?.date_added ? new Date (curr_user?.date_added).toLocaleDateString() : '-'  } 
                    InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                  />          
              </div>  
            </div>
          )}

            {activeTab === 'employment' && userData && (
          <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3" style={{ marginTop: '-10px', marginBottom: '20px', position: 'relative' }}>
          <div>


            <DatePickerForm 
              label="Date Hired"
              defaultValue={userData?.date_hired}
              setState={setUserData}
              customKey="date_hired"
              isReadOnly={true}
            />
            <TextField            
              InputProps={{
                readOnly: true,
              }} 
              id="branch_code" 
              label="Branch" 
              variant="outlined" 
              style={{ width: '100%', marginBottom: '20px' }} 
              value={ curr_user?.branch_data?.branch_name?? "" } 
              InputLabelProps={{ style: { fontWeight: 'bold' }}}  
            />   
            {/* {dropDownData.branches.length > 0 && 
              <ProfileAutocomplete
                id='branch_code'
                options={dropDownData.branches}
                label="Branch"
                setState={setUserData}
                value={userData?.branch_code}
                customKey="branch_code"
                disabled={true}
              />
            } */}

            <TextField            
              InputProps={{
                readOnly: true,
              }} 
              id="position_code" 
              label="Position" 
              variant="outlined" 
              style={{ width: '100%', marginBottom: '20px' }} 
              value={ curr_user?.position_data?.pos_name?? "" } 
              InputLabelProps={{ style: { fontWeight: 'bold' }}}  
            />
            {/* {dropDownData.positions.length > 0 && 
              <ProfileAutocomplete
                id='position_code'
                options={dropDownData.positions}
                label="Position"
                setState={setUserData}
                value={userData?.position_code}
                customKey="position_code"
                disabled={true}
              />
            } */}


          <TextField            
            InputProps={{
            readOnly: true,
          }} 
          id="Account Number" label="Account Number" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.accnt_no} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

          <TextField            
            InputProps={{
            readOnly: true,
          }} id="TIN" label="TIN" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.tax_data?.tin_no || ''} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

          <TextField            
            InputProps={{
            readOnly: true,
          }} id="Approver Number 1" label="Approver #1" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.approver1 }  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            
            <TextField            InputProps={{
            readOnly: true,
          }} id="Approver Number 2" label="Approver #2" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.approver2 }  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField            InputProps={{
            readOnly: true,
          }} id="Ecola" label="Ecola" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.ecola}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField            InputProps={{
            readOnly: true,
          }} id="Other Duty Responsibilities" label="Other Duty Responsibilities" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.other_duties_responsibilities }  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

          </div>
          <div>

            <DatePickerForm 
              label="Date Resigned"
              defaultValue={userData?.date_resigned}
              setState={setUserData}
              customKey="date_resigned"
              isReadOnly={true}
            />
            <TextField            
              InputProps={{
                readOnly: true,
              }} 
              id="department_code" 
              label="Department" 
              variant="outlined" 
              style={{ width: '100%', marginBottom: '20px' }} 
              value={ curr_user?.department_data?.dept_name?? "" } 
              InputLabelProps={{ style: { fontWeight: 'bold' }}}  
            />
            {/* {dropDownData.departments.length > 0 ? 
              <ProfileAutocomplete
                id='department_code'
                options={dropDownData.departments}
                label="Departments"
                setState={setUserData}
                value={userData?.department_code}
                customKey="department_code"
                disabled={true}
              /> :
              <ProfileAutocomplete
                id='department_code'
                options={dropDownData.departments}
                label="Departments"
                setState={setUserData}
                value={userData?.department_code}
                customKey="department_code"
                disabled={true}
              />
            } */}

            <TextField           
              InputProps={{
                readOnly: true,
              }} 
              id="Rank" 
              label="Rank" 
              variant="outlined" 
              style={{ width: '100%', marginBottom: '20px' }} 
              value={userData.rank_data.rank_name} 
              InputLabelProps={{ style: { fontWeight: 'bold' }}}  
            />

            <TextField           InputProps={{
            readOnly: true,
          }} id="Employee Type" label="Employee Type" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.employee_type} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField           
              InputProps={{
                readOnly: true,
              }} 
              id="daily_salary" 
              label="Daily Salary" 
              variant="outlined" 
              style={{ width: '100%', marginBottom: '20px' }} 
              value={userData?.emp_salary_basic??""} 
              InputLabelProps={{ style: { fontWeight: 'bold' }}}
            />

            <TextField           InputProps={{
            readOnly: true,
          }} id="Pagibig" label="Pagibig" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.pagibig_data?.pagibig_no?? "-"} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField           InputProps={{
            readOnly: true,
          }} id="hmo" label="HMO" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.hmo?? "-"} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField           InputProps={{
            readOnly: true,
          }} id="Insurance Life" label="Insurance Life" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.insurance_life}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

          </div>
          <div>
            
            <TextField           
              InputProps={{
                readOnly: true,
              }} 
              id="Division" 
              label="Division" 
              variant="outlined" 
              style={{ width: '100%', marginBottom: '20px' }} 
              value={userData.division_data?.div_name??""} 
              InputLabelProps={{ style: { fontWeight: 'bold' }}}  
            />


            <TextField           
              InputProps={{
                readOnly: true,
              }} 
              id="payroll_group_code" 
              label="Payroll Group" 
              variant="outlined" 
              style={{ width: '100%', marginBottom: '20px' }} 
              value={userData.payroll_group_data.name} 
              InputLabelProps={{ style: { fontWeight: 'bold' }}}  
            />
            {/* {dropDownData.payrollGroups.length > 0 && 
              <ProfileAutocomplete
                id='payroll_group_code'
                options={dropDownData.payrollGroups}
                label="Payroll Group"
                setState={setUserData}
                value={userData?.payroll_group_code}
                customKey="payroll_group_code"
                disabled={true}
              />
            } */}

            {/* {dropDownData.payrollGroups.length > 0 && 
                <ProfileAutocomplete
                  id='emp_salary_type'
                  options={salaryTypes}
                  label="Salary Type"
                  setState={setUserData}
                  value={userData?.emp_salary_type}
                  customKey="emp_salary_type"
                  disabled={true}
                />
              } */}

            
            <TextField           InputProps={{
            readOnly: true,
          }} id="Payroll No" label="Payroll No" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.payroll_no} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField           
              InputProps={{
                readOnly: true,
              }}
              id="Employment Status" 
              label="Employment Status" 
              value={findEmpStatus()}
              variant="outlined" 
              style={{ width: '100%', marginBottom: '20px' }} 
              // value={userData.employment_status} 
              InputLabelProps={{ style: { fontWeight: 'bold' }}}  
            />

            <TextField           InputProps={{
            readOnly: true,
          }} id="SSS" label="SSS" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.sss_data?.sss_no?? "-"} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


            <TextField           InputProps={{
            readOnly: true,
          }} id="Philhealth" label="Philhealth" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.philhealth_data?.ph_no?? "-"} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField           InputProps={{
            readOnly: true,
          }} id="Other Deductible" label="Other Deductible" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={userData.other_deductible}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

           

            
          </div>
          </div>
              )}
              
          </CardBody>
        </Card>
      </div>
    );
  }





  // export default Profile;