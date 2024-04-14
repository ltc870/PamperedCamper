import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import campgroundService from "./campgroundService";

const initialState = {
  campgrounds: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCampgrounds = createAsyncThunk(
  "campgrounds/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await campgroundService.getCampgrounds(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addCampground = createAsyncThunk(
  "campgrounds/add",
  async (campgroundData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await campgroundService.addCampground(campgroundData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMyCampgrounds = createAsyncThunk(
  "campgrounds/mycampgrounds",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await campgroundService.getMyCampgrounds(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCampground = createAsyncThunk(
  "campgrounds/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await campgroundService.deleteCampground(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const campgroundSlice = createSlice({
  name: "campgrounds",
  initialState,
  reducers: {
    reset: (state) => {
      state.campgrounds = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampgrounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCampgrounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campgrounds = action.payload;
      })
      .addCase(getCampgrounds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCampground.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCampground.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campgrounds.push(action.payload);
      })
      .addCase(addCampground.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyCampgrounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyCampgrounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campgrounds = action.payload;
      })
      .addCase(getMyCampgrounds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCampground.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCampground.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campgrounds = state.campgrounds.filter(
          (campground) => campground._id !== action.payload._id
        );
      })
      .addCase(deleteCampground.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = campgroundSlice.actions;
export default campgroundSlice.reducer;
