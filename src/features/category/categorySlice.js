import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  subCategories: [],
};

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
    },
    getSubCategories(state, action) {
      state.subCategories = state.categories.find(
        (cate) => cate._id === action.payload
      ).children;
    },
  },
});

export const { getSubCategories } = slice.actions;

export const getAllCategories = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/category/public`);

    dispatch(slice.actions.getAllCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export default slice.reducer;
