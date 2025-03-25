import React, { useState, useEffect } from "react";

import {
  UsersIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  { name: "Total Patients", value: "0", icon: UsersIcon },
  { name: "Today's Appointments", value: "0", icon: CalendarIcon },
  { name: "Emergency Cases", value: "0", icon: ExclamationTriangleIcon },
  { name: "Waiting Patients", value: "0", icon: ClockIcon },
];

// Sample data for charts
const appointmentsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Appointments',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.1
    }
  ]
};

const specialtiesData = {
  labels: ['General', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Dental'],
  datasets: [
    {
      label: 'Patients by Specialty',
      data: [300, 250, 200, 150, 100],
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(16, 185, 129, 0.5)',
        'rgba(245, 158, 11, 0.5)',
        'rgba(239, 68, 68, 0.5)',
        'rgba(139, 92, 246, 0.5)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(139, 92, 246)'
      ],
      borderWidth: 1
    }
  ]
};

const waitTimesData = {
  labels: ['< 15min', '15-30min', '30-45min', '45-60min', '> 60min'],
  datasets: [
    {
      label: 'Wait Times Distribution',
      data: [40, 30, 15, 10, 5],
      backgroundColor: [
        'rgba(16, 185, 129, 0.5)',
        'rgba(59, 130, 246, 0.5)',
        'rgba(245, 158, 11, 0.5)',
        'rgba(239, 68, 68, 0.5)',
        'rgba(139, 92, 246, 0.5)'
      ],
      borderColor: [
        'rgb(16, 185, 129)',
        'rgb(59, 130, 246)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(139, 92, 246)'
      ],
      borderWidth: 1
    }
  ]
};

export default function Dashboard() {
  const [data, setData] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    emergencyCases: 0,
    waitingPatients: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      {/* Header with DocQueue Logo */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">DQ</span>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-800">DocQueue Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Hospital Administrator</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Generate Report
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {data[item.name.toLowerCase().replace(/\s+/g, "")] || 0}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Appointments Trend */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointments Trend</h2>
          <div className="h-80">
            <Line data={appointmentsData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Patients by Specialty */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Patients by Specialty</h2>
          <div className="h-80">
            <Bar data={specialtiesData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Wait Times Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Wait Times Distribution</h2>
          <div className="h-80">
            <Pie data={waitTimesData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { time: '2 mins ago', action: 'New appointment booked', patient: 'Rahul Kumar' },
              { time: '15 mins ago', action: 'Appointment completed', patient: 'Priya Sharma' },
              { time: '30 mins ago', action: 'Patient checked in', patient: 'Amit Patel' },
              { time: '1 hour ago', action: 'Doctor assigned', patient: 'Neha Gupta' },
              { time: '2 hours ago', action: 'Payment received', patient: 'Sanjay Verma' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.patient}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
