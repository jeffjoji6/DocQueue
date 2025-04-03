import React, { useState, useEffect } from "react";
import PatientDetailsModal from "../components/PatientDetailsModal";
import CreateAppointmentModal from "../components/CreateAppointmentModal";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  if (loading) {
    return <div className="text-center py-12">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.toDateString() === selectedDate.toDateString();
  });

  const handleViewDetails = (appointment) => {
    setSelectedPatient(appointment);
    setIsModalOpen(true);
  };

  const handleAppointmentCreated = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and view all patient appointments.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Schedule appointment
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Today's Appointments
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {selectedDate.toLocaleDateString()}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  No appointments found for this date
                </li>
              ) : (
                filteredAppointments.map((appointment) => (
                  <li key={appointment._id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                            <span className="text-white font-medium">
                              {appointment.patientId}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Patient ID: {appointment.patientId}
                          </div>
                          <div className="text-sm text-gray-500">
                            Time: {appointment.selectedTimeSlot}
                          </div>
                          <div className="text-sm text-gray-500">
                            Disease: {appointment.disease}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.priorityRating <= 5
                              ? "bg-green-100 text-green-800"
                              : appointment.priorityRating <= 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          Priority: {appointment.priorityRating}
                        </span>
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      {selectedPatient && (
        <PatientDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          patientData={selectedPatient}
        />
      )}

      <CreateAppointmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAppointmentCreated={handleAppointmentCreated}
      />
    </div>
  );
}
