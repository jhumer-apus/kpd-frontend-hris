// import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import Loading from '../../components/Loading/Loading';

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [animateDown, setAnimateDown] = useState(true);
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        if (token !== null) {
          // setTimeout(() => {
          //   setAnimateDown(true);
          // }, 200);
          setTimeout(() => {
            setAnimateDown(false);
          }, 1000);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      }, [token]);
    
      if (loading) {
        return <Loading animateDown={animateDown}/>;
      }
    return (
        <div>
            <h1>Dashboard Page</h1>
        </div>
    );
};

export default Dashboard;