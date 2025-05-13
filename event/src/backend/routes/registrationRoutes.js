import express from 'express';
import { Registration } from '../models/Registration.js';  // Import the model
const router = express.Router();

// Define routes for registration
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, college, department, gender, event } = req.body;
    const newRegistration = new Registration({ fullName, email, phone, college, department, gender, event });
    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful', newRegistration });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register', message: err.message });
  }
});

export default router; // Default export
