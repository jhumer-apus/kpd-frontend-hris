import { Box, CircularProgress, Avatar } from '@mui/material';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
  Button as Button2,
  Select, Option 
} from "@material-tailwind/react";
import {
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  UserIcon,
  FingerPrintIcon,
  AcademicCapIcon,
  UserGroupIcon,
  WindowIcon,
  LockClosedIcon as LockClosedOutline,
  XCircleIcon,
  CheckCircleIcon,
  LockOpenIcon,
  UserPlusIcon,
  DevicePhoneMobileIcon,
  PhoneIcon,
  XMarkIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { APILink, RootState } from '@/store/configureStore';
import { EMPLOYEESViewInterface } from '@/types/types-store';
import FormData from 'form-data';
import { beautifyJSON } from '@/helpers/utils';
import { drop } from 'lodash';

// COMPONENTS
import Province from '@/public-components/forms/address/Province'
import CityMunicipality from '@/public-components/forms/address/CityMunicipality'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//HELPERS
import { validateImage } from '@/helpers/validator/employee_information';
import SelectProvince from '@/public-components/forms/address/SelectProvince';
import SelectCityMunicipality from '@/public-components/forms/address/SelectCityMunicipality';

interface DropDownData {
    branches: any[],
    departments: any[],
    payrollGroups: any[],
    employmentStatuses: any[],
    positions: any[],
    approvers: any[],
    divisions: any[]
}

type initialState = {
    secondOptionModalEntranceDelay?: Boolean;
    modalEntranceDelay?: Boolean;
    loadingEffect: () => void;
}

export const SpecificEmployee = (props: initialState) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const {modalEntranceDelay, secondOptionModalEntranceDelay, loadingEffect} = props;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<EMPLOYEESViewInterface>();
    const userData = useSelector((state: RootState) => state.employees.specific_employee_info);
    const [editMode, setEditMode] = useState(false);
    const [editMode2, setEditMode2] = useState(false);
    const [editMode3, setEditMode3] = useState(false);
    const [type, setType] = useState("staticInfo");

    const [formSelectData, setFormSelectData] = useState({
        employee_image: null,
        // employee_image: userData?.employee_image,
        gender: null,
        branch_code: null,
        department_code: null,
        approver1: null,
        approver2: null,
        emp_salary_basic: userData?.emp_salary_basic,
        province: {
            id: null,
            name: null,
            code: null
          },
          city: {
            id: null,
            name: null,
            code: null
        }
    })

    // const [monthlySalary, setMonthlySalary] = useState<number>(0)

    // const [employeeData, setEmployeeData] = useState({
    //     emp_salary_basic: userData?.emp_salary_basic
    // })
    

    const [dropDownData, setDropDownData] = useState<DropDownData>({
        branches:[],
        departments:[],
        payrollGroups:[],
        employmentStatuses:[],
        positions:[],
        approvers:[],
        divisions:[]
      })


    // USE EFFECTS
    useEffect(() => {
        fetchBranches()
        fetchPayrollGroups()
        fetchEmploymentStatus()
        fetchDepartments()
        fetchPositions()
        fetchDivisions()

        console.log(userData?.approver1)
        console.log(userData?.approver2)
        if(userData?.department_code) {
            fetchApprovers(parseInt(userData?.department_code))
        }
        // setMonthlySalary(curr => monthlySalaryComputation(userData?.emp_salary_basic?? 0))
    }, []);

    // useEffect(() => {
    //     // setUserData((curr:any) => userDataStore);
    //     if(dropDownData.branches.length > 0 && dropDownData.departments.length > 0 && dropDownData.payrollGroups.length > 0 && dropDownData.employmentStatuses.length > 0 && dropDownData.positions.length > 0) {
    //         setUserData((curr:any) => userDataStore)
    //         console.log(dropDownData)
    //     }
    // }, [dropDownData])

    // useEffect(() => {
    //     if (
    //         dropDownData.branches.length > 0 &&
    //         dropDownData.departments.length > 0 &&
    //         dropDownData.payrollGroups.length > 0 &&
    //         dropDownData.employmentStatuses.length > 0 &&
    //         dropDownData.positions.length > 0
    //     ) {
    //         setUserData(userDataStore);
    //         console.log(dropDownData);
    //     }
    // }, [dropDownData, userDataStore]);

    useEffect(() => {
        if (userData) {
            userData.branch_code && fetchDepartments()
            for (const key in userData) {
                setValue(key, userData[key]);
            }
        }

        if(userData?.department_code) {
            fetchApprovers(parseInt(userData?.department_code))
        }
    }, [userData, setValue]);


    // const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = event.target.files ? event.target.files[0] : null;
    //     setFile(selectedFile);
    
    //     if (selectedFile) {
    //       const reader = new FileReader();
    //       reader.onloadend = () => {
    //         setPreviewUrl(reader.result as string);
    //       };
    //       reader.readAsDataURL(selectedFile);
    //     } else {
    //       setPreviewUrl(null);
    //     }
    // };

    const handleProfilePic = (e:any) => {

        const file = e.target.files[0];
        const MAX_FILE_SIZE_MB = 5;
    
        if (file) {
    
          if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
    
              setFormSelectData((curr:any) => ({...curr, employee_image:file}))

              setFile(file);
    
              const reader = new FileReader();
              reader.onload = () => {
                setPreviewUrl(reader.result as string);
              };
        
              reader.readAsDataURL(file);
    
          } else {
            
            setPreviewUrl(null);
            window.alert('Image should be not more than 5MB');
    
          }
        }
      }
  
    const fetchPayrollGroups = () => {
        axios.get(`${APILink}payrollgroup`).then((response:any) => {
            const responsePayrollGroups = response.data.map((payroll:any) => {
            return {
                id: payroll.id.toString(),
                name: payroll.name
            }
            })
            setDropDownData((curr:any) => ({...curr, payrollGroups: responsePayrollGroups}));
        })
    }

    const fetchBranches = () => {
        axios.get(`${APILink}branch`).then((response:any) => {
            const responseBranches = response.data.map((branch:any) => {
            return {
                id: branch.id.toString(),
                name: branch.branch_name
            }
            })
            setDropDownData((curr:any) => ({...curr, branches: responseBranches}));
        })
    }

    const fetchDepartments = () => {

    axios.get(`${APILink}department/`).then((response:any) => {
        
        const responseDepartments = response.data.map((department:any) => {
            return {
                id: department.id.toString(),
                name: department.dept_name
            }
        })
            setDropDownData((curr:any) => ({...curr, departments: responseDepartments}));
        })
    }

    const fetchEmploymentStatus = () => {
        axios.get(`${APILink}emp_status_type/`).then((response:any) => {
            const responseEmploymentStatuses = response.data.map((employmentStatus:any) => {
            return {
                id: employmentStatus.id.toString(),
                name: employmentStatus.name
            }
            })
            setDropDownData((curr:any) => ({...curr, employmentStatuses: responseEmploymentStatuses}));
        })
    }

    const fetchPositions = () => {
        axios.get(`${APILink}position/`).then((response:any) => {
            const responsePositions = response.data.map((position:any) => {
            return {
                id: position.id.toString(),
                name: position.pos_name
            }
            })

            setDropDownData((curr:any) => ({...curr, positions: responsePositions}));
        })
    }
    const fetchApprovers = (department: number) => {
        axios.get(`${APILink}approvers/`,{
          params:{
            department: department
          }
        }).then((response:any) => {

            console.log(response.data)
  
            const responseApprovers = response.data.map((approver:any) => {
                return {
                emp_no: approver.emp_no,
                full_name: approver.full_name
                }
            })
  
            setDropDownData((curr:any) => ({...curr, approvers: responseApprovers}));
  
        })
      }

      const fetchDivisions = () => {
        axios.get(`${APILink}division/`).then((response:any) => {
          const responseDivisions = response.data.map((division:any) => {
            return {
              id: division.id,
              name: division. div_name
            }
          })
          setDropDownData((curr:any) => ({...curr, divisions: responseDivisions}));
  
        })
      }

    const fetchData = async function (formData: FormData) {
        try {
            const response = await axios.put(
              `${APILink}employees/${userData?.emp_no}/`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            loadingEffect();
            window.alert(`${response.status >= 200 && response.status < 300 && 'Request Successful'}`)
            setTimeout(()=> {
                // location.reload();
            }, 800)
          } catch (err: any) {
            window.alert(`Error: ${beautifyJSON(err?.response?.data)}`)
          }
    };

    const handleDailySalary = (e:any) => {

        setFormSelectData(curr => ({...curr, emp_salary_basic: e.target.value}))
        // setMonthlySalary(monthlySalaryComputation(e.target.val))
    }

    const monthlySalaryComputation = (value: number) => {
        return Math.round(((value?? 0)*313)/12)
    }

    const onSubmit = async (data: EMPLOYEESViewInterface, type: string) => {

        data = {
            ...data,
            ...formSelectData
        }

        // Validate image if its file
        const isFile = validateImage(formSelectData.employee_image)
        if(formSelectData.employee_image == (null || undefined) && !userData?.employee_image) {
    
          window.alert("Profile Picture is required")
          return
    
        }else if(!isFile && !userData?.employee_image) {
    
          window.alert("Profile Picture should be image")
          return
        }

        console.log(data)
        const formData = new FormData();
        const keyChecker = (key: string) => {
            const keyProcessed: { [key: string]: () => void } = {
                "type1": () => setEditMode(false),
                "type2": () => setEditMode2(false),
                "type3": () => setEditMode3(false),
                "default": () => {}
            }
            if (key in keyProcessed) {
                return keyProcessed[key]();
              } else {
                return keyProcessed['default'](); 
            }
        }
        
        keyChecker(type)

        const finalData: EMPLOYEESViewInterface = {
            // user: USERViewInterface | null
            employee_image: data.employee_image,
            age: data.age,
            // tax_data:
            // pagibig_data:
            // sss_data:
            // philhealth_data:
            emp_no: data.emp_no,
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            suffix: data.suffix?? null,
            birthday: data.birthday,
            birth_place: data.birth_place,
            civil_status: data.civil_status,
            gender: data.gender,
            address: data.address,
            mobile_phone: data.mobile_phone,
            email_address: data.email_address,
            bio_id: data.bio_id,
            telephone: data.telephone,
            blood_type: data.blood_type,
            graduated_school: data.graduated_school,
            profession: data.profession,
            license_no: data.license_no,
            emergency_contact_person: data.emergency_contact_person,
            emergency_contact_number: data.emergency_contact_number,
            hmo: data.hmo,
            other_duties_responsibilities: data.other_duties_responsibilities,
            payroll_no: data.payroll_no,
            date_hired: data.date_hired,
            // date_resigned: data.date_resigned,
            accnt_no: data.accnt_no,
            emp_salary_basic: data.emp_salary_basic,
            emp_salary_type: "5",
            insurance_life: data.insurance_life ?? 0,
            other_deductible: data.other_deductible?? 0,
            ecola: data.ecola ?? 0,
            approver1: data.approver1,
            approver2: data.approver2,
            province_code: data.province.id,
            city_code: data.city.id,
            branch_code: data.branch_code,
            department_code: data.department_code,
            division_code: data.division_code,
            position_code: data.position_code,
            rank_code: data.rank_code,
            payroll_group_code: data.payroll_group_code,
            employment_status: data.employment_status,
            // rank_hierarchy: 0,
            // user: null,
            // tax_data: null,
            // pagibig_data: null,
            // sss_data: null,
            // philhealth_data: null,
            // provincial_address: null,
            // date_resigned: null,
            // date_added: '',
            // tax_code: null,
            // pagibig_code: null,
            // sssid_code: '',
            // philhealth_code: null
          }

        for (const key in finalData) {
            const value = finalData[key];
            if (value !== null && value !== undefined && value !== "") {
                if(key === "employee_image" && file){
                    formData.append(key, file);
                }else if(key === "employee_image" && value.includes('image')){
                    formData.append("", "");
                }else {
                    formData.append(key, value);
                }
            }
        }
        await fetchData(formData);
        console.log(formData, typeof formData, "jhaha")
    };

    //STATIC
    const appStatus = import.meta.env.VITE_APP_STATUS?? "production"

    return (
        <Fragment>
            
            <Card className="w-full max-w-[110rem] xl:max-w-[90rem] ml-auto mr-auto" style={{zoom: 0.85}}>
            <Tabs value={type}>
                    <CardHeader
                        color="teal"
                        variant="gradient"
                        floated={false}
                        shadow={true}
                        id="parent-modal-title"
                        className="m-0 flex justify-center flex-col rounded-b-none py-8 px-4 text-center"
                    >
                        <div className='flex justify-center'>
                            <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                            {!userData?.employee_image && !previewUrl ? 
                            
                            <UserIcon className="h-24 w-24" />
                            :
                            previewUrl ? 
                            <Avatar sx={{ width: 100, height: 100, objectFit: 'contain' }} src={`${previewUrl}`} alt="Preview"/>
                            :
                            <Avatar sx={{ width: 100, height: 100, objectFit: 'contain' }} src={`${APILink.replace('/api/v1', '')}${userData?.employee_image}`} alt="Avatar"/>
                            }
                            </div>
                        </div>
                        <Typography variant="h4" color="white">
                        Full Name: {userData?.first_name} {userData?.middle_name} {userData?.last_name}
                        </Typography>
                        <Typography variant="p" color="white">
                        Registered Employee #: {userData?.emp_no}
                        </Typography>
                        <TabsHeader className="relative z-0 w-full">
                            <Tab value="staticInfo" onClick={() => setType("staticInfo")}>
                            Static Info
                            </Tab>
                            <Tab value="personalInfo" onClick={() => setType("personalInfo")}>
                            Personal
                            </Tab>
                            <Tab value="employmentDetails" onClick={() => setType("employmentDetails")}>
                            Employment
                            </Tab>
                        </TabsHeader>
                    </CardHeader>
                    <CardBody id="parent-modal-description" className="p-4 sm:p-6 xl:p-15">
                        <TabsBody
                            className="!overflow-x-hidden"
                            animate={{
                            mount: {
                                x: 0,
                            },
                            unmount: {
                                x: 300,
                            },
                            }} 
                        >
                        <Box sx={{ display: secondOptionModalEntranceDelay? 'flex' : 'none', zIndex: "999", position: "absolute", top: "0", left: "0", background: "white", height: "100%", width: "100%", opacity: modalEntranceDelay? '1': '0', transition: 'opacity 1s ease'}}>
                            <span style={{marginLeft: "50%", marginTop: "20%"}}><CircularProgress /></span>
                        </Box>
                        <TabPanel value="staticInfo" className="p-0">
                            <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit((data) => onSubmit(data, "type1"))}>
                            <div className="my-4 flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    HR System Details
                                    </Typography>
                                    <div className="my-4 md:flex md:items-center md:gap-4">
                                    <Input 
                                                crossOrigin={undefined} {...register('id')}
                                                type="number"
                                                containerProps={{ className: "min-w-[72px] mb-2" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Database ID: (readonly)"
                                                disabled={true}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input 
                                                crossOrigin={undefined} {...register('bio_id')}
                                                type="number"
                                                max={9999999}
                                                maxLength={7}
                                                containerProps={{ className: "min-w-[72px]  mb-2 focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Biometric ID: (max 7 dig)"
                                                disabled={!editMode}
                                                icon={<FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                    <div className="md:flex md:items-center gap-4">
                                    <Input 
                                                crossOrigin={undefined} {...register('is_superuser')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused  mb-2" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Account Superuser(?):"
                                                disabled={true}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input 
                                                crossOrigin={undefined} {...register('is_active')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]  mb-2 focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Account Active(?):"
                                                disabled={true}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                </div>
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Technical Details
                                    </Typography>
                                    <div className="my-4 md:flex md:items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('emp_no')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] mb-2" }}
                                                label="Emp #:"
                                                maxLength={7}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled                                 />
                                    <Input
                                                crossOrigin={undefined} {...register('user.username')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused mb-2" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Username:"
                                                disabled={true}
                                                icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                                crossOrigin={undefined} {...register('user.role')}
                                                type="number"
                                                containerProps={{ className: "min-w-[72px] mb-2" }}
                                                label="Role #:"
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled={true}
                                                icon={<UserGroupIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                    <Input
                                            crossOrigin={undefined} {...register('email_address')}
                                            type="email"
                                            className=""
                                            label="Email Address:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode}                                    />
                                </div>
                            </div>
                            <div className="my-6">
                                <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-4 font-medium"
                                >
                                Static Info Details
                                </Typography>
                                <div className="my-4 md:flex md:flex-wrap xl:flex-nowrap md:items-center gap-4">
                                <Input
                                            crossOrigin={undefined} {...register('user.is_locked')}
                                            label="Account Lock Status:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            containerProps={{ className: "mb-2" }}
                                            disabled={true}
                                            icon={<LockClosedOutline className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.last_login')}
                                            label="Last Login:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            containerProps={{ className: "mb-2" }}
                                            disabled={true}
                                            icon={<CheckCircleIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.old_password')}
                                            type="password"
                                            label="Old Password:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            containerProps={{ className: "mb-2" }}
                                            disabled={true}
                                            icon={<LockOpenIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.date_added')}
                                            label="Date Added:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            containerProps={{ className: "mb-2" }}
                                            disabled={true}
                                            icon={<UserPlusIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.date_deleted')}
                                            label="Date Deactivated:"
                                            containerProps={{ className: "min-w-[72px] mb-2" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={<XMarkIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                </div>
                                <div className="my-4 md:flex flex-wrap md:flex-nowrap items-center gap-4">
                                <Input
                                            crossOrigin={undefined} {...register('user.failed_login_attempts')}
                                            label="Failed Login Attempts:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            containerProps={{ className: "mb-2" }}
                                            disabled={true}
                                            icon={<XCircleIcon className="h-5 w-5 text-blue-gray-300" />}                                />
                                <Input
                                            crossOrigin={undefined} {...register('user.date_password_changed')}
                                            label="Date Password Changed:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={true}
                                            icon={null
                                                // <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
                                            }                                />
                                </div>
                            </div>
                            <div className="my-4 md:flex md:items-center gap-4">
                                {/* <Button2 
                                    disabled={editMode}
                                    color={editMode? "gray" :"teal"} 
                                    variant={'outlined'} 
                                    size="lg" 
                                    className="w-full"
                                    onClick={()=> setEditMode(true)}
                                >
                                    Edit
                                </Button2> */}

                                {editMode ? 
                                    <Button2 
                                        disabled={!editMode}
                                        color={"teal"} 
                                        size="lg" 
                                        className="w-full"
                                        onClick={()=> setEditMode(false)}
                                    >
                                        CANCEL
                                    </Button2>:
                                    <Button2 
                                        disabled={editMode}
                                        color={editMode? "gray" :"teal"} 
                                        variant={'outlined'} 
                                        size="lg" 
                                        className="w-full"
                                        onClick={()=> setEditMode(true)}
                                    >
                                        Edit
                                    </Button2>
                                }

                                {editMode && <Button2 
                                    type="submit"
                                    color={"teal"} 
                                    size="lg" 
                                    className="w-full"
                                >
                                    Save
                                </Button2>  }
  

                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                            >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                            </Typography>
                            </form>
                        </TabPanel>
                        <TabPanel value="personalInfo" className="p-0">
                            <form 
                                className="mt-12 flex flex-col gap-4" 
                                onSubmit={handleSubmit((data)=> onSubmit(data, "type2"))}
                                // onSubmit={()=> window.alert("submitted")}
                            >
                            <div className="my-0 md:flex flex-wrap md:flex-nowrap items-center gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Profile Details
                                    </Typography>
                                    <Typography variant="small" className="mb-1">
                                    Profile Picture *accepts PNG file only, max 100kb size
                                    </Typography>
                                    <input 
                                        // {...register('employee_image')}
                                        disabled={!editMode2} 
                                        type="file" 
                                        accept="image/jpeg, image/jpg, image/png, image/webp"
                                        className="mb-3"
                                        onChange={handleProfilePic} 
                                    />
                                    <div className="my-4 md:flex md:items-center gap-4">
                                        <Input
                                            crossOrigin={undefined} {...register('first_name')}
                                            type="text"
                                            containerProps={{ className: "min-w-[72px] mb-2" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            label="First Name:"
                                            disabled={!editMode2}
                                            icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}    
                                            required                                
                                        />
                                        <Input 
                                            crossOrigin={undefined} {...register('middle_name')}
                                            type="text"
                                            containerProps={{ className: "min-w-[72px] mb-2 focused" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            label="Middle Name:"
                                            disabled={!editMode2}
                                            icon={<FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />}                
                                            required                    
                                        />
                                    </div>
                                    <div className="my-4 md:flex md:items-center gap-4">
                                    <Input
                                        crossOrigin={undefined} {...register('last_name')}
                                        type="text"
                                        containerProps={{ className: "min-w-[72px] mb-2 focused" }}
                                        labelProps={{ style: { color: true ? "unset" : '' } }}
                                        label="Last Name:"
                                        disabled={!editMode2}
                                        icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}                   
                                        required                 
                                    />
                                    <Input
                                        crossOrigin={undefined} {...register('suffix')}
                                        type="text"
                                        containerProps={{ className: "min-w-[72px] focused" }}
                                        labelProps={{ style: { color: true ? "unset" : '' } }}
                                        label="Suffix:"
                                        disabled={!editMode2}
                                        icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    
                                    />
                                    </div>
                                    <div className="my-4 md:flex md:items-center gap-4">
                                        <Input
                                            crossOrigin={undefined} {...register('graduated_school')}
                                            type="text"
                                            containerProps={{ className: "min-w-[72px] focused" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            label="School Graduated:"
                                            disabled={!editMode2}
                                            icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="my-0 md:flex md:flex-wrap md:flex-nowrap gap-4">
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Personal Details
                                    </Typography>
                                    <div className="my-4 md:flex md:items-center gap-4">
                                        <Select
                                            onChange={(val:any) => setFormSelectData(curr => ({...curr, civil_status: val}))}
                                            placeholder="Select Civil Status"
                                            name="civil_status"
                                            variant="outlined"
                                            label="Civil Status"
                                            disabled={!editMode2}
                                            value={userData?.civil_status?? ""}
                                            className='w-full'
                                        >
                                            <Option value="S">Single</Option>
                                            <Option value="M">Married</Option>
                                            <Option value="A">Anulled</Option>
                                            <Option value="W">Widowed</Option>
                                        </Select>
                            
                                        <Select
                                            onChange={(val:any) => setFormSelectData(curr => ({
                                                ...curr,
                                                gender: val
                                            }))}
                                            placeholder="Select Sex"
                                            name="gender"
                                            variant="outlined"
                                            label="Sex"
                                            disabled={!editMode2} 
                                            value={userData?.gender}
                                            className='w-full'
                                        >
                                            <Option value="M">Male</Option>
                                            <Option value="F">Female</Option>
                                        </Select>
                                    </div>
                                    <div className="my-4 md:flex md:items-center gap-4">
                                        <Input
                                            crossOrigin={undefined} {...register('birthday')}
                                            type="date"
                                            containerProps={{ className: "min-w-[72px] mb-2" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            label="Birthday: YYYY-MM-DD"
                                            value={userData?.birthday?.split("T")[0]}
                                            disabled={!editMode2}
                                            // icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                    
                                        />
                                        <Input 
                                            crossOrigin={undefined} {...register('birth_place')}
                                            type="text"
                                            containerProps={{ className: "min-w-[72px] mb-2 focused" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            label="Birthplace:"
                                            disabled={!editMode2}
                                            icon={<FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />}                                    
                                        />
                                    </div>

                                    <div className="my-4 md:flex md:items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('emergency_contact_person')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] mb-2 focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Emergency Contact Person:"
                                                disabled={!editMode2}
                                                icon={<PhoneIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                                crossOrigin={undefined} {...register('emergency_contact_number')}
                                                type="number"
                                                containerProps={{ className: "min-w-[72px] mb-2 focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Emergency Contact No:"
                                                disabled={!editMode2}
                                                defaultValue={userData?.emergency_contact_number?? ""}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    </div>
                                </div>
                                <div style={{width: "100%"}}>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                    >
                                    Additional Details
                                    </Typography>
                                
                                    <div className="my-4 md:flex md:items-center gap-4">
                                    <Input
                                                crossOrigin={undefined} {...register('blood_type')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] mb-2 md:mb-0" }}
                                                label="Blood Type:"
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled={!editMode2}                                    />
                                    <Input
                                            crossOrigin={undefined} {...register('url_google_map')}
                                            type="text"
                                            containerProps={{ className: "min-w-[72px] mb-2 md:mb-0 focused" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            label="URL Google Map:"
                                            disabled={!editMode2}
                                            icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}    
                                        />
                                    </div>

                                    <div className="my-4 md:flex md:items-center gap-4">
                                        {/* <Province 
                                            setState={setFormSelectData}
                                        />
                                        <CityMunicipality
                                            state={formSelectData}
                                            setState={setFormSelectData}
                                        /> */}
                                        
                                        <SelectProvince 
                                            setState={setFormSelectData}
                                            isDisable={!editMode2}
                                            province_code={userData?.province_code}
                                        />
                                        <SelectCityMunicipality 
                                            state={formSelectData}
                                            setState={setFormSelectData}
                                            isDisable={!editMode2}
                                            city_code={userData?.city_code}
                                        />
                                        <Input
                                            crossOrigin={undefined} {...register('address')}
                                            type="text"
                                            containerProps={{ className: "mb-2 md:mb-0" }}
                                            label="Street Address:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode2}                                    
                                        />
                                        {/* <Input
                                            crossOrigin={undefined} {...register('provincial_address')}
                                            label="Provincial Address:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode2}
                                            icon={<LockClosedOutline className="h-5 w-5 text-blue-gray-300" />}    
                                        /> */}
                                    </div>
                                    <div className="my-4 md:flex md:items-center gap-4">
                                        <Input
                                            crossOrigin={undefined} {...register('profession')}
                                            type="text"
                                            className=""
                                            label="Profession:"
                                            containerProps={{ className: "mb-2 md:mb-0" }}
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode2}    
                                            required                                
                                        />
                                        <Input
                                            crossOrigin={undefined} {...register('license_no')}
                                            label="License No:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode2}
                                            icon={<LockClosedOutline className="h-5 w-5 text-blue-gray-300" />}                                />
                                    </div>
                                    
                                </div>
                            </div>
                            {/* <div className="my-0">
                                <div className="my-0 flex flex-wrap xl:flex-nowrap items-center gap-4">
                                <Input
                                            crossOrigin={undefined} {...register('provincial_address')}
                                            label="Provincial Address:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode2}
                                            icon={<LockClosedOutline className="h-5 w-5 text-blue-gray-300" />}                                />
                                </div>
                            </div> */}


                            
                            <div className="my-4 flex items-center gap-4">

                                {editMode2 ? 
                                    <Button2 
                                        disabled={!editMode2}
                                        color={"teal"} 
                                        size="lg" 
                                        className="w-full"
                                        onClick={()=> setEditMode2(false)}
                                    >
                                        CANCEL
                                    </Button2>:
                                    <Button2 
                                        disabled={editMode2}
                                        color={editMode2? "gray" :"teal"} 
                                        variant={'outlined'} 
                                        size="lg" 
                                        className="w-full"
                                        onClick={()=> setEditMode2(true)}
                                    >
                                        Edit
                                    </Button2>
                                }
                                {/* <Button2 
                                    disabled={editMode2}
                                    color={editMode2? "gray" :"teal"} 
                                    variant={'outlined'} 
                                    size="lg" 
                                    className="w-full"
                                    onClick={()=> setEditMode2(true)}
                                >
                                    Edit
                                </Button2> */}
                                {editMode2 && <Button2 
                                    type="submit"
                                    color={"teal"} 
                                    size="lg" 
                                    className="w-full"
                                >
                                    Save
                                </Button2>  }
  

                            </div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                            >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                            </Typography>
                            </form>
                        </TabPanel>
                        <TabPanel value="employmentDetails" className="p-0">
                            <form className="mt-12 flex flex-col gap-4" onSubmit={handleSubmit((data)=>onSubmit(data, "type3"))}>
                                <div className="my-4 flex flex-wrap md:flex-nowrap gap-4">
                                    <div style={{width: "100%"}}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-4 font-medium"
                                        >
                                        Employment Info
                                        </Typography>
                                        <div className="my-4 md:flex md:items-center gap-4">
                                            <Input
                                                    crossOrigin={undefined} {...register('date_hired')}
                                                    type="text"
                                                    containerProps={{ className: "min-w-[72px] mb-2 md:mb-0" }}
                                                    labelProps={{ style: { color: true ? "unset" : '' } }}
                                                    label="Date Hired:"
                                                    disabled={!editMode3}
                                                    // value={`${userData?.date_hired ? userData?.date_hired : ''}`}
                                                    icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                            <Input
                                                    crossOrigin={undefined} {...register('date_resigned')}
                                                    type="text"
                                                    containerProps={{ className: "min-w-[72px] mb-2 focused" }}
                                                    labelProps={{ style: { color: true ? "unset" : '' } }}
                                                    label="Date Resigned:"
                                                    disabled={!editMode3}
                                                    icon={<FingerPrintIcon className="h-5 w-5 text-blue-gray-300" />}                                        />
                                        </div>
                                        <div className="my-4 md:flex md:items-center gap-4">
                                            <Input
                                                    crossOrigin={undefined} {...register('accnt_no')}
                                                    type="text"
                                                    containerProps={{ className: "min-w-[72px] mb-2 md:mb-0 focused" }}
                                                    labelProps={{ style: { color: true ? "unset" : '' } }}
                                                    label="Account Number:"
                                                    disabled={!editMode3}
                                                    icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}             
                                            />       
                                            <Input
                                                crossOrigin={undefined} {...register('hmo')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] mb-2 md:mb-0 focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="HMO:"
                                                disabled={!editMode3}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}             
                                            />      
                                        </div>
                                        <div className="my-4 flex md:items-center flex-col md:flex-row gap-4">
                                            <Select
                                                onChange={(val:any) => setFormSelectData(curr => ({...curr, employee_type: val}))}
                                                placeholder="Select Employee Type"
                                                name="employee_type"
                                                variant="outlined"
                                                label="Employee Type:"
                                                value={userData?.employee_type}
                                                disabled={!editMode3}
                                                >
                                                <Option value="Compressed">Compressed</Option>
                                                <Option value="Normal">Normal</Option>
                                                <Option value="Field">Field</Option>
                                                <Option value="Field-Auto">Field-Auto</Option>
                                            </Select>
                                            {dropDownData.employmentStatuses.length > 0 && 
                                                <Select
                                                    onChange={(val:any) => setFormSelectData(curr => ({...curr, employment_status: val}))}
                                                    placeholder="Select Employee status"
                                                    name="employment_status"
                                                    variant="outlined"
                                                    label="Employment Status"
                                                    disabled={!editMode3}
                                                    value={userData?.employment_status?.toString()}
                                                >
                                                    {
                                                    dropDownData.employmentStatuses.length > 0 ? dropDownData.employmentStatuses.map((emp_status:any) => (
                                                        <Option key={emp_status.id} value={emp_status.id}>{emp_status.name}</Option>

                                                    ))
                                                    : <Option disabled>No employment status available</Option>
                                                    }
                                                </Select>
                                            }
                                        </div>
                                        <div className="my-4 flex flex-col md:flex-row md:items-center gap-4">
                                            {dropDownData.positions.length > 0 && 
                                                <Select
                                                    onChange={(val:any) => setFormSelectData(curr => ({...curr, position_code: val}))}
                                                    placeholder="Select Position"
                                                    name="position_code"
                                                    variant="outlined"
                                                    label="Position"
                                                    disabled={!editMode3}
                                                    value={userData?.position_code?.toString()?? ""}
                                                >
                                                    {
                                                    dropDownData.positions.length > 0 ? dropDownData.positions.map((pos:any) => (
                                                        <Option key={pos.id} value={pos.id}>{pos.name}</Option>
        
                                                    ))
                                                    : <Option disabled>No positions available</Option>
                                                    }
                                                </Select>
                                            }
                                            <Input
                                                crossOrigin={null} {...register('other_duties_responsibilities')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Other Duties Responsibilties:"
                                                disabled={!editMode3}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}             
                                            />    
                                        </div>
                                        <div className="my-4 flex flex-col md:flex-row md:items-center gap-4">
                                            {dropDownData.approvers.length > 0 &&
                                                <Select
                                                    onChange={(val:any) => setFormSelectData(curr => ({
                                                        ...curr,
                                                        approver1: val
                                                    }))}
                                                    placeholder="Select Approver 1"
                                                    name="approver1"
                                                    variant="outlined"
                                                    label="Approver #1 (required, employee number)"
                                                    value={userData?.approver1}
                                                    disabled={!editMode3}
                                                    aria-required
                                                    >
                                                    {dropDownData.approvers.length > 0 ? dropDownData.approvers.map((approver:any)=> (
                                                        // ![formSelectData.approver1, formSelectData.approver2].includes(approver.emp_no) && <Option value={approver.emp_no}>{approver.full_name}</Option>
                                                        <Option value={approver.emp_no}>{approver.full_name}</Option>
                                                        )): (
                                                        <Option disabled>No Approvers available on the selected department</Option>
                                                    )}
                                                </Select>
                                            }
                                           
                                            {/* <Input
                                                crossOrigin={undefined} {...register('approver1')}
                                                type="number"
                                                containerProps={{ className: "min-w-[72px] mb-2 focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Approver #1 (Employee #):"
                                                disabled={!editMode3}
                                                value={userData?.approver1 as number}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    
                                            /> */}
                                            {dropDownData.approvers.length > 0 && 
                                                <Select
                                                    onChange={(val:any) => setFormSelectData(curr => ({
                                                        ...curr,
                                                        approver2: val
                                                    }))}
                                                    placeholder="Select Approver 2"
                                                    name="approver2"
                                                    variant="outlined"
                                                    label="Approver #2 (required, employee number)"
                                                    value={userData?.approver2}
                                                    disabled={!editMode3}
                                                    aria-required
                                                    >
                                                    {dropDownData.approvers.length > 0 ? dropDownData.approvers.map((approver:any)=> (
                                                        // ![formSelectData.approver1, formSelectData.approver2].includes(approver.emp_no) && <Option value={approver.emp_no}>{approver.full_name}</Option>
                                                        <Option value={approver.emp_no}>{approver.full_name}</Option>
                                                        )): (
                                                        <Option disabled>No Approvers available on the selected department</Option>
                                                    )}
                                                </Select>
                                            }
                                            
                                            {/* <Input
                                                crossOrigin={undefined} {...register('approver2')}
                                                type="number"
                                                containerProps={{ className: "min-w-[72px] mb-2 focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Approver #2 (Employee #):"
                                                disabled={!editMode3}
                                                value={userData?.approver2 as number}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                    
                                            /> */}
                                        </div>

                                    </div>
                                    <div style={{width: "100%"}}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-4 font-medium"
                                        >
                                        Payroll Code
                                        </Typography>
                                        <div className="my-4 flex flex-col md:flex-row md:items-center gap-4">
                                            {/* <Input
                                                crossOrigin={undefined} {...register('city_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px]" }}
                                                label="City Code:"
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                disabled={!editMode3}             
                                            /> */}
                                            {dropDownData.branches.length > 0 && 
                                                <Select
                                                onChange={(val:any) => setFormSelectData(curr => ({...curr, branch_code: val}))}
                                                placeholder="Select Branch"
                                                name="branch_code"
                                                variant="outlined"
                                                label="Branch"
                                                disabled={!editMode3}
                                                value={userData?.branch_code?.toString()}
                                            >
                                                {
                                                dropDownData.branches.length > 0 ? dropDownData.branches.map((branch:any) => (
                                                    <Option key={branch.id} value={branch.id}>{branch.name}</Option>

                                                ))
                                                : <Option disabled>No branches available</Option>
                                                }
                                            </Select>
                                            }
                                            {/* <Select
                                                onChange={(val:any) => setFormSelectData(curr => ({...curr, branch_code: val}))}
                                                placeholder="Select Branch"
                                                name="branch_code"
                                                variant="outlined"
                                                label="Branch"
                                                disabled={!editMode3}
                                                value={userData?.branch_code?.toString()}
                                            >
                                                {
                                                dropDownData.branches.length > 0 ? dropDownData.branches.map((branch:any) => (
                                                    <Option key={branch.id} value={branch.id}>{branch.name}</Option>

                                                ))
                                                : <Option disabled>No branches available</Option>
                                                }
                                            </Select> */}
                                            {dropDownData.departments.length > 0 &&
                                                <Select
                                                    onChange={(val:any) => {
                                                        fetchApprovers(val)
                                                        setFormSelectData(curr => (
                                                            {
                                                                ...curr, 
                                                                department_code: val
                                                            }
                                                        ))
                                                    }}
                                                    placeholder="Select Departments"
                                                    name="department_code"
                                                    variant="outlined"
                                                    label="Department"
                                                    disabled={!editMode3} 
                                                    value={userData?.department_code?.toString()}
                                                >
                                                    {
                                                    dropDownData.departments.length > 0 ? dropDownData.departments.map((department:any) => (
                                                        <Option key={department.id} value={department.id}>{department.name}</Option>
                                                    ))
                                                    : <Option disabled>No departments available</Option>
                                                    }
                                                </Select>
                                            }
                                            {/* <Select
                                                onChange={(val:any) => setFormSelectData(curr => ({...curr, department_code: val}))}
                                                placeholder="Select Departments"
                                                name="department_code"
                                                variant="outlined"
                                                label="Department"
                                                disabled={!editMode3} 
                                                value={userData?.department_code?.toString()}
                                            >
                                                {
                                                dropDownData.departments.length > 0 ? dropDownData.departments.map((department:any) => (
                                                    <Option key={department.id} value={department.id}>{department.name}</Option>
                                                ))
                                                : <Option disabled>No departments available</Option>
                                                }
                                            </Select> */}
                                            {/* <Input
                                                    crossOrigin={undefined} {...register('branch_code')}
                                                    type="text"
                                                    containerProps={{ className: "min-w-[72px] focused" }}
                                                    labelProps={{ style: { color: true ? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                                    label="Branch Code:"
                                                    disabled={!editMode3}
                                                    icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                        /> */}
                                            {/* <Input
                                                    crossOrigin={undefined} {...register('department_code')}
                                                    type="text"
                                                    containerProps={{ className: "min-w-[72px]" }}
                                                    label="Department Code:"
                                                    labelProps={{ style: { color: true ? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                                    disabled={!editMode3}
                                                    icon={<UserGroupIcon className="h-5 w-5 text-blue-gray-300" />}                                        /> */}
                                        </div>
                                        <div className="my-0 flex flex-col md:flex-row md:items-center gap-4">
                                            <Select
                                                onChange={(val:any) => setFormSelectData(curr => ({
                                                ...curr,
                                                rank_code: val
                                                }))}
                                                placeholder="Rank"
                                                name="rank_code"
                                                variant="outlined"
                                                label="Rank"
                                                disabled={!editMode3}
                                                value={userData?.rank_code?.toString()}
                                                aria-required
                                            >
                                                <Option value="1">Announcer</Option>
                                                <Option value="2">Employee</Option>
                                                <Option value="3">Manager/Director</Option>
                                                <Option value="4">HR Staff</Option>
                                                <Option value="5">HR Manager/Director</Option>
                                                <Option value="6">HR Super Admin</Option>
                                                {appStatus == "development" && <Option value="7">Development</Option>}
                                            </Select>
                                            {/* <Input
                                                    crossOrigin={undefined} {...register('rank_code')}
                                                    type="text"
                                                    containerProps={{ className: "min-w-[72px]" }}
                                                    label="Rank Code:"
                                                    labelProps={{ style: { color: true ? "unset" : '' } }}
                                                    disabled={!editMode3}                                        
                                            /> */}
                                            {dropDownData.payrollGroups.length > 0 && 
                                                <Select
                                                    onChange={(val:any) => setFormSelectData(curr => ({...curr, payroll_group_code: val}))}
                                                    placeholder="Select Payroll Group"
                                                    name="payroll_group_code"
                                                    variant="outlined"
                                                    label="Payroll Group"
                                                    disabled={!editMode3} 
                                                    value={userData?.payroll_group_code?.toString()}
                                                >
                                                    {
                                                    dropDownData.payrollGroups.length > 0 ? dropDownData.payrollGroups.map((payroll:any) => (
                                                        <Option key={payroll.id} value={payroll.id}>{payroll.name}</Option>
                                                    ))
                                                    : <Option disabled>No payrolls available</Option>
                                                    }
                                                </Select>
                                            }
                                            
                                            {/* <Input 
                                                    crossOrigin={undefined} {...register('payroll_group_code')}
                                                    type="text"
                                                    containerProps={{ className: "min-w-[72px] focused" }}
                                                    labelProps={{ style: { color: true ? "unset" : '', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                                    label="Payroll Group Code:"
                                                    disabled={!editMode3}
                                                    icon={<TagIcon className="h-5 w-5 text-blue-gray-300" />}                                        /> */}
                                        </div>
                                        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
                                            <Input
                                                onChange={handleDailySalary}
                                                // crossOrigin={undefined} {...register('emp_salary_basic')}
                                                defaultValue={userData?.emp_salary_basic}
                                                type="number"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Daily Salary:"
                                                disabled={!editMode3}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}       
                                            />
                                            <Input
                                                type="number"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Monthly Salary: (For Viewing Only)"
                                                value={monthlySalaryComputation(formSelectData.emp_salary_basic?? userData?.emp_salary_basic?? 0 )}
                                                disabled={!editMode3}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}       
                                            />
                                            {/* <Select
                                                onChange={(val:any) => setFormSelectData(curr => ({
                                                ...curr,
                                                emp_salary_type: val
                                                }))}
                                                placeholder="Select Salary Type"
                                                name="emp_salary_type"
                                                variant="outlined"
                                                label="Salary Type"
                                                disabled={!editMode3}
                                                value={userData?.emp_salary_type}
                                            >
                                                <Option value="1">Monthly</Option>
                                                <Option value="2">Semi-Monthly</Option>
                                                <Option value="3">Project-Based</Option>
                                                <Option value="4">Weekly</Option>
                                            </Select> */}
                                            {/* <Input
                                                    crossOrigin={undefined} {...register('emp_salary_type')}
                                                    type="text"
                                                    containerProps={{ className: "min-w-[72px] focused" }}
                                                    labelProps={{ style: { color: true ? "unset" : '' } }}
                                                    label="Salary Type:"
                                                    disabled={!editMode3}
                                                    icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}         
                                            /> */}
                                        </div>
                                        <div className="my-4 md:flex md:items-center gap-4">
                                            <Input
                                                crossOrigin={undefined} {...register('payroll_no')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Payroll No:"
                                                disabled={!editMode3}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                        
                                            />
                                            {dropDownData.divisions.length > 0 && 
                                                <Select
                                                onChange={(val:any) => setFormSelectData(curr => ({...curr, division_code: val}))}
                                                placeholder="Select Division"
                                                name="division_code"
                                                variant="outlined"
                                                label="Division"
                                                disabled={!editMode3}
                                                value={userData?.division_code as string}
                                            >
                                                {
                                                dropDownData.divisions.length > 0 ? dropDownData.divisions.map((division:any) => (
                                                    <Option key={division.id} value={division.id}>{division.name}</Option>

                                                ))
                                                : <Option disabled>No Division available</Option>
                                                }
                                            </Select>
                                            }
                                            {/* <Input
                                                crossOrigin={undefined} {...register('division_code')}
                                                type="text"
                                                containerProps={{ className: "min-w-[72px] mb-2 md:mb-0 focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Division Code:"
                                                disabled={!editMode3}
                                                icon={<AcademicCapIcon className="h-5 w-5 text-blue-gray-300" />}       
                                            /> */}
                                        </div>
                                        <div className="my-4 flex flex-col md:flex-row md:items-center gap-4">
                                            <Input
                                                crossOrigin={undefined} {...register('insurance_life')}
                                                type="number"
                                                step="0.01"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Insurance Life:"
                                                disabled={!editMode3}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                        
                                            />
                                            <Input
                                                crossOrigin={undefined} {...register('ecola')}
                                                type="number"
                                                step="0.01"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Ecola:"
                                                disabled={!editMode3}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                        
                                            />
                                            <Input
                                                crossOrigin={undefined} {...register('other_deductible')}
                                                type="number"
                                                step="0.01"
                                                containerProps={{ className: "min-w-[72px] focused" }}
                                                labelProps={{ style: { color: true ? "unset" : '' } }}
                                                label="Other Deductibles:"
                                                disabled={!editMode3}
                                                icon={<WindowIcon className="h-5 w-5 text-blue-gray-300" />}                                        
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="my-6">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-4 font-medium"
                                >
                                Static Info Details
                                </Typography>
                                <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
                                    <Input
                                            crossOrigin={undefined} {...register('tax_code')}
                                            label="Tax Identification #:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode3}
                                            icon={<LockClosedOutline className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                            crossOrigin={undefined} {...register('pagibig_code')}
                                            label="HDMF Pagibig:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode3}
                                            icon={<CheckCircleIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                            crossOrigin={undefined} {...register('sssid_code')}
                                            label="SSS ID:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode3}
                                            icon={<LockOpenIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                    <Input
                                            crossOrigin={undefined} {...register('philhealth_code')}
                                            label="Philhealth #:"
                                            labelProps={{ style: { color: true ? "unset" : '' } }}
                                            disabled={!editMode3}
                                            icon={<UserPlusIcon className="h-5 w-5 text-blue-gray-300" />}                                    />
                                </div>
                                </div>
                                <div className="my-4 flex items-center gap-4">
                                
                                {/* {
                                    <Button2 
                                        disabled={editMode3}
                                        color={editMode3? "gray" :"teal"} 
                                        variant={'outlined'} 
                                        size="lg" 
                                        className="w-full"
                                        onClick={()=> setEditMode3(true)}
                                    >
                                        Edit
                                    </Button2>
                                }
                                <Button2 
                                    disabled={editMode3}
                                    color={editMode3? "gray" :"teal"} 
                                    variant={'outlined'} 
                                    size="lg" 
                                    className="w-full"
                                    onClick={()=> setEditMode3(true)}
                                >
                                    Edit
                                </Button2> */}

                                {editMode3 ? 
                                    <Button2 
                                        disabled={!editMode3}
                                        color={"teal"} 
                                        size="lg" 
                                        className="w-full"
                                        onClick={()=> setEditMode3(false)}
                                    >
                                        CANCEL
                                    </Button2>:
                                    <Button2 
                                        disabled={editMode3}
                                        color={editMode3? "gray" :"teal"} 
                                        variant={'outlined'} 
                                        size="lg" 
                                        className="w-full"
                                        onClick={()=> setEditMode3(true)}
                                    >
                                        Edit
                                    </Button2>
                                }
                                
                                {editMode3 && <Button2 
                                    type="submit"
                                    color={"teal"} 
                                    size="lg" 
                                    className="w-full"
                                >
                                    Save
                                </Button2>  }
                                </div>
                                <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                >
                                <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Information are
                                secure and encrypted
                                </Typography>
                            </form>
                        </TabPanel>
                        </TabsBody>
                    </CardBody>
            </Tabs>
            </Card>
            
        </Fragment>

    );
};