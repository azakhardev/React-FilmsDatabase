import React, { useContext } from "react";
import { FiltersContext } from "../store";

const CategorySections: React.FC = (props) => {
  const context = useContext(FiltersContext);

  let categoryList = [];
  if (context.filter.category === "movie") {
    categoryList = ["now_playing", "popular", "top_rated", "upcoming"];
  } else {
    categoryList = ["airing_today", "popular", "top_rated", "on_the_air"];
  }

  return (
    <div className="flex flex-row gap-1 md:gap-5 md:mx-[25%]">
      {categoryList.map((s) => (
        <div
          onClick={() => {
            context.updateFilter("section", s);
          }}
          className={`flex justify-center items-center bg-yellow-300 text-white px-2 py-1 capitalize text-center font-bold rounded-lg cursor-pointer flex-1 ${
            context.filter.section === s
              ? "border-[1px] border-gray-700"
              : undefined
          }`}
          key={s}
        >
          {s.replace("_", " ")}
        </div>
      ))}
    </div>
  );
};

export default CategorySections;
