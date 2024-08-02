import React from "react";
import "./ReadingScheduleBottom.css";

const ReadingScheduleBottom = () => {
  return (
    <div className="assignment-edit-container">
      <h1>Assigned Chapters</h1>
      <div className="assignment-container">
        <div className="assignment">
          <span className="new-assignment">New Assignment</span>
          <span className="chapter-title">Chapter 1</span>
          <span className="questions"> 0 Questions </span>
          <span className="due-date">Unassigned Due Date</span>
          <div className="icons">
            <button className="button icon-button edit">
              <i className="icon">&#x270E;</i>
            </button>
            <button className="button icon-button delete">
              <i className="icon">&#xE872;</i>
            </button>
          </div>
        </div>
      </div>
      <button className="button save-book">Save Book</button>
    </div>
  );
};

export default ReadingScheduleBottom;
