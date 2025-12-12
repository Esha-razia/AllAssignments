import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// View Engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/main");

// ROUTES
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/how-it-works", (req, res) => {
  res.render("how_it_works", { title: "How It Works" });
});

app.get("/our-coaches", (req, res) => {
  res.render("our_coaches", { title: "Our Coaches" });
});

app.get("/checkout", (req, res) => {
  res.render("checkout", { title: "Checkout" });
});

app.get("/success", (req, res) => {
  res.render("success", { title: "Success" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
