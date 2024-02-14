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

  import axios from 'axios';
  import { useSelector } from "react-redux";
  import { APILink, RootState } from "@/store/configureStore";
  import styled from "@emotion/styled/types/base";

  const apiUrl = 'https://bitversecorporation.pythonanywhere.com/api/v1/'; // Replace with your actual API endpoint

  async function getAllUserData() {
    try {
      const response = await axios.get(apiUrl);
      const userData = response.data;
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      throw error;
    }
  }
  export function Profile() {
    const [activeTab, setActiveTab] = useState('personal');
    const curr_user = useSelector((state: RootState) => state.auth.employee_detail);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = event.target.files ? event.target.files[0] : null;
          setFile(selectedFile);
      
          if (selectedFile) {
            const reader = new FileReader();
          reader.onloadend = () => {
              setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
          } else {
            setPreviewUrl(null);
          }
      };

    const placeholderImageUrl = 'placeholder_image_url.jpg';
    const [userData, setUserData] = useState(null);
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    useEffect(() => {
      // Fetch user data when the component mounts
      getAllUserData().then((userData) => {
        setUserData(userData);
      });
    }, []);
    const defaultImageSrc = '/img/default.png';
    const getImageSrc = () => {
      if (curr_user?.employee_image) {
        return `${APILink.replace('/api/v1', '')}${curr_user.employee_image}`;
      } else {
        return defaultImageSrc;
      }
    };

    return (
      <div>
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover bg-center">
          <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
          <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6 flex-col md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="flex items-center gap-6">
              <img
                src={getImageSrc()}
                alt=" "
                className="border rounded p-2"
                style={{ maxWidth: '150px', maxHeight: '110px' }} 
              />
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
                        Static Info
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
            {activeTab === 'personal' && (
              <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3" style={{ marginTop: '-10px', marginBottom: '20px', position: 'relative' }}>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Firstname" label="Firstname" variant="outlined" style={{ width: '100%' }} value={curr_user?.first_name || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Suffix" label="Suffix" variant="outlined" style={{ width: '100%' }} value={curr_user?.suffix || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Civil Status" label="Civil Status" variant="outlined" style={{ width: '100%' }} value={curr_user?.civil_status || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Approver Number" label="Approver Number" variant="outlined" style={{ width: '100%' }} value={curr_user?.approver1 || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                </div>
                <div>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Middlename" label="Middlename" variant="outlined" style={{ width: '100%' }} value={curr_user?.middle_name || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Birthday : YYYY-MM-DD" label="Birthday : YYYY-MM-DD" variant="outlined" style={{ width: '100%' }} value={curr_user?.birthday || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Gender" label="Gender" variant="outlined" style={{ width: '100%' }} value={curr_user?.gender || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Present Address" label="Present Address" variant="outlined" style={{ width: '100%' }} value={curr_user?.address || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                </div>
                <div>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Lastname" label="Lastname" variant="outlined" style={{ width: '100%' }} value={curr_user?.last_name || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Birthplace" label="Birthplace" variant="outlined" style={{ width: '100%' }} value={curr_user?.birth_place || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Mobile Phone" label="Mobile Phone" variant="outlined" style={{ width: '100%' }} value={curr_user?.mobile_phone || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Provincial Address" label="Provincial Address" variant="outlined" style={{ width: '100%' }} value={curr_user?.provincial_address || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                </div>
              </div>
            )}
           {activeTab === 'static_info' && (
            <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3" style={{ marginTop: '-10px', marginBottom: '20px', position: 'relative' }}>
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Username" label="Username" variant="outlined" style={{ width: '100%' }} value={curr_user?.user?.username || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}> 
                  <TextField  id="Account Active" label="Account Active" variant="outlined" style={{ width: '100%' }} value={ curr_user?.user?.is_active   } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Last Login" label="Last Login" variant="outlined" style={{ width: '100%' }} value={curr_user?.user?.last_login || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Date Deactivated" label="Date Deactivated" variant="outlined" style={{ width: '100%' }} value={ curr_user?.user?.date_deleted || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                
              </div>     
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="bio-id" label="Biometric ID" variant="outlined" style={{ width: '100%' }} value={curr_user?.bio_id || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Role Number" label="Role Number" variant="outlined" style={{ width: '100%' }} value={curr_user?.rank_code || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Email Address" label="Email Address" variant="outlined" style={{ width: '100%' }} value={curr_user?.email_address || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Date Password Changed" label="Date Password Changed" variant="outlined" style={{ width: '100%' }} value={ curr_user?.user?.date_password_changed || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
              </div>  
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Employee Number" label="Employee Number" variant="outlined" style={{ width: '100%' }} value={curr_user?.emp_no || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
               
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Account Lock Status" label="Account Lock Status" variant="outlined" style={{ width: '100%' }} value={ curr_user?.user?.is_locked   } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
                  <TextField  id="Date Added" label="Date Added" variant="outlined" style={{ width: '100%' }} value={curr_user?.date_added || '-' } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                </Typography>
                
              </div>  
            </div>
          )}

            {activeTab === 'employment' && (
          <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3" style={{ marginTop: '-10px', marginBottom: '20px', position: 'relative' }}>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
             <TextField  id="Date Hired" label="Date Hired" variant="outlined" style={{ width: '100%' }} value={curr_user?.date_hired || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Branch" label="Branch" variant="outlined" style={{ width: '100%' }} value={curr_user?.branch_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Position" label="Position" variant="outlined" style={{ width: '100%' }} value={curr_user?.position_code ||'-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Account Number" label="Account Number" variant="outlined" style={{ width: '100%' }} value={curr_user?.accnt_no || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="TIN" label="TIN" variant="outlined" style={{ width: '100%' }} value={curr_user?.tax_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Philhealth" label="Philhealth" variant="outlined" style={{ width: '100%' }} value={curr_user?.philhealth_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Date Resigned" label="Date Resigned" variant="outlined" style={{ width: '100%' }} value={curr_user?.date_resigned ||'-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Department" label="Department" variant="outlined" style={{ width: '100%' }} value={curr_user?.department_code ||'-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Ranked" label="Ranked" variant="outlined" style={{ width: '100%' }} value={curr_user?.rank_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Basic Salary Amount" label="Basic Salary Amount" variant="outlined" style={{ width: '100%' }} value={curr_user?.emp_salary_basic ||'-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Pagibig" label="Pagibig" variant="outlined" style={{ width: '100%' }} value={curr_user?.pagibig_code ||'-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
          </div>
          <div>
            
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Division" label="Division" variant="outlined" style={{ width: '100%' }} value={curr_user?.division_code ||'-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Payroll Group" label="Payroll Group" variant="outlined" style={{ width: '100%' }} value={curr_user?.payroll_group_code ||'-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="Salary Type" label="Salary Type" variant="outlined" style={{ width: '100%' }} value={curr_user?.emp_salary_type || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3" style={{ marginBottom: '20px' }}>
            <TextField  id="SSS" label="SSS" variant="outlined" style={{ width: '100%' }} value={curr_user?.sssid_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
          </div>
          </div>
              )}
              
          </CardBody>
        </Card>
      </div>
    );
  }




  // export default Profile;