import React from "react";
import { Movie } from "../models/Movie";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Card: React.FC<{
  movie: Movie;
}> = (props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-2xl p-5 border-solid border-[#3B1C32] border-[1px] min-w-[300px] max-w-[420px] bg-[#6A1E55] max-h-[1000px] overflow-hidden text-[#F0F0F0]"
    >
      <Link
        to={`/detail/${props.movie.id}`}
        className="flex flex-col gap-1 cursor-pointer"
      >
        <div className="relative">
          {props.movie.adult && (
            <img
              className="absolute top-2 right-2 backdrop-blur-sm"
              src="/Adult.jpg"
              width={100}
            />
          )}
          <img
            className="rounded-md"
            src={
              props.movie.poster_path
                ? `https://image.tmdb.org/t/p/w400/${props.movie.poster_path}`
                : "/Null_Poster.jpg"
            }
          />
        </div>

        <h3 className="font-bold text-[20px]">
          {props.movie.title ? props.movie.title : props.movie.name}
        </h3>
        <div className="flex justify-between">
          <div>
            {props.movie.release_date
              ? props.movie.release_date
              : props.movie.first_air_date}
          </div>
          <div>
            Rating:{" "}
            <span
              className="rounded-[50%] text-black bg-[#FFD700] px-2 py-1 "
              title={`Average Rating - ${props.movie.vote_average}`}
            >
              {Math.round(props.movie.vote_average * 10) / 10}
            </span>
          </div>
        </div>
        <p className="italic">{displayOverview(props.movie.overview)}</p>
      </Link>
    </motion.div>
  );
};

function displayOverview(overview: string): string {
  let finalOverview = "";
  if (overview === "") {
    finalOverview = "Overview for this movie is missing";
  } else if (overview.length > 260) {
    finalOverview = overview.slice(0, 260) + "...";
  } else {
    finalOverview = overview;
  }

  return finalOverview;
}

export default Card;
