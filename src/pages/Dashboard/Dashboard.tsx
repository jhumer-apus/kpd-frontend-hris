// import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import Loading from '../../components/Loading/Loading';
import style from './Dashboard.module.scss';
import SideNavBar from '../../components/SideNavBar/SideNavBar';

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardLoaded, setDashboardLoaded] = useState(false);
    const [animateDown, setAnimateDown] = useState(true);
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        if (token !== null) {
          setTimeout(() => {
            setAnimateDown(false);
          }, 1000);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          setTimeout(() => {
            setDashboardLoaded(true);
          }, 2300);
        }
      }, [token]);
    
      if (loading) {
        return <Loading animateDown={animateDown}/>;
      }
    return (
        <div className={`${style.dashboardWrap} ${dashboardLoaded ? style.dashboardLoaded: ''}`}>
            <SideNavBar />
            <h1>Dashboard Page</h1>
            <h1>Dashboard Page</h1>
            <h1>Dashboard Page</h1>
            <h1>Dashboard Page</h1>
            <h1>Dashboard Page</h1>
        </div>
    );
};

export default Dashboard;