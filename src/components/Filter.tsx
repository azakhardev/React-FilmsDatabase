import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { getGenres } from "../http/api-calls";
import { FiltersContext } from "../store";
import "boxicons/css/boxicons.min.css";
import { Filter } from "../models/Filter";
import { SHOWS_SORT_METHODS, MOVIES_SORT_METHODS } from "../util/utility";
import { filter } from "framer-motion/client";

const FilterComponent: React.FC<{
  onFilter: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const context = useContext(FiltersContext);

  const sortOptions = Object.entries(
    context.filter.category === "movie"
      ? MOVIES_SORT_METHODS
      : SHOWS_SORT_METHODS
  ).map(([key, value]) => ({
    value: key,
    text: value,
  }));

  const genresQuery = useQuery({
    queryKey: ["genres", context.filter.category],
    queryFn: (metaObject) => getGenres(context.filter.category),
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newFilter: Filter = {
      genreId: Number(formData.get("genre")),
      category: context.filter.category,
      english: formData.get("english") === "on",
      section: "",
      adult: formData.get("adult") === "on",
      page: 1,
      dateStart: formData.get("yearStart") as string,
      dateEnd: formData.get("yearEnd") as string,
      sortBy: (formData.get("sortBy") as string) + formData.get("order"),
      rating: Number(formData.get("rating") || 0),
    };

    props.onFilter(true);
    context.updateFilter(newFilter);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:flex gap-4 w-[100%] mt-8 mb-10 bg-[#A05283] px-5 py-3 rounded-2xl ">
        <div className="flex flex-row flex-1 gap-1 col-start-1 col-end-3">
          <div className="flex flex-col flex-1">
            <label>Sort By:</label>
            <select
              name="sortBy"
              defaultValue={context.filter.sortBy.split(".")[0]}
            >
              {Object.entries(
                context.filter.category === "movie"
                  ? MOVIES_SORT_METHODS
                  : SHOWS_SORT_METHODS
              ).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Order By:</label>
            <select
              name="order"
              defaultValue={"." + context.filter.sortBy.split(".")[1]}
            >
              <option value=".asc">Asc.</option>
              <option value=".desc">Desc.</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label>Genre:</label>
          <select
            className="capitalize"
            name="genre"
            defaultValue={context.filter.genreId}
          >
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
        <div className="flex flex-col">
          <label>Minimal rating:</label>
          <input
            name="rating"
            type="number"
            min={0}
            max={10}
            step={0.1}
            defaultValue={context.filter.rating}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Released after:</label>
          <input
            name="yearStart"
            type="date"
            defaultValue={context.filter.dateStart}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Released before:</label>
          <input
            name="yearEnd"
            type="date"
            defaultValue={context.filter.dateEnd}
          />
        </div>
        <div className="flex flex-row justify-between md:justify-around 2xl:flex-col 2xl:justify-end items-start col-start-1 col-end-3 md:col-end-4 text-center">
          <div>
            <label htmlFor="adult">For Adults:</label>
            <label className="switch">
              <input
                id="adult"
                type="checkbox"
                name="adult"
                defaultChecked={context.filter.adult}
                onChange={(change) => {
                  console.log(change.target.value);
                  context.updateFilterProperty("adult", !context.filter.adult);
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div>
            <label htmlFor="english">Search in English: </label>
            <label className="switch">
              <input
                id="english"
                type="checkbox"
                name="english"
                defaultChecked={context.filter.english}
                onChange={(change) => {
                  console.log(change.target.value);
                  context.updateFilterProperty(
                    "english",
                    !context.filter.english
                  );
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="flex col-span-2 md:col-span-3 flex-row justify-center">
          <button className="flex w-[100%] h-[100%] 2xl:w-auto 2xl:h-auto justify-center items-center bg-[#E5E5E5] my-1 2xl:my-2 px-8 rounded flex-shrink-[2]">
            <i className="bx bx-search-alt-2 text-[24px]"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterComponent;
