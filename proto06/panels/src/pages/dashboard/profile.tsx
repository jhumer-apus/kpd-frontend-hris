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

  import {Select, Option } from "@material-tailwind/react";

  // COMPONENTS
  import ProfileAutocomplete from "./profile-components/ProfileAutocomplete";
  import DatePickerForm from "@/public-components/forms/DatePickerForm";

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

    // const [file, setFile] = useState<File | null>(null);
    const [profileImage, setProfileImage] = useState<any>(null);
    const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false)

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
        ...curr_user
      }))
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

  const handleProfilePic = (e:any) => {

    const file = e.target.files[0];
    const MAX_FILE_SIZE_MB = 5;

    if (file) {

      if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {

          setUserData((curr:any) => ({...curr, employee_image:file}))

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

    const updatePersonalInfo = async () => {

      setIsSubmittingRequest(true)
      // console.log(userData.middle_name)
      const formData = new FormData ();
      
      for(const key in userData) {

        switch(key) {

          case "employee_image":

            const isFile = userData.employee_image instanceof File

            if(isFile) {

              formData.append('employee_image', userData.employee_image)

            } else {

              formData.append('employee_image', '')
            }

            break;

          default:

            formData.append(key, userData[key])

            break;
        }

      }
      await axios.put(`${APILink}update_personal_profile/${userData.emp_no}/`, formData).then(res => {

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
      {
        id: "D",
        name: "Divorced"
      }
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
          <div className="mb-10 flex items-center justify-between gap-6 flex-col md:flex-row md:items-center md:justify-between md:gap-6">
                <div className="flex items-center gap-6">
                <div className="h-fit relative">
                      <img
                        src={profileImage ?? getImageSrc()}
                        alt=" "
                        className="border rounded p-2 w-48 my-4"
                      />
                      {isEdit && (
                        <div className="absolute inset-0 flex items-center justify-center">
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
                            accept="image/*"
                            disabled={!isEdit || isSubmittingRequest}
                          />
                        </div>
                      )}
                    </div>

                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1" style={{ whiteSpace: 'nowrap' }}>
                    {`${curr_user?.first_name }`} {`${curr_user?.last_name }`}
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
                    <TabsHeader>
                      <Tab value="personal" onClick={() => handleTabClick('personal')} className="flex items-center">
                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Personal
                      </Tab>
                      <Tab value="static_info" onClick={() => handleTabClick('static_info')} className="flex items-center">
                        <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                        Account
                      </Tab>
                      <Tab value="employment" onClick={() => handleTabClick('employment')} className="flex items-center">
                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Employment
                      </Tab>  
                    </TabsHeader>
                  </Tabs>
                </div>
              </div>
            </div>

            {activeTab === 'personal' && userData && (
              <form onSubmit={handleSubmitPersonal}>
                <div className="" style={{ marginTop: '-10px', marginBottom: '20px', position: 'relative' }}>
                  <div className="md:flex md:space-x-4 mb-2">
                    <TextField onChange={handleInputChange} disabled={!isEdit} id="Firstname" name="first_name" label="Firstname" variant="outlined" style={{marginBottom:"20px"}} 
                    className="w-full" defaultValue={userData.first_name  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


                    <TextField onChange={handleInputChange} disabled={!isEdit} id="Middlename" name="middle_name" label="Middlename" variant="outlined" style={{marginBottom:"20px"}}className="w-full" defaultValue={userData.middle_name }  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


                    <TextField onChange={handleInputChange} disabled={!isEdit} id="Lastname" name="last_name" label="Lastname" variant="outlined" style={{marginBottom:"20px"}} className="w-full" defaultValue={userData.last_name}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                    <TextField onChange={handleInputChange} disabled={!isEdit} id="Suffix" name="suffix" label="Suffix" variant="outlined" style={{marginBottom:"20px"}} className="w-full" defaultValue={userData.suffix  }  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </div>
                  <div className="md:flex md:space-x-4 mb-2">
                    <ProfileAutocomplete
                        id='civil_status'
                        options={civilStatusOptions}
                        label="Civil Status:"
                        setState={setUserData}
                        value={userData?.civil_status}
                        customKey="civil_status"
                        disabled={!isEdit}
                    />
                    <TextField onChange={handleInputChange} disabled={!isEdit} id="blood_type" name="blood_type" label="Blood Type" variant="outlined" style={{marginBottom:"20px"}} className="w-full" defaultValue={userData.blood_type}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  
                    />
                    <ProfileAutocomplete
                        id='gender'
                        options={sexOptions}
                        label="Sex:"
                        setState={setUserData}
                        value={userData?.gender}
                        customKey="gender"
                        disabled={!isEdit}
                      />
                  </div>
                    <div className="md:flex md:space-x-4 mb-2">
                        <DatePickerForm 
                          label="Birthday"
                          defaultValue={userData?.birthday}
                          setState={setUserData}
                          customKey="birthday"
                          disabled={!isEdit}
                        />

                      <TextField onChange={handleInputChange} disabled={!isEdit} id="Birthplace" name="birth_place" label="Birthplace" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData?.birth_place} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                      <TextField onChange={handleInputChange} disabled={!isEdit} id="graduated_school" name="graduated_school" label="School Graduated" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData?.graduated_school} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                    </div>
                    <div className="md:flex md:space-x-4">

                      <TextField onChange={handleInputChange} type="tel" disabled={!isEdit}  id="mobile_phone" name="mobile_phone" label="Mobile Phone" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.mobile_phone} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                      <TextField onChange={handleInputChange} type="tel" disabled={!isEdit}  id="telephone" name="telephone" label="Telephone" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.telephone} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                      <TextField onChange={handleInputChange} type="email" disabled={!isEdit} id="Email Address" name="email_address" label="Email Address" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.email_address}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                    </div>

                    <div className="md:flex md:space-x-4">
                      <TextField onChange={handleInputChange} disabled={!isEdit} id="Present Address" name="present_address" label="Present Address" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.present_address} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                      <TextField onChange={handleInputChange} disabled={!isEdit} id="Provincial Address" name="provincial_address" label="Provincial Address" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.provincial_address}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                      <TextField onChange={handleInputChange} disabled={!isEdit} id="url_google_map" name="url_google_map" label="URL Google Map" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.url_google_map}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                    </div>

                    <div className="md:flex md:space-x-4">

                      <TextField onChange={handleInputChange} type="text" disabled={!isEdit}  id="profession" name="profession" label="Profession" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.profession} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                      <TextField onChange={handleInputChange} type="text" disabled={!isEdit}  id="license_no" name="license_no" label="License No" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.license_no} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                    </div>

                    <div className="md:flex md:space-x-4">

                      <TextField onChange={handleInputChange} type="text" disabled={!isEdit}  name="emergency_contact_person" id="emergency_contact_person" label="Emergency Contact Person" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.emergency_contact_person} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                      <TextField onChange={handleInputChange} type="tel" disabled={!isEdit}  id="emergency_contact_number" name="emergency_contact_number" label="Emergency Contact Number" variant="outlined" style={{ width: '100%', marginBottom:"20px" }} defaultValue={userData.emergency_contact_number} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

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
                  <TextField  disabled id="Username" label="Username" variant="outlined" style={{ width: '100%' }} value={curr_user?.user?.username || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}> 
                  <TextField  disabled id="Account Active" label="Account Active" variant="outlined" style={{ width: '100%' }} value={ curr_user?.user?.is_active   } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  disabled id="Last Login" label="Last Login" variant="outlined" style={{ width: '100%' }} value={curr_user?.user?.last_login ? new Date (curr_user.user?.last_login).toLocaleDateString() : '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  disabled id="Date Deactivated" label="Date Deactivated" variant="outlined" style={{ width: '100%' }} value={ curr_user?.user?.date_deleted || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                
              </div>     
              <div>

                  <TextField  disabled id="bio-id" label="Biometric ID" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.bio_id || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


                  <TextField  disabled id="Role Number" label="Role Number" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.rank_code || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
 

                  <TextField  disabled id="Email Address" label="Email Address" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.email_address || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
 

                  <TextField  disabled id="Date Password Changed" label="Date Password Changed" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={ curr_user?.user?.date_password_changed ? new Date (curr_user?.user?.date_password_changed).toLocaleDateString() : '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

              </div>  
              <div>

                  <TextField  disabled id="Employee Number" label="Employee Number" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.emp_no || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                  <TextField  disabled id="Bio ID" label="Bio ID" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={curr_user?.bio_id || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                  <TextField  disabled id="Account Lock Status" label="Account Lock Status" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={ curr_user?.user?.is_locked   } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


                  <TextField  disabled id="Date Added" label="Date Added" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} value={ curr_user?.date_added ? new Date (curr_user?.date_added).toLocaleDateString() : '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

                
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
              disabled={true}
            />
            {dropDownData.branches.length > 0 && 
              <ProfileAutocomplete
                id='branch_code'
                options={dropDownData.branches}
                label="Branch"
                setState={setUserData}
                value={userData?.branch_code}
                customKey="branch_code"
                disabled={true}
              />
            }


            {dropDownData.positions.length > 0 && 
              <ProfileAutocomplete
                id='position_code'
                options={dropDownData.positions}
                label="Position"
                setState={setUserData}
                value={userData?.position_code}
                customKey="position_code"
                disabled={true}
              />
            }


            <TextField  disabled id="Account Number" label="Account Number" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.accnt_no} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="TIN" label="TIN" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.tax_code} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="Approver Number 1" label="Approver #1" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.approver1 }  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            
            <TextField  disabled id="Approver Number 2" label="Approver #2" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.approver2 }  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="Ecola" label="Ecola" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.ecola}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="Other Duty Responsibilities" label="Other Duty Responsibilities" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.other_duties_responsibilities }  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

          </div>
          <div>

            <DatePickerForm 
              label="Date Resigned"
              defaultValue={userData?.date_resigned}
              setState={setUserData}
              customKey="date_resigned"
              disabled={true}
            />

            {dropDownData.departments.length > 0 ? 
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
            }

            <TextField  disabled id="Rank" label="Rank" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.rank_code} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="Employee Type" label="Employee Type" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.employee_type} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="Basic Salary Amount" label="Basic Salary Amount" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.employee} InputLabelProps={{ style: { fontWeight: 'bold' }}}/>

            <TextField  disabled id="Pagibig" label="Pagibig" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.pagibig_data?.pagibig_no?? "-"} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="hmo" label="HMO" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.hmo?? "-"} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="Insurance Life" label="Insurance Life" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.insurance_life}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

          </div>
          <div>
            
            <TextField  disabled id="Division" label="Division" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.division_code} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


            
            {dropDownData.payrollGroups.length > 0 && 
              <ProfileAutocomplete
                id='payroll_group_code'
                options={dropDownData.payrollGroups}
                label="Payroll Group"
                setState={setUserData}
                value={userData?.payroll_group_code}
                customKey="payroll_group_code"
                disabled={true}
              />
            }

            {dropDownData.payrollGroups.length > 0 && 
                <ProfileAutocomplete
                  id='emp_salary_type'
                  options={salaryTypes}
                  label="Salary Type"
                  setState={setUserData}
                  value={userData?.emp_salary_type}
                  customKey="emp_salary_type"
                  disabled={true}
                />
              }

            
            <TextField  disabled id="Payroll No" label="Payroll No" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.payroll_no} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="Employment Status" label="Employment Status" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.employment_status} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="SSS" label="SSS" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.sss_data?.sss_no?? "-"} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />


            <TextField  disabled id="Philhealth" label="Philhealth" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.philhealth_data?.ph_no?? "-"} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

            <TextField  disabled id="Other Deductible" label="Other Deductible" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} defaultValue={userData.other_deductible}  InputLabelProps={{ style: { fontWeight: 'bold' }}}  />

           

            
          </div>
          </div>
              )}
              
          </CardBody>
        </Card>
      </div>
    );
  }





  // export default Profile;