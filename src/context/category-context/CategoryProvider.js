import React, { useContext, createContext, useReducer } from "react";
import CategoryReducer from "./CategoryReducer";
const CategoryContext = createContext();
const CategoryContextDispatcher = createContext();
const CategoryProvider = ({ children }) => {
  const initialValue = {
    categories: [],
    total: 0,
  };

  const [category, dispatch] = useReducer(CategoryReducer, initialValue);

  return (
    <CategoryContext.Provider value={category}>
      <CategoryContextDispatcher.Provider value={dispatch}>
        {children}
      </CategoryContextDispatcher.Provider>
    </CategoryContext.Provider>
  );
};
export const useCategoryContext = () => useContext(CategoryContext);
export const useCategoryContextActions = () => {
  return useContext(CategoryContextDispatcher);
};

export default CategoryProvider;
