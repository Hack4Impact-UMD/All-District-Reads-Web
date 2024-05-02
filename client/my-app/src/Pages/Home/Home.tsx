import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Home.module.css";
import { useAuth } from '../../Components/Auth/AuthProvider';
import Loading from '../Loading/Loading';

const Home = () => {
    const navigate = useNavigate();
    const authContext = useAuth();

    // Click handler functions for each card
    const goToLibrary = () => navigate('/library');
    const goToSchedule = () => navigate('/schedule');
    const goToDashboard = () => navigate('/dashboard');

    return (
        <>
            { authContext?.loading ? (
                <div className={styles.loadingContainer}>
                    <Loading />
                </div>
            ) : (
                <div className={styles.home_container}>
                    <div className={styles.top_half}>
                        <header className={styles.home_header}>
                            <h1>Welcome Back</h1>
                            <nav className={styles.home_nav}>

                            </nav>
                        </header>
                    </div>
                    <div className={styles.bottom_half}>
                        <main className={styles.home_main}>
                            <section className={styles.home_card} onClick={goToLibrary}>
                                <h2>Library of Books</h2>
                                <div className={styles.home_icon}></div>
                            </section>
                            { 
                                authContext?.token?.claims.role == undefined ? (
                                    <section className={styles.home_card} onClick={goToSchedule}>
                                        <h2>Reading Schedule</h2>
                                        <div className={styles.home_icon}></div>
                                    </section>
                                ) : (
                                    <></>
                                )
                            }
                            <section className={styles.home_card} onClick={goToDashboard}>
                                <h2>Dashboard</h2>
                                <div className={styles.home_icon}></div>
                            </section>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
