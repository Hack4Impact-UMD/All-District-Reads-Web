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
        console.log(bookData);
      }

      // Set the state with all books including their chapters
      setBooks(booksWithChapters);
    };

    fetchBooks();
  }, []);

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
    console.log(newBook);
    console.log(temp);
  };
  //lowkey don't need these
  const saveBookData = async (bookData: Book) => {
    console.log(bookData);

    setActiveBook(null);
  };

  const handleCloseModal = () => {
    setActiveBook(null);
  };

  //delete in database and array
  const deleteBook = async (id: string) => {
    const chaptersRef = collection(db, "books", id, "Chapters");
    const querySnapshot = await getDocs(chaptersRef);
    const batch = writeBatch(db);

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
        </div>
      </div>
      <button onClick={addBookToLibrary}>Add a New Book</button>

      <h2>Recently Added</h2>
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
