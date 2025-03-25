import React, { useEffect, useState } from "react";

const Timeslot = () => {
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage any errors

  // Mapping of doctor IDs to doctor names
  const doctorNames = {
    1: "Dr. Ashad Sivaraman",
    2: "Dr. Mahadevan.K",
    3: "Dr. Swapna Nair",
    4: "Dr. Anoop Sivaraman",
    5: "Dr. Harshali Yadav",
    6: "Dr. Anila George",
    7: "Dr. Pinki",
    8: "Dr. Aiswaria",
  };

  useEffect(() => {
    // Fetch appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3001/appointments");
        if (!response.ok) throw new Error("Failed to fetch appointments");

        const data = await response.json();
        setAppointments(data); // Store fetched appointments in state
      } catch (error) {
        setError(error.message); // Capture any errors
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchAppointments();
  }, []);

  if (loading)
    return <p className="text-center pt-28 text-lg">Loading appointments...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 pt-28 text-lg">Error: {error}</p>
    );

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 md:px-6" id="bck">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
          My Appointments
        </h2>

        {appointments.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <li
                key={appointment._id}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 transition-all hover:shadow-md hover:bg-blue-50"
              >
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-semibold text-gray-700">
                    {doctorNames[appointment.doctorId] || "Unknown Doctor"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Date:</strong>{" "}
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Time Slot:</strong> {appointment.selectedTimeSlot}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Disease:</strong> {appointment.disease}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      appointment.status === "scheduled"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <strong>Status:</strong> {appointment.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg mb-6">
              No appointments found.
            </p>
            <a 
              href="/hospitallist" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Book an Appointment
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeslot;
