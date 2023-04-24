// import React from 'react';
// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { RootState } from './store/reducers';
import LoginRegisterPage from './pages/LoginRegisterPage/LoginRegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Loading from './components/Loading/Loading';
import Cookies from 'js-cookie';
import { userLoginSuccess } from './store/actions/auth';
import AllFreeSvg from './components/AllFreeSvg/AllFreeSvg';


const App: React.FC = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  // console.log(location, "meowwww");
  useEffect(() => {
    const tokenFromCookie = Cookies.get('token');
    if (tokenFromCookie) {
      dispatch(userLoginSuccess(tokenFromCookie));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={ isAuthenticated ? <Navigate to="/dashboard" /> : <LoginRegisterPage /> }/>
        <Route path="/dashboard/*" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/svgs" element={ <AllFreeSvg />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
