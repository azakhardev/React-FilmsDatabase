import React, { useState } from "react";
import { Filter } from "./models/Filter";

type FiltersContextObj = {
  filter: Filter;
  updateFilter: (filter: Filter) => void;
  updateFilterProperty: (
    property: keyof Filter,
    newValue: string | number
  ) => void;
};

export const FiltersContext = React.createContext<FiltersContextObj>({
  filter: {
    genreId: 0,
    english: false,
    category: "movie",
    section: "popular",
    adult: false,
    page: 1,
    dateStart: new Date().toDateString(),
    dateEnd: new Date().toDateString(),
    sortBy: "popularity",
    rating: 0,
  },
  updateFilter: (filter: Filter) => {},
  updateFilterProperty: (
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
    english: false,
    category: "movie",
    section: "popular",
    adult: false,
    page: 1,
    dateStart: new Date(0).toISOString().slice(0, 10),
    dateEnd: new Date().toISOString().slice(0, 10),
    sortBy: "popularity",
    rating: 0,
  });

  function handleUpdateFilter(filter: Filter) {
    setFilter(filter);
  }

  function handleUpdateFilterProperty(
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
    updateFilterProperty: handleUpdateFilterProperty,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersContextProvider;
