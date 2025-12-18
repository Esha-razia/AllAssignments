import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  experience: { type: Number, required: true },
  image: { type: String, required: true },
  bio: { type: String },
});

const Coach = mongoose.model("Coach", coachSchema);
export default Coach;
