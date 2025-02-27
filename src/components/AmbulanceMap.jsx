import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Receives userLocation, hospitalLocation, and a callback to report route details.
const AmbulanceMap = ({ userLocation, hospitalLocation, onRouteDetails }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (userLocation && hospitalLocation) {
      const map = L.map("map").setView(userLocation, 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(hospitalLocation.lat, hospitalLocation.lng),
        ],
        routeWhileDragging: false,
      }).addTo(map);

      routingControl.on("routesfound", function (e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const summary = routes[0].summary;
          // Pass route summary (distance in meters, time in seconds) to parent
          onRouteDetails(summary);
        }
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [userLocation, hospitalLocation, onRouteDetails]);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
};

export default AmbulanceMap;
