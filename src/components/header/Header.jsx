import { motion } from "framer-motion";
import { Menu, ShoppingBag, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "../../features/cart/cartSlice";
import { useGetUserDetailsQuery } from "../../features/user/authService";
import { setCredentials } from "../../features/user/userSlice";
import { CartSidebar } from "./CartSidebar";
import { ExpandableSearch } from "./ExpandableSearch";
import { MobileMenu } from "./MobileMenu";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems, flyingItem } = useSelector((state) => state.cart);
  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);
  useEffect(() => {
    if (userInfo) {
      dispatch(getCart());
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        if (currentScrollY > 100) {
          setIsVisible(false);
        }
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const cartIconRef = useRef(null);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  // Cập nhật vị trí icon giỏ hàng khi thay đổi kích thước màn hình
  useEffect(() => {
    const updateCartPosition = () => {
      if (cartIconRef.current) {
        const rect = cartIconRef.current.getBoundingClientRect();
        setCartPosition({
          x: rect.left,
          y: rect.top - 100,
        });
      }
    };
    updateCartPosition();
    window.addEventListener("resize", updateCartPosition);

    return () => window.removeEventListener("resize", updateCartPosition);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 h-16 transition-all duration-300 
        ${isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"} 
        ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container h-full py-2">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <button
              className="mr-4 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="text-2xl font-semibold">
              3legant
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link to="/" className="transition-colors hover:text-gray-600">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link
                  to="/shop"
                  className="transition-colors hover:text-gray-600"
                >
                  Shop
                </Link>
                <div className="absolute left-0 hidden mt-2 bg-white shadow-lg group-hover:block group-hover:delay-150">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/shop/category1"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Category 1
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shop/category2"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Category 2
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="transition-colors hover:text-gray-600"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-gray-600"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <ExpandableSearch />

            <Link
              to={userInfo ? "/account" : "/signin"}
              className="transition-colors hover:text-gray-600"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              className="relative transition-colors hover:text-gray-600"
              aria-label="Shopping cart"
              ref={cartIconRef}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />

              <span className="absolute top-0 z-[100000] right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartItems.length ?? 0}
              </span>
            </button>
          </div>
        </div>
      </div>
      {flyingItem && (
        <motion.img
          src={import.meta.env.VITE_API_URL + "/" + flyingItem.image}
          alt="Flying Item"
          crossOrigin="anonymous"
          initial={{
            x: flyingItem.startX,
            y: flyingItem.startY,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: cartPosition.x,
            y: cartPosition.y,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed w-16 h-16 z-50 rounded-2xl"
        />
      )}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
