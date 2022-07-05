import { createContext, useState } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isHidden, setIsHidden] = useState(true);
  const isHiddenHandler = () => {
    setIsHidden(!isHidden);
  };
  return (
    <GlobalContext.Provider value={{ isHidden, isHiddenHandler }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
