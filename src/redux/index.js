import { actions } from "./actions";

const INITIAL_STATE = {
  products: [],
  isLoading: false,
  categories: [],
  cartProducts: [],
  purchases: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.setIsLoading:
      return {
        ...state,
        isLoading: action.payload
      };

    case actions.getProducts:
      return {
        ...state,
        products: action.payload
      };

    case actions.setCategories:
      return {
        ...state,
        categories: action.payload
      };

    case actions.getCartProducts:
      return {
        ...state,
        cartProducts: action.payload
      };

    case actions.getPurchases:
      return {
        ...state,
        purchases: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
