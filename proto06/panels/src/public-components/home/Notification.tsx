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
import IncrementSLVL from "./IncrementSLVL";

export default function Notification() {

    const notifications = [
        {
            component: <ResetEL />
        },
        {
            component: <IncrementSLVL />
        }
    ]


    return (
        <div>
            {notifications.map(notif => (
                notif.component ?? "" 
            ))}
        </div>


    )

}