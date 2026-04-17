import React from 'react';

export default function Shell({ title, user, navItems, activeTab, setActiveTab, onLogout, children }) {
  return (
    <div className="shell">
      <div className="sidebar">
        <div className="sidebar-header">
          📚 LibraryOS
        </div>
        <div className="p-4">
          <p className="text-secondary text-sm">Logged in as:</p>
          <p className="font-bold">{user.name || user.username}</p>
          <p className="text-secondary text-sm">{user.role.toUpperCase()}</p>
        </div>
        <div className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="p-4 mt-auto">
          <button className="danger w-full" onClick={onLogout} style={{ width: '100%' }}>
            Logout
          </button>
        </div>
      </div>
      <div className="main-content">
        <header className="flex justify-between items-center mb-4">
          <h2>{title}</h2>
        </header>
        {children}
      </div>
    </div>
  );
}
