import React, { useState, useEffect } from "react";
import HospitalResources from "../components/HospitalResources";

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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3001/appointments");
        const data = await response.json();
        setAppointments(data);
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
    (apt) => new Date(apt.date).toDateString() === new Date().toDateString()
  ).length;
  const emergencyCases = appointments.filter(
    (apt) => apt.disease.toLowerCase() === "emergency"
  ).length;
  const highPriorityCases = appointments.filter(
    (apt) => apt.priorityRating > 10
  ).length;
  const uniquePatients = new Set(appointments.map((apt) => apt.patientId)).size;

  // Calculate appointment status distribution
  const statusDistribution = appointments.reduce((acc, apt) => {
    acc[apt.status] = (acc[apt.status] || 0) + 1;
    return acc;
  }, {});

  // Calculate disease distribution
  const diseaseDistribution = appointments.reduce((acc, apt) => {
    acc[apt.disease] = (acc[apt.disease] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of hospital operations and patient statistics.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsResourcesModalOpen(true)}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Manage Resources
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
    </div>
  );
}
