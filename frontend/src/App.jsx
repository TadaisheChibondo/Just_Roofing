import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Quote from "./pages/Quote";
import Gallery from "./pages/Gallery";
import WhatsAppButton from "./components/WhatsAppButton";
import { Menu, X } from "lucide-react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        {/* Navbar */}
        <header
          ref={navRef}
          className="bg-brand-blue text-white p-4 shadow-md sticky top-0 z-40"
        >
          <div className="container mx-auto flex justify-between items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-2xl font-bold tracking-tight hover:text-brand-accent transition-colors"
            >
              Just Roofing
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-6 font-medium">
              <Link
                to="/"
                className="hover:text-brand-accent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/catalog"
                className="hover:text-brand-accent transition-colors"
              >
                Products
              </Link>
              <Link
                to="/gallery"
                className="hover:text-brand-accent transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/quote"
                className="bg-brand-accent hover:bg-yellow-600 px-4 py-2 rounded text-white transition-colors"
              >
                Get a Quote
              </Link>
            </nav>

            {/* Mobile hamburger button */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile nav panel */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              menuOpen ? "max-h-64 mt-4" : "max-h-0"
            }`}
          >
            <nav className="flex flex-col space-y-3 font-medium pb-2">
              <Link
                to="/"
                onClick={closeMenu}
                className="hover:text-brand-accent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/catalog"
                onClick={closeMenu}
                className="hover:text-brand-accent transition-colors"
              >
                Products
              </Link>
              <Link
                to="/gallery"
                onClick={closeMenu}
                className="hover:text-brand-accent transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/quote"
                onClick={closeMenu}
                className="bg-brand-accent hover:bg-yellow-600 px-4 py-2 rounded text-white transition-colors inline-block w-fit"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/quote" element={<Quote />} />
          </Routes>
        </main>

        <WhatsAppButton />

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 text-center p-8 mt-auto">
          <p className="mb-2 font-bold text-white">Just Roofing Pvt Ltd</p>
          <p className="text-sm">
            Supplying Quality Roofing Materials Across Zimbabwe
          </p>
          <p className="text-sm mt-4 text-gray-500">
            &copy; 2026 All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
