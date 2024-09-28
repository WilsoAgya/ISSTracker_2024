import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@googlemaps/js-api-loader"

const Map = () => {
    // Get the latitude and longitude from the QueryComp component
    const [latitude, setLatitude] = useState(-24.486278433044);
    const [longitude, setLongitude] = useState(43.239932864787);
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    
    const fetchData = async () => {
        const { data } = await axios.get(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );
        return data;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["issLocation"],
        queryFn: fetchData,
        refetchInterval: 5000, // Refetch every 5 seconds
    });

    useEffect(() => {
        if (data) {
            setLatitude(data.latitude);
            setLongitude(data.longitude);
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
        <h1>Map Component</h1>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <iframe
            width="600"
            height="450"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${latitude},${longitude}&zoom=4`}
            allowFullScreen
        ></iframe>
        </div>
    );
}

export default Map;