import React, { useEffect, useState } from "react";

const WithoutReactQuery = () => {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchSWData = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/planets/");

        if (response.status !== 200 && !response.ok)
          throw new Error("Fetch data fail.");

        const data = await response.json();
        setData(data.results);
        console.log(data.results);
        setSuccess(true);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchSWData();
  }, []);

  return (
    <div>
      {success && JSON.stringify(data)}
      {errorMessage}
    </div>
  );
};

export default WithoutReactQuery;
