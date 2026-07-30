import React, { useState, useEffect, createContext, useContext } from "react";

// -----------------------------------------------------------------------------
// 1. LIGHTWEIGHT CUSTOM ROUTER (To avoid external react-router-dom dependencies)
// -----------------------------------------------------------------------------
const RouterContext = createContext();

const Link = ({ to, children, className, onClick }) => {
  const { setCurrentRoute } = useContext(RouterContext);
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        setCurrentRoute(to);
        if (onClick) onClick(e);
      }}
    >
      {children}
    </a>
  );
};

// -----------------------------------------------------------------------------
// 2. COMPONENTS (Consolidated from /components and /pages)
// -----------------------------------------------------------------------------

const WhatsAppButton = () => (
  <a
    href="https://wa.me/263712789951"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center"
    aria-label="Contact us on WhatsApp"
  >
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  </a>
);

const Catalog = () => (
  <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
    <h1 className="text-4xl font-extrabold mb-4">Our Products</h1>
    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
      Browse our selection of premium roofing materials, engineered for
      durability and style.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-shadow text-left"
        >
          <div className="h-48 bg-gray-200 rounded mb-4 overflow-hidden">
            <img
              src={`https://images.unsplash.com/photo-1632154914101-1fc42036cdd7?auto=format&fit=crop&q=80&w=400&h=300`}
              alt="Roofing Material"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            Premium IBR Sheet
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            High tensile strength steel roofing sheet.
          </p>
          <p className="text-brand-blue font-bold text-lg">$12.99 / m</p>
        </div>
      ))}
    </div>
  </div>
);

const Quote = () => (
  <div className="container mx-auto px-4 py-16 max-w-2xl text-center animate-fade-in">
    <h1 className="text-4xl font-extrabold mb-4">Get a Quote</h1>
    <p className="text-gray-600 mb-8">
      Fill out the form below and our team will get back to you within 24 hours.
    </p>
    <form className="space-y-6 text-left bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-brand-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-brand-blue focus:outline-none"
        />
      </div>
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Project Details
        </label>
        <textarea
          placeholder="Tell us about your roofing needs..."
          className="w-full border border-gray-300 p-3 rounded h-32 focus:ring-2 focus:ring-brand-blue focus:outline-none"
        ></textarea>
      </div>
      <button
        type="button"
        className="w-full bg-brand-accent text-white font-bold py-4 rounded hover:bg-yellow-600 transition shadow-md"
      >
        Submit Request
      </button>
    </form>
  </div>
);

