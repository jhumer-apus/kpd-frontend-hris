import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AvTimerOutlinedIcon from '@mui/icons-material/AvTimerOutlined';

import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { HighlightedCalendarInterface } from '../highlighted-calendar/highlighted-calendar';


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { HolidaysGet } from '@/store/actions/procedurals';


export const enum HolidayColor {
    _legal = 'linear-gradient(0deg, rgba(34,195,193,1) 0%, rgba(38,199,133,1) 50%)',
    _special = 'linear-gradient(0deg, rgba(195,147,34,1) 0%, rgba(253,187,45,1) 100%)',
    _legal_hex = '#26C785',
    _special_hex = '#FDBB2D'
}

function ListOfHolidaysComponent(props: HighlightedCalendarInterface) {
    const dispatch = useDispatch();
    const ListOfHolidaysState = useSelector((state: RootState)=> state.procedurals.HolidaysGet);
    // let sortedDates = [];

    useEffect(()=>{
        dispatch(HolidaysGet());
    }, [])
    const {setValue} = props;
    return (
        <div style={{height: '90%', overflowY: 'auto', padding: '6px'}}>
        <ul className='flex flex-col items-center justify-center'>
        {ListOfHolidaysState?.data && ListOfHolidaysState?.data?.map(({ holiday_date, holiday_description, holiday_type, holiday_location }, index) => (
            <li style={{width: '95%'}} key={`${index}_li_list_holiday`}>
                <Card 
                    style={{marginTop: '20px', padding: '0px', cursor: 'pointer', transition: 'transform 0.3s ease', boxShadow: `2px 2px 7px ${holiday_type === 'SH'? HolidayColor._special_hex : HolidayColor._legal_hex}`}} 
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={() => setValue(dayjs(holiday_date))}
                >
                    <CardHeader
                        floated={false}
                        variant="gradient"
                        // color={b}
                        className="absolute mt-4 grid h-16 w-16 place-items-center"
                        style={{background: holiday_type === 'SH'? HolidayColor._special : HolidayColor._legal}}
                        data-name={'iconwrap'}
                    >
                        <span>{React.createElement( holiday_type === 'SH'? AvTimerOutlinedIcon : AccountBalanceOutlinedIcon , {className: 'w-6 h-6 text-white'})}</span>
                    </CardHeader>
                    <CardBody className="p-4 text-right">
                        <Typography variant="body2" className="font-normal text-blue-gray-600">
                        {holiday_description ? holiday_description + ' - ' : ''}{holiday_type === 'SH' ? 'Special Holiday': 'Legal Holiday'}
                        </Typography>
                        <Typography variant="h4" color="blue-gray">
                        {holiday_type}
                        </Typography>
                    </CardBody>
                    <CardFooter className="border-t flex justify-between border-blue-gray-50 p-4">
                        <span>{dayjs(holiday_date).locale('en').format('MMMM D, YYYY')} - {`${holiday_location.charAt(0).toUpperCase()}${holiday_location.slice(1)}`}</span>
                        <span title="Under Development" style={{zoom: 0.8}}>{React.createElement(EditCalendarOutlinedIcon, {style: {color: holiday_type === 'SH'? HolidayColor._special_hex: HolidayColor._legal_hex}})}</span>
                    </CardFooter>
                </Card>
            </li>
        ))}
        {/* {ListOfHolidaysState?.data && "No Holidays to Generate"} */}
        </ul>
        </div>
    );
}

export default ListOfHolidaysComponent;