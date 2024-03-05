// REACT
import { Fragment, useEffect, useState } from 'react';

//LIBRARIES 
import { Select, Option, Input, Button } from "@material-tailwind/react";
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { render } from 'react-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';

//STORES
import { 
    viewAllDtrLogs, 
    viewFilterDtrLogs, 
    viewCutoffDtrSummary, 
    viewMergedDtrLogs,
    viewFilterMergedDtrLogs
} from '@/store/actions/dtr';


//HELPERS
import { fetchCutOffPeriods } from '@/helpers/ApiCalls'

interface Props { 
    viewType: "logs" | "merged" | "cutoff"
    filter: any
    setFilter: React.Dispatch<React.SetStateAction<any>>
}

interface OptionInterface {
    name: string,
    value: string |number
}

export default function FilterDTR(props: Props) {

    //PROPS
    const { viewType, filter, setFilter } = props

    //REDUX
    const dispatch = useDispatch();
    const currUser = useSelector((state: RootState) => state.auth.employee_detail)
    // const isLoading = useSelector((state: RootState) => state.dtr?.viewDtrReports.currentView.dtrStatus)
    
    //STATES
    const [cutoffPeriods, setCutOffPeriods] = useState<any[]>([]);
    const [isCutOffPeriodLoading, setIsCutOffPeriodLoading] = useState<boolean>(false);

    //USE EFFECTS
    useEffect(() => {
        debounceFetchCutOffPeriods()
    },[])

    // STATIC DATA
    const monthOptions= [
        {
            name: "January",
            value: "1"
        },
        {
            name: "February",
            value: "2"
        },
        {
            name: "March",
            value: "3"
        },
        {
            name: "April",
            value: "4"
        },
        {
            name: "May",
            value: "5"
        },
        {
            name: "June",
            value: "6"
        },
        {
            name: "July",
            value: "7"
        },
        {
            name: "August",
            value: "8"
        },
        {
            name: "September",
            value: "9"
        },
        {
            name: "October",
            value: "10"
        },
        {
            name: "November",
            value: "11"
        },
        {
            name: "December",
            value: "12"
        }
    ]

    //FUNCTIONS 
    const readableFormatDate = (date:string) => {
        const parsedDate = dayjs(date);
        return parsedDate.format('MMM DD, YYYY');
    }

    const debounceFetchCutOffPeriods = debounce(() => {
        fetchCutOffPeriods(filter.year).then(res => {
            const cleanCutOffs = res.data.map((cutoff:any) => {
                return {
                    ...cutoff,
                    cleanDateFrom: readableFormatDate(cutoff.co_date_from),
                    cleanDateTo: readableFormatDate(cutoff.co_date_to)
                }
            })

            setCutOffPeriods(curr => cleanCutOffs)
            setIsCutOffPeriodLoading(false)

        }).catch(err => {

            setIsCutOffPeriodLoading(false)
        });
    }, 1500);

    const handleChangeMonth = (e: any, val:any) => {

        setFilter((curr:any) => ({
            ...curr,
            month: val.value

        }))
    }

    const handleChangeCutoffId = (e: any, val:any) => {

        setFilter((curr:any) => ({
            ...curr,
            cutoff_id: val.id
        }))
    }

    const handleViewDTR = () => {

        switch(viewType) {

            case 'logs':
                dispatch(viewFilterDtrLogs(
                    {
                        month:filter.month,
                        year:filter.year
                    }
                ))
                break;

            case 'merged':  
                const role = currUser?.user?.role;
                const emp_no = currUser?.emp_no?? null
                const isBasicEmployee = role && role < 3

                dispatch(viewFilterMergedDtrLogs(
                    {
                        cutoff_id: parseInt(filter.cutoff_id),
                        emp_no: isBasicEmployee? emp_no: null
                    }
                ))
                break;

            case 'cutoff':
                dispatch(viewCutoffDtrSummary())
                break;

            default: 
                dispatch(viewFilterDtrLogs(
                    {
                    month:filter.month,
                    year:filter.year
                    }
                ))
                break;
        }
    }

    

    const currentMonth = monthOptions.find(month => parseInt(month.value) == filter.month);

    const textFieldYear: JSX.Element = 
    (
            <TextField
                type="number"
                defaultValue={filter.year}
                label="Year"
                variant="outlined"
                placeholder="Enter A Year"
                onChange={(e) => 
                        {
                            setFilter((curr:any) => (
                                {
                                    ...curr,
                                    year: parseInt(e.target.value)
                                }
                            ))
                        }
                    }
                // disabled={isLoading}
            />
    )

    let renderElement: JSX.Element | null;

    switch(viewType) {

        case 'logs':

            renderElement = (
                <div className='flex space-x-4 w-fit my-2'>
                    {textFieldYear}
                    <Autocomplete
                        disablePortal
                        id="months"
                        options={monthOptions}
                        defaultValue={currentMonth}
                        getOptionLabel={(option:any) => `${option.name}`}
                        onChange={handleChangeMonth}
                        className='md:w-80'
                        disabled={isCutOffPeriodLoading}
                        renderInput={(params) => <TextField {...params} label="Month" />}
                    />
                    <Button className='w-20 h-fit py-4' onClick={handleViewDTR}>View</Button>
                </div>
            )
            break;

        case 'merged':

            renderElement = (
                <div className='flex space-x-4 w-fit my-2'>
                    {textFieldYear}
                    <Autocomplete
                        disablePortal
                        id="cutoff"
                        options={cutoffPeriods}
                        getOptionLabel={(option:any) => option? `${option.cleanDateFrom} - ${option.cleanDateTo}`: "" }
                        onChange={handleChangeCutoffId}
                        className='md:w-80'
                        disabled={isCutOffPeriodLoading}
                        renderInput={(params) => <TextField {...params} label="Cutoff Periods" />}
                    />
                    <Button className='w-20 h-fit py-4' onClick={handleViewDTR}>View</Button>
                </div>
            )
            break

        default:
            renderElement = null
            break

    }



    return (
        <div className='flex gap-4 items-center my-2'>
            {renderElement}
        </div>
    )
}