import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

const AmbulanceMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitalLocation, setHospitalLocation] = useState(null); // Example hospital coordinates
  useEffect(() => {
    if (userLocation) {
      fetch("http://localhost:3000/api/hospital")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHospitalLocation(data);
        });
    }
  }, [userLocation]);
  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error fetching user location:", error);
        alert("Could not get your location. Please enable GPS.");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (userLocation && hospitalLocation) {
      // Ensure hospitalLocation is not null
      const map = L.map("map").setView(userLocation, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(hospitalLocation.lat, hospitalLocation.lng),
        ],
        routeWhileDragging: true,
      }).addTo(map);
    }
  }, [userLocation, hospitalLocation]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default AmbulanceMap;
