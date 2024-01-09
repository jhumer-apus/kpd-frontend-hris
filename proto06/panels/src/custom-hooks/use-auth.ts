import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { RootState } from '@/store/configureStore';
import { userLoginActionSuccess, userLogout } from '@/store/actions/auth';

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, employee_detail }= useSelector((state:RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    const userCookie = JSON.parse(Cookies.get('user') || '{}');
    const employeeCookie = JSON.parse(Cookies.get('employee_detail') || '{}');
    if (token) {
      dispatch(userLoginActionSuccess(token, userCookie, employeeCookie));
    } else {
      dispatch(userLogout());
    }

    setTimeout(() => {
        setLoading(false);
    }, 200);
    

  }, [dispatch]);

  return { isAuthenticated, loading };
}


export default useAuth;