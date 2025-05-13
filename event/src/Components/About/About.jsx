import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import './About.css';
import logo from '../../assets/icon.png';

function About() {
    return (
        <div className="about-container">
            <header className="about_navbar">
                <img src={logo} alt="College Logo" className="about_logo" />
                <nav>
                    <ul className="about_nav-list">
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <div className="about-content">
                <h1>About Our Event Management System</h1>
                
                <div className="about-section">
                    <div className="about-card">
                        <FontAwesomeIcon icon={faUsers} size="3x" />
                        <h2>Our Community</h2>
                        <p>Join over 5,000 students who participate in our events annually, creating a vibrant campus life.</p>
                    </div>
                    
                    <div className="about-card">
                        <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
                        <h2>Event Calendar</h2>
                        <p>We host 50+ events each year across technical, cultural, sports, and workshop categories.</p>
                    </div>
                    
                    <div className="about-card">
                        <FontAwesomeIcon icon={faTrophy} size="3x" />
                        <h2>Achievements</h2>
                        <p>Our events have won 15+ national awards for innovation and student engagement.</p>
                    </div>
                </div>

                <div className="mission-section">
                    <h2>Our Mission</h2>
                    <p>
                        The College Event Management System was created to streamline event organization, 
                        enhance student participation, and provide a centralized platform for all campus activities. 
                        Our goal is to foster creativity, collaboration, and community through diverse events.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;