import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';
import logo from '../../assets/logo.png';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you, ${formData.name}! Your message has been submitted.`);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="contact-container">

            <div className="contact-content">
                <h1>Contact Us</h1>
                
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>Get In Touch</h2>
                        
                        <div className="info-item">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                            <div>
                                <h3>Address</h3>
                                <p>PSNA College of Engineering and Technology</p>
                                <p>Dindigul, Tamil Nadu 624622</p>
                            </div>
                        </div>
                        
                        <div className="info-item">
                            <FontAwesomeIcon icon={faPhone} className="icon" />
                            <div>
                                <h3>Phone</h3>
                                <p>+91 1234567890</p>
                                <p>+91 9876543210</p>
                            </div>
                        </div>
                        
                        <div className="info-item">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <div>
                                <h3>Email</h3>
                                <p>events@psna.ac.in</p>
                                <p>support@psnaevents.com</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="contact-form">
                        <h2>Send Us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Your Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Your Message</label>
                                <textarea 
                                    name="message" 
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            
                            <button type="submit" className="submit-btn">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;