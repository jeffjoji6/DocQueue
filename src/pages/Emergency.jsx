import React, { useState, useEffect } from "react";
import AmbulanceMap from "../components/AmbulanceMap";

const Emergency = () => {
  const [isAmbulanceCalled, setIsAmbulanceCalled] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [hospitalLocation, setHospitalLocation] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [ambulanceStatus, setAmbulanceStatus] = useState("Idle");
  const [eta, setEta] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get user's location when ambulance is called
  useEffect(() => {
    if (isAmbulanceCalled) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Please enable location services.");
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [isAmbulanceCalled]);

  // Fetch hospital location once user location is set
  useEffect(() => {
    if (userLocation) {
      fetch("http://localhost:3000/api/hospital")
        .then((res) => res.json())
        .then((data) => setHospitalLocation(data))
        .catch((err) => console.error(err));
    }
  }, [userLocation]);

  // Simulate real-time ambulance updates after route details are available
  useEffect(() => {
    if (routeDetails) {
      let remainingTime = Math.ceil(routeDetails.totalTime / 60);
      setEta(remainingTime);
      setAmbulanceStatus("Ambulance Dispatched");

      const interval = setInterval(() => {
        remainingTime -= 1;
        if (remainingTime > 0) {
          setEta(remainingTime);
          setAmbulanceStatus("Ambulance En Route");
        } else {
          setEta(0);
          setAmbulanceStatus("Ambulance Arrived");
          clearInterval(interval);
        }
      }, 5000); // For demo purposes; update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [routeDetails]);

  const handleCallAmbulance = () => {
    setIsAmbulanceCalled(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-red-700">
          Emergency Services
        </h1>
        <p className="mt-3 text-xl text-gray-800">
          Immediate Ambulance Dispatch & Support
        </p>
      </header>

      {!isAmbulanceCalled && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleCallAmbulance}
            className="bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white px-10 py-4 rounded-xl text-2xl shadow-lg"
          >
            CALL AMBULANCE 🚑
          </button>
          {loading && (
            <p className="mt-4 text-lg text-gray-600 animate-pulse">
              Fetching your location...
            </p>
          )}
        </div>
      )}

      {isAmbulanceCalled && userLocation && hospitalLocation && (
        <>
          <div className="w-full max-w-5xl h-96 border-2 border-gray-300 rounded-2xl shadow-2xl overflow-hidden mb-8">
            <AmbulanceMap
              userLocation={userLocation}
              hospitalLocation={hospitalLocation}
              onRouteDetails={setRouteDetails}
            />
          </div>
          {routeDetails && (
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-6 mb-6">
              <div className="flex justify-around items-center">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Distance:</span>{" "}
                  {(routeDetails.totalDistance / 1000).toFixed(2)} km
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">ETA:</span>{" "}
                  {Math.ceil(routeDetails.totalTime / 60)} minutes
                </p>
              </div>
            </div>
          )}
          {ambulanceStatus !== "Idle" && (
  <div className="w-full max-w-5xl bg-red-600 text-white rounded-2xl shadow-lg p-8 text-center animate-pulse">
    <p className="text-3xl font-extrabold">
      🚨 EMERGENCY ALERT: {ambulanceStatus} 🚨
    </p>
    {eta !== null && (
      <p className="mt-4 text-xl font-semibold">
        🚑 Estimated Arrival: <span className="font-bold">{eta}</span> minute{eta !== 1 && "s"}
      </p>
    )}
    <p className="mt-6 text-lg font-medium">
      📞 Need help? Call now:{" "}
      <a href="tel:+11234567890" className="underline font-bold">
        +91 9124125655
      </a>
    </p>
  </div>
)}
        </>
      )}
    </div>
  );
};

export default Emergency;
