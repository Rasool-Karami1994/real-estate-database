import React, { useContext, createContext, useReducer, useEffect } from "react";
import CategoryReducer from "./CategoryReducer";
const CategoryContext = createContext();
const CategoryContextDispatcher = createContext();
const CategoryProvider = ({ children }) => {
  const initialValue = {
    categories: [],
    total: 0,
  };
  // useEffect(() => {
  //   var existingEntries = JSON.parse(localStorage.getItem("category"));
  //   if (existingEntries == null) existingEntries = [];
  //   console.log(existingEntries);
  //   if (existingEntries.length > 1) {
  //     dispatch({ type: "LOAD_CATEGORIES", payload: existingEntries });
  //   } else {
  //     return;
  //   }
  // }, []);

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
