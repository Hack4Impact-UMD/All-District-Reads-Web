import React from "react";

// Define the structure of the day object used in CalendarDays props
interface Day {
  date: Date;
}

// Define the props structure for the CalendarDays component
interface CalendarDaysProps {
  day: Day;
  changeCurrentDays: (day: Date) => void; // Function that takes a Day object
}

const CalendarDays: React.FC<CalendarDaysProps> = (props) => {
  const firstDayOfMonth = new Date(
    props.day.date.getFullYear(),
    props.day.date.getMonth(),
    1
  );
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays: Array<{
    currentMonth: boolean;
    date: Date;
    month: number;
    number: number;
    selected: boolean;
    year: number;
  }> = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.date.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected:
        firstDayOfMonth.toDateString() === props.day.date.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((day, index) => (
        <div
          key={index}
          className={
            "calendar-day" +
            (day.currentMonth ? " current" : "") +
            (day.selected ? " selected" : "")
          }
          onClick={() => props.changeCurrentDays(day.date)}
        >
          <p>{day.number}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;
