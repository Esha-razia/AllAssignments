import express from "express";
import Coach from "../models/coach.js";
import Order from '../models/order.js';

import { ensureAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", ensureAdmin, async (req, res) => {
  try {
    const totalCoaches = await Coach.countDocuments();
    const avgExperienceAgg = await Coach.aggregate([
      { $group: { _id: null, avgExp: { $avg: "$experience" } } },
    ]);
    const avgExperience = avgExperienceAgg[0] ? avgExperienceAgg[0].avgExp.toFixed(1) : 0;

    res.render("admin/dashboard", {
      title: "Dashboard",
      totalCoaches,
      avgExperience,
      layout: "admin/layout"
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading dashboard");
  }
});

// Coaches List
router.get("/coaches", ensureAdmin, async (req, res) => {
  try {
    let query = {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }
    const coaches = await Coach.find(query);
    res.render("admin/coaches", { 
      title: "Coaches", 
      coaches, 
      search: req.query.search || "", 
      layout: "admin/layout" 
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading coaches");
  }
});

// Add Coach Form
router.get("/coaches/add", ensureAdmin, (req, res) => {
  res.render("admin/add-coach", { title: "Add Coach", layout: "admin/layout" });
});

// Add Coach POST
router.post("/coaches/add", ensureAdmin, async (req, res) => {
  try {
    const { name, speciality, experience, image, bio } = req.body;
    await Coach.create({ name, speciality, experience, image, bio });
    res.redirect("/admin/coaches");
  } catch (err) {
    console.error(err);
    res.send("Error adding coach");
  }
});

// Edit Coach Form
router.get("/coaches/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    res.render("admin/edit-coach", { title: "Edit Coach", coach, layout: "admin/layout" });
  } catch (err) {
    console.error(err);
    res.send("Error loading coach");
  }
});

// Update Coach POST
router.post("/coaches/edit/:id", ensureAdmin, async (req, res) => {
  try {
    const { name, speciality, experience, image, bio } = req.body;
    await Coach.findByIdAndUpdate(req.params.id, { name, speciality, experience, image, bio });
    res.redirect("/admin/coaches");
  } catch (err) {
    console.error(err);
    res.send("Error updating coach");
  }
});

// Delete Coach
router.post("/coaches/delete/:id", ensureAdmin, async (req, res) => {
  try {
    await Coach.findByIdAndDelete(req.params.id);
    res.redirect("/admin/coaches");
  } catch (err) {
    console.error(err);
    res.send("Error deleting coach");
  }
});

// Orders List
router.get("/orders", ensureAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("items.coach");
    res.render("admin/orders", { orders, title: "Orders", layout: "admin/layout" });
  } catch (err) {
    console.error(err);
    res.send("Error loading orders");
  }
});

export default router;
