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
    8: "Dr. Aiswaria"
  };

  useEffect(() => {
    // Fetch appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3000/appointments");
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

  if (loading) return <p className="text-center mt-10 text-lg">Loading appointments...</p>;
  if (error) return <p className="text-center text-red-500 mt-10 text-lg">Error: {error}</p>;

  return (
    <div className="w-full h-screen flex justify-center bg-gray-100" id="bck">
      <div className="bg-white w-10/12 mt-12 rounded-md shadow-md p-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">My Appointments</h2>
        
        {appointments.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <li key={appointment._id} className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-semibold text-gray-700">
                    {doctorNames[appointment.doctorId] || "Unknown Doctor"}
                  </p>
                  <p className="text-sm text-gray-500"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500"><strong>Time Slot:</strong> {appointment.selectedTimeSlot}</p>
                  <p className="text-sm text-gray-500"><strong>Disease:</strong> {appointment.disease}</p>
                  <p className={`text-sm font-medium ${appointment.status === 'scheduled' ? 'text-green-600' : 'text-red-500'}`}>
                    <strong>Status:</strong> {appointment.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 mt-6 text-lg">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Timeslot;