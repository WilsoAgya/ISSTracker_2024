import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const InfoComponent = () => {
  const fetchData = async () => {
    const { data } = await axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchData,
    refetchInterval: 1000, // Refetch every 1 second
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

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="lighter p-2 mt-3 mb-1 mx-5 rounded-2">
          <h1 className="text-white timer px-5">00:00:00</h1>
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
