import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { exec } from 'child_process';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes); // Note: This now serves /api/users/registrations
app.use('/api/registrations', registrationRoutes);

app.get('/', (req, res) => {
  res.send('✅ Server is up and running');
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
  useUnifiedTopology: true,
    })
    console.log('✅ MongoDB connected successfully');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      const url = `http://localhost:${PORT}`;
      const platform = process.platform;
      if (platform === 'win32') exec(`start ${url}`);
      else if (platform === 'darwin') exec(`open ${url}`);
      else if (platform === 'linux') exec(`xdg-open ${url}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();
