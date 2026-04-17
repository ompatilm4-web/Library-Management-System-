const API_BASE = '/api';

async function fetcher(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'An error occurred');
  }
  
  return res.json();
}

export const api = {
  auth: {
    admin: (username, password) => fetcher('/auth/admin', { 
      method: 'POST', 
      body: JSON.stringify({ username, password }) 
    }),
    student: (student_id) => fetcher('/auth/student', { 
      method: 'POST', 
      body: JSON.stringify({ student_id: parseInt(student_id) }) 
    }),
  },
  books: {
    getAll: () => fetcher('/books'),
    create: (data) => fetcher('/books', { method: 'POST', body: JSON.stringify(data) }),
  },
  students: {
    getAll: () => fetcher('/students'),
    create: (data) => fetcher('/students', { method: 'POST', body: JSON.stringify(data) }),
  },
  borrows: {
    getAll: () => fetcher('/borrows'),
    getForStudent: (id) => fetcher(`/borrows/student/${id}`),
    borrow: (student_id, book_id) => fetcher('/borrow', {
      method: 'POST', body: JSON.stringify({ student_id: parseInt(student_id), book_id: parseInt(book_id) })
    }),
    returnBook: (borrow_id) => fetcher(`/return/${borrow_id}`, { method: 'POST' }),
  },
  stats: {
    get: () => fetcher('/stats'),
  }
};
