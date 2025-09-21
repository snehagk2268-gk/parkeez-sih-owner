import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import PropertyDetails from './components/PropertyDetails';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';

type AppState = 'login' | 'property-details' | 'dashboard';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [userData, setUserData] = useState(null);

  const handleLogin = (data: any) => {
    setUserData(data);
    setCurrentState('property-details');
  };

  const handlePropertyComplete = () => {
    setCurrentState('dashboard');
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentState('login');
  };

  if (currentState === 'login') {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Layout currentPage={currentState} onLogout={handleLogout}>
      {currentState === 'property-details' ? (
        <PropertyDetails onComplete={handlePropertyComplete} />
      ) : (
        <Dashboard />
      )}
    </Layout>
  );
}

export default App;