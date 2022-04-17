import axios from "axios";

export const actions = {
  setIsLoading: 'SET_IS_LOADING',
  getProducts: 'GET_PRODUCTS',
  setCategories: 'SET_CATEGORIES'
};

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