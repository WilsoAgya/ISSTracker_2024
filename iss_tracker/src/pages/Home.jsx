/* eslint-disable no-unused-vars */
import react from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const fetchData = async () => {
    const { data } = await axios.get("https://api.wheretheiss.at/v1/satellites");
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchData,
  });
  //const data = "Adssadasdfasdfa";
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>ISS_TRACKER</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Home;
