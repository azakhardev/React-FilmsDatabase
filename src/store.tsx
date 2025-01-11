import React, { useState } from "react";
import { Filter } from "./models/Filter";

type FiltersContextObj = {
  filter: Filter;
  updateFilter: (property: keyof Filter, newValue: string | number) => void;
};

export const FiltersContext = React.createContext<FiltersContextObj>({
  filter: {
    genreId: 0,
    category: "movie",
    section: "popular",
    adult: false,
    page: 1,
    date: 2024,
    title: "",
    rating: 0,
  },
  updateFilter: (
    property: keyof Filter,
    newValue: string | number | boolean
  ) => {},
});

interface Props {
  children: React.ReactNode;
}

const FiltersContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [filter, setFilter] = useState<Filter>({
    genreId: 0,
    category: "movie",
    section: "popular",
    adult: false,
    page: 1,
    date: 2024,
    title: "",
    rating: 0,
  });

  function handleUpdateFilter(
    property: keyof Filter,
    newValue: string | number | boolean
  ) {
    setFilter((oldFilter) => {
      const newFilter = { ...oldFilter };
      (newFilter[property] as typeof newValue) = newValue;
      return newFilter;
    });
  }

  const contextValue: FiltersContextObj = {
    filter: filter,
    updateFilter: handleUpdateFilter,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;
