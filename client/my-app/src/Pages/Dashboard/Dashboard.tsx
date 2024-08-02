import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import "./Dashboard.css";

// Sample data for the charts
const surveyData = [
  {
    question: "Do you feel as though your child...",
    no: 40,
    yes: 30,
    maybe: 30,
  },
  // Add more data as needed
];

const triviaData = [
  { chapter: "Chapter One", percentage: 100 },
  { chapter: "Chapter Two", percentage: 80 },
  { chapter: "Chapter Three", percentage: 60 },
  { chapter: "Chapter Four", percentage: 40 },
  { chapter: "Chapter Five", percentage: 20 },
  // Add more data as needed
];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="header">
        <h1>ANALYTICS</h1>
        <div className="dropdowns">
          <select>
            <option>MCPS</option>
          </select>
          <select>
            <option>Fall 2023</option>
          </select>
          <select>
            <option>A Wrinkle in Time</option>
          </select>
        </div>
      </div>
      <div className="content">
        <div className="chart-box">
          <h2>Montgomery County Public Schools</h2>
          <h3>Survey Responses</h3>
          <BarChart width={600} height={300} data={surveyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="question" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="yes" stackId="a" fill="#82ca9d" />
            <Bar dataKey="no" stackId="a" fill="#8884d8" />
            <Bar dataKey="maybe" stackId="a" fill="#ffc658" />
          </BarChart>
        </div>
        <div className="chart-box">
          <h3>Trivia Responses</h3>
          <LineChart width={600} height={300} data={triviaData}>
            <XAxis dataKey="chapter" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="percentage" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
