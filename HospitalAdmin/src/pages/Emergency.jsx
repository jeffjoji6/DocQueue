import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Emergency() {
  const [emergencyCases, setEmergencyCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmergencyCases = async () => {
      try {
        const response = await axios.get("/api/admin/emergency");
        setEmergencyCases(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to fetch emergency cases");
        console.error("Error fetching emergency cases:", err);
        setEmergencyCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyCases();
    const interval = setInterval(fetchEmergencyCases, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading emergency cases...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Emergency Cases
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor and manage emergency cases in real-time.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            New Emergency Case
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Active Emergency Cases
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {emergencyCases.length} cases requiring immediate attention
            </p>
          </div>
          <div className="border-t border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {emergencyCases.length === 0 ? (
                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  No active emergency cases
                </li>
              ) : (
                emergencyCases.map((case_) => (
                  <li key={case_.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-red-600 font-medium">
                              {case_.priority}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {case_.patientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {case_.condition}
                          </div>
                          <div className="text-sm text-gray-500">
                            Arrival Time: {case_.arrivalTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            case_.status === "Critical"
                              ? "bg-red-100 text-red-800"
                              : case_.status === "Urgent"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {case_.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-900">
                          View Details
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Assign Doctor
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
    </div>
  );
}
