import axios from "axios";

export const actions = {
  setIsLoading: 'SET_IS_LOADING',
  getProducts: 'GET_PRODUCTS',
  setCategories: 'SET_CATEGORIES',
  getCart: 'GET_CART',
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

export const getCart = (cart) => ({
  type: actions.getCart,
  payload: cart
});

// * TOKEN AUTORIZATION

const getConfig = () => ({
  headers: { Autorization: `Bearer ${localStorage.getItem('token')}` }
});

console.log(getConfig());


// * THUNK

export const getProductsThunk = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
      .then(response => {
        dispatch(getProducts(response.data.data.products))
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const setCategoriesThunk = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`)
      .then(response => {
        dispatch(setCategories(response.data.data.categories))
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const filterCategoryByIdThunk = (id) => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
      .then(response => {
        dispatch(getProducts(response.data.data.products));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const filterCategoryByQueryThunk = (healine) => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${healine}`)
      .then(response => {
        dispatch(getProducts(response.data.data.products));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const loginThunk = (credentials) => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .post(`https://ecommerce-api-react.herokuapp.com/api/v1/users/login`, credentials)
      .finally(() => dispatch(setIsLoading(false)));
  }
}

export const getCartThunk = () => {
  return dispatch => {
    return axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
      .then(response => {
        dispatch(setIsLoading(true));
        dispatch(getCart(response.data.data.cart.products));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};