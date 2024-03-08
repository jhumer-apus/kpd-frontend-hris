import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { APILink, RootState } from '@/store/configureStore';
import { userLoginActionSuccess, userLogout } from '@/store/actions/auth';
import axios from 'axios'

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, employee_detail, status }= useSelector((state:RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    const userCookie = JSON.parse(Cookies.get('user') || '{}');
    const employeeCookie = JSON.parse(Cookies.get('emp_deetz') || '{}');
    if (token) {
      fetchEmployeeDetails(token, userCookie)
      // dispatch(userLoginActionSuccess(token, userCookie, employeeCookie));
    } else {
      dispatch(userLogout());
    }

    setTimeout(() => {
        setLoading(false);
    }, 200);
    

  }, [dispatch]);

  // useEffect(() => {
  //   if(["logged_in", "logged_out"].includes(status)) {
  //     setLoading(false)
  //   }
  // }, [status])

  const fetchEmployeeDetails = async(token:string, user:any)  => {
    setLoading(true)
    axios.get(`${APILink}employees/${user.emp_no}`).then(res => {
      const employeeDetail = res.data
      dispatch(userLoginActionSuccess(token, user, employeeDetail));
    })
  }

  return { isAuthenticated, loading, user };
}


export default useAuth;