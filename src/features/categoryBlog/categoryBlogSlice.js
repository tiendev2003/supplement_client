import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

export const getCategoryBlogs = createAsyncThunk(
  "categoryBlog/getCategoryBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/category-blogs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoryBlogById = createAsyncThunk(
  "categoryBlog/fetchCategoryBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/category-blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategoryBlog = createAsyncThunk(
  "categoryBlog/addCategoryBlog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/category-blogs", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategoryBlog = createAsyncThunk(
  "categoryBlog/updateCategoryBlog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/category-blogs/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategoryBlog = createAsyncThunk(
  "categoryBlog/deleteCategoryBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/category-blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  categoryBlogs: [],
  loading: false,
  error: null,
  success: false,
};

const categoryBlogSlice = createSlice({
  name: "categoryBlog",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCategoryBlogs.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categoryBlogs = payload;
      state.error = null;
    });
    builder.addCase(getCategoryBlogs.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(addCategoryBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addCategoryBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.categoryBlogs.push(payload);
    });
    builder.addCase(addCategoryBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(updateCategoryBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCategoryBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.categoryBlogs = state.categoryBlogs.map((categoryBlog) =>
        categoryBlog.id === payload.id ? payload : categoryBlog
      );
    });
    builder.addCase(updateCategoryBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(deleteCategoryBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCategoryBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.categoryBlogs = state.categoryBlogs.filter(
        (categoryBlog) => categoryBlog.id !== payload
      );
    });
    builder.addCase(deleteCategoryBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default categoryBlogSlice.reducer;
