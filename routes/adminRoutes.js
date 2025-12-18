import express from "express";
import Coach from "../models/Coach.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", async (req, res) => {
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

// List coaches
router.get("/coaches", async (req, res) => {
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

// Add coach form
router.get("/coaches/add", (req, res) => {
  res.render("admin/add-coach", { title: "Add Coach", layout: "admin/layout" });
});

// Add coach POST
router.post("/coaches/add", async (req, res) => {
  try {
    const { name, speciality, experience, image, bio } = req.body;
    await Coach.create({ name, speciality, experience, image, bio });
    res.redirect("/admin/coaches");
  } catch (err) {
    console.error(err);
    res.send("Error adding coach");
  }
});

// Edit coach form
router.get("/coaches/edit/:id", async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    res.render("admin/edit-coach", { title: "Edit Coach", coach, layout: "admin/layout" });
  } catch (err) {
    console.error(err);
    res.send("Error loading coach");
  }
});

// Update coach POST
router.post("/coaches/edit/:id", async (req, res) => {
  try {
    const { name, speciality, experience, image, bio } = req.body;
    await Coach.findByIdAndUpdate(req.params.id, { name, speciality, experience, image, bio });
    res.redirect("/admin/coaches");
  } catch (err) {
    console.error(err);
    res.send("Error updating coach");
  }
});

// Delete coach
router.post("/coaches/delete/:id", async (req, res) => {
  try {
    await Coach.findByIdAndDelete(req.params.id);
    res.redirect("/admin/coaches");
  } catch (err) {
    console.error(err);
    res.send("Error deleting coach");
  }
});

export default router;
