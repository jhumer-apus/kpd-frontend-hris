import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { APILink } from '@/store/configureStore';
import axios from 'axios';
import { getDefaultLibFileName } from 'typescript';

interface Props {

}
export default function BirthdayAnniversary(props: Props) {

    const [activeTab, setActiveTab] = useState<string>('birthday');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([
        {
            label: "Birthday",
            value: "birthday",
            listOfEmployees: []
        },
        {
            label: "Anniversary",
            value: "anniversary",
            listOfEmployees: []
        }
    ])

    useEffect(() => {

        switch(activeTab) {

            case 'birthday':
                fetchEmployeeBirthday()
                break;

            case 'anniversary':
                fetchEmployeeAnniversary()
                break;

            default:
                break;
        }

    }, [activeTab])

    const fetchEmployeeBirthday = async() => {

        setIsLoading(true)

        await axios.get(`${APILink}birthdays`).then(res => {
            const resData = Array.isArray(res.data)? res.data: []

            const newData = [...data]
            newData[0].listOfEmployees = [...resData]

            setData((curr:any) => newData)
            setIsLoading(false)

        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    const fetchEmployeeAnniversary = async() => {

        setIsLoading(true)

        await axios.get(`${APILink}anniversary`).then(res => {

            const resData = Array.isArray(res.data)? res.data: []

            const newData = [...data]
            newData[1].listOfEmployees = [...resData]

            setData((curr:any) => newData)
            setIsLoading(false)

        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setActiveTab(newValue);
    // };

    // const data = [
    //     {
    //         label: "Birthday",
    //         value: "birthday",
    //         listOfEmployees: [
    //             {
    //                 name: "Juan"
    //             },
    //             {
    //                 name: "Justine"
    //             }
    //         ]
    //     },
    //     {
    //         label: "Anniversary",
    //         value: "anniversary",
    //         listOfEmployees: [
    //             {
    //                 name: "Rolok"
    //             },
    //             {
    //                 name: "Rastine"
    //             }
    //         ]
    //     }
    // ]

    return (
        <Tabs value={activeTab}>
            <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
            >
                {data.map(({ label, value}) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-gray-900" : ""}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, listOfEmployees }:any) => (
                    <TabPanel key={value} value={value}>
                        {listOfEmployees.length > 0? 
                            <ul className='overflow-auto h-[1000px]'>
                                {listOfEmployees.map((emp:any) => (
                                    <li className='border-b border-black p-2'>{emp.full_name}</li>
                                ))}
                            </ul>:
                            <p>{isLoading?'Loading Data...': 'No Employees'}</p>
                        }
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    )
    // return (
    //     <TabContext value={currentTab}>
    //         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //             <TabList onChange={handleChange} aria-label="lab API tabs example">
    //             <Tab label="Item One" value={1} />
    //             <Tab label="Item Two" value={2} />
    //             <Tab label="Item Three" value={3} />
    //             </TabList>
    //         </Box>
    //         <TabPanel value="1">Item One</TabPanel>
    //         <TabPanel value="2">Item Two</TabPanel>
    //         <TabPanel value="3">Item Three</TabPanel>
    //     </TabContext>
    // )
}