import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import timelineRoutes from './routes/timeline.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with customizable origin
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Global 404 Route
app.use((req, res) => {
  res.status(404).json({ message: `API route '${req.url}' not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on port ${PORT}`);
  console.log(`👉 CORS configured for origin: ${corsOrigin}`);
});
