import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import icon from "../../assets/icon.png";
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div className="home-container">
      <header className="navbar">
        <img src={icon} alt="College icon" className="icon" />
        <nav>
          <ul className="nav-list">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <img src={logo} alt="College Logo" className="logo" />

      <section className="events-section">
        <h2>Upcoming Events</h2>

        <Link to="/events/hackathon" className="event-card-link">
          <div className="event-card">
            <h3>Tech Hackathon</h3>
            <p>📅 Date: April 4,5 2025 | <FontAwesomeIcon icon={faLocationDot} />&nbsp;Venue: IT Seminar Hall</p>
            <p>A thrilling Hackathon with exciting prizes!</p>
          </div>
        </Link>

        <Link to="/events/imath" className="event-card-link">
          <div className="event-card">
            <h3>Imath Event</h3>
            <p>📅 Date: April 22, 2025 | <FontAwesomeIcon icon={faLocationDot} />&nbsp;Venue: SRL Auditorium</p>
            <p>Maths Related Events</p>
          </div>
        </Link>

        <Link to="/events" className="btn">See All Events</Link>
      </section>

      <footer className="footer">
        <p>📞 Contact: event@psna.ac.in | <FontAwesomeIcon icon={faLocationDot} />&nbsp;Location: PSNA College</p>
        <p>© 2025 PSNA College Events. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
