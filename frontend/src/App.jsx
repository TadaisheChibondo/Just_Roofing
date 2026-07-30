import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Quote from "./pages/Quote";
import Gallery from "./pages/Gallery";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <div className="flex min-h-screen flex-col relative">
        {/* Navbar */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-blue text-white shadow-lg">
          <div className="container mx-auto px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <Link
                to="/"
                onClick={closeMenu}
                className="text-xl font-bold tracking-tight transition-colors hover:text-brand-accent sm:text-2xl"
              >
                Just Roofing
              </Link>

              {/* Desktop nav */}
              <nav className="hidden items-center space-x-6 font-medium md:flex">
                <Link
                  to="/"
                  className="transition-colors hover:text-brand-accent"
                >
                  Home
                </Link>
                <Link
                  to="/catalog"
                  className="transition-colors hover:text-brand-accent"
                >
                  Products
                </Link>
                <Link
                  to="/gallery"
                  className="transition-colors hover:text-brand-accent"
                >
                  Gallery
                </Link>
                <Link
                  to="/quote"
                  className="rounded bg-brand-accent px-4 py-2 text-white transition-colors hover:bg-yellow-600"
                >
                  Get a Quote
                </Link>
              </nav>

              {/* Mobile hamburger button */}
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20 md:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <span className="text-xl leading-none" aria-hidden="true">
                  {menuOpen ? "✕" : "☰"}
                </span>
              </button>
            </div>

            {/* Mobile nav panel */}
            <div
              className={`overflow-hidden transition-all duration-300 md:hidden ${
                menuOpen ? "mt-3 max-h-80 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <nav className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                <div className="flex flex-col space-y-2 font-medium">
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-brand-accent"
                  >
                    Home
                  </Link>
                  <Link
                    to="/catalog"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-brand-accent"
                  >
                    Products
                  </Link>
                  <Link
                    to="/gallery"
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-brand-accent"
                  >
                    Gallery
                  </Link>
                  <Link
                    to="/quote"
                    onClick={closeMenu}
                    className="mt-1 inline-flex rounded-lg bg-brand-accent px-3 py-3 text-white transition-colors hover:bg-yellow-600"
                  >
                    Get a Quote
                  </Link>
                </div>
              </nav>
            </div>
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
