import React, { createContext, useContext, useState } from "react";

// Create the CardContext
const CardContext = createContext(undefined);

// CardProvider component
export const CardProvider = ({ children }) => {
  const [cardState, setCardState] = useState({
    item: null,
    isHovered: false,
    cardId: null,
    position: { x: -1000, y: 0 }, // Corrected spelling from 'postion' to 'position'
  });

  return (
    <CardContext.Provider value={{ cardState, setCardState }}>
      {children}
    </CardContext.Provider>
  );
};

// Custom hook to use the CardContext
export const useCardContext = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }

  return context;
};
