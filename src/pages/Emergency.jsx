import React from "react";
import AmbulanceMap from "../components/AmbulanceMap";

const Emergency = () => {
  return (
    <div>
      Emergency
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
        Emergency Services
      </h1>
      <p className="text-2xl font-semibold text-gray-700">Ambulance Services</p>
      <AmbulanceMap />
    </div>
  );
};

export default Emergency;
