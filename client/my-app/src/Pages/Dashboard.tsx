// Dashboard.js
import React from "react";
// recharts is something I found from the internet but offers some nice charts we can use!
// to install it, use "npm install recharts"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../Dashboard.css";

// Dummy data for visualization (we can change this later on.)
const data = {
  totalDownloads: 5000,
  usersLast7Days: 1020,
  surveyResponses: [
    { name: "Period 1", responses: 400 },
    { name: "Period 2", responses: 600 },
    { name: "Period 3", responses: 800 },
  ],
  triviaResponses: { completed: 75, incomplete: 25 }, // in percentages :P
  sessionsByType: [
    { name: "Email", value: 400 },
    { name: "Referral", value: 300 },
    { name: "Direct", value: 300 },
    { name: "Social", value: 200 },
    { name: "Organic Search", value: 100 },
  ],
};

const Dashboard = () => {
  return (
    <div className="dashboardContainer">
      <h1>ADR Web Analytics Dashboard</h1>

      <div className="topMetrics">
        <div className="metricBox">
          <h2>Total Downloads</h2>
          <p>{data.totalDownloads}</p>
        </div>
        <div className="metricBox">
          <h2>Users in Past 7 Days</h2>
          <p>{data.usersLast7Days}</p>
        </div>
        <div className="metricBox">
          <h2>Survey Responses</h2>
          <BarChart width={150} height={40} data={data.surveyResponses}>
            <Bar dataKey="responses" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="metricBox">
          <h2>Trivia Responses</h2>
          <p>{data.triviaResponses.completed}% Completed</p>
        </div>
      </div>

      <div className="chartSection">
        <ResponsiveContainer width="50%" height={300}>
          <BarChart data={data.surveyResponses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="responses" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="50%" height={300}>
          <PieChart>
            <Pie
              data={data.sessionsByType}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
