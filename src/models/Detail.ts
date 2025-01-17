import { Company } from "./Company";
import { Genre } from "./Genre";

export interface Detail {
  adult: boolean;
  backdrop_path: string | null;
  created_by: {
    name: string;
    original_name: string;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  languages: string[];
  last_air_date: string;
  //   last_episode_to_air: {
  //     id: number;
  //     name: string;
  //     overview: string;
  //     vote_average: number;
  //     vote_count: number;
  //     air_date: string;
  //     episode_number: number;
  //     episode_type: string;
  //     production_code: string;
  //     runtime: number | null;
  //     season_number: number;
  //     show_id: number;
  //     still_path: string | null;
  //   } | null;
  name: string;
  //   next_episode_to_air: {
  //     id: number;
  //     name: string;
  //     overview: string;
  //     vote_average: number;
  //     vote_count: number;
  //     air_date: string;
  //     episode_number: number;
  //     episode_type: string;
  //     production_code: string;
  //     runtime: number | null;
  //     season_number: number;
  //     show_id: number;
  //     still_path: string | null;
  //   } | null;
  networks: Company[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  seasons: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  //   belongs_to_collection: {
  //     id: number;
  //     name: string;
  //     poster_path: string;
  //     backdrop_path: string;
  //   } | null;
  budget: number;
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
}
