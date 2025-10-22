
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthentication } from '../services/authService';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (handleAuthentication()) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
