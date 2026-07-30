import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Array of high-quality roofing/construction placeholder images
  const slides = [
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    "/images/roof6.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance the slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION (Full-Width Slideshow) */}
      <section className="relative min-h-[560px] sm:min-h-[640px] lg:h-[85vh] lg:min-h-[600px] w-full flex items-center justify-center overflow-hidden px-2 sm:px-4">
        {/* Background Images Mapping */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide}')` }}
          ></div>
        ))}

        {/* Dark Overlay - keeps text readable against any image */}
        <div className="absolute inset-0 bg-black/65 z-10"></div>

        {/* Text Content */}
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
              className="w-full sm:w-auto bg-brand-blue hover:bg-blue-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded transition-colors text-base sm:text-lg shadow-lg"
            >
              View Projects
            </Link>
            <Link
              to="/quote"
              className="w-full sm:w-auto bg-brand-accent hover:bg-yellow-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded transition-colors text-base sm:text-lg shadow-lg"
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
              src="/images/roof1.png"
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
              src="/images/roof5.jpeg"
              alt="Roofing Materials"
              className="rounded-lg shadow-xl w-full h-[280px] sm:h-[360px] lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. WHO WE ARE (Full Width Background) */}
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
              className="bg-white p-6 sm:p-10 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer border-b-4 border-brand-blue"
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
              className="bg-white p-6 sm:p-10 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer border-b-4 border-brand-accent"
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
            src="/images/roof2.png"
            alt="Project 1"
            className="w-full h-64 object-cover rounded shadow-md"
          />
          <img
            src="/images/roof3.png"
            alt="Project 2"
            className="w-full h-64 object-cover rounded shadow-md"
          />
          <img
            src="/images/roof4.png"
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
              className="w-full sm:w-auto bg-brand-accent hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded transition-colors shadow-lg"
            >
              Request a Call Back
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
