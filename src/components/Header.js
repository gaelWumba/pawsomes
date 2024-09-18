import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when the screen is resized to a larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to highlith active link
  const getLinkStyle = (path) => {
    return location.pathname === path
      ? "text-color-1 text-xl transition-all duration-300"
      : "text-gray-400/50 hover:text-color-1";
  };

  return (
    <nav className="fixed w-full z-20 top-0 start-0 bg-color-3 md:bg-transparent lg:bg-transparent">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/pawsome.png" width={140} height={40} alt="Pawsome" />
        </Link>

        {/* Right-side buttons and hamburger menu */}
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <button type="button">
            <img src="/button.png" width={80} height={40} alt="Join" />
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center mt-4 w-10 h-10 justify-center text-sm text-color-1 rounded-lg md:hidden hover:bg-color-4"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-200 ease-in-out ${
            isOpen ? "block bg-gray-900 text-white rounded-lg mt-2" : "hidden"
          }`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-bold text-color-1 md:space-x-14 md:flex-row md:mt-0">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 ${getLinkStyle("/")}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className={`block py-2 px-3 ${getLinkStyle("/gallery")}`}
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className={`block py-2 px-3 ${getLinkStyle("/search")}`}
                onClick={() => setIsOpen(false)}
              >
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
