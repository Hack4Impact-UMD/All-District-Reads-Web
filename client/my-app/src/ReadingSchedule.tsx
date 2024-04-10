import React, { useState } from 'react';
import './ReadingSchedule.css';

const ReadingSchedule: React.FC = () => {
    const [selectedChapter, setSelectedChapter] = useState<{ id: string, number: number, name: string, date: string, numQuestions: number } | null>(null);
    const [chapters, setChapters] = useState<{ id: string, number: number, name: string, date: string, numQuestions: number }[]>([
        { id: '1', number: 1, name: "The Magic Garden", date: "March 15,2024", numQuestions: 5 },
    { id: '2', number: 2, name: "The Adventures of Sparky the Dragon", date: "March 21, 2024", numQuestions: 7 },
    { id: '3', number: 3, name: "Journey to Fairyland", date: "March 22, 2024", numQuestions: 10 },
    { id: '4', number: 4, name: "The Enchanted Forest", date: "March 31, 2024", numQuestions: 8 },
    { id: '5', number: 5, name: "Mystery at Magic Castle", date: "April 2, 2024", numQuestions: 6 }
        // Add more chapters as needed
    ]);

    const handleEditClick = (chapter: { id: string, number: number, name: string, date: string, numQuestions: number }) => {
        setSelectedChapter(chapter);
    };

    const handleCloseModal = () => {
        setSelectedChapter(null);
    };

    const handleSaveChanges = () => {
        if (selectedChapter) {
            const updatedChapters = chapters.map(chapter => {
                if (chapter.id === selectedChapter.id) {
                    return selectedChapter;
                }
                return chapter;
            });
            setChapters(updatedChapters);
            setSelectedChapter(null);
        }
    };

    return (
        <div className = "modal" style={{ width: '800px', height: '200px', overflow: 'auto' , alignItems:'center'}}>
            <h1 >Assigned Chapters</h1>
            <table style={{ border: '1px solid black', textAlign: 'center', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th>Chapter Number</th>
                        <th>Chapter Name</th>
                        <th>Date</th>
                        <th>Number of Questions</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {chapters.map(chapter => (
                        <tr key={chapter.id}>
                            <td>{chapter.number}</td>
                            <td>{chapter.name}</td>
                            <td>{chapter.date}</td>
                            <td>{chapter.numQuestions}</td>
                            <td>
                                <button className="editButton" onClick={() => handleEditClick(chapter)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedChapter && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <h2>Edit Chapter Details</h2>
                            <label>
                                Chapter Number:
                                <input type="text" value={selectedChapter.number} onChange={(e) => setSelectedChapter({ ...selectedChapter, number: parseInt(e.target.value) })} />
                            </label>
                            <label>
                                Chapter Name:
                                <input type="text" value={selectedChapter.name} onChange={(e) => setSelectedChapter({ ...selectedChapter, name: e.target.value })} />
                            </label>
                            <label>
                                Date:
                                <input type="text" value={selectedChapter.date} onChange={(e) => setSelectedChapter({ ...selectedChapter, date: e.target.value })} />
                            </label>
                            <label>
                                Number of Questions:
                                <input type="text" value={selectedChapter.numQuestions} onChange={(e) => setSelectedChapter({ ...selectedChapter, numQuestions: parseInt(e.target.value) })} />
                            </label>
                            <button onClick={handleSaveChanges}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReadingSchedule;
