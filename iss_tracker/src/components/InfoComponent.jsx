import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const InfoComponent = () => {
 
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
  
  const timestamp = data ? new Date(data.timestamp * 1000).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",    
  }) : null;

  const [time, setTime] = useState(0); // Set initial time
  const [date2, setDate2] = useState(null); // To hold the fetched date

  // Effect to fetch date2 from the API
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const n2yoApiKey = import.meta.env.VITE_N2YO_API_KEY;
        const url = `https://cors-anywhere.herokuapp.com/https://api.n2yo.com/rest/v1/satellite/visualpasses/25544/49.246445/-122.994560/0/2/300/&apiKey=${n2yoApiKey}`;
      
        const response = await axios.get(url);
        // Assuming the API returns an object with a 'date' field
        setDate2(new Date(response.data.passes[0].startUTC * 1000));
      } catch (error) {
        console.error('Error fetching date:', error);
      }
    };

    fetchDate();
  }, []);

  // Effect to handle timer countdown when date2 is available
  useEffect(() => {
    if (date2) {
      const differenceInSeconds = Math.floor((date2 - new Date()) / 1000);
      setTime(differenceInSeconds);

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
    }
  }, [date2]);

  // Convert time to human-readable format
  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="lighter p-2 mt-3 mb-1 mx-5 rounded-2">
          <h1 className="text-white timer px-5">{formatTime(time)}</h1> {/* Display formatted time */}
        </div>
        <p className="text-white mb-4">Time until the ISS passes SFU</p>

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
      <h4 className="text-white mb-4">Speed: {data.velocity.toFixed(5)}</h4>
      <p className="text-white mb-2">Last updated at {timestamp}</p>
    </div>
  );
};

export default InfoComponent;
