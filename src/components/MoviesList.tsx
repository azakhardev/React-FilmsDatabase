import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { getDiscovery, getMovies } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
import Card from "./Card";
import { FiltersContext } from "../store";
import "boxicons/css/boxicons.min.css";
import NavigationButtons from "./NavigationButtons";

const MoviesList: React.FC<{ filtering: boolean }> = (props) => {
  const { filter } = useContext(FiltersContext);
  const moviesQuery = useQuery({
    queryKey: ["movies", filter, props.filtering],
    queryFn: (metaObject) => {
      return props.filtering ? getDiscovery(filter) : getMovies(filter);
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

  return (
    <div>
      <div className="flex flex-row flex-wrap justify-center gap-[80px] mb-[50px]">
        {!moviesQuery.isLoading && moviesQuery.data ? (
          moviesQuery.data.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <SpinningLoader />
        )}
      </div>
      {!moviesQuery.isLoading && <NavigationButtons />}
    </div>
  );
};

export default MoviesList;
