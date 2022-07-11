import { createContext, useState } from 'react';

const FilterContext = createContext();

function FilterProvider({ children }) {
  const [filteredProduct, setFilteredProduct] = useState([]);

  return (
    <FilterContext.Provider value={{ filteredProduct, setFilteredProduct }}>
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
