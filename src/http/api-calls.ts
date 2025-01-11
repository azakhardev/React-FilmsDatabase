import { QueryClient } from "@tanstack/react-query";
import { token } from "./authorization";
import { Genre } from "../models/Genre";
import { Movie } from "../models/Movie";
import { Filter } from "../models/Filter";

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
  const url = `https://api.themoviedb.org/3/${filter.category}/${filter.section}?language=${language}&page=${filter.page}&adult=${filter.adult}`;
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

  return data.results;
}

export const queryClient = new QueryClient();
