import express from 'express';
import Event from '../models/event.js';

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// GET single event by ID (for registration page)
// GET event by ID
router.get('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// POST create new event
router.post('/create', async (req, res) => {
  const { title, description, date, venue, category, maxParticipants, image } = req.body;

  const event = new Event({
    title,
    description,
    date,
    venue,
    category,
    maxParticipants,
    image
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: 'Error creating event: ' + err.message });
  }
});

// DELETE event by ID
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.deleteOne(); // deleteOne is preferred over deprecated remove
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event: ' + err.message });
  }
});

export default router;
