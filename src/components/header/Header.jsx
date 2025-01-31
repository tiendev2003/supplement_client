import { Menu, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);
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
              <li>
                <Link
                  to="/shop"
                  className="transition-colors hover:text-gray-600"
                >
                  Shop
                </Link>
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
              className="transition-colors hover:text-gray-600"
              aria-label="Shopping cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
