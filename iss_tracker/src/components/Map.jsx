import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  // Fetch ISS location data
  const fetchData = async () => {
    const { data } = await axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["issLocation"],
    queryFn: fetchData,
    refetchInterval: 5000, // Refetch every 5 second
  });

  // Update latitude and longitude when data is fetched
  useEffect(() => {
    if (data) {
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setLastUpdateTimestamp(data.timestamp);
    }
  }, [data]);

useEffect(() => {
    if (mapInstance.current) {
        mapInstance.current.setCenter({ lat: latitude, lng: longitude });
    }
}, [latitude, longitude]);

  // Initialize Google Maps when the loader is ready and lat/lng are available
  useEffect(() => {
    if (latitude && longitude) {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["maps", "marker"],
      });

      loader
        .importLibrary("maps")
        .then((google) => {
          if (!mapInstance.current) {
            // Initialize the map
            mapInstance.current = new google.Map(mapRef.current, {
              center: { lat: latitude, lng: longitude },
              zoom: 4,
            });

          } else {
            // Update the marker position when coordinates change
            mapInstance.current.setCenter({ lat: latitude, lng: longitude });
          }
        })
        .catch((err) => console.error("Google Maps API failed to load:", err));

        loader
        .importLibrary("marker")
        .then((google) => {
            if (!markerInstance.current) {
                markerInstance.current = new google.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: mapInstance.current,
                    title: "International Space Station",
                  });
            }
            else {
                markerInstance.current.setPosition({ lat: latitude, lng: longitude });
            }
        })
        .catch((err) => console.error("Google Maps API failed to load:", err));
    }
  }, [latitude, longitude]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div id="map" className="rounded-3 w-100 " ref={mapRef} style={{ height: "400px" }}></div>
    </div>
  );
};

export default Map;
