import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Events from "./Components/Events/Events";
import Contact from "./Components/Contact/Contact";
import Admin from './Components/Admin/Admin.jsx';
import EventRegistration from './Components/EventRegistration/EventRegistration.jsx';
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";

function App() {
    return ( 
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/events/:id" element={<EventRegistration />} /> {/* Route for event registration */}
            <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
    );
}

export default App;
