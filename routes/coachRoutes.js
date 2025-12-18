import express from 'express';
import Coach from '../models/Coach.js';

const router = express.Router();

// Home page: list coaches with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { speciality, experience, page } = req.query;
    const limit = 4; // 4 coaches per page
    const currentPage = parseInt(page) || 1;
    const query = {};

    // Filter by speciality
    if (speciality) query.speciality = speciality;

    // Filter by experience
    if (experience) {
      if (experience === '10+') query.experience = { $gte: 10 };
      else {
        const [minExp, maxExp] = experience.split('-').map(Number);
        query.experience = { $gte: minExp, $lte: maxExp };
      }
    }

    // Get total coaches that match filter
    const totalCoaches = await Coach.countDocuments(query);
    const totalPages = Math.ceil(totalCoaches / limit);

    // Get only coaches for current page
    const coaches = await Coach.find(query)
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.render('index', {
      title: 'Home',
      coaches,
      currentPage,
      totalPages,
      speciality,
      experience
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router;
