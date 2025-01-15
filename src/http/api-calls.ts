import { QueryClient } from "@tanstack/react-query";
import { token } from "./authorization";
import { Genre } from "../models/Genre";
import { Movie } from "../models/Movie";
import { Filter } from "../models/Filter";
import { Detail } from "../models/Detail.ts";
import { EXCLUDE_COUNTRIES } from "../util/utility.ts";
import { Video } from "../models/Video.ts";
import { Cast } from "../models/Cast.ts";

const language = navigator.language;

export async function getGenres(genreType: string): Promise<Genre[]> {
  const url = `https://api.themoviedb.org/3/genre/${genreType}/list?language=en-US`;

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

  // if (localStorage.getItem("genres")) {
  //   const genres: Genre[] = JSON.parse(localStorage.getItem("genres")!);

  //   const filteredGenres = data.genres.filter(
  //     (g: Genre) => !genres.some((storedGenre) => storedGenre.id === g.id)
  //   );

  //   const updatedGenres = [...genres, ...filteredGenres];
  //   localStorage.setItem("genres", JSON.stringify(updatedGenres));
  // } else {
  //   localStorage.setItem("genres", JSON.stringify(data.genres));
  // }
  return data.genres;
}

export async function getMovies(
  filter: Filter
): Promise<{ total_pages: number; movies: Movie[] }> {
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
      `An error occured during ${
        filter.category === "movie" ? "Movie" : "Series"
      } loading, please try again later!`
    );
  }

  const data = await response.json();

  const filteredMovies = data.results.filter(
    (movie: Movie) => !EXCLUDE_COUNTRIES.includes(movie.original_language)
  );

  return { total_pages: data.total_pages ?? 500, movies: filteredMovies };
}

export async function getDiscovery(
  filter: Filter
): Promise<{ total_pages: number; movies: Movie[] }> {
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
  }&sort_by=${filter.sortBy}&vote_count.gte=5&with_genres=${filter.genreId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(
      `An error occured during ${
        filter.category === "movie" ? "Movie" : "Series"
      } loading, please try again later!`
    );
  }

  const data = await response.json();

  const filteredMovies = data.results.filter(
    (movie: Movie) => !EXCLUDE_COUNTRIES.includes(movie.original_language)
  );

  return { total_pages: data.total_pages ?? 500, movies: filteredMovies };
}

export async function getDetail(
  id: string,
  category: string,
  english: boolean
): Promise<Detail> {
  const url = `https://api.themoviedb.org/3/${category}/${id}?language=${
    english ? "en-US" : language
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
      `An error occured during loading Details for your ${
        category === "movie" ? "Movie" : "Series"
      }, please try again later!`
    );
  }

  const data = await response.json();

  return data;
}

export async function getCast(
  id: string,
  category: string,
  english: boolean
): Promise<Cast[]> {
  const url = `https://api.themoviedb.org/3/${category}/${id}/credits?language=${
    english ? "en-US" : language
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
      `An error occured during loading Cast for your ${
        category === "movie" ? "Movie" : "Series"
      }, please try again later!`
    );
  }

  const data = await response.json();

  return data.cast;
}

export async function getSimilar(
  id: string,
  category: string,
  english: boolean
): Promise<Movie[]> {
  const url = `https://api.themoviedb.org/3/${category}/${id}/similar?language=${
    english ? "en-US" : language
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
      `An error occured during loading Similar ${
        category === "movie" ? "Movie" : "Series"
      }, please try again later!`
    );
  }

  const data = await response.json();

  return data.results;
}
export async function getVideos(
  id: string,
  category: string,
  english: boolean
): Promise<Video[]> {
  const url = `https://api.themoviedb.org/3/${category}/${id}/videos?language=en-US`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(
      `An error occured during loading Trailers for your ${
        category === "movie" ? "Movie" : "Series"
      }, please try again later!`
    );
  }

  const data = await response.json();

  return data.results.filter((v: Video) => v.type === "Trailer");
}
export const queryClient = new QueryClient();
