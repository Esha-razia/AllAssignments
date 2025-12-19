// models/Coach.js
import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  bio: {
    type: String
  },
  price: {
    type: Number,
    default: 100
  }
});

// ✅ Check if model already exists
const Coach = mongoose.models.Coach || mongoose.model("Coach", coachSchema);

export default Coach;
