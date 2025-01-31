import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/blogs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/blogs", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/blogs/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  success: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBlogs.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.blogs = payload;
      state.error = null;
    });
    builder.addCase(getBlogs.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(addBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.blogs.push(payload);
    });
    builder.addCase(addBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(updateBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.blogs = state.blogs.map((blog) =>
        blog.id === payload.id ? payload : blog
      );
    });
    builder.addCase(updateBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(deleteBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.blogs = state.blogs.filter(
        (blog) => blog.id !== payload
      );
    });
    builder.addCase(deleteBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default blogSlice.reducer;
