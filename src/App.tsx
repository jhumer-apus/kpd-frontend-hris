// import React from 'react';
// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { RootState } from './store/reducers';
import LoginRegisterPage from './pages/LoginRegisterPage/LoginRegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Loading from './components/Loading/Loading';
import Cookies from 'js-cookie';
import { userLoginSuccess } from './store/actions/auth';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (token === null) {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }
  // }, [token]);
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
      {/* <section>
      <LoginRegisterPage/>
      </section> */}
    <Router>
      <Routes>
        <Route path="/" element={ isAuthenticated ? <Navigate to="/dashboard" /> : <LoginRegisterPage /> }/>
        <Route path="/dashboard" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* {token === null && isAuthenticated === false && <Loading />} */}
    </Router>
    </div>
  );
}

export default App;
