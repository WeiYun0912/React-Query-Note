import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const People = () => {
  const fetchPeople = async () => {
    const response = await fetch(`https://swapi.dev/api/people/`);
    return response.json();
  };

  const { data, isSuccess } = useQuery("people", fetchPeople);
  return (
    <div>
      {isSuccess && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
