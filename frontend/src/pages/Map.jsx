import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const NearbyPetsMap = ({ userLocation, nearbyPets }) => {
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [petMarkers, setPetMarkers] = useState([]);

  useEffect(() => {
    if (map) {
      // Add a marker for the user's location
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map: map,
      });
      setUserMarker(userMarker);

      // Add markers for the nearby pets
      const petMarkers = nearbyPets.map((pet) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: pet.location.coordinates[1],
            lng: pet.location.coordinates[0],
          },
          map: map,
        });
        marker.addListener("click", () => {
          // Show a popup with more information about the pet
          const infoWindow = new window.google.maps.InfoWindow({
            content: pet.name,
          });
          infoWindow.open(map, marker);
        });
        return marker;
      });
      setPetMarkers(petMarkers);
    }
  }, [map, userLocation, nearbyPets]);

  const handleApiLoaded = (map, maps) => {
    setMap(map);
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: "AIzaSyBx4f2VPFGSc40dtxhpzkvqRHx-FzT5hvk" }}
        defaultCenter={userLocation}
        defaultZoom={12}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
    </div>
  );
};

export default NearbyPetsMap;
