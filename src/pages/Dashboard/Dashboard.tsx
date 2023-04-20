// import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import Loading from '../../components/Loading/Loading';

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        if (token !== null) {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      }, [token]);
    
      if (loading) {
        return <Loading />;
      }
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};

export default Dashboard;