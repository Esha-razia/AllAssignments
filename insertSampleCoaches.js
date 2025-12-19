// insertSampleCoaches.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Coach from "./models/Coach.js";

dotenv.config();
connectDB();
const sampleCoaches = [
  { name: "Thomas Clarckson", speciality: "Fitness", experience: 10, bio: "Expert in personal training and nutrition." },
  { name: "Sarah Johnson", speciality: "Yoga", experience: 8, bio: "Certified yoga instructor with 8 years experience." },
  { name: "Emily Davis", speciality: "Mindfulness", experience: 6, bio: "Mindfulness and meditation expert." },
  { name: "Robert Wilson", speciality: "Mental Health", experience: 15, bio: "Helping people achieve their personal and professional goals." },
  { name: "Laura Martinez", speciality: "Nutrition", experience: 9, bio: "Certified nutritionist and wellness coach." },
  { name: "David Lee", speciality: "Strength Training", experience: 11, bio: "Specialist in strength and conditioning programs." },
  { name: "James Anderson", speciality: "Mental Health", experience: 13, bio: "Life and mental health coach guiding people through challenges." },
  { name: "Olivia Taylor", speciality: "Cardio Training", experience: 5, bio: "Cardio and endurance coach focused on weight management." },
  { name: "Sophia Brown", speciality: "Pilates", experience: 7, bio: "Pilates instructor helping clients improve posture and flexibility." },
  { name: "Mark Thompson", speciality: "Fitness", experience: 12, bio: "Fitness coach specialized in weight training." },
  { name: "Anna White", speciality: "Yoga", experience: 10, bio: "Yoga instructor focusing on flexibility and core strength." },
  { name: "Peter Green", speciality: "Mindfulness", experience: 8, bio: "Mindfulness teacher and stress management coach." },
  { name: "Laura King", speciality: "Nutrition", experience: 7, bio: "Nutrition coach specializing in healthy meal plans." },
  { name: "Samuel Hall", speciality: "Strength Training", experience: 9, bio: "Strength and conditioning specialist." },
  { name: "Isabella Moore", speciality: "Cardio Training", experience: 6, bio: "Cardio workouts and endurance programs expert." },
  { name: "Lucas Scott", speciality: "Fitness", experience: 14, bio: "Expert in personal training and overall fitness." },
  { name: "Mia Adams", speciality: "Yoga", experience: 5, bio: "Certified yoga instructor with focus on meditation." },
  { name: "Ethan Baker", speciality: "Mindfulness", experience: 11, bio: "Mindfulness coach for mental clarity and stress relief." },
  { name: "Charlotte Evans", speciality: "Nutrition", experience: 12, bio: "Nutritionist helping clients achieve wellness goals." },
  { name: "Henry Collins", speciality: "Cardio Training", experience: 9, bio: "Cardio and HIIT expert for endurance training." }
];


const importData = async () => {
  try {
    await Coach.deleteMany(); // Clear previous data
    await Coach.insertMany(sampleCoaches);
    console.log("✅ Sample coaches inserted!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
