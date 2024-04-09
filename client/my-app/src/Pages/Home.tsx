import React from 'react';
import "../Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome Back</h1>
                <nav className="home-nav">

                </nav>
            </header>

            <main className="home-main">
                <section className="home-card">
                    <h2>Library of Books</h2>
                    <div className="home-icon"></div>
                </section>
                <section className="home-card">
                    <h2>Reading Schedule</h2>
                    <div className="home-icon"></div>
                </section>
                <section className="home-card">
                    <h2>Dashboard</h2>
                    <div className="home-icon"></div>
                </section>
            </main>
        </div>
    );
};

export default Home;
