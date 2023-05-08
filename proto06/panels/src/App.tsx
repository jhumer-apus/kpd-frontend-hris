import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Profile } from "./pages/dashboard";

// Authentication Related Imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "./store/reducers";
import Cookies from 'js-cookie';
import { userLoginSuccess } from "./store/actions/auth";



function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  console.log(useSelector((state: RootState) => state), "mwoooww");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(userLoginSuccess(token));
    }
    // setLoading(false);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? <Navigate to="/home"/> : <Auth/>} />
      <Route path="/home/*" element={ isAuthenticated ? <Dashboard/> : <Auth/>} />
      <Route path="/employee/*" element={<Dashboard />} />
      {/* <Route path="/auth/*" element={<Auth />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
