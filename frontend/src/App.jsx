import React, { useState } from 'react';
import Login from './pages/Login';
import AdminDash from './pages/AdminDash';
import StudentDash from './pages/StudentDash';
import { ToastProvider } from './useToast';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const renderPage = () => {
    if (!user) {
      return <Login onLoginSuccess={setUser} />;
    }

    if (user.role === 'admin') {
      return <AdminDash user={user} onLogout={handleLogout} />;
    }

    return <StudentDash user={user} onLogout={handleLogout} />;
  };

  return (
    <ToastProvider>
      <div className="app">
        {renderPage()}
      </div>
    </ToastProvider>
  );
}

export default App;
