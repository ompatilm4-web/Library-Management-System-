import tkinter as tk
from tkinter import messagebox
from UI.screens.student_dashboard import StudentDashboard
from UI.screens.admin_dashboard import AdminDashboard


class LoginScreen:
    def __init__(self, app):
        self.app = app
        root = app.root

        tk.Label(root, text="Library Login", font=("Arial", 16)).pack(pady=20)

        tk.Button(root, text="Student Login", command=self.student_login).pack(pady=10)
        tk.Button(root, text="Admin Login", command=self.admin_login).pack(pady=10)

    def student_login(self):
        self.app.clear()
        root = self.app.root

        tk.Label(root, text="Student ID").pack()
        entry = tk.Entry(root)
        entry.pack()

        def verify():
            try:
                stu_id = int(entry.get())
                if stu_id in self.app.library_service.members:
                    self.app.clear()
                    StudentDashboard(self.app, stu_id)
                else:
                    messagebox.showerror("Error", "Student not found")
            except:
                messagebox.showerror("Error", "Invalid input")

        tk.Button(root, text="Login", command=verify).pack()
        tk.Button(root, text="Back", command=self.app.show_login).pack()

    def admin_login(self):
        self.app.clear()
        root = self.app.root

        user = tk.Entry(root)
        pwd = tk.Entry(root, show="*")

        tk.Label(root, text="Username").pack()
        user.pack()

        tk.Label(root, text="Password").pack()
        pwd.pack()

        def verify():
            if self.app.auth_service.admin_login(user.get(), pwd.get()):
                self.app.clear()
                AdminDashboard(self.app)
            else:
                messagebox.showerror("Error", "Invalid credentials")

        tk.Button(root, text="Login", command=verify).pack()
        tk.Button(root, text="Back", command=self.app.show_login).pack()