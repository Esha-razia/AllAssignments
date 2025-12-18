// insertSampleCoaches.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Coach from "./models/Coach.js";

dotenv.config();
connectDB();
const sampleCoaches = [
  { name: "Thomas Clarckson", speciality: "Fitness", experience: 10, image: "/images/thomas_clarckson.jpg", bio: "Expert in personal training and nutrition." },
  { name: "Sarah Johnson", speciality: "Yoga", experience: 8, image: "/images/sarah_johnson.jpg", bio: "Certified yoga instructor with 8 years experience." },
  { name: "Emily Davis", speciality: "Mindfulness", experience: 6, image: "/images/emily_davis.jpg", bio: "Mindfulness and meditation expert." },
  { name: "Robert Wilson", speciality: "Mental Health", experience: 15, image: "/images/robert_wilson.jpg", bio: "Helping people achieve their personal and professional goals." },
  { name: "Laura Martinez", speciality: "Nutrition", experience: 9, image: "/images/laura_martinez.jpg", bio: "Certified nutritionist and wellness coach." },
  { name: "David Lee", speciality: "Strength Training", experience: 11, image: "/images/david_lee.jpg", bio: "Specialist in strength and conditioning programs." },
  { name: "James Anderson", speciality: "Mental Health", experience: 13, image: "/images/james_anderson.jpg", bio: "Life and mental health coach guiding people through challenges." },
  { name: "Olivia Taylor", speciality: "Cardio Training", experience: 5, image: "/images/olivia_taylor.jpg", bio: "Cardio and endurance coach focused on weight management." },
  { name: "Sophia Brown", speciality: "Pilates", experience: 7, image: "/images/sophia_brown.jpg", bio: "Pilates instructor helping clients improve posture and flexibility." }, // ignore, replace
  { name: "Mark Thompson", speciality: "Fitness", experience: 12, image: "/images/mark_thompson.jpg", bio: "Fitness coach specialized in weight training." },
  { name: "Anna White", speciality: "Yoga", experience: 10, image: "/images/anna_white.jpg", bio: "Yoga instructor focusing on flexibility and core strength." },
  { name: "Peter Green", speciality: "Mindfulness", experience: 8, image: "/images/peter_green.jpg", bio: "Mindfulness teacher and stress management coach." },
  { name: "Laura King", speciality: "Nutrition", experience: 7, image: "/images/laura_king.jpg", bio: "Nutrition coach specializing in healthy meal plans." },
  { name: "Samuel Hall", speciality: "Strength Training", experience: 9, image: "/images/samuel_hall.jpg", bio: "Strength and conditioning specialist." },
  { name: "Isabella Moore", speciality: "Cardio Training", experience: 6, image: "/images/isabella_moore.jpg", bio: "Cardio workouts and endurance programs expert." },
  { name: "Lucas Scott", speciality: "Fitness", experience: 14, image: "/images/lucas_scott.jpg", bio: "Expert in personal training and overall fitness." },
  { name: "Mia Adams", speciality: "Yoga", experience: 5, image: "/images/mia_adams.jpg", bio: "Certified yoga instructor with focus on meditation." },
  { name: "Ethan Baker", speciality: "Mindfulness", experience: 11, image: "/images/ethan_baker.jpg", bio: "Mindfulness coach for mental clarity and stress relief." },
  { name: "Charlotte Evans", speciality: "Nutrition", experience: 12, image: "/images/charlotte_evans.jpg", bio: "Nutritionist helping clients achieve wellness goals." },
  { name: "Henry Collins", speciality: "Cardio Training", experience: 9, image: "/images/henry_collins.jpg", bio: "Cardio and HIIT expert for endurance training." }
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
