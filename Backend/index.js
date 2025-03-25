const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const session = require("express-session");
require("dotenv").config();
const { generateResponse } = require('./services/aiDoctor');

const app = express();
app.use(cors());
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Hugging Face API configuration
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
const MEDICAL_MODEL_URL = "https://api-inference.huggingface.co/models/facebook/opt-350m";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// Store chat history for each session (in production, use a proper database)
const chatHistory = new Map();

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

// AI Doctor endpoint
app.post('/api/ai-doctor/chat', async (req, res) => {
  try {
    const { message, disease, score } = req.body;
    
    if (!message || !disease) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'Please provide both message and disease information'
      });
    }

    const response = await generateResponse(message, disease, score);
    res.json({ response });
  } catch (error) {
    console.error('Error in AI doctor endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: 'An error occurred while processing your request. Please try again.'
    });
  }
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// Socket.io: Listen for ambulance call and simulate dispatch updates

app.get("/api/hospital", (req, res) => {
  res.json({ lat: 12.975, lng: 77.605, name: "City Hospital" });
});

// Socket.io: Listen for ambulance call and simulate dispatch updates
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("callAmbulance", (data) => {
    console.log("Ambulance requested from:", data);
    // Simulate an initial ETA of 10 minutes
    let eta = 10; 
    const interval = setInterval(() => {
      if (eta > 0) {
        eta--;
        socket.emit("ambulanceUpdate", { eta, status: "En Route" });
      } else {
        socket.emit("ambulanceUpdate", { eta: 0, status: "Arrived" });
        clearInterval(interval);
      }
    }, 5000); // For demo: update every 5 seconds
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Example endpoint to retrieve appointments with populated related data
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name age") // Fetch specific patient fields
      .populate("hospitalId", "name location") // Fetch specific hospital fields
      .populate("doctorId", "name specialty"); // Fetch specific doctor fields
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/appointments/priority", async (req, res) => {
  const { hospitalId, selectedTimeSlot } = req.query;

  try {
    if (!hospitalId || !selectedTimeSlot) {
      return res.status(400).send({
        message:
          "Missing required query parameters: hospitalId and selectedTimeSlot",
      });
    }

    const appointments = await Appointment.find({
      hospitalId,
      selectedTimeSlot,
    }).sort({ priorityRating: -1 });

    // Group appointments by doctorId
    const groupedByDoctor = appointments.reduce((result, appointment) => {
      const docId = appointment.doctorId;
      if (!result[docId]) {
        result[docId] = {
          doctorId: docId,
          appointments: [],
        };
      }
      result[docId].appointments.push(appointment);
      return result;
    }, {});

    const resultArray = Object.values(groupedByDoctor);
    res.status(200).send(resultArray);
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
});

app.get("/appointments/slot", async (req, res) => {
  const { hospitalId, doctorId, selectedTimeSlot } = req.query;

  try {
    // Validate input parameters
    if (!hospitalId || !doctorId || !selectedTimeSlot) {
      return res.status(400).send({
        message:
          "Missing required query parameters: hospitalId, doctorId, selectedTimeSlot",
      });
    }

    // Find appointments that match the given criteria and sort by priorityRating in descending order
    const appointments = await Appointment.find({
      hospitalId,
      doctorId,
      selectedTimeSlot,
    })
      .sort({ priorityRating: -1 }) // Sort by priorityRating in descending order
      .populate("patientId", "name age") // Fetch specific fields from Patient collection
      .populate("hospitalId", "name location") // Fetch specific fields from Hospital collection
      .populate("doctorId", "name specialty"); // Fetch specific fields from Doctor collection

    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
