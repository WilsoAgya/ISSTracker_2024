import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const ImageComponent = () => {
  const fetchDataImage = async () => {
    const { data } = await axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=BvghcCqBudfLIbb5SosUa4pR89AtwOfTpZgpPpMB"
    );
    return data;
  };
  const { data: dataImage, error, isLoading } = useQuery({
    queryKey: ["picture"],
    queryFn: fetchDataImage,
    refetchInterval: 5000, // Refetch every 5 seconds
  });
  //const dataString = data ? JSON.stringify(data, null, 2) : null;

  //convert time to human readable format
  const timestamp = dataImage ? new Date(dataImage.timestamp * 1000).toString() : null;
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {JSON.stringify(dataImage.url)}
        <img src={dataImage.url} alt="NASA" />
    </div>
  );
};

export default ImageComponent;
