import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getGenres } from "../http/api-calls";
import { FiltersContext } from "../store";
import "boxicons/css/boxicons.min.css";

const Filters: React.FC<{}> = (props) => {
  const { filter } = useContext(FiltersContext);

  const genresQuery = useQuery({
    queryKey: ["genres", filter.category],
    queryFn: (metaObject) => getGenres(filter.category),
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 md:flex gap-4 w-[100%] mb-6">
        <div className="flex flex-col flex-1  ">
          <label>Title:</label>
          <input type="text" name="title" />
        </div>
        <div className="flex flex-col flex-1">
          <label>Genre:</label>
          <select name="genre">
            {genresQuery.isError && (
              <option disabled>Failed to load genres</option>
            )}
            {!genresQuery.isLoading && genresQuery.data ? (
              genresQuery.data.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))
            ) : (
              <option disabled>Loading options...</option>
            )}
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label>Release year:</label>
          <input name="year" type="number" min={1990} max={2025} step={1} />
        </div>
        <div className="flex flex-col flex-1">
          <label>Minimal rating:</label>
          <input name="rating" type="number" min={0} max={10} step={0.01} />
        </div>
        <div className="flex flex-row flex-1 justify-center">
          <label>Adult:</label>
          <input name="adult" type="checkbox" />
        </div>
        <div className="flex flex-row justify-center">
          <button className="flex justify-center items-center bg-blue-400 px-6 py-3 rounded flex-shrink-[2]">
            <i className="bx bx-search-alt-2 text-[24px]"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
