import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading";
import Layout from "./layouts";
import LayoutAdmin from "./layouts/admin";
import LayoutProfile from "./layouts/profile";
import AccountPage from "./pages/Account/AccountPage";
import AddAddressPage from "./pages/Address/AddAddressPage";
import AddressPage from "./pages/Address/AddressPage";
import AddCategoryPage from "./pages/Admin/category/AddCategory";
import CategoryListPage from "./pages/Admin/category/CategoryList";
import AddContactPage from "./pages/Admin/contact/AddContact";
import ContactListPage from "./pages/Admin/contact/ContactList";
import DashboardPage from "./pages/Admin/dashboard/DashboardPage";
import OrderListPage from "./pages/Admin/order/OrderList";
import AddPostPage from "./pages/Admin/post/AddPost";
import AddPostCategory from "./pages/Admin/Post/AddPostCategory";
import PostCategoryList from "./pages/Admin/Post/PostCategoryList";
import PostListPage from "./pages/Admin/post/PostList";
import AddProductPage from "./pages/Admin/product/AddProduct";
import ProductListPage from "./pages/Admin/product/ProductList";
import UserListPage from "./pages/Admin/Users/UserList";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";
import OtpVerificationPage from "./pages/Authentication/OtpVerificationPage";
import SignInPage from "./pages/Authentication/SignInPage";
import SignUpPage from "./pages/Authentication/SignUpPage";
import ContactPage from "./pages/Contact/ContactPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import DetailOrderPage from "./pages/myorder/DetailOrderPage";
import MyOrderPage from "./pages/myorder/MyOrderPage";
import SingleProductPage from "./pages/Shop/SingleProductPage";

const BlogPage = lazy(() => import("./pages/Blog/BlogPage"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const CheckoutPage = lazy(() => import("./pages/Checkout/CheckoutPage"));
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const ShopPage = lazy(() => import("./pages/Shop/ShopPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<GlobalLoading />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:id" element={<SingleProductPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/account" element={<LayoutProfile />}>
              <Route path="" element={<AccountPage />} />
              <Route path="address" element={<AddressPage />} />
              <Route path="address/add" element={<AddAddressPage />} />
              <Route path="address/edit/:id" element={<AddAddressPage />} />
              <Route path="orders" element={<MyOrderPage />} />
              <Route path="orders/:id" element={<DetailOrderPage />} />
            </Route>
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/otp" element={<OtpVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="" element={<DashboardPage />} />
            <Route path="product-list" element={<ProductListPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="category-list" element={<CategoryListPage />} />
            <Route path="add-category" element={<AddCategoryPage />} />
            <Route path="edit-category/:id" element={<AddCategoryPage />} />
            <Route path="post-list" element={<PostListPage />} />
            <Route path="post-category-list" element={<PostCategoryList />} />
            <Route path="add-post-category" element={<AddPostCategory />} />
            <Route path="add-post" element={<AddPostPage />} />
            <Route path="contact-list" element={<ContactListPage />} />
            <Route path="add-contact" element={<AddContactPage />} />
            <Route path="order-list" element={<OrderListPage />} />
            <Route path="user-list" element={<UserListPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
