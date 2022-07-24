import React, { useContext, createContext, useReducer } from "react";
import ItemReducer from "./ItemReducer";
const ItemContext = createContext();
const ItemContextDispatcher = createContext();
const ItemProvider = ({ children }) => {
  let lastId = 0;
  const initialValue = [
    {
      id: lastId++,
      name: "",
      phoneNumber: "",
      price: "",
      propertySize: "",
      level: "",
      description: "",
    },
  ];

  const [item, dispatch] = useReducer(ItemReducer, initialValue);
  return (
    <ItemContext.Provider value={item}>
      <ItemContextDispatcher.Provider value={dispatch}>
        {children}
      </ItemContextDispatcher.Provider>
    </ItemContext.Provider>
  );
};
export const useCategoryContext = () => useContext(ItemContext);
export const useCategoryContextActions = () => {
  return useContext(ItemContextDispatcher);
};

export default ItemProvider;
