const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Hugging Face API configuration
const HUGGING_FACE_API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const appointmentSchema = new mongoose.Schema({
  patientId: { type: Number, required: true },
  hospitalId: { type: Number, required: true },
  doctorId: { type: Number, required: true },
  selectedTimeSlot: {
    type: String,
    required: true,
    enum: [
      "09-10",
      "10-11",
      "11-12",
      "12-13",
      "13-14",
      "14-15",
      "15-16",
      "16-17",
    ],
  },
  priorityRating: { type: Number, required: true },
  exactTime: { type: Date },
  status: {
    type: String,
    default: "scheduled",
    enum: ["scheduled", "completed", "canceled"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  date: { type: Date, required: true },
  disease: {
    type: String,
    required: true,
    enum: ["Fever", "Diarrhea", "Chestpain", "Headache"],
  },
});

appointmentSchema.index({ hospitalId: 1, doctorId: 1, selectedTimeSlot: 1 });
appointmentSchema.index({ exactTime: 1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Store Appointment
app.post("/appointments", async (req, res) => {
  try {
    const {
      patientId,
      hospitalId,
      doctorId,
      selectedTimeSlot,
      priorityRating,
      date,
      disease,
    } = req.body;
    const appointment = new Appointment({
      patientId,
      hospitalId,
      doctorId,
      selectedTimeSlot,
      priorityRating,
      date,
      disease,
      status: "scheduled",
    });
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Chatbot Integration with Hugging Face
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      HUGGING_FACE_API_URL,
      {
        inputs: `<s>[INST] ${message} [/INST]`,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.95,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data[0].generated_text) {
      // Clean up the response by removing the instruction format
      const cleanResponse = response.data[0].generated_text
        .replace(/<s>\[INST\].*?\[\/INST\]\s*/, "")
        .trim();
      res.json({ reply: cleanResponse });
    } else {
      res.status(500).json({ error: "Invalid response from AI model" });
    }
  } catch (error) {
    console.error("AI API Error:", error.message);
    res.status(500).json({ error: "Failed to generate a response" });
  }
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// Socket.io: Listen for ambulance call and simulate dispatch updates
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("callAmbulance", (data) => {
    console.log("Ambulance requested from:", data);
    let eta = 10;
    const interval = setInterval(() => {
      if (eta > 0) {
        eta--;
        socket.emit("ambulanceUpdate", { eta, status: "En Route" });
      } else {
        socket.emit("ambulanceUpdate", { eta: 0, status: "Arrived" });
        clearInterval(interval);
      }
    }, 5000);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
