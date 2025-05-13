import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Events.css';

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch events from your backend
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/events');
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const openRegistration = (id) => {
    console.log('Navigating to event with id:', id); // Log the ID
    navigate(`/events/${id}`); // Navigate to the event registration page
  };

  return (
    <div className="events-container">
      {error && <p className="error-message">{error}</p>}
      <h1 className="page-title">Events</h1>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : events.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div
              className="event-card"
              key={event._id}
              onClick={() => openRegistration(event._id)} // Trigger openRegistration on click
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-card-img"
                />
              )}
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p className="event-meta">
                  📅 {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} | Venue: {event.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
