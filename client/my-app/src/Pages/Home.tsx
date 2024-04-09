import React from 'react';
import "../Home.css";

const Home = () => {
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
        </div>
    );
};

export default Home;
