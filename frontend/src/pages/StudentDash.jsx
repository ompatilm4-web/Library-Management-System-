import React, { useState, useEffect } from 'react';
import Shell from '../components/Shell';
import { api } from '../api';
import { useToast } from '../useToast';

export default function StudentDash({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('browse');
  const [books, setBooks] = useState([]);
  const [myHistory, setMyHistory] = useState([]);
  const { showToast } = useToast();

  const fetchData = async () => {
    try {
      const [b, h] = await Promise.all([
        api.books.getAll(),
        api.borrows.getForStudent(user.id)
      ]);
      setBooks(b);
      setMyHistory(h);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      await api.borrows.borrow(user.id, bookId);
      showToast('Book borrowed successfully!', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const navItems = [
    { id: 'browse', label: 'Browse Books' },
    { id: 'history', label: 'My History' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistory = myHistory.filter(h => 
    h.book_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'browse':
        return (
          <div className="flex flex-col gap-4">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input 
                className="search-input" 
                placeholder="Search by title or author..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            {filteredBooks.length > 0 ? (
              <div className="book-grid">
                {filteredBooks.map(b => (
                  <div key={b.id} className={`card book-card genre-${b.genre.toLowerCase().replace(' ', '-')}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-secondary text-sm">{b.genre}</span>
                      {b.available ? 
                        <span className="badge badge-success">Available</span> : 
                        <span className="badge badge-warning">Borrowed</span>
                      }
                    </div>
                    <h3 className="mb-1">{b.title}</h3>
                    <p className="text-secondary mb-4">{b.author}</p>
                    
                    <button 
                      className="primary mt-auto" 
                      disabled={!b.available}
                      onClick={() => handleBorrow(b.id)}
                    >
                      {b.available ? 'Borrow Book' : 'Unavailable'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">No books match your search.</div>
            )}
          </div>
        );
      case 'history':
        return (
          <div className="flex flex-col gap-4">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input 
                className="search-input" 
                placeholder="Search your borrow history..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="table-container">
              {filteredHistory.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Borrowed At</th>
                      <th>Returned At</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map(h => (
                      <tr key={h.id}>
                        <td>{h.book_title}</td>
                        <td>{h.borrowed_at}</td>
                        <td>{h.returned_at || '—'}</td>
                        <td>
                          {h.returned_at ? 
                            <span className="badge badge-secondary">Returned</span> : 
                            <span className="badge badge-warning">Active</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">No records found.</div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <Shell
      title={navItems.find(i => i.id === activeTab).label}
      user={user}
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={onLogout}
    >
      {renderContent()}
    </Shell>
  );
}
