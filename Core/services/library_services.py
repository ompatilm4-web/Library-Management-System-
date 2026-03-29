from Core.models.book import Book
from Core.models.member import Member

class LibraryService:
    def __init__(self):
        self.books = {}
        self.members = {}
        self.borrowed = {}

        # Hardcoded Initial Data
        self.add_member(101, "Alice Smith")
        self.add_member(102, "Bob Johnson")
        self.add_member(103, "Charlie Brown")

        self.add_book(1, "Python Programming")
        self.add_book(2, "Data Structures")
        self.add_book(3, "Algorithms")
        self.add_book(4, "Machine Learning")

    def add_member(self, member_id, name):
        if member_id in self.members:
            return False
        self.members[member_id] = Member(member_id, name)
        return True

    def add_book(self, book_id, name):
        if name in self.books:
            return False
        self.books[name] = Book(book_id, name)
        return True

    def borrow_book(self, member_id, book_name):
        if member_id not in self.members:
            return "Member not found"

        if book_name not in self.books:
            return "Book not available"

        self.borrowed[book_name] = member_id
        del self.books[book_name]

        return "Success"

    def get_available_books(self):
        return list(self.books.keys())

    def get_stats(self):
        return {
            "total": len(self.books) + len(self.borrowed),
            "available": len(self.books),
            "borrowed": len(self.borrowed),
            "members": len(self.members)
        }