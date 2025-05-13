import express from 'express';
import { Registration } from '../models/Registration.js';

const router = express.Router();

router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().populate('event');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', message: error.message });
  }
});

export default router;
