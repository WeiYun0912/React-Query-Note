import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const Planets = () => {
  const fetchPlanets = async ({ queryKey }) => {
    const response = await fetch(
      `https://swapi.dev/api/planets/?page=${queryKey[2]}`
    );
    return response.json();
  };
  const [page, setPage] = useState(1);
  const { data, isSuccess, isPreviousData } = useQuery(
    ["planets", "hello", page],
    fetchPlanets,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      {isPreviousData ? "yes" : "no"}
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>

      {isSuccess && (
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
