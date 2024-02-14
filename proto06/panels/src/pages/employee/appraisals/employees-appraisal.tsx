import { Fragment, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeesList } from '@/store/actions/employees';
import { RootState } from '@/store/configureStore';
import { Button, Modal, Typography } from '@mui/material';
import { APILink } from '@/store/configureStore';
import statisticsChartsData from '@/data/statistics-charts-data';
import { StatisticsChart } from '@/widgets/charts';
import { ChartBarIcon } from '@heroicons/react/24/solid';
import { KPICOREViewAction } from '@/store/actions/employee-and-applicants';
import { color } from '@material-tailwind/react/types/components/alert';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from 'react-router-dom';



export default function EmployeesAppraisalPage() {
  const dispatch = useDispatch();
  const { employees_list } = useSelector((state: RootState) => state.employees);
  const ListOfAllKPIScores = useSelector((state: RootState) => state.employeeAndApplicants.KPICOREView.data);
  const [ mema, setMema ] = useState([{haha: 1, hehe: 2}, {haha: 1, hehe: 20}, {haha: 3, hehe: 200}])

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: 'employee_image',
      headerName: 'Display Pic',
      width: 150,
      renderCell: (params: GridCellParams) => {
        if (params.value){
          return(
            
            <img src={`${APILink.replace('/api/v1/', '')}${params.value as string}`} alt="" width="50" height="50" style={{borderRadius: "10px", height: "40px", width: "40px", objectFit: "cover", border: "1px solid white", boxShadow: "1px 1px 10px gray"}}/>
            )
        } else {
          return (
            null
          )    
        }
      },
    },
    { field: 'emp_no', headerName: 'Employee #', width: 120 },
    // { field: 'first_name', headerName: 'First Name', width: 150 },
    // { field: 'last_name', headerName: 'Last Name', width: 150 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    { field: 'date_hired', headerName: 'Date Hired', width: 150 },
    { field: 'branch_code', headerName: 'Branch Code', width: 150 },
    { field: 'mobile_phone', headerName: 'Mobile Number', width: 150 },
    { field: `user`, headerName: 'Has HRIS Access', width: 150, valueGetter: (params: GridValueGetterParams) => `${params.row.user?.is_active ? 'Active' : 'No Access'}` },
    { field: 'bio_id', headerName: 'Biometrics ID', width: 150 },
    {
      field: 'appraisal_button',
      headerName: 'Check Details',
      width: 200,
      renderCell: (params: GridCellParams) => {
        if (params.row.emp_no){
          return(
            
            // <Button variant={'contained'} style={{borderRadius: "10px", height: "30px", width: "30px", objectFit: "cover", border: "1px solid white", boxShadow: "1px 1px 10px gray"}}>
              
            //   </Button>
            <ArrowCircleRightOutlinedIcon color={'info'} 
            onClick={()=> {
              navigate(`/home/employees/KPI-Appraisals/${params.row.emp_no}`)
              // window.alert(`${params.row.emp_no}`)
            }
              }
              />
            )
        } else {
          return (
            null
          )    
        }
      },
    },
  ];

  useEffect(() => {
    dispatch(getEmployeesList());
    if((Array.isArray(ListOfAllKPIScores) && ListOfAllKPIScores.length === 0 )|| !ListOfAllKPIScores ){
      dispatch(KPICOREViewAction())
    }
  }, []);
  
  const [ statisticsChartsData, setStatisticsChartsData ] = useState([
    {
      color: "blue" as color,
      title: "Final Rating Status Trend: Year 2023",
      description: "Computed Rating Percentage Rating Chart",
      footer: " 'A' - 91% Above, 'B' - 80%-90%, 'C' - 79% Below ",
      chart: {
        type: "bar",
        height: 220,
        series: [
          {
            name: "Percentage",
            data: [0,0,0,0,0,0,0,0,0],
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: false,
          },
          grid: {
            show: true,
            borderColor: "#ffffff40",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
          colors: "#fff",
          plotOptions: {
            bar: {
              columnWidth: "16%",
              borderRadius: 5,
            },
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          },
          yaxis: {
            labels: {
              style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
        },
      },
      link: '-',
      customTop: 30,
      customLeft: 40,
    },
    {
      color: "pink" as color,
      title: "KPI Evaluation Score Trend: Year 2023",
      description: "Line Chart Report of Monthly KPI Score",
      footer: "Employee Name: ",
      chart: {
        type: "line",
        height: 220,
        series: [
          {
            name: "KPI Eval Score",
            data: [0,0,0,0,0,0,0,0,0],
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            labels: {
              style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          grid: {
            show: true,
            borderColor: "#ffffff40",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
          colors: ["#fff"],
          stroke: {
            lineCap: "round",
          },
          markers: {
            size: 5,
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          },
        },
      },
      link: '-',
      customTop: 30,
      customLeft: 40,
    },
    {
      color: "green" as color,
      title: "Core Competencies Score Trend: Year 2023",
      description: "Line Chart Report of Monthly CC Score",
      footer: "Employee Name:",
      chart: {
        type: "line",
        height: 220,
        series: [
          {
            name: "Core Score",
            data: [0,0,0,0,0,0,0,0,0],
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            labels: {
              style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
          },
          grid: {
            show: true,
            borderColor: "#ffffff40",
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
          colors: ["#fff"],
          stroke: {
            lineCap: "round",
          },
          markers: {
            size: 5,
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
              },
            },
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          },
        },
      },
      link: '-',
      customTop: 30,
      customLeft: 40,
    },
  ])

  const updateState = (emp_no: number, emp_name: string) => {
    const filteredArr = ListOfAllKPIScores.filter((item) => item.emp_no === emp_no);
    const FinalRating = filteredArr.map((item) => item.percentage_total);
    const KPIResult = filteredArr.map((item) => item.total_approver_eval_points);
    const CoreCompeResult = filteredArr.map((item) => item.total_core_compe_points);
    setStatisticsChartsData((prevState)=> {
      const newState = [...prevState];
      newState[1].footer = `Employee Name: ${emp_name}`;
      newState[2].footer = `Employee Name: ${emp_name}`;
      newState[0].chart.series[0].data = FinalRating.length > 0 ? FinalRating : [0,0,0,0,0,0,0,0,0];
      newState[1].chart.series[0].data = KPIResult.length > 0 ? KPIResult : [0,0,0,0,0,0,0,0,0];
      newState[2].chart.series[0].data = CoreCompeResult.length > 0 ? CoreCompeResult : [0,0,0,0,0,0,0,0,0];
      return newState;
    })
  }

  return (
    <Fragment>

      <div className="my-12 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant='body2'
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ChartBarIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={employees_list ?? []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[25, 30, 35, 40]}
          // checkboxSelection
          onRowClick={(e) => {
            updateState(e?.row?.emp_no, `${e.row.first_name} ${e.row.last_name}`)
            // setStatisticsChartsData((prevState)=> console.log(prevState))
          }}
          style={{ cursor: 'pointer'}}
          localeText={{ noRowsLabel: 'Loading...' }} // To do: can optimize after employee reducer has been optimized 
        />
      </div>
    </Fragment>

  );
}
