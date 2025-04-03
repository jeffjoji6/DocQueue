import React, { useState, useEffect } from "react";
import HospitalResources from "../components/HospitalResources";
import ReportGenerator from "../components/ReportGenerator";

import {
  UsersIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
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
  Legend,
} from "chart.js";

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
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Appointments",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(59, 130, 246)",
      tension: 0.1,
    },
  ],
};

const specialtiesData = {
  labels: ["General", "Cardiology", "Orthopedics", "Pediatrics", "Dental"],
  datasets: [
    {
      label: "Patients by Specialty",
      data: [300, 250, 200, 150, 100],
      backgroundColor: [
        "rgba(59, 130, 246, 0.5)",
        "rgba(16, 185, 129, 0.5)",
        "rgba(245, 158, 11, 0.5)",
        "rgba(239, 68, 68, 0.5)",
        "rgba(139, 92, 246, 0.5)",
      ],
      borderColor: [
        "rgb(59, 130, 246)",
        "rgb(16, 185, 129)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
        "rgb(139, 92, 246)",
      ],
      borderWidth: 1,
    },
  ],
};

const waitTimesData = {
  labels: ["< 15min", "15-30min", "30-45min", "45-60min", "> 60min"],
  datasets: [
    {
      label: "Wait Times Distribution",
      data: [40, 30, 15, 10, 5],
      backgroundColor: [
        "rgba(16, 185, 129, 0.5)",
        "rgba(59, 130, 246, 0.5)",
        "rgba(245, 158, 11, 0.5)",
        "rgba(239, 68, 68, 0.5)",
        "rgba(139, 92, 246, 0.5)",
      ],
      borderColor: [
        "rgb(16, 185, 129)",
        "rgb(59, 130, 246)",
        "rgb(245, 158, 11)",
        "rgb(239, 68, 68)",
        "rgb(139, 92, 246)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3001/appointments");
        const data = await response.json();

        // Ensure all appointments have proper date objects and standardized status
        const processedData = data.map((apt) => ({
          ...apt,
          date: new Date(apt.date),
          status: apt.status.toLowerCase(),
          disease: apt.disease || "Not Specified",
          priorityRating: parseInt(apt.priorityRating) || 0,
        }));

        setAppointments(processedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments");
        console.error("Error fetching appointments:", err);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  // Calculate statistics
  const totalAppointments = appointments.length;
  const todayAppointments = appointments.filter(
    (apt) => apt.date.toDateString() === new Date().toDateString()
  ).length;
  const emergencyCases = appointments.filter(
    (apt) => apt.disease.toLowerCase() === "emergency"
  ).length;
  const highPriorityCases = appointments.filter(
    (apt) => apt.priorityRating > 10
  ).length;
  const uniquePatients = new Set(appointments.map((apt) => apt.patientId)).size;

  // Calculate appointment status distribution with standardized statuses
  const statusDistribution = appointments.reduce((acc, apt) => {
    const status = apt.status.toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Calculate disease distribution with proper grouping
  const diseaseDistribution = appointments.reduce((acc, apt) => {
    const disease = apt.disease || "Not Specified";
    acc[disease] = (acc[disease] || 0) + 1;
    return acc;
  }, {});

  // Calculate appointment trends for the last 7 days
  const getLast7DaysData = () => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    return days.reduce((acc, date) => {
      const dayStr = date.toDateString();
      acc[dayStr] = appointments.filter(
        (apt) => apt.date.toDateString() === dayStr
      ).length;
      return acc;
    }, {});
  };

  const appointmentTrends = getLast7DaysData();

  // Mock data for hospital resources
  const doctors = [
    {
      id: "1",
      name: "Dr. Smith",
      specialty: "General Medicine",
      status: "Available",
      currentPatients: 2,
      maxPatients: 5,
    },
    {
      id: "2",
      name: "Dr. Johnson",
      specialty: "Cardiology",
      status: "In Surgery",
      currentPatients: 3,
      maxPatients: 4,
    },
    {
      id: "3",
      name: "Dr. Williams",
      specialty: "Pediatrics",
      status: "Available",
      currentPatients: 1,
      maxPatients: 6,
    },
    {
      id: "4",
      name: "Dr. Brown",
      specialty: "Orthopedics",
      status: "On Call",
      currentPatients: 0,
      maxPatients: 4,
    },
    {
      id: "5",
      name: "Dr. Davis",
      specialty: "Neurology",
      status: "Available",
      currentPatients: 2,
      maxPatients: 5,
    },
  ];

  const rooms = [
    {
      id: "101",
      type: "General Ward",
      capacity: 4,
      occupied: 3,
      status: "Available",
    },
    {
      id: "102",
      type: "General Ward",
      capacity: 4,
      occupied: 4,
      status: "Full",
    },
    {
      id: "201",
      type: "Private Room",
      capacity: 1,
      occupied: 1,
      status: "Occupied",
    },
    {
      id: "202",
      type: "Private Room",
      capacity: 1,
      occupied: 0,
      status: "Available",
    },
    {
      id: "301",
      type: "ICU",
      capacity: 2,
      occupied: 1,
      status: "Available",
    },
    {
      id: "302",
      type: "ICU",
      capacity: 2,
      occupied: 2,
      status: "Full",
    },
    {
      id: "401",
      type: "Operation Theater",
      capacity: 1,
      occupied: 0,
      status: "Available",
    },
    {
      id: "402",
      type: "Operation Theater",
      capacity: 1,
      occupied: 1,
      status: "In Use",
    },
  ];

  const equipment = [
    {
      id: "E001",
      name: "X-Ray Machine",
      type: "Diagnostic",
      status: "Available",
      location: "Radiology Department",
    },
    {
      id: "E002",
      name: "MRI Scanner",
      type: "Diagnostic",
      status: "In Use",
      location: "Radiology Department",
    },
    {
      id: "E003",
      name: "CT Scanner",
      type: "Diagnostic",
      status: "Available",
      location: "Radiology Department",
    },
    {
      id: "E004",
      name: "Ultrasound Machine",
      type: "Diagnostic",
      status: "In Use",
      location: "Radiology Department",
    },
    {
      id: "E005",
      name: "Ventilator",
      type: "Treatment",
      status: "Available",
      location: "ICU",
    },
    {
      id: "E006",
      name: "ECG Machine",
      type: "Diagnostic",
      status: "Available",
      location: "Cardiology Department",
    },
    {
      id: "E007",
      name: "Dialysis Machine",
      type: "Treatment",
      status: "In Use",
      location: "Nephrology Department",
    },
    {
      id: "E008",
      name: "Anesthesia Machine",
      type: "Treatment",
      status: "In Use",
      location: "Operation Theater",
    },
  ];

  // Prepare data for the report with processed data
  const reportData = {
    appointments: appointments.map((apt) => ({
      ...apt,
      date: apt.date.toISOString(), // Convert date to string for PDF generation
    })),
    doctors,
    rooms,
    equipment,
    statistics: {
      totalAppointments,
      todayAppointments,
      emergencyCases,
      highPriorityCases,
      uniquePatients,
    },
    statusDistribution,
    diseaseDistribution,
    appointmentTrends,
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of hospital operations and patient statistics.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-3">
          <button
            type="button"
            onClick={() => setIsResourcesModalOpen(true)}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Manage Resources
          </button>
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Generate Report
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Key Statistics */}
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Appointments
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {totalAppointments}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Today's Appointments
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {todayAppointments}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Emergency Cases
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {emergencyCases}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            High Priority Cases
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {highPriorityCases}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Unique Patients
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {uniquePatients}
          </dd>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Appointment Status Distribution */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Appointment Status Distribution
            </h3>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {Object.entries(statusDistribution).map(([status, count]) => (
                  <li key={status} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {count}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disease Distribution */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Disease Distribution
            </h3>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {Object.entries(diseaseDistribution).map(([disease, count]) => (
                  <li key={disease} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {disease}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {count}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <HospitalResources
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
      />

      <ReportGenerator
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        data={reportData}
      />
    </div>
  );
}
