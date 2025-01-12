import { QueryClient } from "@tanstack/react-query";
import { token } from "./authorization";
import { Genre } from "../models/Genre";
import { Movie } from "../models/Movie";
import { Filter } from "../models/Filter";
import { EXCLUDE_COUNTRIES } from "../util/utility.ts";

const language = navigator.language;

export async function getGenres(genreType: string): Promise<Genre[]> {
  const url = `https://api.themoviedb.org/3/genre/${genreType}/list?language=${language}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(
      "An error occured during Genres loading, please try again later!"
    );
  }

  const data = await response.json();
  return data.genres;
}

export async function getMovies(filter: Filter): Promise<Movie[]> {
  const url = `https://api.themoviedb.org/3/${filter.category}/${
    filter.section
  }?language=${filter.english ? "en-US" : language}&page=${filter.page}&adult=${
    filter.adult
  }`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(
      "An error occured during Films loading, please try again later!"
    );
  }

  const data = await response.json();

  const filteredMovies = data.results.filter(
    (movie: Movie) => !EXCLUDE_COUNTRIES.includes(movie.original_language)
  );

  return filteredMovies;
}

export async function getDiscovery(filter: Filter): Promise<Movie[]> {
  const url = `https://api.themoviedb.org/3/discover/${
    filter.category
  }?language=${filter.english ? "en-US" : language}&page=${
    filter.page
  }&include_adult=${filter.adult}&primary_release_date.gte=${
    filter.dateStart
  }&first_air_date.gte=${filter.dateStart}&primary_release_date.lte=${
    filter.dateEnd
  }&first_air_date.lte=${filter.dateEnd}&vote_average.gte=${
    filter.rating
  }&sort_by=${filter.sortBy}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(
      "An error occured during Films loading, please try again later!"
    );
  }

  const data = await response.json();

  const filteredMovies = data.results.filter(
    (movie: Movie) => !EXCLUDE_COUNTRIES.includes(movie.original_language)
  );

  return filteredMovies;
}

export const queryClient = new QueryClient();
