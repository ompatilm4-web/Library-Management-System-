import React, { useState, useEffect } from 'react';
import Shell from '../components/Shell';
import { api } from '../api';
import { useToast } from '../useToast';

export default function AdminDash({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const { showToast } = useToast();

  // Form states
  const [bookForm, setBookForm] = useState({ title: '', author: '', genre: 'Fiction' });
  const [studentForm, setStudentForm] = useState({ name: '', email: '' });

  const fetchData = async () => {
    try {
      const [s, b, st, br] = await Promise.all([
        api.stats.get(),
        api.books.getAll(),
        api.students.getAll(),
        api.borrows.getAll()
      ]);
      setStats(s);
      setBooks(b);
      setStudents(st);
      setBorrows(br);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await api.books.create(bookForm);
      showToast('Book added successfully!', 'success');
      setBookForm({ title: '', author: '', genre: 'Fiction' });
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await api.students.create(studentForm);
      showToast('Student registered successfully!', 'success');
      setStudentForm({ name: '', email: '' });
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      await api.borrows.returnBook(borrowId);
      showToast('Book returned successfully!', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const navItems = [
    { id: 'stats', label: 'Dashboard' },
    { id: 'books', label: 'Books' },
    { id: 'students', label: 'Students' },
    { id: 'borrows', label: 'Borrow Log' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBorrows = borrows.filter(br => 
    br.book_title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    br.student_id.toString().includes(searchTerm)
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return (
          <div className="stat-grid">
            <div className="stat-card">
              <p className="text-secondary text-sm">Total Books</p>
              <p className="stat-value">{stats?.total_books || 0}</p>
            </div>
            <div className="stat-card">
              <p className="text-secondary text-sm">Available</p>
              <p className="stat-value">{stats?.available_books || 0}</p>
            </div>
            <div className="stat-card">
              <p className="text-secondary text-sm">Borrowed</p>
              <p className="stat-value">{stats?.borrowed_books || 0}</p>
            </div>
            <div className="stat-card">
              <p className="text-secondary text-sm">Total Students</p>
              <p className="stat-value">{stats?.total_students || 0}</p>
            </div>
            <div className="stat-card">
              <p className="text-secondary text-sm">Active Borrows</p>
              <p className="stat-value">{stats?.active_borrows || 0}</p>
            </div>
          </div>
        );
      case 'books':
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
            <div className="flex gap-4">
              <div style={{ flex: 2 }}>
                <div className="table-container">
                  {filteredBooks.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Genre</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBooks.map(b => (
                          <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.genre}</td>
                            <td>
                              {b.available ? 
                                <span className="badge badge-success">Available</span> : 
                                <span className="badge badge-warning">Borrowed</span>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="empty-state">No books match your search.</div>
                  )}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="card">
                  <h3>Add New Book</h3>
                  <form onSubmit={handleAddBook} className="mt-4">
                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        value={bookForm.title}
                        onChange={e => setBookForm({...bookForm, title: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Author</label>
                      <input 
                        value={bookForm.author}
                        onChange={e => setBookForm({...bookForm, author: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Genre</label>
                      <select 
                        value={bookForm.genre}
                        onChange={e => setBookForm({...bookForm, genre: e.target.value})}
                      >
                        <option>Fiction</option>
                        <option>Fantasy</option>
                        <option>Science Fiction</option>
                        <option>Technology</option>
                        <option>Non-Fiction</option>
                        <option>Mystery</option>
                        <option>Biography</option>
                        <option>History</option>
                        <option>Poetry</option>
                      </select>
                    </div>
                    <button type="submit" className="primary w-full" style={{ width: '100%' }}>Add Book</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      case 'students':
        return (
          <div className="flex flex-col gap-4">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input 
                className="search-input" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div style={{ flex: 2 }}>
                <div className="table-container">
                  {filteredStudents.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map(s => (
                          <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="empty-state">No students match your search.</div>
                  )}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="card">
                  <h3>Register Student</h3>
                  <form onSubmit={handleAddStudent} className="mt-4">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        value={studentForm.name}
                        onChange={e => setStudentForm({...studentForm, name: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email"
                        value={studentForm.email}
                        onChange={e => setStudentForm({...studentForm, email: e.target.value})}
                        required 
                      />
                    </div>
                    <button type="submit" className="primary w-full" style={{ width: '100%' }}>Register Student</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      case 'borrows':
        return (
          <div className="flex flex-col gap-4">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input 
                className="search-input" 
                placeholder="Search by book title or student ID..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="table-container">
              {filteredBorrows.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Student ID</th>
                      <th>Borrowed At</th>
                      <th>Returned At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBorrows.map(br => (
                      <tr key={br.id}>
                        <td>{br.book_title}</td>
                        <td>{br.student_id}</td>
                        <td>{br.borrowed_at}</td>
                        <td>
                          {br.returned_at ? 
                            <span className="badge badge-secondary">{br.returned_at}</span> : 
                            <span className="badge badge-warning">Active</span>
                          }
                        </td>
                        <td>
                          {!br.returned_at && (
                            <button className="primary text-sm" onClick={() => handleReturn(br.id)}>
                              Process Return
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">No borrow records match your search.</div>
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
