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
import styles from '@/pages/dashboard/custom-styles/home.module.scss';

//LIBRARIES
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

interface Props {

}
export default function BirthdayAnniversary(props: Props) {

    const [activeTab, setActiveTab] = useState<string>('birthday');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [columns, setColumns] = useState<GridColDef[]>([
        {
            field: 'emp_no',
            headerName: 'Employee No.',
            flex: 1
        },
        {
            field: 'full_name',
            headerName: 'Employee Name',
            flex: 1
        },
    ])
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
        let newColumns = [...columns]
        switch(activeTab) {
            case 'birthday':
                newColumns[2] = {
                    field: 'birthday',
                    headerName: 'Birth Date',
                    valueGetter: (params) => dayjs(params.row.birthday).format('MMMM DD, YYYY'),
                    flex: 1
                }
                setColumns((curr:any) => newColumns);
                fetchEmployeeBirthday()
                break;

            case 'anniversary':
                newColumns[2] = {
                    field: 'date_hired',
                    headerName: 'Date Hired',
                    valueGetter: (params) => dayjs(params.row.date_hired).format('MMMM DD, YYYY'),
                    flex: 1
                }
                setColumns((curr:any) => newColumns);
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

            let newData = [...data]
            newData[0].listOfEmployees = resData.map((emp,index) => {
                return {
                    id:index,
                    ...emp
                }
            })

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

            let newData = [...data]
            newData[1].listOfEmployees = resData.map((emp,index) => {
                return {
                    id:index,
                    ...emp
                }
            })

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
        <Tabs className={styles.announcementBar} value={activeTab}>
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
                        <div className='overflow-auto h-[800px]'>
                            <DataGrid
                                rows={listOfEmployees}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 25,
                                        },
                                    },
                                }}
                                loading={isLoading}
                                localeText={{ noRowsLabel: `No employees celebrated today` }}
                                pageSizeOptions={[5,10,25]}
                            />
                        </div>
                        
                        {/* {listOfEmployees.length > 0? 
                            <ul className='overflow-auto h-[800px]'>
                                {listOfEmployees.map((emp:any) => (
                                    <li className='border-b border-black p-2'>{emp.full_name}</li>
                                ))}
                            </ul>:
                            <p>{isLoading?'Loading Data...': 'No Employees'}</p>
                        } */}
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