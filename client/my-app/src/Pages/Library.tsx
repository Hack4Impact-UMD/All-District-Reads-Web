import React, { useState } from 'react';
import AddBooksForm from '../Components/AddBooksForm';
import '../Library.css'


type Book = {
    id: number;
    title: string;
    description?: string;
    questions?: string[];
};

const Library: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [activeBook, setActiveBook] = useState<Book | null>(null);

    const addBookToLibrary = () => {
        const newBook: Book = {
            id: Date.now(), // Using Date.now() for a more unique id...
            title: 'Untitled',
            description: '',
            questions: [],
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


    return (
        <div>
            <h1>Library</h1>
            <button onClick={addBookToLibrary}>Add a New Book</button>
            <h2>Recently Added</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id} onClick={() => setActiveBook(book)}>
                        {book.title}
                    </li>
                ))}
            </ul>
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
