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
import axiosInstance from "@/helpers/axiosConfig";


export default function ResetEL () {

    //STATES
    const currUser = useSelector((state: RootState) => state.auth.employee_detail);
    const [isELReset, setIsELReset] = useState<boolean>(false)

    //USE EFFECTS
    useEffect(() => {

        callIsResetEL()

    },[])

    //FUNCTIONS
    const getSeventhDateOfFirstMonth = ():Dayjs => {

        let firstDayOfYear = dayjs().startOf('year').month(0);
        return firstDayOfYear.set('date', 7);
    }

    const readableDate = (date:Dayjs) => {

        return date.format('MM DD, YYYY')

    }

    const callIsResetEL = async () => {

        await axiosInstance.get(`reset_el/`).then(response => {

            const result = response.data.is_reset_el
            setIsELReset(curr => result)
            
            if(!result) {

                resetEL()

            }
        })
    }
    
    const resetEL = async() => {

        await axiosInstance.post(`reset_el/`, {

            added_by: currUser?.emp_no

        }).then(res => {

            callIsResetEL()

        })
    }

    return (
        <div>
            {readableDate(dayjs()) <= readableDate(getSeventhDateOfFirstMonth()) && isELReset && 
                (
                    <Card className="p-2 mb-4 border border-2 border-green-500">
                        <CardHeader className="p-2 w-fit">
                            <Typography variant="p" className="text-slate-500">
                                Notification Expires At: {getSeventhDateOfFirstMonth().format('MMM DD, YYYY')}
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h6">
                                Yohoo Your Emergency Leave Has Been Reset!
                            </Typography>
                        </CardBody>
                    </Card>
                )
            }
            {/* {isELReset && 
                (
                    <Card className="p-4 mb-4 border border-2 border-green-500">
                        <CardHeader className="p-2 w-fit">
                            <Typography variant="p" className="text-slate-500">
                                Notification Expires At: {getSeventhDateOfFirstMonth().format('MMM DD, YYYY')}
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h6">
                                Yohoo Your Emergency Leave Has Been Reset!
                            </Typography>
                        </CardBody>
                    </Card>
                )
            } */}
        </div>
    )
}