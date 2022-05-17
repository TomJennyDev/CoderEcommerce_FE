import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { clearTotalProducts } from "../cart/cartSlice";

const initialState = {
  isLoading: false,
  error: null,
  order: {},
  orders: [],
  totalPage: 1,
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createOrderSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getOrdersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload.results;
      state.totalPage = action.payload.totalPages;
    },
    updateOrderSuccess(state, action) {
      state.isLoading = false;

      state.order = action.payload;
    },
    getTotalProducts(state, action) {
      state.totalProduct = action.payload;
    },
  },
});

export const {
  startLoading,
  getOrdersSuccess,
  updateOrderSuccess,
  getTotalProducts,
  createOrderSuccess,
  hasError,
} = slice.actions;

export const getOrderList = (filter) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.get("/order", { ...filter });

    if (response) {
      dispatch(getOrdersSuccess(response.data));
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const createOrder = (order) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.post("/order/me/create", { ...order });
    if (response) {
      dispatch(clearTotalProducts());
      toast.success("Thank you for buying product at Coder eCommerce");
    }
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const updateOrder = (order) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiService.put(`/order/me/update`, { ...order });
    dispatch(updateOrderSuccess(response.data));
  } catch (error) {
    dispatch(hasError(error));
    toast.error(error.message);
  }
};

export const updateQuantityProductOrder =
  ({ orderId, action }) =>
  async (dispatch) => {
    dispatch(startLoading());

    try {
      const response = await apiService.put(`/orderitem/me/update`, {
        orderId,
        action,
      });

      if (response) {
        // dispatch(
        //   updateProductToOrderSuccess({
        //     orderId,
        //     action,
        //     totalProduct: response.data,
        //   })
        // );
      }
    } catch (error) {
      dispatch(hasError(error));
      toast.error(error.message);
    }
  };

export const removeProductOrder =
  ({ orderId }) =>
  async (dispatch) => {
    dispatch(startLoading());

    // "orderId": ["627ca8b9d7401e3ce9387183"]
    try {
      const response = await apiService.delete(`/orderitem/me/delete`, {
        data: { orderId },
      });
      if (response) {
        // dispatch(
        //   removeProductOrderSuccess({
        //     orders: orderId,
        //     totalProduct: response.data,
        //   })
        // );
      }
    } catch (error) {
      dispatch(hasError(error));
      toast.error(error.message);
    }
  };

export default slice.reducer;
