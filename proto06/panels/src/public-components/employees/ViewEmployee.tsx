import { Button, Modal, Tab, Tabs, Typography } from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { HandleAlertAction } from "@/store/actions/components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axiosInstance from "@/helpers/axiosConfig";

import StaticInfo from "./information/StaticInfo";
import PersonalInfo from "./information/PersonalInfo";
import EmploymentInfo from "./information/EmploymentInfo";
import PayrollInfo from "./information/PayrollInfo";

interface Props {
    open: boolean,
    handleClose: () => void
    emp_no: number | string
}

type Tabs = "static-info" | "static-info" | "employment-info"

export default function ViewEmployee(props: Props) {

    const {open, handleClose, emp_no} = props

    const [tabIndex, setTabIndex] = useState<number>(0)
    const dispatch = useDispatch()
    const [employeeData, setEmployeeData] = useState(null)
    
    useEffect(() => {
        fetchEmployeeData()
    },[emp_no])

    const tabs = useMemo(() => 
        [
            {
                id: "static-info",
                label: "Static Info",
                component: <StaticInfo />
            },
            {
                id: "personal-info",
                label: "Personal Info",
                component: <PersonalInfo employeeData={employeeData} />
            },
            {
                id: "employment-info",
                label: "Employment Info",
                component: <EmploymentInfo />
            },
            {
                id: "payroll-info",
                label: "Payroll Info",
                component: <PayrollInfo />
            },
        ]
    ,[employeeData])

    const fetchEmployeeData = async () => {

        if(!emp_no) return

        await axiosInstance.get(`employees/${emp_no}/`)
            .then(res => {
                setEmployeeData(curr => (res?.data))
            })
            .catch(err => {
                dispatch(HandleAlertAction({
                    open: true,
                    status: "error",
                    message: "Something Went Wrong"
                }))
            })
    }

    const handleChange = (e:any, newValue:number) => {
        setTabIndex(curr => newValue)
    }

    const modalContentClass = "rounded-xl bg-white md:w-11/12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none outline-none w-full h-full md:h-[90vh] overflow-auto"
    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="View Employee"
                aria-describedby="View Employee Information"
                className='overflow-auto relative'
            >   
                
                <div className={modalContentClass}>
                    <header className="bg-indigo-900 p-12 text-white shadow-2xl">
                        <div id="close-wrapper" className="absolute right-1 top-1 w-fit">
                            <Button className="w-fit" onClick={() => handleClose()}>
                                <XMarkIcon className="w-8 text-white"/>
                            </Button>
                        </div>
                        <div id="profile-picture-wrapper" className="rounded-full w-28 h-28 bg-red-100 m-auto my-2">
                            <img src=""/>
                        </div>
                        <div className="">
                            <Typography variant="h6" component="h6" className="font-bold text-center">Batak Si Boy</Typography>
                            <Typography variant="h6" component="h6" className="font-bold text-center">Employee #: 9989</Typography>
                        </div>
                    </header>
                    <div className="m-auto w-full p-4">
                        <Tabs 
                            value={tabIndex} 
                            onChange={handleChange}
                            variant="fullWidth"
                        >
                            {tabs.map((tab, index) => 
                                (
                                    <Tab 
                                        label={tab.label} 
                                        value={index}
                                    />
                                ))
                            }
                        </Tabs>
                    </div>
                    <section className="p-8">
                        {tabs[tabIndex].component}
                    </section>
                </div>
            </Modal>
        </Fragment>
    )
}