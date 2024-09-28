import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const QueryComp = () => {
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
  //const dataString = data ? JSON.stringify(data, null, 2) : null;

  //convert time to human readable format
    const timestamp = data ? new Date(data.timestamp * 1000).toString() : null;
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>This is query comp being rendered</h1>
        <p>Latitude: {data.latitude}</p>
        <p>Longitude: {data.longitude}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>Timestamp: {timestamp}</p>
    </div>
  );
};

export default QueryComp;
