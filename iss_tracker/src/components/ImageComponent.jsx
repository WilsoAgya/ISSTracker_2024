import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const ImageComponent = () => {
  const fetchDataImage = async () => {
  const apiKey = import.meta.env.VITE_NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
  };
  
  const { data: dataImage, error, isLoading } = useQuery({
    queryKey: ["picture"],
    queryFn: fetchDataImage,
    refetchInterval: 5000, // Refetch every 5 seconds
  });
  //const dataString = data ? JSON.stringify(data, null, 2) : null;

  //convert time to human readable format
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
        <h2 className="my-2 text-light">{dataImage.title}</h2>
        <img className="my-2 border border-light" src={dataImage.url} style={{ maxHeight: '600px', height: 'auto' }} alt="NASA" />
        <p className="my-2 text-light">{dataImage.explanation}</p>
    </div>
  );
};

export default ImageComponent;
