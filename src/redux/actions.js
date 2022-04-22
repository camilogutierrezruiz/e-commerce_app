import axios from "axios";

export const actions = {
  setIsLoading: "SET_IS_LOADING",
  getProducts: "GET_PRODUCTS",
  setCategories: "SET_CATEGORIES",
  getCartProducts: "GET_CART_PRODUCTS",
  getPurchases: "GET_PURCHASES"
};

// * ACTIONS

export const setIsLoading = (isLoading) => ({
  type: actions.setIsLoading,
  payload: isLoading
});

export const getProducts = (products) => ({
  type: actions.getProducts,
  payload: products
});

export const setCategories = (categories) => ({
  type: actions.setCategories,
  payload: categories
});

export const getCartProducts = (cartProducts) => ({
  type: actions.getCartProducts,
  payload: cartProducts
});

export const getPurchases = (purchases) => ({
  type: actions.getPurchases,
  payload: purchases
});

// GET TOKEN

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

// * THUNK

export const getProductsThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
      .then((response) => {
        dispatch(getProducts(response.data.data.products));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const setCategoriesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`
      )
      .then((response) => {
        dispatch(setCategories(response.data.data.categories));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const filterCategoryByIdThunk = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`
      )
      .then((response) => {
        dispatch(getProducts(response.data.data.products));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const filterCategoryByQueryThunk = (healine) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${healine}`
      )
      .then((response) => {
        dispatch(getProducts(response.data.data.products));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const loginThunk = (credentials) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        `https://ecommerce-api-react.herokuapp.com/api/v1/users/login`,
        credentials
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getCartProductsThunk = () => {
  return (dispatch) => {
    return axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
      .then((response) => {
        dispatch(getCartProducts(response.data.data.cart.products));
      });
  };
};

export const getPurchasesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/purchases`,
        getConfig()
      )
      .then((response) => {
        dispatch(getPurchases(response.data.data.purchases));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};
