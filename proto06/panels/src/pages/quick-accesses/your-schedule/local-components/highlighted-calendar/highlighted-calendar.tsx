import {Dispatch, SetStateAction, useRef, useState, useEffect, ReactNode} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import axios, { CancelTokenSource } from 'axios';
import { StaticDatePicker } from '@mui/x-date-pickers';
import './highlighted-calendar.scss';
import { APILink } from '@/store/configureStore';
import { SCHEDULEDAILYViewInterface, SCHEDULESHIFTViewInterface } from '@/types/types-pages';
import { ScheduleDailyColor } from '@/types/index';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export interface HighlightedCalendarInterface {
  value: dayjs.Dayjs | null,
  setValue: Dispatch<SetStateAction<dayjs.Dayjs | null>>,
  currEmployee: number,
  setCurrEmployee: Dispatch<SetStateAction<number>>,
}

const initialValue = dayjs();
function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[], scheduleDaily?: Record<string, Record<string, SCHEDULESHIFTViewInterface>>, pipi?: string }) {
  const { highlightedDays = [], scheduleDaily = {}, pipi, day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.includes(props.day.date());
  const scheduleDailyIsRestday = scheduleDaily[`${day.format('YYYY-MM-DD')}`];
  let badgeContent: ReactNode = undefined;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);




  if (isSelected) {
    if (scheduleDailyIsRestday?.is_restday) {
      badgeContent = 
      <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} 
      style=
        {
          {
            background: ScheduleDailyColor._restday,
            opacity: '0.2', 
            height: '46px', 
            width: '46px', 
            borderRadius: '30px', 
            marginTop: '32px',
            marginRight: '37px', 
            padding: '5px', 
            display: 'flex', 
            zoom: '0.8'
          }
        }
      >
        <p style={{zoom: '0.9', margin: 'auto'}}>{}</p>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          sx={{marginTop: "-2px"}}
        >
         <Popover
             id="mouse-over-popover"
             sx={{
             pointerEvents: 'none',
             }}
             open={open}
             anchorEl={anchorEl}
             anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'left',
             }}
             transformOrigin={{
             vertical: 'top',
             horizontal: 'left',
             }}
             onClose={handlePopoverClose}
             disableRestoreFocus
         >
             <Typography variant={"overline"} sx={{ p: 1 }}>
             {scheduleDailyIsRestday.sched_details?.name ? scheduleDailyIsRestday.sched_details?.name : 'No Schedule'} <b>{scheduleDailyIsRestday.sched_details?.time_in && dayjs(scheduleDailyIsRestday.sched_details?.time_in, "HH:mm:ss").format('hh:mm a')} {scheduleDailyIsRestday.sched_details?.time_out && '-'} {scheduleDailyIsRestday.sched_details?.time_out && dayjs(scheduleDailyIsRestday.sched_details?.time_out, "HH:mm:ss").format('hh:mm a')}</b>
             </Typography>
         </Popover>
        </Typography>
      </div>
      ; 
    } else if (!scheduleDailyIsRestday.is_restday) {
      badgeContent =
      <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} 
      style=
        {
          {
            background: ScheduleDailyColor._workday,
            opacity: '0.2', 
            height: '46px', 
            width: '46px', 
            borderRadius: '30px', 
            marginTop: '32px',
            marginRight: '37px', 
            padding: '5px', 
            display: 'flex', 
            zoom: '0.8'
          }
        }
      >
        <p style={{zoom: '0.9', margin: 'auto'}}>{}</p>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          sx={{marginTop: "-2px"}}
        >
         <Popover
             id="mouse-over-popover"
             sx={{
             pointerEvents: 'none',
             }}
             open={open}
             anchorEl={anchorEl}
             anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'left',
             }}
             transformOrigin={{
             vertical: 'top',
             horizontal: 'left',
             }}
             onClose={handlePopoverClose}
             disableRestoreFocus
         >
             <Typography variant={"overline"} sx={{ p: 1 }}>
             {scheduleDailyIsRestday.sched_details?.name ? scheduleDailyIsRestday.sched_details?.name : 'No Schedule'} <b>{dayjs(scheduleDailyIsRestday.sched_details?.time_in, "HH:mm:ss").format('hh:mm a')} - {dayjs(scheduleDailyIsRestday.sched_details?.time_out, "HH:mm:ss").format('hh:mm a')}</b>
             </Typography>
         </Popover>
        </Typography>
      </div>
      ; 
    }
  }
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={badgeContent}
      style={{zIndex: '2'}}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} style={{zIndex: '1'}} />
    </Badge>
  );
};
  

export default function HighlightedCalendar(props: HighlightedCalendarInterface) {
  const { value, currEmployee } = props;
  const requestAbortController = useRef<CancelTokenSource  | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [scheduleDaily, setScheduleDaily] = useState<Record<string, Record<string, string | number | boolean | SCHEDULESHIFTViewInterface>>>({}); 
  const fetchHighlightedDays = (date: Dayjs) => {
    let formattedDate = date.format('YYYY-MM');
    setIsLoading(true);
    setHighlightedDays([]);
    requestAbortController.current = axios.CancelToken.source();
  
    axios.get(`${APILink}schedule_daily/${currEmployee}/`, {
      cancelToken: requestAbortController.current.token,
    })
      .then((response) => {
        const filteredData: SCHEDULEDAILYViewInterface[] = response.data.filter((scheduleDaily: SCHEDULEDAILYViewInterface) => {
            const scheduleDailyDate = dayjs(scheduleDaily.business_date);
            return (
              scheduleDailyDate.format('YYYY-MM') === formattedDate &&
              scheduleDailyDate.isSame(date, 'month')
            );
        });

      
        const scheduleDaily = filteredData.reduce((is_restday: Record<string, Record<string, string | number | boolean | SCHEDULESHIFTViewInterface >>, scheduleDaily: SCHEDULEDAILYViewInterface) => {
            const scheduleDailyDate = dayjs(scheduleDaily.business_date).format('YYYY-MM-DD');
            const sched_id_check1 = (key: SCHEDULESHIFTViewInterface) => {
              if(key){
                if ('id' in key){
                  return key
                } else {
                  return 0
                }
              } else {
                return 0
              }

            }; 
            is_restday[scheduleDailyDate] = {
              is_restday: scheduleDaily.is_restday, 
              sched_details: sched_id_check1(scheduleDaily?.schedule_shift_code as SCHEDULESHIFTViewInterface)
            };
            return is_restday;
        }, {});

        const daysToHighlight = filteredData.map((scheduleDaily: any) =>
          parseInt(scheduleDaily.business_date.split('-')[2])
        );
        setHighlightedDays(daysToHighlight);
        setScheduleDaily(scheduleDaily); // Set the scheduleDaily state
        setIsLoading(false);
        // setShortcutsItems(createShortcutItems(filteredData)); // Update shortcutsItems
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          // Ignore the error if it was caused by request cancellation
          return;
        }
        // Handle other errors
        console.error('Error:', error);
      });
  };


  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.cancel();
  }, [currEmployee]);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.cancel();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{maxWidth: '520px'}}>
            {/* <p className='absolute'>This Month's ScheduleDaily</p> */}
            <StaticDatePicker
            defaultValue={initialValue}
            value={value}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            orientation={'portrait'}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
            day: ServerDay,
            }}
            slotProps={{
            day: {
                highlightedDays,
                scheduleDaily,
            } as any,
            // shortcuts: {
            //     items: shortcutsItems,
            // },
            }}
            className="custom-static-datepicker"
            />
        </div>
    </LocalizationProvider>
  );
}