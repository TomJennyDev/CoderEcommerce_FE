import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  cart: [],
  products: [],
  totalProduct: 0,
  totalPage: 1,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.cart = action.payload.cart;
      state.products = action.payload.products.results;
      state.totalPage = action.payload.products.totalPages;
    },
    updateCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.cart = action.payload;
    },
    getTotalProducts(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalProduct = action.payload;
    },
    clearTotalProducts(state) {
      state.totalProduct = 0;
    },
    updateProductToCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.totalProduct = action.payload.totalProduct;

      state.products = state.products.map((cartProduct) => {
        if (cartProduct.productId._id === action.payload.productId) {
          let quantity = cartProduct.quantity;
          action.payload.action ? (quantity += 1) : (quantity -= 1);
          return { ...cartProduct, quantity };
        }
        return cartProduct;
      });
    },

    removeProductCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalProduct = action.payload.totalProduct;

      const { products } = action.payload;
      state.products = state.products.filter(
        (product) => !products.includes(product.productId._id)
      );
    },
  },
});

export const {
  startLoading,
  getCartSuccess,
  updateCartSuccess,
  getTotalProducts,
  updateProductToCartSuccess,
  removeProductCartSuccess,
  clearTotalProducts,
  hasError,
} = slice.actions;

export const getCart = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get("/cart/me");

    if (response) {
      dispatch(getCartSuccess(response.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const updateCart = (cart) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.put(`/cart/me/update`, { ...cart });
    if (response) {
      dispatch(updateCartSuccess(response.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const updateQuantityProductCart =
  ({ productId, action }) =>
  async (dispatch) => {
    dispatch(startLoading());

    try {
      const response = await apiService.put(`/cartitem/me/update`, {
        productId,
        action,
      });

      if (response) {
        dispatch(
          updateProductToCartSuccess({
            productId,
            action,
            totalProduct: response.data,
          })
        );
      }
    } catch (error) {
      dispatch(hasError(error));
      toast.error(error.message);
    }
  };

export const removeProductCart =
  ({ productId }) =>
  async (dispatch) => {
    dispatch(startLoading());

    // "productId": ["627ca8b9d7401e3ce9387183"]
    try {
      const response = await apiService.delete(`/cartitem/me/delete`, {
        data: { productId },
      });
      if (response) {
        dispatch(
          removeProductCartSuccess({
            products: productId,
            totalProduct: response.data,
          })
        );
      }
    } catch (error) {
      dispatch(hasError(error));
      toast.error(error.message);
    }
  };

export default slice.reducer;
