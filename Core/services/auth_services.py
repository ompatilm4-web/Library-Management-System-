class AuthService:
    def __init__(self):
        self.admin_username = "admin"
        self.admin_password = "admin123"

    def admin_login(self, username, password):
        return username == self.admin_username and password == self.admin_password