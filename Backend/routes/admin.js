const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/aiDoctor');

// Dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // In a real application, you would fetch these from your database
    const stats = {
      totalPatients: 150,
      todayAppointments: 25,
      emergencyCases: 3,
      waitingPatients: 8
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    // In a real application, you would fetch this from your database
    const patients = [
      {
        id: 1,
        name: 'John Doe',
        age: 45,
        condition: 'Hypertension',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 32,
        condition: 'Diabetes',
        status: 'Pending'
      },
      // Add more mock data as needed
    ];
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients data' });
  }
});

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    // In a real application, you would fetch this from your database
    const appointments = [
      {
        id: 1,
        patientName: 'John Doe',
        time: '09:00 AM',
        status: 'Confirmed'
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        time: '10:30 AM',
        status: 'Pending'
      },
      // Add more mock data as needed
    ];
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments data' });
  }
});

// Get emergency cases
router.get('/emergency', async (req, res) => {
  try {
    // In a real application, you would fetch this from your database
    const emergencyCases = [
      {
        id: 1,
        patientName: 'Alice Johnson',
        condition: 'Chest Pain',
        priority: 'P1',
        status: 'Critical',
        arrivalTime: '08:15 AM'
      },
      {
        id: 2,
        patientName: 'Bob Wilson',
        condition: 'Severe Headache',
        priority: 'P2',
        status: 'Urgent',
        arrivalTime: '08:45 AM'
      },
      // Add more mock data as needed
    ];
    res.json(emergencyCases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emergency cases data' });
  }
});

// Add new patient
router.post('/patients', async (req, res) => {
  try {
    const { name, age, condition } = req.body;
    // In a real application, you would save this to your database
    res.status(201).json({ message: 'Patient added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add patient' });
  }
});

// Update patient status
router.put('/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    // In a real application, you would update this in your database
    res.json({ message: 'Patient status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update patient status' });
  }
});

// Schedule appointment
router.post('/appointments', async (req, res) => {
  try {
    const { patientName, time, date } = req.body;
    // In a real application, you would save this to your database
    res.status(201).json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule appointment' });
  }
});

// Update appointment status
router.put('/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    // In a real application, you would update this in your database
    res.json({ message: 'Appointment status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
});

// Add emergency case
router.post('/emergency', async (req, res) => {
  try {
    const { patientName, condition, priority } = req.body;
    // In a real application, you would save this to your database
    res.status(201).json({ message: 'Emergency case added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add emergency case' });
  }
});

// Update emergency case status
router.put('/emergency/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    // In a real application, you would update this in your database
    res.json({ message: 'Emergency case status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update emergency case status' });
  }
});

module.exports = router; 