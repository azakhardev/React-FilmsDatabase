import React, { useState } from "react";
import { Filter } from "./models/Filter";

type FiltersContextObj = {
  filteringHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  filter: Filter;
  updateFilter: (filter: Filter) => void;
  updateFilterProperty: (
    property: keyof Filter,
    newValue: string | number | boolean
  ) => void;
};

export const FiltersContext = React.createContext<FiltersContextObj>({
  filteringHook: [false, () => {}],
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
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
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
      (newFilter[property] as string | boolean | number) = newValue;
      return newFilter;
    });
  }

  const contextValue: FiltersContextObj = {
    filteringHook: [isFiltering, setIsFiltering],
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
