const CategoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CATEGORIES": {
      console.log(state, action);
      const categoryItems = [...state.categories];
      const index = categoryItems.findIndex(
        (item) => item.title === action.payload.title
      );
      if (index < 0) {
        categoryItems.push({ ...action.payload });
      } else {
        const updatedCategory = { ...categoryItems[index] };
        updatedCategory.title = action.payload.titlte;
        categoryItems[index] = updatedCategory;
      }

      return {
        ...state,
        categories: categoryItems,
        total: state.total + action.payload.numberHandel,
      };
    }

    case "LOAD_CATEGORIES": {
      return {
        categories: [...action.payload.categories],
        total: action.payload.categories.length ,
      };
    }

    default:
      return state;
  }
};

export default CategoryReducer;
