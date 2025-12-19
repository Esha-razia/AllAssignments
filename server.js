import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';

import coachRoutes from './routes/coachRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import Coach from '../models/Coach.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================
// EJS SETUP
// ==================
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main'); // default layout for all views

// ==================
// STATIC FILES
// ==================
app.use(express.static(path.join(__dirname, 'public')));

// ==================
// BODY PARSER
// ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================
// MONGODB CONNECTION
// ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// ==================
// FRONTEND ROUTES
// ==================
app.use('/', coachRoutes);

// ==================
// ADMIN PANEL ROUTES
// ==================
app.use('/admin', adminRoutes);

// ==================
// OTHER PAGES
// ==================
app.get('/how-it-works', (req, res) =>
  res.render('how_it_works', { title: 'How It Works' })
);

app.get('/our-coaches', async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.render('our_coaches', {
      title: 'Our Coaches',
      coaches
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// ==================
// START SERVER
// ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