const Gallery = () => (
  <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
    <h1 className="text-4xl font-extrabold mb-4">Project Gallery</h1>
    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
      Take a look at some of our recently completed residential and commercial
      roofing projects.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18efc2297?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1632154914101-1fc42036cdd7?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1599525608752-192f15ffeb19?auto=format&fit=crop&q=80",
      ].map((src, i) => (
        <div
          key={i}
          className="h-64 rounded-lg shadow-md overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
        >
          <img
            src={src}
            alt={`Project ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// 3. HOME COMPONENT (Updated with placeholder image URLs)
// -----------------------------------------------------------------------------
function Home() {
  const slides = [
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80", // Replaced local image
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[560px] sm:min-h-[640px] lg:h-[85vh] lg:min-h-[600px] w-full flex items-center justify-center overflow-hidden px-2 sm:px-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide}')` }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-black/65 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-8 sm:mt-16">
          <p className="text-brand-accent font-bold tracking-widest uppercase mb-3 sm:mb-4 text-sm sm:text-base animate-pulse">
            Honest and reliable since 2024
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 sm:mb-8 leading-tight drop-shadow-lg">
            Protecting Your Assets with Premium Roofing
          </h1>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              to="/gallery"
              className="w-full sm:w-auto bg-brand-blue hover:bg-blue-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded transition-colors text-base sm:text-lg shadow-lg inline-block"
            >
              View Projects
            </Link>
            <Link
              to="/quote"
              className="w-full sm:w-auto bg-brand-accent hover:bg-yellow-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded transition-colors text-base sm:text-lg shadow-lg inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ROOFING IS WHAT WE DO SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2">
              Roofing is what we do
            </h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Just Roofing Is Leading Quality Projects
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              When you choose Just Roofing, you are investing in peace of mind.
              A failing roof disrupts your business and endangers your home. Our
              expertly crafted roofing solutions eliminate leaks, improve
              property insulation, and drastically boost your property value.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We focus on delivering structural integrity so you never have to
              worry about the next storm. Your safety and satisfaction are built
              into every sheet we lay.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1632154914101-1fc42036cdd7?auto=format&fit=crop&q=80"
              alt="Quality Finished Roof"
              className="rounded-lg shadow-xl w-full h-[280px] sm:h-[360px] lg:h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. ORDERING & LOGISTICS SECTION */}
      <section className="py-12 sm:py-16 px-4 max-w-7xl mx-auto mb-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              Seamless Ordering & Rapid Delivery
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-5 sm:p-6 rounded-lg border-l-4 border-brand-blue">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  1. Placing Your Order
                </h3>
                <p className="text-gray-600">
                  Browse our online catalog, select your materials, and request
                  a quote. Our sales team will confirm availability and pricing
                  instantly via WhatsApp.
                </p>
              </div>
              <div className="bg-gray-50 p-5 sm:p-6 rounded-lg border-l-4 border-brand-accent">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  2. Delivery Time
                </h3>
                <p className="text-gray-600">
                  Once confirmed, supply-only orders are typically dispatched
                  and delivered to your site within 24 to 48 hours.
                </p>
              </div>
              <div className="bg-gray-50 p-5 sm:p-6 rounded-lg border-l-4 border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  3. Installation Timeline
                </h3>
                <p className="text-gray-600">
                  For "Fix and Supply" projects, an average residential roof
                  takes our professional team 3 to 7 days to complete, ensuring
                  zero disruption to your daily life.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1599525608752-192f15ffeb19?auto=format&fit=crop&q=80"
              alt="Roofing Materials"
              className="rounded-lg shadow-xl w-full h-[280px] sm:h-[360px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. WHO WE ARE */}
      <section
        className="relative py-16 sm:py-24 bg-cover bg-fixed bg-center w-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f35aa9e?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-brand-blue/90 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 mb-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Who We Are
                <br />& About Our Company
              </h2>
            </div>
            <div className="lg:w-2/3">
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                Just Roofing Pvt Ltd was founded on a simple principle: every
                building deserves a shield that lasts a lifetime. We are a
                dedicated team of suppliers, engineers, and craftsmen who take
                pride in elevating the standard of construction in Zimbabwe. We
                don't just sell steel and wire; we provide security for your
                family and your investments.
              </p>
            </div>
          </div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-brand-accent">
              Leanard Teya
            </h3>
            <p className="text-blue-200">Chief Executive Officer</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white/10 border border-white/20 p-6 sm:p-8 rounded-lg text-center backdrop-blur-sm">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                2024
              </h4>
              <p className="text-brand-accent font-semibold uppercase tracking-wider text-sm">
                Year Established
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6 sm:p-8 rounded-lg text-center backdrop-blur-sm">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                150+
              </h4>
              <p className="text-brand-accent font-semibold uppercase tracking-wider text-sm">
                Projects Completed
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6 sm:p-8 rounded-lg text-center backdrop-blur-sm">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                24
              </h4>
              <p className="text-brand-accent font-semibold uppercase tracking-wider text-sm">
                Professional Employees
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6 sm:p-8 rounded-lg text-center backdrop-blur-sm">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                5
              </h4>
              <p className="text-brand-accent font-semibold uppercase tracking-wider text-sm">
                Business Partners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR SERVICES */}
      <section className="py-14 sm:py-20 bg-gray-50 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/quote"
              className="bg-white p-6 sm:p-10 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all group block border-b-4 border-brand-blue"
            >
              <h3 className="text-2xl font-bold text-brand-blue group-hover:text-brand-accent transition-colors mb-4">
                Fix and Supply Installation
              </h3>
              <p className="text-gray-600">
                Complete end-to-end roofing solutions including timber
                framework, insulation, and final sheet installation by our
                expert team.
              </p>
            </Link>
            <Link
              to="/catalog"
              className="bg-white p-6 sm:p-10 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all group block border-b-4 border-brand-accent"
            >
              <h3 className="text-2xl font-bold text-brand-blue group-hover:text-brand-accent transition-colors mb-4">
                Materials Supply
              </h3>
              <p className="text-gray-600">
                Wholesale and retail supply of IBR, corrugated sheets,
                Alububble, and fencing wire delivered directly to your site.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. OUR PROJECTS (Preview) */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Projects
          </h2>
          <div className="w-24 h-1 bg-brand-blue mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
            alt="Project 1"
            className="w-full h-64 object-cover rounded shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
            alt="Project 2"
            className="w-full h-64 object-cover rounded shadow-md"
          />
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18efc2297?auto=format&fit=crop&q=80"
            alt="Project 3"
            className="w-full h-64 object-cover rounded shadow-md"
          />
        </div>
        <div className="text-center">
          <Link
            to="/gallery"
            className="inline-block border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold py-3 px-8 rounded transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </section>

      {/* 7. OUR CLIENTS */}
      <section className="py-10 sm:py-12 bg-gray-200 px-4 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6 sm:mb-8">
            Trusted by contractors and homeowners across Zimbabwe
          </h3>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 opacity-50 grayscale">
            <span className="text-xl font-black">CITY BUILDERS</span>
            <span className="text-xl font-black">HARARE HOMES</span>
            <span className="text-xl font-black">ZIM WAREHOUSING</span>
            <span className="text-xl font-black">ELITE CONTRACTORS</span>
          </div>
        </div>
      </section>

      {/* 8. CONTACT DETAILS PRE-FOOTER */}
      <section className="bg-brand-blue text-white py-12 sm:py-16 px-4 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold text-brand-accent mb-4">
              Location
            </h4>
            <p className="text-blue-100">
              123 Industrial Road
              <br />
              Harare, Zimbabwe
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-brand-accent mb-4">
              Contact Us
            </h4>
            <p className="text-blue-100 mb-2">Phone/WhatsApp: 071 278 9951</p>
            <p className="text-blue-100">Email: leanardteya@gmail.com</p>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center">
            <Link
              to="/quote"
              className="w-full sm:w-auto bg-brand-accent hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded transition-colors shadow-lg inline-block text-center"
            >
              Request a Call Back
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 4. MAIN APP COMPONENT (With Responsive Navbar fixed for Mobile)
// -----------------------------------------------------------------------------
export default function App() {
  const [currentRoute, setCurrentRoute] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Render the current page based on state router
  const renderRoute = () => {
    switch (currentRoute) {
      case "/":
        return <Home />;
      case "/catalog":
        return <Catalog />;
      case "/quote":
        return <Quote />;
      case "/gallery":
        return <Gallery />;
      default:
        return <Home />;
    }
  };

  return (
    <RouterContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {/* Inject custom brand colors since Tailwind config is not available here */}
      <style>{`
        .bg-brand-blue { background-color: #1e3ab8; }
        .text-brand-blue { color: #1e3ab8; }
        .border-brand-blue { border-color: #1e3ab8; }
        
        .bg-brand-accent { background-color: #eab308; }
        .text-brand-accent { color: #eab308; }
        .border-brand-accent { border-color: #eab308; }

        .animate-fade-in { animation: fadeIn 0.4s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="flex flex-col min-h-screen relative font-sans text-gray-800">
        {/* Responsive Navbar */}
        <header className="bg-brand-blue text-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-brand-accent transition-colors flex-shrink-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Just Roofing
            </Link>

            {/* Desktop Nav - Hidden on Mobile */}
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
                className="bg-brand-accent hover:bg-yellow-600 px-5 py-2 rounded text-white transition-colors"
              >
                Get a Quote
              </Link>
            </nav>

            {/* Mobile Menu Button - Visible only on Mobile */}
            <button
              className="md:hidden p-2 -mr-2 focus:outline-none text-white hover:text-brand-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Nav Dropdown */}
          {isMenuOpen && (
            <nav className="md:hidden absolute top-[100%] left-0 w-full bg-brand-blue border-t border-blue-800 shadow-xl flex flex-col px-4 pt-2 pb-6 space-y-4 font-medium z-50">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-brand-accent transition-colors text-lg py-2 border-b border-blue-800/50"
              >
                Home
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-brand-accent transition-colors text-lg py-2 border-b border-blue-800/50"
              >
                Products
              </Link>
              <Link
                to="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-brand-accent transition-colors text-lg py-2 border-b border-blue-800/50"
              >
                Gallery
              </Link>
              <Link
                to="/quote"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-brand-accent hover:bg-yellow-600 px-4 py-3 rounded text-white transition-colors mt-4 text-lg"
              >
                Get a Quote
              </Link>
            </nav>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-grow w-full bg-gray-50">{renderRoute()}</main>

        <WhatsAppButton />

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 text-center p-8 mt-auto">
          <p className="mb-2 font-bold text-white text-lg">
            Just Roofing Pvt Ltd
          </p>
          <p className="text-sm">
            Supplying Quality Roofing Materials Across Zimbabwe
          </p>
          <p className="text-sm mt-6 text-gray-500">
            &copy; 2026 All rights reserved.
          </p>
        </footer>
      </div>
    </RouterContext.Provider>
  );
}
