import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
  reports: {},
  products: [],
  product: {},
  totalPageProduct: 1,
  totalProduct: 0,
  totalPageOrder: 1,
  filters: {},
};

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getReportsDashboardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.reports = action.payload;
    },
    getProductDashBoardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.product = action.payload;
    },
    getProductsDashboardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalProduct = action.payload.totalResults;
      state.products = action.payload.results;

      state.totalPageProduct = action.payload.totalPages;
    },
    getOrdersDashboardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload.results;
      state.totalPage = action.payload.totalPageOrder;
    },
  },
});

export const {
  startLoading,
  handleChangeFilters,
  handleClearFilters,
  getProductsDashboardSuccess,
  getOrdersDashboardSuccess,
  getReportsDashboardSuccess,
  getProductDashBoardSuccess,
  hasError,
} = slice.actions;

export const getAllProductsDashboard =
  (filters) => async (dispatch, getState) => {
    dispatch(startLoading());
    console.log(filters);

    try {
      const response = await apiService.get("/product", {
        params: filters,
      });
      console.log(response);

      if (response) {
        dispatch(getProductsDashboardSuccess(response.data));
      }
    } catch (error) {
      dispatch(hasError(error));
      toast.error(error.message);
    }
  };

export const getOrdersDashboard = (filters) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get("/order", {
      params: filters,
    });
    if (response) {
      dispatch(getOrdersDashboardSuccess(response.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const getReportsDashboard = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get("/dashboard");

    if (response) {
      dispatch(getReportsDashboardSuccess(response.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const getProductDashboard = (id) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const response = await apiService.get(`/product/${id}`);
    if (response) {
      dispatch(getProductDashBoardSuccess(response.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export default slice.reducer;
