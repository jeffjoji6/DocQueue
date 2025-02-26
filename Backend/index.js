const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors"); // Import cors middleware

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

require("dotenv").config(); // Load environment variables

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Appointment Schema with improvements
const appointmentSchema = new mongoose.Schema({
  patientId: { type: Number, required: true }, // Changed to integer type
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

// Indexing for faster querying on specific fields
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

// Schedule Appointment with Priority
// app.post('/appointments/schedule', async (req, res) => {
//   try {
//     const { patientId, hospitalId, doctorId, selectedTimeSlot, priorityRating, date, disease } = req.body;

//     // Fetch all appointments in the selected slot and sort by priority
//     const appointmentsInSlot = await Appointment.find({ hospitalId, doctorId, selectedTimeSlot })
//       .sort({ priorityRating: -1 });

//     // Validate and parse the start and end times
//     const [startHour, endHour] = selectedTimeSlot.split('-');
//     if (!startHour || !endHour) {
//       return res.status(400).send({ message: "Invalid time slot format" });
//     }

//     const startTime = new Date(`2024-01-01T${startHour.padStart(2, '0')}:00:00Z`);
//     const endTime = new Date(`2024-01-01T${endHour.padStart(2, '0')}:00:00Z`);
//     if (isNaN(startTime) || isNaN(endTime)) {
//       return res.status(400).send({ message: "Failed to parse start or end time" });
//     }

//     // Set a fixed duration of 10 minutes (600,000 ms) for each appointment
//     const appointmentDuration = 10 * 60 * 1000;
//     const exactTime = new Date(startTime.getTime() + appointmentDuration * appointmentsInSlot.length);

//     // Ensure exactTime is within the selected time slot
//     if (exactTime >= endTime) {
//       return res.status(400).send({ message: "The selected time slot is fully booked." });
//     }

//     // Create the appointment with the calculated exact time
//     const newAppointment = new Appointment({
//       patientId,
//       hospitalId,
//       doctorId,
//       selectedTimeSlot,
//       priorityRating,
//       exactTime,
//       date,
//       disease,
//       status: 'scheduled'
//     });

//     await newAppointment.save();
//     res.status(201).send(newAppointment);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

app.get("/api/hospital", (req, res) => {
  res.json({ lat: 12.975, lng: 77.605, name: "City Hospital" });
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

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
