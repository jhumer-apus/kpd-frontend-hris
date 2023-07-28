import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import axios, { CancelTokenSource } from 'axios';
import { StaticDatePicker, PickersShortcutsItem } from '@mui/x-date-pickers';
import './highlighted-calendar.scss';
import { APILink } from '@/store/configureStore';


export interface HighlightedCalendarInterface {
  value: dayjs.Dayjs | null,
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

const initialValue = dayjs();
function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[], holidayTypes?: Record<string, string>, pipi?: string }) {
  const { highlightedDays = [], holidayTypes = {}, pipi, day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.includes(props.day.date());
  const holidayType = holidayTypes[day.format('YYYY-MM-DD')];
  let badgeContent = undefined;
  if (isSelected) {
    if (holidayType === 'LH') {
      badgeContent = '🟢'; // Heart symbol for LH
    } else if (holidayType === 'SH') {
      badgeContent = '🟠'; // Moon symbol for SH
    }
  }
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
    //   badgeContent={isSelected ? '🌚' : undefined}
    badgeContent={badgeContent}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
};
  

export default function HighlightedCalendar(props: HighlightedCalendarInterface) {
  const { value } = props;
  const requestAbortController = React.useRef<CancelTokenSource  | null>(null);
  // const [shortcutsItems, setShortcutsItems] = React.useState<PickersShortcutsItem<Dayjs>[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
//   const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [highlightedDays, setHighlightedDays] = React.useState<number[]>([]);
  const [holidayTypes, setHolidayTypes] = React.useState<Record<string, string>>({}); // Add this line to declare the state variable

  // const createShortcutItems = (data: any[]): PickersShortcutsItem<Dayjs>[] => {
  //   return data.map((holiday: any) => ({
  //     label: holiday.holiday_description || '', // Use holiday_description as label
  //     getValue: () => dayjs(holiday.holiday_date),
  //   }));
  // };
  const fetchHighlightedDays = (date: Dayjs) => {

    // requestAbortController.current = controller;
    const formattedDate = date.format('YYYY-MM');
    setIsLoading(true);
    setHighlightedDays([]);
    requestAbortController.current = axios.CancelToken.source();
  
    axios.get(`${APILink}holiday/`, {
      cancelToken: requestAbortController.current.token,
    })
      .then((response) => {
        //Added this to filter the data from the response
        const filteredData = response.data.filter((holiday: any) => {
            const holidayDate = dayjs(holiday.holiday_date);
            return (
              holidayDate.format('YYYY-MM') === formattedDate &&
              holidayDate.isSame(date, 'month')
            );
        });
        const holidayTypes = filteredData.reduce((types: Record<string, string>, holiday: any) => {
            const holidayDate = dayjs(holiday.holiday_date).format('YYYY-MM-DD');
            types[holidayDate] = holiday.holiday_type;
            return types;
        }, {});

        const daysToHighlight = filteredData.map((holiday: any) =>
          parseInt(holiday.holiday_date.split('-')[2])
        );
        setHighlightedDays(daysToHighlight);
        setHolidayTypes(holidayTypes); // Set the holidayTypes state
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

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.cancel();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // This is to make sure that we are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.cancel();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{maxWidth: '520px'}}>
            {/* <p className='absolute'>This Month's Holiday</p> */}
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
                holidayTypes,
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