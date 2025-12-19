import express from 'express';
import Coach from '../models/coach.js';
import Order from '../models/order.js';
import { ensureCartExists } from '../middleware/cartMiddleware.js';

const router = express.Router();

// Home page: list coaches with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { name, speciality, experience, bio, page } = req.query;
    const limit = 4; // 4 coaches per page
    const currentPage = parseInt(page) || 1;
    const query = {};

    if (name) query.name = { $regex: name, $options: 'i' }; // make it case-insensitive
    if (speciality) query.speciality = speciality;

    if (experience) {
      if (experience === '10+') query.experience = { $gte: 10 };
      else {
        const [minExp, maxExp] = experience.split('-').map(Number);
        query.experience = { $gte: minExp, $lte: maxExp };
      }
    }

    if (bio) query.bio = { $regex: bio, $options: 'i' };

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
      name,
      speciality,
      experience,
      bio,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add to Cart
router.post('/add-to-cart/:id', ensureCartExists, async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.redirect('/');

    const cart = req.session.cart;
    const existingItem = cart.find(item => item.coach === coach.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        coach: coach.id,
        name: coach.name,
        price: coach.price || 100, // default price if not set
        quantity: 1
      });
    }

    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding to cart');
  }
});

// Show Cart / Checkout Page
router.get('/cart', ensureCartExists, (req, res) => {
  res.render('checkout', { cart: req.session.cart, title: 'Checkout' });
});

// Place Order
router.post('/checkout', ensureCartExists, async (req, res) => {
  try {
    const cart = req.session.cart;
    if (!cart || cart.length === 0) return res.redirect('/cart');

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = new Order({
      user: req.session.user ? req.session.user.name : 'Guest',
      items: cart.map(item => ({
        coach: item.coach,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice
    });

    await order.save();

    // Clear cart
    req.session.cart = [];

    res.render('success', { order, title: 'Order Success' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error placing order');
  }
});

export default router;
