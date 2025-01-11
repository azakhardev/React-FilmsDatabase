import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { getMovies } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
import Card from "./Card";
import { motion } from "framer-motion";
import { FiltersContext } from "../store";
import "boxicons/css/boxicons.min.css";

const MoviesList: React.FC<{}> = (props) => {
  const { filter, updateFilter } = useContext(FiltersContext);
  const moviesQuery = useQuery({
    queryKey: ["movies", filter],
    queryFn: (metaObject) => {
      return getMovies(filter);
    },
  });

  if (moviesQuery.isError) {
    return (
      <ErrorBlock
        title="An error occured!"
        message={moviesQuery.error.message}
      />
    );
  }

  console.log("movies:", moviesQuery.data);

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center gap-[80px] mb-[50px]">
        {!moviesQuery.isLoading && moviesQuery.data ? (
          moviesQuery.data.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <SpinningLoader />
        )}
      </div>
      {!moviesQuery.isLoading && (
        <div className="flex flex-row justify-between my-2">
          <motion.button
            onClick={() => {
              if (filter.page > 1) {
                updateFilter("page", filter.page - 1);
              }
            }}
            className="bg-blue-400 py-2 px-6 rounded-lg"
          >
            <i className="bx bx-chevrons-left text-[36px]"></i>
          </motion.button>
          <div className="flex items-center">{filter.page}/100</div>
          <motion.button
            onClick={() => {
              if (moviesQuery.data?.length === 20) {
                updateFilter("page", filter.page + 1);
              }
            }}
            className="bg-blue-400 py-2 px-6 rounded-lg"
          >
            <i className="bx bx-chevrons-right text-[36px]"></i>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
