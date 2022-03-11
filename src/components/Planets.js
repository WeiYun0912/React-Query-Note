import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const timeToDate = (time) => {
  let t = new Date(time);
  return t.toLocaleString();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const fetchPlanets = async ({ queryKey }) => {
    const response = await fetch(
      `https://swapi.dev/api/planets/?page=${queryKey[1]}`
    );
    return response.json();
  };

  const { data, dataUpdatedAt, status } = useQuery(
    ["planets", page],
    fetchPlanets,
    {
      keepPreviousData: true,
    }
  );

  console.log(dataUpdatedAt);

  return (
    <div>
      <h3>Data updated at ： {timeToDate(dataUpdatedAt)}</h3>
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>

      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
