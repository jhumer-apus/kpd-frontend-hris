// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { TextField, Button } from '@mui/material';
// import { Input, Typography } from '@material-tailwind/react';
// // import { TextField, Button } from '@material-ui/core';
// import { useForm } from 'react-hook-form';
// // import { fetchUserData, updateUserData } from './userDataActions'; // import your actions
// import { getSpecificEmployeeInfo } from '@/store/actions/employees';
// import { RootState } from '@/store/configureStore';
// import { GetEmployeesListsType } from '@/types/types-store';


// type FormData = {
//   firstName: string;
//   lastName: string;
//   middleName: string;
//   age: number;
//   email: string;
//   password: string;
// };

// export const SpecificEmployee = (props: Object) => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm<GetEmployeesListsType>();
//   const dispatch = useDispatch();
//   const userData = useSelector((state: RootState) => state.employees.specific_employee_info);
//   const [editMode, setEditMode] = useState(false);
//   console.log(userData, "maasd")

//   useEffect(() => {
//     dispatch(getSpecificEmployeeInfo({employee_id: 33333}));
//   }, [dispatch]);

// //   useEffect(() => {
// //     // update form values when userData changes
// //     for (const key in userData) {
// //       setValue(key as keyof FormData, userData.employees.specific_employee_info[key]  );
// //     }
// //   }, [userData, setValue]);

// useEffect(() => {
//     // update form values when userData changes
//     // if (userData) {
//     //   for (const key in userData) {
//     //     setValue(key as keyof FormData, userData[key]);
//     //   }
//     // }
//   }, [userData, setValue]);

//   const onSubmit = (data: FormData) => {
//     dispatch(updateUserData(data));
//     setEditMode(false);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//         <Typography
//             variant="small"
//             color="blue-gray"
//             className="mb-4 font-medium"
//         >
//             Add New Employee
//         </Typography>   
//         <Typography
//             variant="small"
//             color="blue-gray"
//             className="mb-4 font-medium"
//         >
//             Personal Information
//         </Typography>    
//     <div className="my-4 mb-6 flex flex-wrap xl:flex-nowrap items-center gap-6">
//         <div style={{position: 'relative', width: '100%'}}>
//         <Input
//             {...register('first_name', { required: true })}
//             label="First Name:*"
//             disabled={!editMode}
//         />
//         {errors.first_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>First name is required.</sub>}
//         </div>

//         <Input
//         {...register('middle_name')}
//         label="Middle Name:"
//         disabled={!editMode}
//         />
//         <div style={{position: 'relative', width: '100%'}}>
//         <Input
//             {...register('last_name', { required: true })}
//             label="Last Name:*"
//             disabled={!editMode}
//         />
//         {errors.last_name && <sub style={{position: 'absolute', bottom: '-9px', left: '2px', fontSize: '12px'}}>Last name is required.</sub>}
//         </div>
//         <Input
//         {...register('suffix')}
//         label="Suffix:"
//         disabled={!editMode}
//         />
//         <Input
//         {...register('gender')}
//         label="Gender:"
//         containerProps={{ className: "min-w-[20px]" }} 
//         disabled={!editMode}
//         />
//     </div>
//     <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
//         <Input
//             {...register('address')}
//             label="Address:"
//             disabled={!editMode}
//         />
//         <Input
//         {...register('provincial_address')}
//         label="Provincial Address:"
//         disabled={!editMode}
//         />
//         <Input
//         {...register('email_address')}
//         label="Email Address:"
//         disabled={!editMode}
//         />
//     </div>
//     <div className="my-4 flex flex-wrap xl:flex-nowrap items-center gap-4">
//         <Input
//             {...register('mobile_phone')}
//             label="Mobile Phone #:"
//             disabled={!editMode}
//         />
//         <Input
//         {...register('birthday')}
//         label="Birthday"
//         disabled={!editMode}
//         />
//         <Input
//         {...register('email_address')}
//         label="Email Address"
//         disabled={!editMode}
//         />
//     </div>
//     {editMode ? (
//         <Button variant="contained" color="primary" type="submit">
//             Submit
//         </Button>
//         ) : (
//         <Button
//             variant="outlined"
//             color="primary"
//             onClick={() => setEditMode(true)}
//         >
//             Edit
//         </Button>
//         )}

//     </form>
//   );
// };