import React from 'react';
import { EasyAccessCard } from '@/widgets/cards';
import { KeyIcon } from '@heroicons/react/24/solid';
import { Typography } from '@mui/material';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  } from "@material-tailwind/react";


const style1 = [
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    },
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    },
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    },
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    },
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    },
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    },
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    },
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    },
    {
        // color: "red",
        type: 2,
        icon: KeyIcon,
        title: "Role Management",
        value: "RM",
        footer: {
        color: "text-green-500",
        value: "<",
        label: "Manage Roles, etc.",
        },
        custom: "linear-gradient(147deg, #a399b2 0%, #4d4855 74%)",
    }
]

const mockHolidayJsonList = [
    {
      "id": 1,
      "holiday_date": "2023-05-31",
      "holiday_description": null,
      "holiday_type": "LH",
      "holiday_location": "national"
    },
    {
      "id": 2,
      "holiday_date": "2023-05-30",
      "holiday_description": null,
      "holiday_type": "SH",
      "holiday_location": "national"
    },
    {
      "id": 7,
      "holiday_date": "2023-04-06",
      "holiday_description": "Maundy Thursday",
      "holiday_type": "LH",
      "holiday_location": "national"
    },
    {
      "id": 8,
      "holiday_date": "2023-04-07",
      "holiday_description": "Good Friday",
      "holiday_type": "LH",
      "holiday_location": "national"
    },
    {
      "id": 9,
      "holiday_date": "2023-04-10",
      "holiday_description": "Day of Valor | Araw ng Kagitingan",
      "holiday_type": "LH",
      "holiday_location": "national"
    },
    {
      "id": 10,
      "holiday_date": "2023-04-21",
      "holiday_description": "Eid Al-Ftr",
      "holiday_type": "LH",
      "holiday_location": "national"
    }
]


function ListOfHolidaysComponent() {
    return (
        <div style={{height: '80%', overflowY: 'auto', padding: '6px'}}>
        <ul>
        {mockHolidayJsonList.map(({ holiday_date, holiday_description, holiday_type, holiday_location }) => (
            <li>
                <Card style={{marginTop: '20px'}}>
                    <CardHeader
                        floated={false}
                        variant="gradient"
                        // color={b}
                        className="absolute mt-4 grid h-16 w-16 place-items-center"
                        style={{background: "linear-gradient(87deg, #5e72e4 0, #825ee4 100%)"}}
                        data-name={'iconwrap'}
                    >
                        <span><KeyIcon/></span>
                    </CardHeader>
                    <CardBody className="p-4 text-right">
                        <Typography variant="body2" className="font-normal text-blue-gray-600">
                        {holiday_description}
                        </Typography>
                        <Typography variant="h4" color="blue-gray">
                        {holiday_type}
                        </Typography>
                    </CardBody>

                    <CardFooter className="border-t border-blue-gray-50 p-4">
                    {holiday_date} - {holiday_location}
                    </CardFooter>
                </Card>
            </li>
        ))}

        </ul>

        </div>
    );
}

export default ListOfHolidaysComponent;