import { useContext, useState } from "react";
import Filters from "../components/Filters";
import MoviesList from "../components/MoviesList";
import { motion } from "framer-motion";
import CategorySections from "../components/CategoryItems";
import { FiltersContext } from "../store";

const SearchPage: React.FC<{}> = (props) => {
  const context = useContext(FiltersContext);

  return (
    <div className="flex justify-center flex-col mx-1 md:mx-10 xl:mx-32 ">
      <div className="flex gap-10 justify-center text-[24px] font-bold my-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className={`rounded-[24px] bg-red-400 px-4 py-2 ${
            context.filter.category === "movie"
              ? "border-black border-[2px]"
              : undefined
          }`}
          onClick={() => {
            if (context.filter.category != "movie") {
              context.updateFilter("category", "movie");
              context.updateFilter("section", "popular");
            }
          }}
        >
          Movies
        </motion.button>
        <motion.button
          className={`rounded-[24px] bg-red-400 px-4 py-2 ${
            context.filter.category === "tv"
              ? "border-black border-[2px]"
              : undefined
          }`}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (context.filter.category != "tv") {
              context.updateFilter("category", "tv");
              context.updateFilter("section", "popular");
            }
          }}
        >
          TV Shows
        </motion.button>
      </div>
      <CategorySections />
      <Filters />
      <MoviesList />
    </div>
  );
};

export default SearchPage;
