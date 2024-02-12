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

  const apiUrl = 'https://mercovsk1.pythonanywhere.com/api/v1/'; // Replace with your actual API endpoint

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
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6"> 
                <img
                  src={getImageSrc()}
                  alt=" "
                  className="border rounded p-2"
                  style={{ maxWidth: '150px', maxHeight: '110px' }} 
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1" style={{ display: 'inline-block', maxWidth: '150px', whiteSpace: 'nowrap' }}>
                    {`${curr_user?.first_name }`} {`${curr_user?.last_name }`}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  ></Typography>
                </div>
              </div>
              <div className="w-full flex justify-center" style={{ paddingLeft: '30rem', position: 'fixed', top: '380px', left: '250px', width: '100%' }}>
                <div className="w-96" style={{ width: '700px' }}>
                  <Tabs value={activeTab}>
                    <TabsHeader>
                      <Tab value="personal" onClick={() => handleTabClick('personal')} className="flex items-center">
                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" style={{ width: '100px' }} />
                        Personal
                      </Tab>
                      <Tab value="static_info" onClick={() => handleTabClick('static_info')} className="flex items-center">
                        <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" style={{ width: '100px' }} />
                        Static Info
                      </Tab>
                      <Tab value="employment" onClick={() => handleTabClick('employment')} className="flex items-center">
                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" style={{ width: '100px' }} />
                        Employment
                      </Tab>  
                    </TabsHeader>
                  </Tabs>
                </div>
              </div>



            </div>
            {activeTab === 'personal' && (
              <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3" style={{ marginTop: '-30px',  marginBottom: '80px' }}>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Firstname" variant="outlined" style={{ width: '100%', top: '15px' }} value={curr_user?.first_name || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Suffix" variant="outlined" style={{ width: '100%', top: '30px' }} value={curr_user?.suffix || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Civil Status" variant="outlined" style={{ width: '100%', top: '45px' }} value={curr_user?.civil_status || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Present Address" variant="outlined" style={{ width: '100%', top: '60px' }} value={curr_user?.address || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField id="outlined-basic" label="Middlename" variant="outlined" style={{ width: '100%', top: '15px'}} value={curr_user?.middle_name || '-'} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Birthday" variant="outlined" style={{ width: '100%', top: '30px' }} value={curr_user?.birthday || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Gender" variant="outlined" style={{ width: '100%', top: '45px' }} value={curr_user?.gender || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Provincial Address" variant="outlined" style={{ width: '100%', top: '60px' }} value={curr_user?.provincial_address || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField id="outlined-basic" label="Lastname" variant="outlined" style={{ width: '100%', top: '15px'}} value={curr_user?.last_name || '-'} InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Birthplace" variant="outlined" style={{ width: '100%', top: '30px' }} value={curr_user?.birth_place || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    <TextField  id="outlined-basic" label="Mobile phone" variant="outlined" style={{ width: '100%', top: '45px' }} value={curr_user?.mobile_phone || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
                  </Typography>
                </div>
              </div>
            )}
              {activeTab === 'static_info' && (
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3" style={{ marginTop: '-30px',  marginBottom: '50px' }}>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                <TextField  id="outlined-basic" label="Biometric ID" variant="outlined" style={{ width: '100%', top: '15px' }} value={curr_user?.bio_id || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                <TextField  id="outlined-basic" label="Date Added" variant="outlined" style={{ width: '100%', top: '30px' }} value={curr_user?.date_added || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                <TextField  id="outlined-basic" label="Email Address" variant="outlined" style={{ width: '100%', top: '15px' }} value={curr_user?.email_address || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                <TextField  id="outlined-basic" label="Date Deactivated" variant="outlined" style={{ width: '100%', top: '30px' }} value={curr_user?.date_deleted || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                <TextField  id="outlined-basic" label="Employee ID" variant="outlined" style={{ width: '100%', top: '15px' }} value={curr_user?.emp_no || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
              </Typography>
            </div>
              </div>
            )}
            {activeTab === 'employment' && (
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3" style={{ marginTop: '-30px',  marginBottom: '80px' }}>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Date Hired" variant="outlined" style={{ width: '100%', top: '15px' }} value={curr_user?.date_hired || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Branch Code" variant="outlined" style={{ width: '100%', top: '30px' }} value={curr_user?.branch_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Position Code" variant="outlined" style={{ width: '100%', top: '45px' }} value={curr_user?.position_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Account Number" variant="outlined" style={{ width: '100%', top: '60px' }} value={curr_user?.accnt_no || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Date Resigned" variant="outlined" style={{ width: '100%', top: '15px' }} value={curr_user?.date_resigned || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Department Code" variant="outlined" style={{ width: '100%', top: '30px' }} value={curr_user?.department_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Ranked Code" variant="outlined" style={{ width: '100%', top: '45px' }} value={curr_user?.rank_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Basic Salary Amount" variant="outlined" style={{ width: '100%', top: '60px' }} value={curr_user?.emp_salary_basic || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="City Code" variant="outlined" style={{ width: '100%', top: '15px' }} value={curr_user?.city_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Division Code" variant="outlined" style={{ width: '100%', top: '30px' }} value={curr_user?.division_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Payphone Group Code" variant="outlined" style={{ width: '100%', top: '45px' }} value={curr_user?.payroll_group_code || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <TextField  id="outlined-basic" label="Salary Type" variant="outlined" style={{ width: '100%', top: '60px' }} value={curr_user?.emp_salary_type || '-'  } InputLabelProps={{ style: { fontWeight: 'bold' }}}  />
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