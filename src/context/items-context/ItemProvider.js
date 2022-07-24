import React, { useContext, createContext, useReducer } from "react";
import ItemReducer from "./ItemReducer";
const ItemContext = createContext();
const ItemContextDispatcher = createContext();
const ItemProvider = ({ children }) => {
  const initialValue = {
    properties: [
      {
        name: "",
        phoneNumber: "",
        price: "",
        propertySize: "",
        description: "",
        numberHandel: 1,
      },
    ],
    total: 0,
  };

  const [item, dispatch] = useReducer(ItemReducer, initialValue);
  return (
    <ItemContext.Provider value={item}>
      <ItemContextDispatcher.Provider value={dispatch}>
        {children}
      </ItemContextDispatcher.Provider>
    </ItemContext.Provider>
  );
};
export const useItemContext = () => useContext(ItemContext);
export const useItemContextActions = () => {
  return useContext(ItemContextDispatcher);
};

export default ItemProvider;
