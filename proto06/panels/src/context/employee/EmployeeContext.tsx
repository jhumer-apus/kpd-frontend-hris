import axiosInstance from '@/helpers/axiosConfig';
import { HandleAlertAction } from '@/store/actions/components';
import React, { createContext, ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';

interface EmployeeContextType {
  employeeData: any;
  fetchEmployeeData: (emp_no: string | number) => void;
}

interface EmployeeProviderProps {
    children: ReactNode;
}

export const EmployeeContext = createContext<EmployeeContextType>(
    {
        employeeData: [],
        fetchEmployeeData: () => {}
    }
);

const EmployeeProvider: React.FC<EmployeeProviderProps> = ({children}) => {

    const [employeeData, setEmployeeData] = useState<any>(null)
    const dispatch = useDispatch()

    const fetchEmployeeData = async (emp_no: string | number) => {
        await axiosInstance.get(`employees/${emp_no}/`)
            .then(res => {
                setEmployeeData((curr:any) => (res?.data))
            })
            .catch(err => {
                dispatch(HandleAlertAction({
                    open: true,
                    status: "error",
                    message: "Something Went Wrong"
                }))
            })
    }
    
    return (
        <EmployeeContext.Provider value={{employeeData, fetchEmployeeData}}>
            {children}
        </EmployeeContext.Provider>
    )
}

export { EmployeeProvider };