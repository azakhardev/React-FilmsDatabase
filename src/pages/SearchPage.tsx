import { useContext, useState } from "react";
import MoviesList from "../components/MoviesList";
import { motion } from "framer-motion";
import FilterComponent from "../components/Filter";
import CategorySections from "../components/CategoryItems";
import { FiltersContext } from "../store";

const SearchPage: React.FC<{}> = (props) => {
  const context = useContext(FiltersContext);
  const [filtering, setFiltering] = useState(false);

  return (
    <div className="flex justify-center flex-col mx-1 md:mx-10 xl:mx-32 ">
      <div className="flex gap-10 justify-center text-[24px] font-bold my-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className={`rounded-[24px] bg-red-700 px-4 py-2 ${
            context.filter.category === "movie"
              ? "border-[#FFD700] border-[2px]"
              : undefined
          }`}
          onClick={() => {
            if (context.filter.category != "movie") {
              context.updateFilterProperty("category", "movie");
              context.updateFilterProperty("section", "popular");
            }
            setFiltering(false);
          }}
        >
          Movies
        </motion.button>
        <motion.button
          className={`rounded-[24px] bg-red-700 px-4 py-2 ${
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
            setFiltering(false);
          }}
        >
          TV Series
        </motion.button>
      </div>
      <CategorySections onFiltering={setFiltering} />
      <FilterComponent onFilter={setFiltering} />
      <MoviesList filtering={filtering} />
    </div>
  );
};

export default SearchPage;
