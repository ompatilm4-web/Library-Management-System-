import React, { useState } from 'react';
import { api } from '../api';
import { useToast } from '../useToast';

export default function Login({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('student');
  const [studentId, setStudentId] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api.auth.student(studentId);
      onLoginSuccess(user);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await api.auth.admin(adminUsername, adminPassword);
      onLoginSuccess(user);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-panel auth-demo-info">
          <h1>Welcome to LibraryOS</h1>
          <p className="text-secondary mb-4">A simple, hard-coded library management prototype.</p>
          
          <div className="card mt-4">
            <h3 className="mb-2">Demo Credentials</h3>
            <div className="text-sm">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Students:</strong> 101, 102, 103</p>
            </div>
          </div>
        </div>

        <div className="auth-panel">
          <div className="tabs-header">
            <div 
              className={`tab ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveTab('student')}
            >
              Student
            </div>
            <div 
              className={`tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              Admin
            </div>
          </div>

          {activeTab === 'student' ? (
            <form onSubmit={handleStudentLogin}>
              <div className="form-group">
                <label>Student ID</label>
                <input 
                  type="number" 
                  placeholder="e.g. 101" 
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="primary w-full" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Logging in...' : 'Sign In as Student'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  placeholder="admin" 
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="primary w-full" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Logging in...' : 'Sign In as Admin'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
