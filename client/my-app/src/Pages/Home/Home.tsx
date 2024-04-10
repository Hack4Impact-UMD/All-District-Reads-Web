import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    // Click handler functions for each card
    const goToLibrary = () => navigate('/library');
    const goToSchedule = () => navigate('/schedule');
    const goToDashboard = () => navigate('/dashboard');

    return (
        <div className="home-container">
            <div className="top-half">
                <header className="home-header">
                    <h1>Welcome Back</h1>
                    <nav className="home-nav">

                    </nav>
                </header>
            </div>
            <div className="bottom-half">
                <main className="home-main">
                    <section className="home-card" onClick={goToLibrary}>
                        <h2>Library of Books</h2>
                        <div className="home-icon"></div>
                    </section>
                    <section className="home-card" onClick={goToSchedule}>
                        <h2>Reading Schedule</h2>
                        <div className="home-icon"></div>
                    </section>
                    <section className="home-card" onClick={goToDashboard}>
                        <h2>Dashboard</h2>
                        <div className="home-icon"></div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Home;
