import React, { useEffect, useState } from "react";

//LIBARIES
import axios from 'axios'
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from 'dayjs'
import {
    Card,
    CardHeader,
    CardBody,
    Typography
} from "@material-tailwind/react";


//STORE
import { APILink, RootState } from "@/store/configureStore";

//COMPONENTS
import ResetEL from "./ResetEL";
import axiosInstance from "@/helpers/axiosConfig";

export default function IncrementSLVL () {

    //STATES
    const currUser = useSelector((state: RootState) => state.auth.employee_detail);
    const [isVLSLIncremented, setIsVLSLIncremented] = useState<boolean>(false)

    //USE EFFECTS
    useEffect(() => {

        callIsIncrementedVLSL()

    },[])

    //FUNCTIONS
    const getSeventhDateOfCurrentDate = ():Dayjs => {

        let currentDate = dayjs();
        currentDate = currentDate.set('date', 7);
        return currentDate
    }

    const readableDate = (date:Dayjs) => {
        return date.format('MM DD, YYYY')
    }

    const callIsIncrementedVLSL = async () => {

        await axiosInstance.get(`inc_vl_sl`).then(response => {

            const result = response.data.is_incremented_sl_vl
            setIsVLSLIncremented(curr => result)
            
            if(!result) {

                incrementSLVL()

            }
        })
    }
    
    const incrementSLVL = async() => {

        await axiosInstance.post(`inc_vl_sl/`, {

            added_by: currUser?.emp_no

        }).then(res => {

            callIsIncrementedVLSL()

        })
    }

    return (
        <div>
            {readableDate(dayjs()) <= readableDate(getSeventhDateOfCurrentDate()) && isVLSLIncremented &&
                (
                    <Card className="p-2 mb-4 border border-2 border-green-500">
                        <CardHeader className="p-2 w-fit">
                            <Typography variant="paragraph" className="text-slate-500">
                                Notification Expires At: {getSeventhDateOfCurrentDate().format('MMM DD, YYYY')}
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h6">Yehey Your Vacation Leave and Sick Leave Has Incremented!</Typography>
                        </CardBody>
                        
                    </Card>
                )
            }
        </div>


    )

}