# 📚 Library Management System

A lightweight, desktop-based library management application built with **Python** and **Tkinter**, designed to streamline book borrowing and catalog management for small institutions.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Default Credentials](#default-credentials)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## Overview

The Library Management System provides a clean dual-dashboard interface — one for **students** to browse and borrow books, and another for **administrators** to manage the catalog and membership. The application ships with pre-loaded sample data so it's ready to demo or test right out of the box.

---

## Features

### 🎓 Student Dashboard
- Browse the full catalog of available books
- Borrow books instantly with a single action
- View personal borrowing history

### 🛠️ Admin Dashboard
- Add and manage student/member records
- Add new books to the library catalog
- View real-time library statistics and availability

### 📦 General
- Pre-loaded with sample students and books for immediate testing
- Lightweight with no external dependencies beyond the standard library

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Python | 3.x |
| Tkinter | Bundled with Python (see note below) |

> **Note for Ubuntu/Debian users:** Tkinter may need to be installed separately:
> ```bash
> sudo apt-get install python3-tk
> ```

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/library-management.git
   cd library-management
   ```

2. **Verify Python is installed:**
   ```bash
   python3 --version
   ```

3. **Run the application:**
   ```bash
   python3 main.py
   ```

No additional package installation is required.

---

## Usage

On launch, you will be presented with a login screen. Choose your role — **Admin** or **Student** — and enter the appropriate credentials listed below.

### Student Flow
1. Log in using your Student ID.
2. Browse available books in the catalog.
3. Select a book and borrow it instantly.

### Admin Flow
1. Log in with admin credentials.
2. Use the dashboard to add students, add books, or view statistics.

---

## Default Credentials

### Admin
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

### Sample Student Accounts
| Student ID | Name |
|------------|------|
| `101` | Alice Smith |
| `102` | Bob Johnson |
| `103` | Charlie Brown |

> ⚠️ **Security Notice:** Default credentials are intended for development and testing only. Update them before deploying in any production or institutional environment.

---

## Project Structure

```
library-management/
├── main.py               # Application entry point
├── README.md             # Project documentation
└── ...                   # Additional modules and assets
```

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code follows existing conventions and is well-documented.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

*Built with ❤️ using Python & Tkinter*
