import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"; // Add this import
import Catalog from "./pages/Catalog";
import Quote from "./pages/Quote";
import Gallery from "./pages/Gallery"; // Assuming you added this in the last step
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        {/* Navbar */}
        <header className="bg-brand-blue text-white p-4 shadow-md sticky top-0 z-40">
          <div className="container mx-auto flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-brand-accent transition-colors"
            >
              Just Roofing
            </Link>
            <nav className="space-x-6 font-medium">
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
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Updated Route */}
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
