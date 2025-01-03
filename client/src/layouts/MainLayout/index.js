import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container';
import Properties from '../../components/Properties';
import CanvasLayout from '../CanvasLayout';
import ActivityBar from '../../components/ActivityBar';

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserState(parsedUser);
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserState(null);
    navigate('/');
  };

  return (
    <div className="main-layout">
      <header className="main-header">
        <div className="logo">
          <h1>CANVAS DEMO</h1>
        </div>
        <div className="auth-buttons">
          {user ? (
            <>
              <span className="username">{user.username}</span>
              <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <button className="login-button" onClick={() => navigate('/login')}>Login</button>
              <button className="signup-button" onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </header>
      <div className="body-content">
        <ActivityBar />
        <main className="main-content">
          <CanvasLayout />
        </main>
        <Properties />
      </div>
    </div>
  );
};

export default MainLayout;
