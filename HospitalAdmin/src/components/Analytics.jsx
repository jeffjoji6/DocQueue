import React, { useState, useEffect } from "react";
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

const Analytics = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "https://docqueue-backend.onrender.com/appointments"
      );
      const data = await response.json();
      setAppointments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const totalAppointments = appointments.length;
    const diseases = appointments.reduce((acc, curr) => {
      acc[curr.disease] = (acc[curr.disease] || 0) + 1;
      return acc;
    }, {});
    const averagePriority =
      appointments.reduce((acc, curr) => acc + curr.priorityRating, 0) /
      totalAppointments;

    return {
      totalAppointments,
      diseases,
      averagePriority: averagePriority.toFixed(2),
    };
  };

  // Prepare data for charts
  const prepareChartData = () => {
    const stats = getStatistics();

    // Disease distribution chart data
    const diseaseData = {
      labels: Object.keys(stats.diseases),
      datasets: [
        {
          data: Object.values(stats.diseases),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };

    // Priority rating distribution
    const priorityData = {
      labels: [
        "Low (1-5)",
        "Medium (6-10)",
        "High (11-15)",
        "Very High (16-20)",
      ],
      datasets: [
        {
          label: "Number of Appointments",
          data: [
            appointments.filter((a) => a.priorityRating <= 5).length,
            appointments.filter(
              (a) => a.priorityRating > 5 && a.priorityRating <= 10
            ).length,
            appointments.filter(
              (a) => a.priorityRating > 10 && a.priorityRating <= 15
            ).length,
            appointments.filter((a) => a.priorityRating > 15).length,
          ],
          backgroundColor: "#36A2EB",
        },
      ],
    };

    // Time slot distribution
    const timeSlotData = {
      labels: ["09-10", "10-11", "11-12"],
      datasets: [
        {
          label: "Appointments per Time Slot",
          data: [
            appointments.filter((a) => a.selectedTimeSlot === "09-10").length,
            appointments.filter((a) => a.selectedTimeSlot === "10-11").length,
            appointments.filter((a) => a.selectedTimeSlot === "11-12").length,
          ],
          backgroundColor: "#FF6384",
        },
      ],
    };

    return { diseaseData, priorityData, timeSlotData };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const stats = getStatistics();
  const { diseaseData, priorityData, timeSlotData } = prepareChartData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Appointment Analytics Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Appointments</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalAppointments}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            Average Priority Rating
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.averagePriority}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Unique Diseases</h3>
          <p className="text-3xl font-bold text-purple-600">
            {Object.keys(stats.diseases).length}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Disease Distribution</h3>
          <div className="h-64">
            <Pie data={diseaseData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Priority Rating Distribution
          </h3>
          <div className="h-64">
            <Bar data={priorityData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Time Slot Distribution</h3>
          <div className="h-64">
            <Bar data={timeSlotData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
