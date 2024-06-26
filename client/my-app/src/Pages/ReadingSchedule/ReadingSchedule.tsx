import React, { useState, useEffect } from 'react';
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc
} from "firebase/firestore";
import { FormControl, InputLabel, Select, MenuItem, Button, Checkbox, TextField } from '@mui/material';
import ReadingScheduleBottom from './ReadingScheduleBottom';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import styles from "./ReadingSchedule.module.css";
import { Dayjs } from "dayjs";

type Chapter = {
  chapterId: string;
  chapterNumber: number;
  questions: string[];
  answers: string[];
};

type Book = {
  id: string;
  title: string;
  description?: string;
  chapters?: Chapter[];
  imageUrl?: string;
};

const ReadingSchedule = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedReadingPeriod, setSelectedReadingPeriod] = useState<string>('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [chapterAssignmentTitle, setChapterAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [url, setUrl] = useState("");

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksData: Book[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || "No Title",
        description: doc.data().description || "",
        imageUrl: doc.data().imageUrl || "",
        chapters: doc.data().chapters || [],
      }));
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  // Fetch chapters when a book is selected
  useEffect(() => {
    if (!selectedBook) return;

    const fetchChapters = async () => {
      const chaptersRef = collection(db, "books", selectedBook, "Chapters");
      const snapshot = await getDocs(chaptersRef);
      const chaptersData: Chapter[] = snapshot.docs.map(doc => ({
        chapterId: doc.id,
        chapterNumber: doc.data().chapterNumber, // Make sure your data model matches this
        questions: doc.data().questions || [],
        answers: doc.data().answers || []  // Assuming questions are stored directly
      }));
      setChapters(chaptersData);
    };

    fetchChapters();
  }, [selectedBook]);

  // Fetch questions when a chapter is selected
  useEffect(() => {
    if (!selectedChapter) return;

    const selectedChapterData = chapters.find(chap => chap.chapterId === selectedChapter);
    if (selectedChapterData) {
      setQuestions(selectedChapterData.questions);
    }
  }, [selectedChapter, chapters]);

  const handleSaveChapter = async () => {
    if (!selectedBook || !selectedChapter || !date || chapterAssignmentTitle.trim() === '' || assignmentDescription.trim() === '') {
      alert('Please fill all fields before saving.');
      return;
    }

    const newReadingSchedule = {
      bookId: selectedBook,
      chapterIds: selectedChapter, 
      createdBy: "1", // This should be dynamically set based on the user (e.g., from auth)
      readingPeriod: selectedReadingPeriod,
      dueDates: [date?.format("MM/DD")], // Formatting the date to match your Firestore format
      schoolDistrictId: "District 1" // This should be dynamically set based on user or configuration
    };

    try {
      const docRef = doc(collection(db, "readingSchedules"));
      await setDoc(docRef, newReadingSchedule);
      alert('Reading schedule saved successfully!');
    } catch (error) {
      console.error("Error writing document: ", error);
      alert('Failed to save reading schedule.');
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = e.target.value;
    const regex = /^(Spring|Fall|Summer|Winter)\s*(\d{4,})$/i;
    const match = input.match(regex);

    if (match) {
        const season = match[1].toLowerCase();
        const year = parseInt(match[2], 10);

        if (year >= 2024) {
            setSelectedReadingPeriod(`${season} ${year}`);
        } else {
            alert('The year must be greater than 2024.');
        }
    } else {
        alert('Invalid input. The format should be "<Season> <Year>". Season should be one of the following - Spring, Summer, Fall, Winter');
    }
};

  return (
    <div className={styles.page}>
      <div className={styles.pageTop}>
        <h1 className={styles.pageTitle}>New Book Assignment</h1>
        <div className={styles.selectBookContainer}>
          <FormControl fullWidth sx={{ 
            gap: '10px',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'colum'
            }}>
            <InputLabel>Select Book</InputLabel>
            <Select
              value={selectedBook}
              label="Select Book"
              onChange={(e => setSelectedBook(e.target.value))}
              sx={{
                backgroundColor: '#0071ba', // Change the background color to blue
                color: 'white', // Change text color to white
                height: 50, // Adjust height
                '& .MuiInputBase-input': {
                  color: 'white', // Change the text color to white
                },
                '& .MuiSelect-icon': {
                  color: 'white', // Change the icon color to white
                }
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {books.map(book => (
                <MenuItem key={book.id} value={book.id}>
                  {book.title}
                </MenuItem>
              ))}
            </Select>
            <TextField
                value={selectedReadingPeriod}
                label="Select Reading Period"
                onBlur={handleBlur}
                onChange={(e => setSelectedReadingPeriod(e.target.value))}
                sx={{
                  backgroundColor: '#0071ba', // Change the background color to blue
                  '& .MuiInputBase-input': {
                    color: 'white', // Change the text color to white
                  },
                }}
            />
          </FormControl>
        </div>
      </div>
      <div className={styles.newChapterContainer}>
        <div className={styles.title}>New Chapter Assignment</div>
        <div className={styles.inputContainer}>
          <div className={styles.leftQuestionContainer}>
            <div className={styles.subtitle}>Assigned Chapter</div>
            <FormControl className={styles.select}>
              <InputLabel>Select Chapter</InputLabel>
              <Select
                value={selectedChapter}
                label="Select Chapter"
                onChange={(e => setSelectedChapter(e.target.value))}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {chapters.map(chap => (
                  <MenuItem key={chap.chapterId} value={chap.chapterId}>
                    {`Chapter ${chap.chapterNumber}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={styles.subtitle}>Chapter Due Date</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Due Date"
                  value={date}
                  onChange={setDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className={styles.rightQuestionContainer}>
            <TextField
              className={styles.inputBox}
              fullWidth
              placeholder="Chapter Assignment Title"
              value={chapterAssignmentTitle}
              onChange={(e) => setChapterAssignmentTitle(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              className={styles.inputBox}
              placeholder="Assignment Description"
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.chapterQuestionDatabase}>
        <div className={styles.title}>Chapter Questions Database</div>
        <div className={styles.questionsHeader}>
          <div className={styles.subtitle}>Selected Questions</div>
          <Button className={styles.button}>Clear All</Button>
        </div>
        <div className={styles.questionsContainer}>
          {questions.map((question, index) => (
            <div key={index} className={styles.question}>
              {question}
              <Checkbox />
            </div>
          ))}
        </div>
        <div className={styles.subtitle}>Read-Aloud Video URL</div>
        <TextField
          fullWidth
          className={styles.inputBox}
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className={styles.saveButtonContainer}>
        <button className="save-chapter" onClick={handleSaveChapter}>Save Chapter</button>
      </div>

      <ReadingScheduleBottom />
    </div>
  );
};

export default ReadingSchedule;
