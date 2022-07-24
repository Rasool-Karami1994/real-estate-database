const ItemReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_ITEMS": {
      const cartProducts = [...state.cart];
      const index = cartProducts.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index < 0) {
        cartProducts.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedCart = { ...cartProducts[index] };
        updatedCart.quantity++;
        cartProducts[index] = updatedCart;
      }

      return {
        ...state,
        cart: cartProducts,
        total: state.total + action.payload.offPrice,
      };
    }

    default:
      return state;
  }
};

export default ItemReducer;
