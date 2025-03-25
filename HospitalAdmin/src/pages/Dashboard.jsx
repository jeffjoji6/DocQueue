import React, { useState, useEffect } from "react";
import {
  UsersIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const stats = [
  { name: "Total Patients", value: "0", icon: UsersIcon },
  { name: "Today's Appointments", value: "0", icon: CalendarIcon },
  { name: "Emergency Cases", value: "0", icon: ExclamationTriangleIcon },
  { name: "Waiting Patients", value: "0", icon: ClockIcon },
];

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
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {/* Activity items will be populated here */}
            <li className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-blue-600 truncate">
                  Loading recent activity...
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
