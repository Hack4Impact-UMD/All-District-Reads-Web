import React, { Component } from "react";
import CalendarDays from "./calendar-days";
import "./calendar.css";

interface CalendarState {
  currentDay: Date;
}

export default class Calendar extends Component<{}, CalendarState> {
  private weekdays: string[];
  private months: string[];

  constructor(props: {}) {
    super(props);

    this.weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.state = {
      currentDay: new Date(),
    };
  }

  changeCurrentDay = (date: Date) => {
    this.setState({ currentDay: date });
  };

  nextDay = () => {
    this.setState({
      currentDay: new Date(
        this.state.currentDay.setDate(this.state.currentDay.getDate() + 1)
      ),
    });
  };

  previousDay = () => {
    this.setState({
      currentDay: new Date(
        this.state.currentDay.setDate(this.state.currentDay.getDate() - 1)
      ),
    });
  };

  render() {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="title">
            <h2>
              {this.months[this.state.currentDay.getMonth()]}{" "}
              {this.state.currentDay.getFullYear()}
            </h2>
          </div>
          <div className="tools">
            <button onClick={this.previousDay}>
              <span className="material-icons">arrow_back</span>
            </button>
            <p>
              {this.months[this.state.currentDay.getMonth()].substring(0, 3)}{" "}
              {this.state.currentDay.getDate()}
            </p>
            <button onClick={this.nextDay}>
              <span className="material-icons">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="calendar-body">
          <div className="table-header">
            {this.weekdays.map((weekday, index) => (
              <div key={index} className="weekday">
                <p>{weekday}</p>
              </div>
            ))}
          </div>
          <CalendarDays
            day={{ date: this.state.currentDay }}
            changeCurrentDays={this.changeCurrentDay}
          />
        </div>
      </div>
    );
  }
}
