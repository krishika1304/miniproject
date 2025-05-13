import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EventRegistration.css';

const EventRegistration = () => {
  const { id } = useParams(); // Get the event ID from the URL
  console.log('Event ID from URL:', id); // Log the ID to verify it's correct

  const [eventDetails, setEventDetails] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    yearOfStudying: '',
    department: '',
    gender: '', // Add gender field
  });
  const [loading, setLoading] = useState(true);

  // Fetch event details when component mounts
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        console.log('Event details fetched:', res.data); // Log the event data
        setEventDetails(res.data);
      } catch (err) {
        console.error('Error fetching event:', err);
        alert('Failed to fetch event details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.yearOfStudying || !userDetails.department || !userDetails.gender || !eventDetails?._id) {
      alert('Please fill all fields and ensure event is loaded.');
      return;
    }

    try {
      const payload = {
        fullName: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        college: 'PSNA College', // Replace with your college name
        department: userDetails.department,
        gender: userDetails.gender,
        event: eventDetails._id,
      };

      const res = await axios.post('http://localhost:5000/api/registrations/register', payload);
      alert('🎉 Registration successful!');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-page">
      {loading ? (
        <p>Loading event details...</p>
      ) : eventDetails ? (
        <>
          <h2>Register for {eventDetails.title}</h2>
          <p>{eventDetails.description}</p>

          <form onSubmit={handleSubmit} className='eventform'>
            <input
              type="text"
              placeholder="Your Name"
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Your Phone Number"
              value={userDetails.phone}
              onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Year of Studying"
              value={userDetails.yearOfStudying}
              onChange={(e) => setUserDetails({ ...userDetails, yearOfStudying: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={userDetails.department}
              onChange={(e) => setUserDetails({ ...userDetails, department: e.target.value })}
              required
            />
            <select
              value={userDetails.gender}
              onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className='eventbutton'>Register</button>
          </form>
        </>
      ) : (
        <p>Event not found.</p>
      )}
    </div>
  );
};
export default EventRegistration;