import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Small utilities                                                    */
/* ------------------------------------------------------------------ */

// Counts up from 0 to `target` once the element scrolls into view.
function useCountUp(target, duration = 1800) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return [ref, value];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// Thin diagonal divider used between sections
function Divider({ fill = "fill-white" }) {
  return (
    <svg
      className="block w-full h-6 sm:h-10"
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon points="0,40 1200,0 1200,40" className={fill} />
    </svg>
  );
}

// Faint steel-plate grain, layered at ~4% opacity so it never fights the content
function Grain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

// Floating, always-reachable CTA that appears once the visitor scrolls
// past the hero and stays pinned to the viewport for the rest of the page.
function FloatingProductsCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal once they've scrolled past most of the hero
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Outer element owns the fixed positioning + vertical centering.
    // Inner motion.div owns the slide/fade animation, so the two
    // transforms (translate-y-1/2 vs. the animated y) don't fight.
    <div className="fixed top-1/2 -translate-y-1/2 right-4 sm:right-8 z-[70]">
      <motion.div
        initial={false}
        animate={
          visible
            ? { opacity: 1, x: 0, scale: 1, pointerEvents: "auto" }
            : { opacity: 0, x: 30, scale: 0.9, pointerEvents: "none" }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to="/catalog"
          className="group relative flex items-center gap-2.5 bg-brand-accent hover:bg-yellow-600 text-white font-bold pl-5 pr-6 py-3.5 sm:py-4 rounded-full shadow-2xl transition-colors"
        >
          {/* subtle pulse ring to draw the eye without being annoying */}
          <span className="absolute inset-0 rounded-full bg-brand-accent motion-safe:animate-ping opacity-25" />

          <svg
            className="relative w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8L12 3 3 8m18 0l-9 5m9-5v10l-9 5m0-10L3 8m9 5v10M3 8v10l9 5"
            />
          </svg>

          <span className="relative text-sm sm:text-base uppercase tracking-wide whitespace-nowrap">
            Browse Products
          </span>
        </Link>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const slides = [
    "/images/roof4.png",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    "/images/roof5.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "45%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Stats
  const stats = [
    { label: "Year Established", value: 2024, suffix: "", isYear: true },
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Professional Employees", value: 24, suffix: "" },
    { label: "Business Partners", value: 5, suffix: "" },
  ];

  const projects = [
    { src: "/images/roof2.png", title: "Industrial Warehouse Re-roof" },
    { src: "/images/roof3.png", title: "Residential IBR Installation" },
    { src: "/images/roof4.png", title: "Commercial Fix & Supply" },
  ];

  const clients = [
    "CITY BUILDERS",
    "HARARE HOMES",
    "ZIM WAREHOUSING",
    "ELITE CONTRACTORS",
  ];

  return (
    <div className="w-full bg-white font-sans">
      {/* FLOATING PRODUCTS CTA — always reachable while scrolling */}
      <FloatingProductsCTA />

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{ scaleX: barScale }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-accent origin-left z-[60]"
      />

      {/* ============================================================ */}
      {/* 1. HERO — Standard relative flow                               */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative z-0 min-h-[620px] sm:min-h-[700px] lg:h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            style={{ y: heroImageY }}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: `url('${slide}')` }}
            />
          </motion.div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-black/80 z-10" />

        {/* Faint blueprint scaffolding */}
        <svg
          className="absolute inset-0 w-full h-full z-10 opacity-[0.07]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="20%"
            x2="100%"
            y2="20%"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="80%"
            x2="100%"
            y2="80%"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="15%"
            y1="0"
            x2="15%"
            y2="100%"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="85%"
            y1="0"
            x2="85%"
            y2="100%"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="white"
            strokeWidth="1"
          />
        </svg>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-8 sm:mt-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand-accent font-bold tracking-[0.3em] uppercase mb-4 sm:mb-6 text-xs sm:text-sm"
          >
            Honest and reliable since 2024
          </motion.p>

          <h1 className="text-white mb-6 sm:mb-8 leading-[0.95] drop-shadow-lg">
            {["ROOFING", "THAT", "LASTS."].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block font-black uppercase tracking-tight text-5xl sm:text-7xl md:text-8xl"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-blue-50/90 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10"
          >
            Protecting your assets with premium roofing, engineered to outlast
            the storm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/gallery"
              className="group w-full sm:w-auto bg-brand-blue hover:bg-blue-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded transition-colors text-base sm:text-lg shadow-lg inline-flex items-center justify-center gap-2"
            >
              View Projects
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/quote"
              className="group w-full sm:w-auto bg-brand-accent hover:bg-yellow-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded transition-colors text-base sm:text-lg shadow-lg inline-flex items-center justify-center gap-2"
            >
              Contact Us
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/50 text-xs tracking-widest uppercase"
        >
          Scroll
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* 2. ROOFING IS WHAT WE DO                                     */}
      {/* ============================================================ */}
      <section className="relative z-10 bg-white">
        <div className="pt-8 sm:pt-10">
          <Divider fill="fill-white" />
        </div>
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="py-10 sm:py-20 px-4 max-w-7xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div variants={fadeUp} className="w-full lg:w-1/2">
              <h4 className="text-brand-accent font-bold uppercase tracking-[0.25em] mb-3 text-sm">
                Roofing is what we do
              </h4>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-5 sm:mb-6 leading-[1.05]">
                Just Roofing Is Leading Quality Projects
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                When you choose Just Roofing, you are investing in peace of
                mind. A failing roof disrupts your business and endangers your
                home. Our expertly crafted roofing solutions eliminate leaks,
                improve property insulation, and drastically boost your property
                value.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                We focus on delivering structural integrity so you never have to
                worry about the next storm. Your safety and satisfaction are
                built into every sheet we lay.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full lg:w-1/2 relative">
              <div className="overflow-hidden rounded-lg shadow-xl group relative">
                <img
                  src="/images/roof1.png"
                  alt="Quality Finished Roof"
                  className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div
                className="hidden sm:block absolute -bottom-6 -left-6 bg-brand-blue text-white px-6 py-4 rounded-lg"
                style={{ boxShadow: "8px 8px 0 rgba(0,0,0,0.15)" }}
              >
                <p className="text-2xl font-black">150+</p>
                <p className="text-xs uppercase tracking-wider text-blue-100">
                  Roofs Delivered
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* 3. ORDERING & LOGISTICS                                      */}
      {/* ============================================================ */}
      <section className="relative z-20 bg-gradient-to-br from-white to-slate-100">
        <div className="pt-8 sm:pt-10">
          <Divider fill="fill-[#f1f5f9]" />
        </div>
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="py-10 sm:py-16 px-4 max-w-7xl mx-auto pb-16 sm:pb-24"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              variants={fadeUp}
              className="w-full lg:w-1/2 order-2 lg:order-1"
            >
              <h4 className="text-brand-blue font-bold uppercase tracking-[0.25em] mb-3 text-sm">
                How it works
              </h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900 mb-8">
                Seamless Ordering &amp; Rapid Delivery
              </h2>

              <div className="relative pl-10">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-blue via-brand-accent to-gray-800" />
                {[
                  {
                    n: "1",
                    color: "bg-brand-blue",
                    title: "Placing Your Order",
                    body: "Browse our online catalog, select your materials, and request a quote. Our sales team will confirm availability and pricing instantly via WhatsApp.",
                  },
                  {
                    n: "2",
                    color: "bg-brand-accent",
                    title: "Delivery Time",
                    body: "Once confirmed, supply-only orders are typically dispatched and delivered to your site within 24 to 48 hours.",
                  },
                  {
                    n: "3",
                    color: "bg-gray-800",
                    title: "Installation Timeline",
                    body: 'For "Fix and Supply" projects, an average residential roof takes our professional team 3 to 7 days to complete, ensuring zero disruption to your daily life.',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.n}
                    variants={fadeUp}
                    className="relative mb-8 last:mb-0"
                  >
                    <span
                      className={`absolute -left-10 top-0 w-8 h-8 rounded-full ${step.color} text-white text-sm font-bold flex items-center justify-center ring-4 ring-white`}
                    >
                      {step.n}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{step.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="w-full lg:w-1/2 order-1 lg:order-2"
            >
              <div className="overflow-hidden rounded-lg shadow-xl group">
                <img
                  src="/images/roof6.jpeg"
                  alt="Roofing Materials"
                  className="w-full h-[280px] sm:h-[360px] lg:h-[520px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* 4. WHO WE ARE                                                */}
      {/* ============================================================ */}
      <section className="relative z-30 overflow-hidden">
        <div className="pt-8 sm:pt-10 bg-brand-blue">
          <Divider fill="fill-brand-blue" />
        </div>
        <div
          className="relative py-16 sm:py-24 bg-cover bg-fixed bg-center w-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f35aa9e?auto=format&fit=crop&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/95 to-blue-950/95 z-0" />
          <Grain />

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 max-w-7xl mx-auto px-4"
          >
            <div className="flex flex-col lg:flex-row gap-12 mb-16">
              <motion.div variants={fadeUp} className="lg:w-1/3">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
                  Who We Are
                  <br />
                  &amp; About Our Company
                </h2>
              </motion.div>
              <motion.div variants={fadeUp} className="lg:w-2/3">
                <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                  Just Roofing Pvt Ltd was founded on a simple principle: every
                  building deserves a shield that lasts a lifetime. We are a
                  dedicated team of suppliers, engineers, and craftsmen who take
                  pride in elevating the standard of construction in Zimbabwe.
                  We don't just sell steel and wire; we provide security for
                  your family and your investments.
                </p>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="text-center mb-12">
              <h3 className="text-2xl font-bold text-brand-accent">
                Leanard Teya
              </h3>
              <p className="text-blue-200">Chief Executive Officer</p>
            </motion.div>

            <motion.div
              variants={staggerParent}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            >
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. OUR SERVICES                                              */}
      {/* ============================================================ */}
      <div className="relative z-40 bg-white">
        <motion.section
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="py-14 sm:py-20 bg-gray-50 px-4 w-full"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900 mb-4">
                Our Services
              </h2>
              <div className="w-24 h-1 bg-brand-accent mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp}>
                <Link
                  to="/quote"
                  className="block h-full bg-white p-6 sm:p-10 rounded-lg group cursor-pointer transition-transform hover:-translate-y-1"
                  style={{ boxShadow: "8px 8px 0 rgba(30, 58, 138, 0.15)" }}
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
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  to="/catalog"
                  className="block h-full bg-white p-6 sm:p-10 rounded-lg group cursor-pointer transition-transform hover:-translate-y-1"
                  style={{ boxShadow: "8px 8px 0 rgba(217, 119, 6, 0.2)" }}
                >
                  <h3 className="text-2xl font-bold text-brand-blue group-hover:text-brand-accent transition-colors mb-4">
                    Materials Supply
                  </h3>
                  <p className="text-gray-600">
                    Wholesale and retail supply of IBR, corrugated sheets,
                    Alububble, and fencing wire delivered directly to your site.
                  </p>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 6. OUR PROJECTS */}
        <motion.section
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="py-16 sm:py-20 px-4 max-w-7xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-900 mb-4">
              Our Projects
            </h2>
            <div className="w-24 h-1 bg-brand-blue mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {projects.map((p) => (
              <motion.div
                key={p.src}
                variants={fadeUp}
                className="relative overflow-hidden rounded shadow-md group cursor-pointer"
              >
                <img
                  src={p.src}
                  alt={p.title}
                  className="w-full h-64 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                  <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                    <p className="text-white font-bold">{p.title}</p>
                    <span className="text-brand-accent text-sm inline-flex items-center gap-1">
                      View Project
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center">
            <Link
              to="/gallery"
              className="inline-block border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold py-3 px-8 rounded transition-colors"
            >
              View All Projects
            </Link>
          </motion.div>
        </motion.section>

        {/* 7. OUR CLIENTS */}
        <section className="py-10 sm:py-12 bg-gray-200 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto text-center px-4 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
              Trusted by contractors and homeowners across Zimbabwe
            </h3>
          </div>
          <div className="relative">
            <div className="flex w-max animate-marquee gap-16 opacity-60 grayscale">
              {[...clients, ...clients].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-xl font-black whitespace-nowrap"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 8. CONTACT DETAILS PRE-FOOTER */}
        <motion.section
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gradient-to-br from-brand-blue to-blue-950 text-white py-12 sm:py-16 px-4 w-full"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <motion.div variants={fadeUp}>
              <h4 className="text-xl font-bold text-brand-accent mb-4">
                Location
              </h4>
              <p className="text-blue-100">
                123 Industrial Road
                <br />
                Harare, Zimbabwe
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h4 className="text-xl font-bold text-brand-accent mb-4">
                Contact Us
              </h4>
              <p className="text-blue-100 mb-2">Phone/WhatsApp: 071 278 9951</p>
              <p className="text-blue-100">Email: leanardteya@gmail.com</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center md:items-end justify-center gap-2"
            >
              <Link
                to="/quote"
                className="group w-full sm:w-auto bg-brand-accent hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                ☎ Request a Call Back
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <p className="text-blue-200 text-xs">
                Average response within 30 minutes
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}

function StatCard({ stat }) {
  const [ref, value] = useCountUp(
    stat.isYear ? stat.value : stat.value,
    stat.isYear ? 900 : 1800,
  );
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="bg-white/10 border border-white/20 p-6 sm:p-8 rounded-lg text-center backdrop-blur-sm"
    >
      <h4 className="text-3xl sm:text-4xl font-black text-white mb-2 tabular-nums">
        {stat.isYear ? value : value}
        {!stat.isYear ? stat.suffix : ""}
      </h4>
      <p className="text-brand-accent font-semibold uppercase tracking-wider text-sm">
        {stat.label}
      </p>
    </motion.div>
  );
}
