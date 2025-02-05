import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading";
import ProtectedRoute from "./routing/ProtectedRoute";

const Layout = lazy(() => import("./layouts"));
const LayoutAdmin = lazy(() => import("./layouts/admin"));
const LayoutProfile = lazy(() => import("./layouts/profile"));
const AccountPage = lazy(() => import("./pages/Account/AccountPage"));
const AddAddressPage = lazy(() => import("./pages/Address/AddAddressPage"));
const AddressPage = lazy(() => import("./pages/Address/AddressPage"));
const AddBanner = lazy(() => import("./pages/Admin/Banner/AddBanner"));
const BannerList = lazy(() => import("./pages/Admin/Banner/BannerList"));
const AddCategoryPage = lazy(() =>
  import("./pages/Admin/category/AddCategory")
);
const CategoryListPage = lazy(() =>
  import("./pages/Admin/category/CategoryList")
);
const ContactListPage = lazy(() => import("./pages/Admin/contact/ContactList"));
const DashboardPage = lazy(() =>
  import("./pages/Admin/dashboard/DashboardPage")
);
const OrderListPage = lazy(() => import("./pages/Admin/order/OrderList"));
const AddPostPage = lazy(() => import("./pages/Admin/post/AddPost"));
const AddPostCategory = lazy(() =>
  import("./pages/Admin/Post/AddPostCategory")
);
const PostCategoryList = lazy(() =>
  import("./pages/Admin/Post/PostCategoryList")
);
const PostListPage = lazy(() => import("./pages/Admin/post/PostList"));
const AddProductPage = lazy(() => import("./pages/Admin/product/AddProduct"));
const ProductListPage = lazy(() => import("./pages/Admin/product/ProductList"));
const UserListPage = lazy(() => import("./pages/Admin/Users/UserList"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/Authentication/ForgotPasswordPage")
);
const OtpVerificationPage = lazy(() =>
  import("./pages/Authentication/OtpVerificationPage")
);
const SignInPage = lazy(() => import("./pages/Authentication/SignInPage"));
const SignUpPage = lazy(() => import("./pages/Authentication/SignUpPage"));
const SingleBlogPage = lazy(() => import("./pages/Blog/SingleBlogPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/Error/NotFoundPage"));
const ImageSearchResult = lazy(() => import("./pages/Image/ImageSearchResult"));
const DetailOrderPage = lazy(() => import("./pages/myorder/DetailOrderPage"));
const MyOrderPage = lazy(() => import("./pages/myorder/MyOrderPage"));
const SettingPage = lazy(() => import("./pages/Setting/SettingPage"));
const SingleProductPage = lazy(() => import("./pages/Shop/SingleProductPage"));
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
            <Route path="/blog/:id" element={<SingleBlogPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/search" element={<ImageSearchResult />} />
            <Route path="/shop/:slug" element={<SingleProductPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<LayoutProfile />}>
                <Route path="" element={<AccountPage />} />
                <Route path="address" element={<AddressPage />} />
                <Route path="setting" element={<SettingPage />} />
                <Route path="address/add" element={<AddAddressPage />} />
                <Route path="address/edit/:id" element={<AddAddressPage />} />
                <Route path="orders" element={<MyOrderPage />} />
                <Route path="orders/:id" element={<DetailOrderPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/otp" element={<OtpVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="" element={<DashboardPage />} />
            <Route path="banner" element={<BannerList />} />
            <Route path="add-banner" element={<AddBanner />} />
            <Route path="edit-banner/:id" element={<AddBanner />} />
            <Route path="product-list" element={<ProductListPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="edit-product/:id" element={<AddProductPage />} />
            <Route path="category-list" element={<CategoryListPage />} />
            <Route path="add-category" element={<AddCategoryPage />} />
            <Route path="edit-category/:id" element={<AddCategoryPage />} />
            <Route path="post-list" element={<PostListPage />} />
            <Route path="post-category-list" element={<PostCategoryList />} />
            <Route path="add-post-category" element={<AddPostCategory />} />
            <Route path="add-post" element={<AddPostPage />} />
            <Route path="edit-post/:id" element={<AddPostPage />} />
            <Route path="contact-list" element={<ContactListPage />} />
            <Route path="order-list" element={<OrderListPage />} />
            <Route path="user-list" element={<UserListPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
