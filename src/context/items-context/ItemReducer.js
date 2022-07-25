const CategoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_PROPERTIES": {
      console.log(state, action);
      const propertyItems = [...state.properties];
      const index = propertyItems.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index < 0) {
        propertyItems.push({ ...action.payload });
      } else {
        const updatedProperty = { ...propertyItems[index] };
        updatedProperty.title = action.payload.title;
        propertyItems[index] = updatedProperty;
      }

      return {
        ...state,
        properties: propertyItems,
        total: state.total + action.payload.numberHandel,
      };
    }
    case "REMOVE_PROPERTIES": {
      console.log(state, action);

      const propertyItems = [...state.properties];
      const filteredProperty = propertyItems.filter(
        (item) => item.name !== action.payload.name
      );

      return {
        ...state,
        properties: filteredProperty,
        total: state.total - action.payload.numberHandel,
      };
    }

    default:
      return state;
  }
};

export default CategoryReducer;
