import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PatientDetailsModal = ({ isOpen, onClose, patientData }) => {
  // Dummy data to enhance the display
  const enhancedData = {
    ...patientData,
    personalInfo: {
      name: `Patient ${patientData.patientId}`,
      age: Math.floor(Math.random() * 50) + 20,
      gender: Math.random() > 0.5 ? "Male" : "Female",
      bloodGroup: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"][
        Math.floor(Math.random() * 8)
      ],
      contact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      email: `patient${patientData.patientId}@example.com`,
      address: "123 Healthcare Street, Medical City, 12345",
    },
    medicalHistory: [
      { condition: "Hypertension", diagnosed: "2020-03-15", status: "Active" },
      {
        condition: "Type 2 Diabetes",
        diagnosed: "2021-06-22",
        status: "Active",
      },
      { condition: "Asthma", diagnosed: "2019-11-05", status: "Inactive" },
    ],
    allergies: ["Penicillin", "Peanuts", "Latex"],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Aspirin", dosage: "81mg", frequency: "Once daily" },
    ],
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: `HC${Math.floor(Math.random() * 1000000)}`,
      coverage: "Comprehensive",
      validUntil: "2025-12-31",
    },
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
                      Patient Details
                    </Dialog.Title>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Personal Information
                        </h4>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Name
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.personalInfo.name}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Age
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.personalInfo.age}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Gender
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.personalInfo.gender}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Blood Group
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.personalInfo.bloodGroup}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Contact
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.personalInfo.contact}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Email
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.personalInfo.email}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Current Appointment */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Current Appointment
                        </h4>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Date
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {new Date(patientData.date).toLocaleDateString()}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Time Slot
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {patientData.selectedTimeSlot}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Disease
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {patientData.disease}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Priority Rating
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {patientData.priorityRating}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Status
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {patientData.status}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Medical History */}
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Medical History
                        </h4>
                        <div className="space-y-2">
                          {enhancedData.medicalHistory.map(
                            (condition, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center"
                              >
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {condition.condition}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Diagnosed: {condition.diagnosed}
                                  </p>
                                </div>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    condition.status === "Active"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {condition.status}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Insurance Information */}
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Insurance Information
                        </h4>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Provider
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.insurance.provider}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Policy Number
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.insurance.policyNumber}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Coverage
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.insurance.coverage}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">
                              Valid Until
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {enhancedData.insurance.validUntil}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
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

export default PatientDetailsModal;
