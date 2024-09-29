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
    <div className="row d-flex align-items-center">
  <div className="col-md-6">
    <h1 className="text-light">Image of the Day</h1>
    <h2 className="my-2 text-light" style={{ textAlign: 'center' }}>{dataImage.title}</h2> {/* Aligning the heading to the left */}
    <img
      className="my-2 border rounded border-light"
      src={dataImage.url}
      style={{ maxHeight: '400px', height: 'auto', width: '100%' }}
      alt="NASA"
    />
  </div>
  <div className="col-md-6 my-2">
    <p className="py-5 text-light" style={{ textAlign: 'left' }}>{dataImage.explanation}</p> {/* Aligning the paragraph to the left */}
  </div>
</div>

  );
};

export default ImageComponent;
