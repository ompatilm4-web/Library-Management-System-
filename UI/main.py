import tkinter as tk
from Core.services.library_services import LibraryService
from Core.services.auth_services import AuthService
from UI.screens.login import LoginScreen


class App:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Library SaaS")
        self.root.geometry("400x400")

        # Backend
        self.library_service = LibraryService()
        self.auth_service = AuthService()

        self.current_screen = None
        self.show_login()

    def clear(self):
        for widget in self.root.winfo_children():
            widget.destroy()

    def show_login(self):
        self.clear()
        LoginScreen(self)

    def run(self):
        self.root.mainloop()