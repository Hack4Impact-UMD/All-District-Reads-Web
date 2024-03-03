import React, { useState } from 'react';
import AddBooksForm from '../Components/AddBooksForm';
import '../Library.css'


type Book = {
    id: number;
    title: string;
    description?: string;
    questions?: string[];
    imageUrl?: string;
};

const Library: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [activeBook, setActiveBook] = useState<Book | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const addBookToLibrary = () => {
        const newBook: Book = {
            id: Date.now(), // Using Date.now() for a more unique id...
            title: '',
            description: '',
            questions: [],
            imageUrl: '',
        };
        setBooks([newBook, ...books]);
    };

    const saveBookData = (bookData: Book) => {
        const updatedBooks = books.map((book) => (book.id === bookData.id ? bookData : book));
        setBooks(updatedBooks);
        setActiveBook(null);
    };

    const handleCloseModal = () => {
        setActiveBook(null);
    };
    const deleteBook = (id: number) => {
        setBooks(books.filter(book => book.id !== id));
    };


    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));



    return (
        <div className="library-container">
            <div className="library-header">
                <h1>Library</h1>
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search for a book..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar"
                    />
                </div>

            </div>
            <button onClick={addBookToLibrary}>Add a New Book</button>

            <h2>Recently Added</h2>
            <div className="book-grid">
                {filteredBooks.map((book) => (
                    <div className="book-card" key={book.id}>
                        <div className="book-image-container">
                            {book.imageUrl ? (
                                <img src={book.imageUrl} alt={book.title || 'No title'} />
                            ) : (
                                <div className="book-placeholder">No Image Available</div>
                            )}
                        </div>
                        <div className="book-title">{book.title || 'No Title'}</div>
                        <button className="delete-book" onClick={() => deleteBook(book.id)}>Delete</button>
                        <button className="edit-book" onClick={() => setActiveBook(book)}>Edit</button>
                    </div>
                ))}
            </div>
            {activeBook && (
                <div className="modal show-modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <AddBooksForm
                            book={activeBook}
                            onSave={saveBookData}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};




export default Library;
