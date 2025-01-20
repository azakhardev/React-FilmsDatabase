import { useContext } from "react";
import MoviesList from "../components/MoviesList";
import { motion } from "framer-motion";
import FilterComponent from "../components/Filter";
import CategorySections from "../components/CategoryItems";
import { FiltersContext } from "../store";

const SearchPage: React.FC<{}> = () => {
  const context = useContext(FiltersContext);

  return (
    <div className="flex justify-center flex-col mx-1 md:mx-10 xl:mx-32 ">
      <div className="flex gap-10 justify-center text-[24px] font-bold my-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className={`rounded-[24px] bg-[#F05454] px-4 py-2 ${
            context.filter.category === "movie"
              ? "border-[#FFD700] border-[2px]"
              : undefined
          }`}
          onClick={() => {
            if (context.filter.category != "movie") {
              context.updateFilterProperty("category", "movie");
              context.updateFilterProperty("section", "popular");
            }
            context.filteringHook[1](false);
          }}
        >
          Movies
        </motion.button>
        <motion.button
          className={`rounded-[24px] bg-[#F05454] px-4 py-2 ${
            context.filter.category === "tv"
              ? "border-[#FFD700] border-[2px]"
              : undefined
          }`}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (context.filter.category != "tv") {
              context.updateFilterProperty("category", "tv");
              context.updateFilterProperty("section", "popular");
            }
            context.filteringHook[1](false);
          }}
        >
          TV Series
        </motion.button>
      </div>
      <CategorySections onFiltering={context.filteringHook[1]} />
      <FilterComponent onFilter={context.filteringHook[1]} />
      <MoviesList filtering={context.filteringHook[0]} />
    </div>
  );
};

export default SearchPage;
