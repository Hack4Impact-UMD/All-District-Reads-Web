import React, { useState } from 'react';
import '../AddBooksForm.css'

type ChapterQuestions = {
    chapterNumber: number;
    questions: string[];
};

type Book = {
    id: number;
    title: string;
    description?: string;
    chapters?: ChapterQuestions[];
};

type AddBookFormProps = {
    book: Book;
    onSave: (bookData: Book) => void;
    onClose: () => void;
};

const AddBooksForm: React.FC<AddBookFormProps> = ({ book, onSave, onClose }) => {
    const [title, setTitle] = useState(book.title);
    const [description, setDescription] = useState(book.description || '');
    const [chapters, setChapters] = useState<ChapterQuestions[]>(book.chapters || []);
    const [numberOfChapters, setNumberOfChapters] = useState(chapters.length || 0);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave({
            ...book,
            title,
            description,
            chapters,
        });
    };

    const handleChapterChange = (chapterIndex: number, question: string, questionIndex: number) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].questions[questionIndex] = question;
        setChapters(newChapters);
    };

    const handleNumberOfChaptersChange = (count: number) => {
        setNumberOfChapters(count);
        const newChapters = Array(count).fill(null).map((_, index) => ({
            chapterNumber: index + 1,
            questions: chapters[index]?.questions || [''],
        }));
        setChapters(newChapters);
    };


    return (
        <div className="add-books-form">
            <form onSubmit={handleSubmit}>

                <label>
                    Book Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Book Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Number of Chapters:
                    <input
                        type="number"
                        value={numberOfChapters}
                        onChange={(e) => handleNumberOfChaptersChange(Number(e.target.value))}
                    />
                </label>
                {chapters.map((chapter, chapterIndex) => (
                    <div key={chapter.chapterNumber}>
                        <h3>Chapter {chapter.chapterNumber}</h3>
                        {chapter.questions.map((question, questionIndex) => (
                            <label key={questionIndex}>
                                Question {questionIndex + 1}:
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) =>
                                        handleChapterChange(chapterIndex, e.target.value, questionIndex)
                                    }
                                />
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AddBooksForm;
