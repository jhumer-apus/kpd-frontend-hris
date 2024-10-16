import { Button, Modal, Tab, Tabs, Typography } from "@mui/material";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { HandleAlertAction } from "@/store/actions/components";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axiosInstance from "@/helpers/axiosConfig";

import StaticInfo from "./information/StaticInfo";
import PersonalInfo from "./information/PersonalInfo";
import EmploymentInfo from "./information/EmploymentInfo";
import PayrollInfo from "./information/PayrollInfo";
import { APILink } from "@/store/configureStore";
import { EmployeeContext } from "@/context/employee/EmployeeContext";

interface Props {
    open: boolean,
    handleClose: () => void
}

type Tabs = "static-info" | "static-info" | "employment-info"

export default function ViewEmployee(props: Props) {

    const {open, handleClose} = props
    const employeeContext = useContext(EmployeeContext);
    const { employeeData, fetchEmployeeData} = employeeContext

    const [tabIndex, setTabIndex] = useState<number>(0)

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
                component: <PersonalInfo />
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


    const handleChange = (e:any, newValue:number) => {
        setTabIndex(curr => newValue)
    }


    const modalContentClass = "rounded-xl bg-white md:w-11/12 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-none outline-none w-full h-full md:h-[90vh] overflow-auto"
    const profilePic = employeeData?.employee_image? `${APILink}${employeeData?.employee_image}`: ""
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
                        <div id="profile-picture-wrapper" className="w-fit m-auto rounded-full border-8 border-green-500">
                            <img 
                                src={profilePic}
                                className="w-32 h-32 object-cover rounded-full shadow-2xl "
                                alt="Profile Picture"
                            />
                        </div>
                        <div className="">
                            <Typography variant="h6" component="h6" className="font-bold text-center">{employeeData?.emp_full_name}</Typography>
                            <Typography variant="h6" component="h6" className="font-bold text-center">Employee No: {employeeData?.emp_no}</Typography>
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