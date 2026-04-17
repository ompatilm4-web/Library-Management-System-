from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import time

app = FastAPI(title="LibraryOS API")

# Setup CORS to allow React frontend to communicate with FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------- DATA MODEL (Hardcoded dictionaries) -------------

# ------------- DATA MODEL (Hardcoded dictionaries) -------------

books_db = {
    1: {"id": 1, "title": "The Name of the Wind", "author": "Patrick Rothfuss", "genre": "Fantasy", "available": True},
    2: {"id": 2, "title": "Clean Code", "author": "Robert C. Martin", "genre": "Technology", "available": True},
    3: {"id": 3, "title": "Dune", "author": "Frank Herbert", "genre": "Science Fiction", "available": False},
    4: {"id": 4, "title": "Sapiens", "author": "Yuval Noah Harari", "genre": "Non-Fiction", "available": True},
    5: {"id": 5, "title": "1984", "author": "George Orwell", "genre": "Fiction", "available": True},
    6: {"id": 6, "title": "Design Patterns", "author": "Erich Gamma et al.", "genre": "Technology", "available": True},
    7: {"id": 7, "title": "To Kill a Mockingbird", "author": "Harper Lee", "genre": "Fiction", "available": True},
    8: {"id": 8, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "available": True},
    9: {"id": 9, "title": "Brave New World", "author": "Aldous Huxley", "genre": "Science Fiction", "available": True},
    10: {"id": 10, "title": "The Silent Patient", "author": "Alex Michaelides", "genre": "Mystery", "available": True},
    11: {"id": 11, "title": "Gone Girl", "author": "Gillian Flynn", "genre": "Mystery", "available": True},
    12: {"id": 12, "title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "Fantasy", "available": True},
    13: {"id": 13, "title": "A Brief History of Time", "author": "Stephen Hawking", "genre": "Science Fiction", "available": True},
    14: {"id": 14, "title": "Steve Jobs", "author": "Walter Isaacson", "genre": "Biography", "available": True},
    15: {"id": 15, "title": "The Diary of a Young Girl", "author": "Anne Frank", "genre": "History", "available": True},
    16: {"id": 16, "title": "Guns, Germs, and Steel", "author": "Jared Diamond", "genre": "History", "available": True},
    17: {"id": 17, "title": "Milk and Honey", "author": "Rupi Kaur", "genre": "Poetry", "available": True},
    18: {"id": 18, "title": "The Waste Land", "author": "T.S. Eliot", "genre": "Poetry", "available": True},
    19: {"id": 19, "title": "The 7 Habits of Highly Effective People", "author": "Stephen Covey", "genre": "Non-Fiction", "available": True},
    20: {"id": 20, "title": "Thinking, Fast and Slow", "author": "Daniel Kahneman", "genre": "Non-Fiction", "available": True},
    21: {"id": 21, "title": "Deep Work", "author": "Cal Newport", "genre": "Technology", "available": True},
    22: {"id": 22, "title": "The Pragmatic Programmer", "author": "Andrew Hunt", "genre": "Technology", "available": True},
    23: {"id": 23, "title": "Foundation", "author": "Isaac Asimov", "genre": "Science Fiction", "available": True},
    24: {"id": 24, "title": "Murder on the Orient Express", "author": "Agatha Christie", "genre": "Mystery", "available": True},
    25: {"id": 25, "title": "Leonardo da Vinci", "author": "Walter Isaacson", "genre": "Biography", "available": True},
    26: {"id": 26, "title": "Sapiens: A Graphic History", "author": "Yuval Noah Harari", "genre": "History", "available": True},
    27: {"id": 27, "title": "Project Hail Mary", "author": "Andy Weir", "genre": "Science Fiction", "available": True},
    28: {"id": 28, "title": "Educated", "author": "Tara Westover", "genre": "Biography", "available": True},
    29: {"id": 29, "title": "Sherlock Holmes: Complete Works", "author": "Arthur Conan Doyle", "genre": "Mystery", "available": True},
    30: {"id": 30, "title": "Becoming", "author": "Michelle Obama", "genre": "Biography", "available": True},
    31: {"id": 31, "title": "The Silk Roads", "author": "Peter Frankopan", "genre": "History", "available": True},
}

students_db = {
    101: {"id": 101, "name": "Alice Smith", "email": "alice@example.com"},
    102: {"id": 102, "name": "Bob Johnson", "email": "bob@example.com"},
    103: {"id": 103, "name": "Charlie Brown", "email": "charlie@example.com"},
    104: {"id": 104, "name": "Diana Ross", "email": "diana@example.com"},
    105: {"id": 105, "name": "Edward Norton", "email": "edward@example.com"},
    106: {"id": 106, "name": "Fiona Apple", "email": "fiona@example.com"},
    107: {"id": 107, "name": "George Miller", "email": "george@example.com"},
    108: {"id": 108, "name": "Hannah Montana", "email": "hannah@example.com"},
    109: {"id": 109, "name": "Ian McKellen", "email": "ian@example.com"},
    110: {"id": 110, "name": "Jane Doe", "email": "jane@example.com"},
}

# The borrow records
borrows_db = {
    1001: {
        "id": 1001,
        "student_id": 102,
        "book_id": 3,
        "book_title": "Dune",
        "borrowed_at": "2023-10-01 10:00",
        "returned_at": None
    },
    1002: {
        "id": 1002,
        "student_id": 101,
        "book_id": 1,
        "book_title": "The Name of the Wind",
        "borrowed_at": "2023-11-15 09:30",
        "returned_at": "2023-12-01 14:00"
    },
    1003: {
        "id": 1003,
        "student_id": 103,
        "book_id": 4,
        "book_title": "Sapiens",
        "borrowed_at": "2024-01-10 11:20",
        "returned_at": None
    }
}

# ID Counters
next_book_id = 32
next_student_id = 111
next_borrow_id = 1004

# ------------- PYDANTIC MODELS -------------

class AdminLogin(BaseModel):
    username: str
    password: str

class StudentLogin(BaseModel):
    student_id: int

class BookCreate(BaseModel):
    title: str
    author: str
    genre: str

class StudentCreate(BaseModel):
    name: str
    email: str

class BorrowCreate(BaseModel):
    student_id: int
    book_id: int

# ------------- ENDPOINTS -------------

# 1. Auth

@app.post("/auth/admin")
def auth_admin(req: AdminLogin):
    if req.username == "admin" and req.password == "admin123":
        return {"id": 0, "username": "admin", "role": "admin"}
    raise HTTPException(status_code=401, detail="Invalid admin credentials")

@app.post("/auth/student")
def auth_student(req: StudentLogin):
    student = students_db.get(req.student_id)
    if student:
        return {**student, "role": "student"}
    raise HTTPException(status_code=404, detail="Student not found")

# 2. Books

@app.get("/books")
def get_books():
    return list(books_db.values())

@app.post("/books")
def create_book(req: BookCreate):
    global next_book_id
    new_book = {
        "id": next_book_id,
        "title": req.title,
        "author": req.author,
        "genre": req.genre,
        "available": True
    }
    books_db[next_book_id] = new_book
    next_book_id += 1
    return new_book

# 3. Students

@app.get("/students")
def get_students():
    return list(students_db.values())

@app.post("/students")
def create_student(req: StudentCreate):
    global next_student_id
    new_student = {
        "id": next_student_id,
        "name": req.name,
        "email": req.email
    }
    students_db[next_student_id] = new_student
    next_student_id += 1
    return new_student

# 4. Borrows / Returns

@app.get("/borrows")
def get_borrows():
    # Return sorted by latest first
    return sorted(list(borrows_db.values()), key=lambda x: x["id"], reverse=True)

@app.get("/borrows/student/{student_id}")
def get_student_borrows(student_id: int):
    # Filter and return sorted by latest first
    student_borrows = [b for b in borrows_db.values() if b["student_id"] == student_id]
    return sorted(student_borrows, key=lambda x: x["id"], reverse=True)

@app.post("/borrow")
def create_borrow(req: BorrowCreate):
    global next_borrow_id
    if req.student_id not in students_db:
        raise HTTPException(status_code=404, detail="Student not found")
    
    book = books_db.get(req.book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    if not book["available"]:
        raise HTTPException(status_code=400, detail="Book is not available")
    
    # Mark book as unavailable
    books_db[req.book_id]["available"] = False
    
    # Create record
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    new_borrow = {
        "id": next_borrow_id,
        "student_id": req.student_id,
        "book_id": req.book_id,
        "book_title": book["title"],
        "borrowed_at": now_str,
        "returned_at": None
    }
    borrows_db[next_borrow_id] = new_borrow
    next_borrow_id += 1
    
    return new_borrow

@app.post("/return/{borrow_id}")
def return_book(borrow_id: int):
    borrow = borrows_db.get(borrow_id)
    if not borrow:
        raise HTTPException(status_code=404, detail="Borrow record not found")
    
    if borrow["returned_at"] is not None:
        raise HTTPException(status_code=400, detail="Book is already returned")
    
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    borrow["returned_at"] = now_str
    
    # Mark book as available
    if borrow["book_id"] in books_db:
        books_db[borrow["book_id"]]["available"] = True
        
    return borrow

# 5. Stats

@app.get("/stats")
def get_stats():
    total_books = len(books_db)
    available_books = sum(1 for b in books_db.values() if b["available"])
    borrowed_books = total_books - available_books
    total_students = len(students_db)
    active_borrows = sum(1 for b in borrows_db.values() if b["returned_at"] is None)
    
    return {
        "total_books": total_books,
        "available_books": available_books,
        "borrowed_books": borrowed_books,
        "total_students": total_students,
        "active_borrows": active_borrows
    }
