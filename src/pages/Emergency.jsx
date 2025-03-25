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
      fetch("http://localhost:3001/api/hospital")
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
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [routeDetails]);

  const handleCallAmbulance = () => {
    setIsAmbulanceCalled(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white pt-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-3">
            Emergency Services
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Immediate Ambulance Dispatch & Support
          </p>
        </header>

        {!isAmbulanceCalled ? (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleCallAmbulance}
              className="bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white px-8 md:px-10 py-4 rounded-xl text-xl md:text-2xl shadow-lg transform hover:scale-105 active:scale-95"
            >
              CALL AMBULANCE 🚑
            </button>
            {loading && (
              <p className="text-lg text-gray-600 animate-pulse">
                Fetching your location...
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {userLocation && hospitalLocation && (
              <>
                <div className="w-full h-[300px] md:h-[400px] border-2 border-gray-300 rounded-2xl shadow-2xl overflow-hidden">
                  <AmbulanceMap
                    userLocation={userLocation}
                    hospitalLocation={hospitalLocation}
                    onRouteDetails={setRouteDetails}
                  />
                </div>

                {routeDetails && (
                  <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
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
                  <div className="bg-red-600 text-white rounded-xl shadow-lg p-6 md:p-8 text-center animate-pulse">
                    <p className="text-2xl md:text-3xl font-extrabold mb-4">
                      🚨 EMERGENCY ALERT: {ambulanceStatus} 🚨
                    </p>
                    {eta !== null && (
                      <p className="text-lg md:text-xl font-semibold mb-4">
                        🚑 Estimated Arrival: <span className="font-bold">{eta}</span> minute
                        {eta !== 1 && "s"}
                      </p>
                    )}
                    <p className="text-base md:text-lg">
                      📞 Need help? Call now:{" "}
                      <a
                        href="tel:+919124125655"
                        className="underline font-bold hover:text-red-100"
                      >
                        +91 9124125655
                      </a>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Emergency;
