import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NextPass = () => {
  const [issPassTimes, setIssPassTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssPassTimes = async () => {
      const url = 'https://api.n2yo.com/rest/v1/satellite/visualpasses/25544/49.246445/-122.994560/0/2/300/&apiKey=CB8HZW-QD9YCG-ZP7DD2-5CE7';
      
      try {
        const response = await axios.get(url);
        setIssPassTimes(response.data.passes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ISS pass times');
        setLoading(false);
      }
    };

    fetchIssPassTimes();
  }, []);

  return (
    <div className="App">
      <h1>Next ISS Pass Times</h1>
      {issPassTimes.length > 0 ? (
        <div>
          <h2>Pass Details:</h2>
          <ul>
          {issPassTimes.length > 0 && (
                <li key={0}>
                Rise Time: {new Date(issPassTimes[0].startUTC * 1000).toLocaleString()}
                </li>
            )}
          </ul>
        </div>
      ) : (
        !loading && <p>No upcoming passes found.</p>
      )}
    </div>
  );
};

export default NextPass;