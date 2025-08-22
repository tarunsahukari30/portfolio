import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",      // Vite local dev
      "http://localhost:3000",      // CRA/React local dev
      "https://your-frontend.vercel.app",  // ✅ replace with your Vercel domain
      "https://your-frontend.netlify.app"  // ✅ replace with your Netlify domain
    ],
    methods: ["GET", "POST"],
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || "portfolio", // <- specify db name
  })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "🚀 Server is running!" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    console.log(`📧 New message from: ${name} (${email})`);
    res.status(201).json({ success: true, message: "Contact saved successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
