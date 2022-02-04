import React from "react";
import { createContext, useState } from "react";

interface CardContextInterface {
  cardId: string;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
}

export const CardContext = createContext<CardContextInterface | null>(null);

export const CardProvider: React.FC = ({ children }) => {
  const [cardId, setCardId] = useState("");

  return (
    <CardContext.Provider value={{ cardId, setCardId }}>
      {children}
    </CardContext.Provider>
  );
};
