import React, { useState, useEffect } from "react";
import AddBooksForm from "../Components/AddBooksForm";
import "../Library.css";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  doc,
  writeBatch,
} from "firebase/firestore";

//parallels the database, honestly don't need to have lol
type ChapterQuestions = {
  chapterId: string;
  chapterNumber: number;
  questions: string[];
  answers: string[];
};

type Book = {
  id: string;
  title: string;
  description?: string;
  chapters?: ChapterQuestions[];
  imageUrl?: string;
};

const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdownMenu, setShowDropdownMenu] = useState<string | null>(null);
  const bookCollection = collection(db, "books");
  const [view, setView] = useState<'grid' | 'list' | 'add'>('grid');
  const placeholderBook: Book = {
    id: '',
    title: '',
    description: '',
    chapters: [],
    imageUrl: ''
  };

  //load the books
  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(bookCollection);
      const booksWithChapters: Book[] = [];

      for (const doc of querySnapshot.docs) {
        const bookData: Book = doc.data() as Book;
        bookData.id = doc.id; // Make sure to set the book id from the document

        // Now fetch chapters for this book
        const chaptersRef = collection(db, "books", doc.id, "Chapters");
        const chaptersSnapshot = await getDocs(chaptersRef);
        const chapterMap: { [key: number]: ChapterQuestions } = {};

        chaptersSnapshot.forEach((chapterDoc) => {
          const chapterData = chapterDoc.data();
          const chapterNumber = chapterData.chapterNumber;

          // Initialize the chapter in the map if it doesn't exist
          if (!chapterMap[chapterNumber]) {
            chapterMap[chapterNumber] = {
              chapterId: chapterDoc.id, // Assuming the chapter document id is what you mean by chapterData.id
              chapterNumber: chapterNumber,
              questions: [],
              answers: [],
            };
          }

          // Push the question and answer into the chapter
          chapterMap[chapterNumber].questions.push(...chapterData.questions); // Assuming these are arrays
          chapterMap[chapterNumber].answers.push(...chapterData.answers);
        });

        // Convert the map into an array of ChapterQuestions
        bookData.chapters = Object.values(chapterMap);
        booksWithChapters.push(bookData);
        // console.log(bookData);
      }

      // Set the state with all books including their chapters
      setBooks(booksWithChapters);
    };

    fetchBooks();
  }, []);

  const BookList = ({ books }: { books: Book[] }) => (
    <div>
      {books.map((book) => (
        <div
          key={book.id}
          className="book-list-item"
          onClick={() => setActiveBook(book)} // Set the activeBook when an item is clicked
        >
          <div>{book.title || "No Title"}</div>
          <div>{book.description}</div>
          {/* Add more book details you want to list */}
        </div>
      ))}
    </div>
  );


  const handleAddBookClick = () => {
    const tempId = `temp-${Date.now()}`; // Generate a temporary unique ID
    setActiveBook({
      id: tempId,
      title: '',
      description: '',
      chapters: [],
      imageUrl: ''
    });

  };

  //add it in baby
  const addBookToLibrary = async () => {
    const chId = Date.now().toString();
    const id = Date.now().toString();
    const temp = [
      {
        chapterId: chId,
        chapterNumber: 1,
        questions: ["Question"],
        answers: ["Answer"],
      },
    ];
    const bookRef = doc(db, "books", id);
    const newBook: Book = {
      id: id,
      title: "",
      description: "",
      chapters: temp,
      imageUrl: "",
    };

    await setDoc(bookRef, { title: "", description: "", imageUrl: "" });
    const chapterRef = doc(db, "books", id, "Chapters", chId);
    await setDoc(chapterRef, {
      chapterNumber: 1,
      questions: ["Question"],
      answers: ["Answer"],
    });
    setBooks([newBook, ...books]);
    // console.log(newBook);
    // console.log(temp);
  };
  const saveBookData = async (bookData: Book) => {
    let savedBookId = bookData.id;

    if (!bookData.id.startsWith('temp-')) {
      // Existing book: Update logic here
    } else {
      // New book: Save logic here
      const docRef = await addDoc(collection(db, "books"), {
        title: bookData.title,
        description: bookData.description,
        // Other properties...
      });
      savedBookId = docRef.id; // Update with the permanent ID from Firestore
    }

    // Update the local state with the new or updated book
    // For a new book, replace the temporary ID with the permanent Firestore ID
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookData.id ? { ...bookData, id: savedBookId } : book)
    );

    // Additional logic to handle the state update...
  };



  const handleCloseModal = () => {
    setActiveBook(null);
  };

  //delete in database and array
  const deleteBook = async (id: string) => {
    if (!id) {
      console.error("Book ID is invalid.");
      return;
    }

    // Now we're sure the ID is valid, proceed with deletion
    const chaptersRef = collection(db, `books/${id}/Chapters`);

    // Fetch all documents in the "Chapters" subcollection
    const querySnapshot = await getDocs(chaptersRef);
    const batch = writeBatch(db);

    // Add each chapter document to the batch delete
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    await deleteDoc(doc(db, "books", id));
    setBooks(books.filter((book) => book.id !== id));
  };


  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {/* View mode buttons */}
          <div className="view-buttons">
            <button onClick={() => setView('grid')}>Grid View</button>
            <button onClick={() => setView('list')}>List View</button>
            <button onClick={handleAddBookClick}>Add Book</button>
          </div>
        </div>
      </div>

      <h2>Recently Added</h2>
      {view === 'grid' && (
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <div className="book-image-container">
                {/* Book image or placeholder */}
              </div>
              <div className="book-title">{book.title || "No Title"}</div>
              <div className="dropdown">
                <button
                  className="dropbtn"
                  onClick={() =>
                    setShowDropdownMenu(
                      showDropdownMenu === book.id ? null : book.id
                    )
                  }
                >
                  Edit
                </button>
                {showDropdownMenu === book.id && (
                  <div className="dropdown-content">
                    <button onClick={() => setActiveBook(book)}>Modify</button>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {view === 'list' && (
        <div>
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-list-item">
              <div>{book.title || "No Title"}</div>
            </div>
          ))}
        </div>
      )}

      {view === 'add' && (
        <AddBooksForm
          book={placeholderBook}
          onSave={saveBookData}
          onClose={handleCloseModal}
        />
      )}

      {activeBook && (
        <div className="modal show-modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
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
