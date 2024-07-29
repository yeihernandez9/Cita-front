import React from 'react';
import AppBars from '../components/AppBar/AppBar';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const LayoutPrivate: React.FC = () => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn === undefined) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? (
    <div>
      <AppBars />
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default LayoutPrivate;