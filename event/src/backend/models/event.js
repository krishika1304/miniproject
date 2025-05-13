import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  maxParticipants: { type: Number, required: true, min: 1 },
  image: { type: String },
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
export default Event;