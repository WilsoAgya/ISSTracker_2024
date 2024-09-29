import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BasicDatePicker from "./Calendar";
import { useState } from "react";
const ImageComponent = () => {
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Create a Date object from a specific date
  const dateString = '2024-09-27'; // Input date in YYYY-MM-DD format
  const dateObject = new Date(dateString); // This creates a Date object
  
//experimental
  const [date, setDate] = useState(formatDate(dateObject));

  const handleDateChange = (newDate) => {

    const temp = new Date(newDate.format('YYYY-MM-DD'));
    setDate(formatDate(temp));
    console.log('Date in Parent:', newDate.format('YYYY-MM-DD')); // Log the date in YYYY-MM-DD format
  };
  console.log(formatDate(dateObject))

  const fetchDataImage = async () => {
  const apiKey = import.meta.env.VITE_NASA_API_KEY;
  //const date = formatDate(dateObject);
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
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
        <BasicDatePicker onDateChange={handleDateChange}/>
    </div>
  );
};

export default ImageComponent;
