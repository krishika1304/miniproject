import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email format'] // Optional: email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Optional: enforce minimum length
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user' // Optional: default to 'user'
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' // Reference to Event model
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
