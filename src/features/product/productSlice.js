import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  product: {},
  totalPage: 1,
  currentPage: 1,
  filters: {
    sortBy: "",
  },
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.products = action.payload.results;
      state.totalPage = action.payload.totalPages;
      state.currentPage = action.payload.page;
    },
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.product = action.payload;
    },

    handleChangeFilters(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
    handleClearFilters(state) {
      state.isLoading = false;
      state.error = null;
      state.filters = {};
    },
    sendProductReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { productId, reactions } = action.payload;
      const { totalRatings, rateAverage } = reactions;
      state.products.forEach((product) => {
        if (product._id === productId) {
          product.totalRatings = totalRatings;
          product.rateAverage = rateAverage;
        }
      });
    },
  },
});

export const {
  startLoading,
  handleChangeFilters,
  handleClearFilters,
  getAllProductsSuccess,
  getProductSuccess,
  sendProductReactionSuccess,
  clearProduct,
  hasError,
} = slice.actions;

export const getAllProducts = (filters) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    filters = { ...filters, ...getState().product.filters };

    const response = await apiService.get("/product/public", {
      params: filters,
    });
    if (response.success) {
      dispatch(getAllProductsSuccess(response.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const getProduct = (id) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await apiService.get(`/product/public/${id}`);
    if (response) {
      dispatch(getProductSuccess(response.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const sendReviewReaction =
  ({ productId, rate }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await apiService.post(`/reaction`, {
        refPaths: "Products",
        targetId: productId,
        rate,
      });
      dispatch(
        sendProductReactionSuccess({
          productId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
