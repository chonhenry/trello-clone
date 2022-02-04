import { useContext } from "react";
import { CardContext } from "../context/CardContext";

export const useCard = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCardId() must be used inside a CardIdProvider");
  }

  return context;
};
