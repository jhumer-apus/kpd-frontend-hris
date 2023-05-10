import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { RootState } from '@/store/reducers';
import { userLoginSuccess, userLogout } from '@/store/actions/auth';

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, employee_details }= useSelector((state:RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    const userCookie = JSON.parse(Cookies.get('user') || '{}');
    const employeeCookie = JSON.parse(Cookies.get('employee_details') || '{}');
    console.log(user, "m11", employee_details, "ahaha", employeeCookie, userCookie)
    if (token) {
      dispatch(userLoginSuccess(token, userCookie, employeeCookie));
    } else {
      dispatch(userLogout());
    }

    setTimeout(() => {
        setLoading(false);
    }, 800);
    

  }, [dispatch]);

  return { isAuthenticated, loading };
}


export default useAuth;