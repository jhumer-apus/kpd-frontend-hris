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
  const [activeTab, setActiveTab] = useState('app');
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

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
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
               <input type="text" placeholder="FIRSTNAME" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               SUFFIX
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="SUFFIX" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               CIVIL STATUS
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="CIVIL STATUS" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               APPROVER
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="APPROVER" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               MIDDLENAME
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="MIDDLENAME" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               BIRTHDAY
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="BIRTHDAY" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               GENDER
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="GENDER" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               PRESENT ADDRESS
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="PRESENT ADDRESS" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
            <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
               LASTNAME
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="LASTNAME" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               BIRTHPLACE
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="BIRTHPLACE" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               MOBILE PHONE
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="MOBILE PHONE" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               PROVINCIAL ADDRESS
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="PROVINCIAL ADDRESS" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
          </div>
            )}
          {activeTab === 'static_info' && (
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Database ID
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Database_ID" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Username
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Username" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Account Active
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Account Active" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Biometric ID
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Biometric ID" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Role Number
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Role Number" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Email Address
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Email Address" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              
            </div>
            <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
               Emp ID
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Emp ID" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Account Superuser
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Account Superuser" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Account Lock Status
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Account_Lock_Status" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Date Added
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Date_Added" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Date Password Change
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Date_Password_Change" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Last Login 
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Last_Login" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Date Deactivated
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Date_Deactivated" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
              Old Password"
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Old_Password" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
              Failed Login Attempts
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Failed_Login_Attempts" className="border rounded p-2" disabled="disabled"/>
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
               <input type="text" placeholder="Date Hired" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Branch Code
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Branch Code" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Position Code
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Position Code" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Account Number
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Account Number" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Date Resigned
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Date Resigned" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Department Code
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Department Code" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Ranked Code
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Ranked Code" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Basic Salary Amount
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Basic Salary Amount" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
            <div>
            <Typography variant="h6" color="blue-gray" className="mb-3">
               City Code
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="City Code" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Division Code
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Division Code" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Payphone Group Code
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Payphone Group Code" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-3">
               Salary Type
               <div className="flex flex-col gap-12">
               <input type="text" placeholder="Salary Type" className="border rounded p-2" disabled="disabled"/>
               </div>
              </Typography>
            </div>
          </div>
            )}
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;