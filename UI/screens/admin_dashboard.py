import tkinter as tk
from tkinter import messagebox


class AdminDashboard:
    def __init__(self, app):
        self.app = app
        root = app.root

        tk.Label(root, text="Admin Dashboard", font=("Arial", 16)).pack(pady=10)

        tk.Button(root, text="Add Student", command=self.add_student).pack(pady=5)
        tk.Button(root, text="Add Book", command=self.add_book).pack(pady=5)
        tk.Button(root, text="View Stats", command=self.view_stats).pack(pady=5)
        tk.Button(root, text="Logout", command=self.app.show_login).pack()

    def add_student(self):
        self.app.clear()
        root = self.app.root

        id_entry = tk.Entry(root)
        name_entry = tk.Entry(root)

        tk.Label(root, text="Student ID").pack()
        id_entry.pack()

        tk.Label(root, text="Name").pack()
        name_entry.pack()

        def save():
            try:
                if self.app.library_service.add_member(int(id_entry.get()), name_entry.get()):
                    messagebox.showinfo("Success", "Student added")
                    self.app.show_login()
                else:
                    messagebox.showerror("Error", "Already exists")
            except:
                messagebox.showerror("Error", "Invalid input")

        tk.Button(root, text="Save", command=save).pack()
        tk.Button(root, text="Back", command=lambda: AdminDashboard(self.app)).pack()

    def add_book(self):
        self.app.clear()
        root = self.app.root

        id_entry = tk.Entry(root)
        name_entry = tk.Entry(root)

        tk.Label(root, text="Book ID").pack()
        id_entry.pack()

        tk.Label(root, text="Book Name").pack()
        name_entry.pack()

        def save():
            try:
                if self.app.library_service.add_book(int(id_entry.get()), name_entry.get()):
                    messagebox.showinfo("Success", "Book added")
                    self.app.show_login()
                else:
                    messagebox.showerror("Error", "Already exists")
            except:
                messagebox.showerror("Error", "Invalid input")

        tk.Button(root, text="Save", command=save).pack()
        tk.Button(root, text="Back", command=lambda: AdminDashboard(self.app)).pack()

    def view_stats(self):
        stats = self.app.library_service.get_stats()

        messagebox.showinfo(
            "Stats",
            f"Total: {stats['total']}\n"
            f"Available: {stats['available']}\n"
            f"Borrowed: {stats['borrowed']}\n"
            f"Members: {stats['members']}"
        )