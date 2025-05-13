import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import logo from '../../assets/icon.png';
import axios from 'axios';

function Admin() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('events');
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        category: 'Technical',
        maxParticipants: 0,
        image: ''
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsResponse = await axios.get('http://localhost:5000/api/events');
                setEvents(eventsResponse.data);
                const usersResponse = await axios.get('http://localhost:5000/api/users/registrations');
                setUsers(usersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        navigate('/login');
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'event_images');
        formData.append('cloud_name', 'dzh3lqs46');
        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dzh3lqs46/image/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return null;
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        const submitBtn = document.querySelector(".submit-btn");
        submitBtn.disabled = true;
        try {
            let imageUrl = '';
            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile);
                if (!imageUrl) throw new Error('Image upload failed');
            }
            const eventData = {
                title: newEvent.title,
                description: newEvent.description,
                date: newEvent.date,
                venue: newEvent.venue,
                category: newEvent.category,
                maxParticipants: newEvent.maxParticipants,
                image: imageUrl
            };
            const response = await axios.post('http://localhost:5000/api/events/create', eventData);
            setEvents(prevEvents => [...prevEvents, response.data]);
            setNewEvent({
                title: '',
                description: '',
                date: '',
                venue: '',
                category: 'Technical',
                maxParticipants: 0,
                image: ''
            });
            setImageFile(null);
            alert("🎉 Event created successfully!");
            setActiveTab('events');
        } catch (error) {
            console.error('Error adding event:', error);
            alert("❌ Failed to create event. Please try again.");
        } finally {
            submitBtn.disabled = false;
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            setEvents(events.filter(event => event._id !== id)); 
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));  
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const downloadCSV = (filename, headers, rows) => {
        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(item => `"${item}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadEventsCSV = () => {
        const headers = ["Title", "Description", "Date", "Venue", "Category", "Max Participants"];
        const rows = events.map(event => [
            event.title,
            event.description,
            new Date(event.date).toLocaleDateString(),
            event.venue,
            event.category,
            event.maxParticipants
        ]);
        downloadCSV("Events_Report.csv", headers, rows);
    };

    const downloadUsersCSV = () => {
        const headers = ["Name", "Email", "Phone", "Year of Study", "Department", "Event Title", "Event Date"];
        const rows = users.map(user => [
            user.fullName,
            user.email,
            user.phone,
            user.college,
            user.department,
            user.event?.title || "",
            user.event?.date ? new Date(user.event.date).toLocaleDateString() : ""
        ]);
        downloadCSV("Users_Report.csv", headers, rows);
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <img src={logo} alt="College Logo" className="admin-logo" />
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            <div className="admin-tabs">
                <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Events Management</button>
                <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>User Management</button>
                <button className={activeTab === 'add' ? 'active' : ''} onClick={() => setActiveTab('add')}>Add New Event</button>
            </div>

            <div className="admin-content">
                {/* Events Management */}
                {activeTab === 'events' && (
                    <div className="events-list">
                        <h2>All Events</h2>
                        <table className="eventmanage">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Venue</th>
                                    <th>Category</th>
                                    <th>Participants</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event._id}>
                                        <td>{event.image && <img src={event.image} alt="event" style={{ width: '60px', height: '40px' }} />}</td>
                                        <td>{event.title}</td>
                                        <td>{new Date(event.date).toLocaleDateString()}</td>
                                        <td>{event.venue}</td>
                                        <td>{event.category}</td>
                                        <td>{event.maxParticipants}</td>
                                        <td>
                                            <button className="edit-btn">Edit</button>
                                            <button className="delete-btn" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={downloadEventsCSV} className="download-btn">Download Report</button>
                    </div>
                )}

                {/* User Management */}
                {activeTab === 'users' && (
                    <div className="users-list">
                        <h2>Registered Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Year of Study</th>
                                    <th>Department</th>
                                    <th>Event</th>
                                    <th>Event Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.college}</td>
                                            <td>{user.department}</td>
                                            <td>{user.event?.title}</td>
                                            <td>{new Date(user.event?.date).toLocaleDateString()}</td>
                                            <td>
                                                <button className="edit-btn">Edit</button>
                                                <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No users registered yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button onClick={downloadUsersCSV} className="download-btn">Download Report</button>
                    </div>
                )}

                {/* Add New Event */}
                {activeTab === 'add' && (
                    <div className="add-event-wrapper">
                        <div className="add-event">
                            <h2>Add New Event</h2>
                            <form onSubmit={handleAddEvent}>
                                <div className="form-group">
                                    <label>Event Title</label>
                                    <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Venue</label>
                                    <input type="text" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}>
                                        <option value="Technical">Technical</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Non-technical">Non-Technical</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Hackathon">Hackathon</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Max Participants (0 for unlimited)</label>
                                    <input
                                        type="number"
                                        value={newEvent.maxParticipants || 0}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setNewEvent({ ...newEvent, maxParticipants: value === '' ? 0 : parseInt(value) });
                                        }}
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Event Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setImageFile(file);
                                        }}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-btn">Add Event</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;

