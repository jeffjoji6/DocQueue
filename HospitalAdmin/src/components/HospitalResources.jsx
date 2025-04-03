import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const HospitalResources = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("doctors");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for doctors
  const [doctors, setDoctors] = useState([
    {
      id: "1",
      name: "Dr. Smith",
      specialty: "General Medicine",
      schedule: [
        {
          day: "Monday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
        {
          day: "Tuesday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
        {
          day: "Wednesday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
        {
          day: "Thursday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
        {
          day: "Friday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
      ],
      status: "Available",
      currentPatients: 2,
      maxPatients: 5,
    },
    {
      id: "2",
      name: "Dr. Johnson",
      specialty: "Cardiology",
      schedule: [
        {
          day: "Monday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
        {
          day: "Tuesday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
        {
          day: "Wednesday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
        {
          day: "Thursday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
        {
          day: "Friday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
      ],
      status: "In Surgery",
      currentPatients: 3,
      maxPatients: 4,
    },
    {
      id: "3",
      name: "Dr. Williams",
      specialty: "Pediatrics",
      schedule: [
        {
          day: "Monday",
          slots: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"],
        },
        {
          day: "Tuesday",
          slots: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"],
        },
        {
          day: "Wednesday",
          slots: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"],
        },
        {
          day: "Thursday",
          slots: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"],
        },
        {
          day: "Friday",
          slots: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM"],
        },
      ],
      status: "Available",
      currentPatients: 1,
      maxPatients: 6,
    },
    {
      id: "4",
      name: "Dr. Brown",
      specialty: "Orthopedics",
      schedule: [
        {
          day: "Monday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
        {
          day: "Tuesday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
        {
          day: "Wednesday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
        {
          day: "Thursday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
        {
          day: "Friday",
          slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
        },
      ],
      status: "On Call",
      currentPatients: 0,
      maxPatients: 4,
    },
    {
      id: "5",
      name: "Dr. Davis",
      specialty: "Neurology",
      schedule: [
        {
          day: "Monday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
        {
          day: "Tuesday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
        {
          day: "Wednesday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
        {
          day: "Thursday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
        {
          day: "Friday",
          slots: ["09:30 AM", "10:30 AM", "11:30 AM", "02:30 PM", "03:30 PM"],
        },
      ],
      status: "Available",
      currentPatients: 2,
      maxPatients: 5,
    },
  ]);

  // Mock data for rooms
  const [rooms, setRooms] = useState([
    {
      id: "101",
      type: "General Ward",
      capacity: 4,
      occupied: 3,
      status: "Available",
      equipment: ["Bed", "Monitor", "Oxygen"],
    },
    {
      id: "102",
      type: "General Ward",
      capacity: 4,
      occupied: 4,
      status: "Full",
      equipment: ["Bed", "Monitor", "Oxygen"],
    },
    {
      id: "201",
      type: "Private Room",
      capacity: 1,
      occupied: 1,
      status: "Occupied",
      equipment: ["Bed", "Monitor", "Oxygen", "TV", "Refrigerator"],
    },
    {
      id: "202",
      type: "Private Room",
      capacity: 1,
      occupied: 0,
      status: "Available",
      equipment: ["Bed", "Monitor", "Oxygen", "TV", "Refrigerator"],
    },
    {
      id: "301",
      type: "ICU",
      capacity: 2,
      occupied: 1,
      status: "Available",
      equipment: ["Bed", "Ventilator", "Monitor", "Oxygen", "ECG Machine"],
    },
    {
      id: "302",
      type: "ICU",
      capacity: 2,
      occupied: 2,
      status: "Full",
      equipment: ["Bed", "Ventilator", "Monitor", "Oxygen", "ECG Machine"],
    },
    {
      id: "401",
      type: "Operation Theater",
      capacity: 1,
      occupied: 0,
      status: "Available",
      equipment: [
        "Operating Table",
        "Anesthesia Machine",
        "Surgical Instruments",
        "Monitor",
      ],
    },
    {
      id: "402",
      type: "Operation Theater",
      capacity: 1,
      occupied: 1,
      status: "In Use",
      equipment: [
        "Operating Table",
        "Anesthesia Machine",
        "Surgical Instruments",
        "Monitor",
      ],
    },
  ]);

  // Mock data for equipment
  const [equipment, setEquipment] = useState([
    {
      id: "E001",
      name: "X-Ray Machine",
      type: "Diagnostic",
      status: "Available",
      location: "Radiology Department",
      lastMaintenance: "2023-03-15",
      nextMaintenance: "2023-06-15",
    },
    {
      id: "E002",
      name: "MRI Scanner",
      type: "Diagnostic",
      status: "In Use",
      location: "Radiology Department",
      lastMaintenance: "2023-02-20",
      nextMaintenance: "2023-05-20",
    },
    {
      id: "E003",
      name: "CT Scanner",
      type: "Diagnostic",
      status: "Available",
      location: "Radiology Department",
      lastMaintenance: "2023-03-01",
      nextMaintenance: "2023-06-01",
    },
    {
      id: "E004",
      name: "Ultrasound Machine",
      type: "Diagnostic",
      status: "In Use",
      location: "Radiology Department",
      lastMaintenance: "2023-02-10",
      nextMaintenance: "2023-05-10",
    },
    {
      id: "E005",
      name: "Ventilator",
      type: "Treatment",
      status: "Available",
      location: "ICU",
      lastMaintenance: "2023-03-05",
      nextMaintenance: "2023-06-05",
    },
    {
      id: "E006",
      name: "ECG Machine",
      type: "Diagnostic",
      status: "Available",
      location: "Cardiology Department",
      lastMaintenance: "2023-02-25",
      nextMaintenance: "2023-05-25",
    },
    {
      id: "E007",
      name: "Dialysis Machine",
      type: "Treatment",
      status: "In Use",
      location: "Nephrology Department",
      lastMaintenance: "2023-03-10",
      nextMaintenance: "2023-06-10",
    },
    {
      id: "E008",
      name: "Anesthesia Machine",
      type: "Treatment",
      status: "In Use",
      location: "Operation Theater",
      lastMaintenance: "2023-02-15",
      nextMaintenance: "2023-05-15",
    },
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "In Use":
      case "Occupied":
        return "bg-blue-100 text-blue-800";
      case "Full":
        return "bg-yellow-100 text-yellow-800";
      case "In Surgery":
        return "bg-red-100 text-red-800";
      case "On Call":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900 mb-6"
                    >
                      Hospital Resource Management
                    </Dialog.Title>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                          onClick={() => handleTabChange("doctors")}
                          className={`${
                            activeTab === "doctors"
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                        >
                          Doctors
                        </button>
                        <button
                          onClick={() => handleTabChange("rooms")}
                          className={`${
                            activeTab === "rooms"
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                        >
                          Rooms
                        </button>
                        <button
                          onClick={() => handleTabChange("equipment")}
                          className={`${
                            activeTab === "equipment"
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                        >
                          Equipment
                        </button>
                      </nav>
                    </div>

                    {/* Doctors Tab */}
                    {activeTab === "doctors" && (
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Doctor
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Specialty
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Patients
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <span className="sr-only">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {doctors.map((doctor) => (
                              <tr key={doctor.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {doctor.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {doctor.specialty}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      doctor.status
                                    )}`}
                                  >
                                    {doctor.status}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {doctor.currentPatients} /{" "}
                                  {doctor.maxPatients}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <button className="text-blue-600 hover:text-blue-900">
                                    View Schedule
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Rooms Tab */}
                    {activeTab === "rooms" && (
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Room
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Type
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Occupancy
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <span className="sr-only">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {rooms.map((room) => (
                              <tr key={room.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {room.id}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {room.type}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      room.status
                                    )}`}
                                  >
                                    {room.status}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {room.occupied} / {room.capacity}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <button className="text-blue-600 hover:text-blue-900">
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Equipment Tab */}
                    {activeTab === "equipment" && (
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Equipment
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Type
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Location
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Next Maintenance
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <span className="sr-only">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {equipment.map((item) => (
                              <tr key={item.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {item.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {item.type}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      item.status
                                    )}`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {item.location}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {item.nextMaintenance}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <button className="text-blue-600 hover:text-blue-900">
                                    Schedule Maintenance
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default HospitalResources;
