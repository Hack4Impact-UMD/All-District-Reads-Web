import { useState } from "react";
import styles from "./ReadingSchedule.module.css";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface ReadingScheduleProps {}

const ReadingSchedule = (props: ReadingScheduleProps) => {
  const [chapterAssignmentTitle, setChapterAssignmentTitle] =
    useState<string>();
  const [assignmentDescription, setAssignmentDescription] = useState<string>();
  const [bookTitle, setBookTitle] = useState<string>();
  const [assignedChapter, setAssignedChapter] = useState<string>();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [url, setUrl] = useState<string>();

  // TODO: update w/ info from db
  const bookTitleOptions = ["Cat in the Hat", "Moby Dick", "The Hobbit"];
  const assignedChapterOptions = ["Chapter 1", "Chapter 2", "Chapter 3"];
  const questions = [
    "What bowl of porridge did she eat",
    "What color is Goldilocks' hair?",
    "How many bears were there?",
    "What type of food did Goldilocks eat?",
    "What type of food did Goldilocks eat?",
    "What type of food did Goldilocks eat?",
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageTop}>
        <div className={styles.pageTitle}>New Book Assignment</div>
        <FormControl className={styles.select}>
          <InputLabel id="bookTitleLabel">Book Title</InputLabel>
          <Select
            labelId="bookTitleLabel"
            value={bookTitle}
            onChange={(e) => {
              if (e?.target.value != null) {
                setBookTitle(e.target.value);
              }
            }}
            label="Book Title"
          >
            {bookTitleOptions.map((bookTitle) => (
              <MenuItem key={bookTitle} value={bookTitle}>
                {bookTitle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.newChapterContainer}>
        <div className={styles.title}>New Chapter Assignment</div>
        <div className={styles.inputContainer}>
          <div className={styles.leftQuestionContainer}>
            <div className={styles.subtitle}>Assigned Chapter</div>
            <FormControl className={styles.select}>
              <InputLabel id="chapterLabel">Assigned Chapter</InputLabel>
              <Select
                labelId="chapterLabel"
                value={assignedChapter}
                onChange={(e) => {
                  if (e?.target.value != null) {
                    setAssignedChapter(e.target.value);
                  }
                }}
                label="Assigned Chapter"
              >
                {assignedChapterOptions.map((chapter) => (
                  <MenuItem key={chapter} value={chapter}>
                    {chapter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={styles.subtitle}>Chapter Due Date</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["Datepicker"]}>
                <DatePicker
                  className={styles.select}
                  label="Due Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
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
          {questions.map((question) => (
            <div key={question} className={styles.question}>
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
      <Button className={styles.button}>Save Chapter</Button>
    </div>
  );
};

export default ReadingSchedule;
