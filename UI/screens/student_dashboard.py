import tkinter as tk
from tkinter import messagebox


class StudentDashboard:
    def __init__(self, app, stu_id):
        self.app = app
        self.stu_id = stu_id
        root = app.root

        tk.Label(root, text=f"Welcome {app.library_service.members[stu_id].name}").pack()

        self.listbox = tk.Listbox(root)
        self.refresh_books()
        self.listbox.pack()

        tk.Button(root, text="Borrow Book", command=self.borrow).pack()
        tk.Button(root, text="Logout", command=self.app.show_login).pack()

    def refresh_books(self):
        self.listbox.delete(0, tk.END)
        for book in self.app.library_service.get_available_books():
            self.listbox.insert(tk.END, book)

    def borrow(self):
        try:
            book = self.listbox.get(self.listbox.curselection())
            result = self.app.library_service.borrow_book(self.stu_id, book)

            if result == "Success":
                messagebox.showinfo("Success", "Book borrowed")
                self.refresh_books()
            else:
                messagebox.showerror("Error", result)
        except:
            messagebox.showerror("Error", "Select a book")