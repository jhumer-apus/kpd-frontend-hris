import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  // Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { Typography } from "@mui/material";
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
import  TextField  from '@mui/material';


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



// const apiUrl = 'https://mercovsk1.pythonanywhere.com/api/v1/';

// interface ProfileProps {
//   userId: string;
// }


// export const Profile = ({ userId }:ProfileProps) => {
//   const [userData, setUserData] = useState(null);
//     const [activeTab, setActiveTab] = useState('personal');
//     const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.birthday);
//     const birthday = curr_user?.birthday;

//     // console.log("user id " + userId);
//   useEffect(() => {
//     async function fetchUserData() {
//       try {
//         const response = await axios.get(`${apiUrl}/${userId}`).then(response => {
//           setUserData(curr => response.data);
//         });
//         // setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error.message);
//       }
//     }

//     // fetchUserData();
//   }, [userId]);




  
  return (
    <div>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6"> 
              <img
             
            // src={`${APILink.replace('/api/v1', '')}${curr_user?.employee_image }`}  
            // src={`${previewUrl}`}

            src={getImageSrc()}
            
            alt=" "
            className="border rounded p-2"
            style={{ maxWidth: '150px', maxHeight: '110px' }} 
              />
          
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                {`${curr_user?.first_name }`} {`${curr_user?.last_name }`}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >

                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab value="personal" onClick={() => handleTabClick('personal')}>
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Personal
                  </Tab>
                  <Tab value="static_info" onClick={() => handleTabClick('static_info')}>
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Static Info
                  </Tab>
                  <Tab value="employment" onClick={() => handleTabClick('employment')}>
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Employment
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          {activeTab === 'personal' && (
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               FIRSTNAME
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.first_name || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               SUFFIX
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.suffix || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               CIVIL STATUS
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.civil_status || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               PRESENT ADDRESS
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.address || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               MIDDLENAME
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.middle_name || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               BIRTHDAY
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="BIRTHDAY" value={`${curr_user?.birthday || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               GENDER
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.gender || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               PROVINCIAL ADDRESS
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.provincial_address || 'N/a'}`} className="border rounded p-2" disabled={true}  disabled={true} />
               </div>
              </Typography>
            </div>
            <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
               LASTNAME
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.last_name || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               BIRTHPLACE
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.birth_place || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               MOBILE PHONE
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.mobile_phone || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
            </div>
          </div>
            )}
          {activeTab === 'static_info' && (
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div> 
            <Typography variant="h6" color="blue-gray" className="mb-3">
               Biometric ID
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.bio_id || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography> 
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Date Added
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.date_added || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Email Address
               <div className="flex flex-col gap-12">
               <input type="text" defaultValue={`${curr_user?.email_address || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Date Deactivated
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.date_deleted || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
            </div>
            <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
               Emp ID
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.emp_no || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              
              
            </div>

          </div>
            )}
          {activeTab === 'employment' && (
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Date Hired
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.date_hired || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Branch Code
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.branch_code || 'N/a'}`}  className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Position Code
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.position_code || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Account Number
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.accnt_no || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Date Resigned
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.date_resigned || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Department Code
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.department_code || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Ranked Code
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.rank_code || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Basic Salary Amount
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.emp_salary_basic || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
            </div>
            <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
               City Code
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.city_code || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Division Code
               <div className="flex flex-col gap-12">
               <input type="text"  value={`${curr_user?.division_code || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Payphone Group Code
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.payroll_group_code || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Salary Type
               <div className="flex flex-col gap-12">
               <input type="text" value={`${curr_user?.emp_salary_type || 'N/a'}`} className="border rounded p-2" disabled={true}  />
               </div>
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