import React, { Dispatch, SetStateAction, useContext } from "react";
import { FiltersContext } from "../store";

const CategorySections: React.FC<{
  onFiltering: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
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
            context.updateFilterProperty("section", s);
            context.updateFilterProperty("page", 1);
            props.onFiltering(false);
          }}
          className={`flex justify-center items-center bg-[#FFD700] px-2 py-1 capitalize text-center font-bold rounded-lg cursor-pointer flex-1 ${
            context.filter.section === s
              ? "border-[2px] border-[#F05454]"
              : undefined
          }`}
          key={s}
        >
          {s.replace("_", " ").replace("_", " ")}
        </div>
      ))}
    </div>
  );
};

export default CategorySections;
