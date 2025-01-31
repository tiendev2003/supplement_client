import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../features/address/addressSlice";
import blogPostsReducer from "../features/blogs/blogSlice";
import blogCategoriesReducer from "../features/categoryBlog/categoryBlogSlice";
import categoryProductsReducer from "../features/categoryProduct/categoryProductSlice";
import contactReducer from "../features/contact/contactSlice";
import ordersReducer from "../features/orders/orderSlice";
import productsReducer from "../features/product/productSlice";
import { authApi } from "../features/user/authService";
import authReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
    products: productsReducer,
    orders: ordersReducer,
    categoryProducts: categoryProductsReducer,
    blogPosts: blogPostsReducer,
    blogCategories: blogCategoriesReducer,
    contact: contactReducer,

    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
