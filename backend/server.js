const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentFeedback", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Routes
app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;
  const feedback = new Feedback({ name, email, message });
  await feedback.save();
  res.json({ success: true, message: "Feedback submitted successfully" });
});

app.get("/api/feedback", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
