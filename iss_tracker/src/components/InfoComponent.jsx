import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const InfoComponent = () => {
  // Define the dates
  
  const date1 = new Date();
  const date2 = new Date('2024-09-29T12:30:00');

  // Calculate the difference in seconds
  const differenceInSeconds = Math.floor((date2 - date1) / 1000);
  
  const [time, setTime] = useState(differenceInSeconds); // Set initial time

  // Fetching data using axios
  const fetchData = async () => {
    const { data } = await axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchData,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Effect to handle timer countdown
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          return 0; // Stop timer at 0
        }
        return prevTime - 1; // Decrease time by 1 second
      });
    }, 1000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  // Convert time to human-readable format
  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  const timestamp = data ? new Date(data.timestamp * 1000).toString() : null;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="lighter p-2 mt-3 mb-1 mx-5 rounded-2">
          <h1 className="text-white timer px-5">{formatTime(time)}</h1> {/* Display formatted time */}
        </div>
        <p className="text-white mb-1">Time until the ISS passes LOCATION</p>
        <p className="text-white mb-5">Last updated at {timestamp}</p>
      </div>

      <h4 className="text-white mb-3">
        Longitude: {data.latitude.toFixed(5)}
      </h4>
      <h4 className="text-white mb-3">
        Latitude: {data.longitude.toFixed(5)}
      </h4>
      <h4 className="text-white mb-3">
        Altitude: {data.altitude.toFixed(5)}{" "}
      </h4>
      <h4 className="text-white mb-3">Speed: {data.velocity.toFixed(5)}</h4>
    </div>
  );
};

export default InfoComponent;
