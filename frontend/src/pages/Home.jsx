import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import { ArrowRight, Clock, Phone, ChevronRight } from "lucide-react";

// Custom Framer Motion Counter (Replaces react-countup)
function AnimatedCounter({ end, duration = 3 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, end, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value);
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, end, duration]);

  return <span ref={ref}>0</span>;
}

export default function Home() {
  const containerRef = useRef(null);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();

  // Parallax for hero section
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const slides = [
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    "/images/roof6.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div
      className="relative w-full bg-zinc-950 font-sans selection:bg-brand-accent selection:text-white"
      ref={containerRef}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <section className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-zinc-900 flex flex-col justify-center">
        <motion.div style={{ y: heroY, opacity }} className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${slide}')` }}
            />
          ))}
          <div className="absolute inset-0 bg-zinc-950/70 z-10" />
          <div className="absolute inset-0 bg-[url('/blueprint-grid.svg')] opacity-5 z-10 mix-blend-overlay" />
        </motion.div>

        <div className="relative z-20 px-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-accent font-black tracking-[0.2em] uppercase mb-6 text-sm sm:text-base flex items-center gap-4"
            >
              <span className="w-12 h-[2px] bg-brand-accent"></span>
              Honest and reliable since 2024
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-6xl sm:text-8xl md:text-[7rem] font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase font-oswald"
            >
              Roofing <br />
              <span className="text-transparent border-text stroke-white text-outline">
                That Lasts.
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-6 items-start mt-12"
            >
              <Link
                to="/quote"
                className="group relative bg-brand-accent text-zinc-950 font-black uppercase tracking-wider py-5 px-10 overflow-hidden shadow-[8px_8px_0px_#fff] hover:shadow-[4px_4px_0px_#fff] hover:translate-y-1 hover:translate-x-1 transition-all duration-300 flex items-center gap-3"
              >
                <span className="relative z-10">Request Quote</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
              </Link>

              <div className="flex items-center gap-3 text-zinc-300">
                <Clock className="w-5 h-5 text-brand-accent" />
                <p className="text-sm font-medium">
                  Average response <br />
                  <span className="text-white font-bold">
                    within 30 minutes
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-0 z-10 min-h-screen bg-gradient-to-br from-white to-slate-100 pt-24 pb-32 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            <div className="w-full lg:w-5/12">
              <motion.h4
                variants={fadeUp}
                className="text-brand-blue font-black uppercase tracking-widest mb-4 flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-brand-blue"></span> Roofing is
                what we do
              </motion.h4>
              <motion.h2
                variants={fadeUp}
                className="text-5xl sm:text-7xl font-black text-zinc-950 mb-8 leading-[0.9] tracking-tight uppercase"
              >
                Leading <br />
                Quality <br />
                Projects.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-zinc-600 text-lg leading-relaxed mb-6 font-medium"
              >
                When you choose Just Roofing, you are investing in peace of
                mind. A failing roof disrupts your business and endangers your
                home.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-zinc-500 leading-relaxed mb-8"
              >
                We focus on delivering structural integrity so you never have to
                worry about the next storm. Your safety and satisfaction are
                built into every sheet we lay.
              </motion.p>
            </div>

            <div className="w-full lg:w-7/12 relative">
              <motion.div
                variants={fadeUp}
                className="relative z-10 bg-white p-4 border-2 border-zinc-900 shadow-[16px_16px_0px_#18181b]"
              >
                <div className="overflow-hidden group relative">
                  <img
                    src="/images/roof1.png"
                    alt="Quality Finished Roof"
                    className="w-full h-[500px] object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-brand-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center">
                    <span className="text-white font-black tracking-widest uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Details
                    </span>
                    <ArrowRight className="text-brand-accent w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 delay-100" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-10 -left-10 bg-brand-accent text-zinc-950 p-8 border-2 border-zinc-900 shadow-[8px_8px_0px_#18181b] z-20"
              >
                <p className="font-black text-4xl mb-1 uppercase tracking-tighter">
                  Zero
                </p>
                <p className="text-sm font-bold uppercase tracking-widest">
                  Compromises
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-0 z-20 min-h-screen bg-brand-blue text-white pt-24 pb-32 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 20px)",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-24"
          >
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6"
            >
              Seamless Ordering <br />
              <span className="text-brand-accent">Rapid Delivery</span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/20 hidden lg:block -translate-y-1/2">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-brand-accent origin-left"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: "01",
                  title: "Placing Order",
                  desc: "Select materials & request a quote. Confirmed instantly via WhatsApp.",
                },
                {
                  step: "02",
                  title: "Delivery",
                  desc: "Supply-only orders dispatched and delivered to your site within 24–48 hours.",
                },
                {
                  step: "03",
                  title: "Installation",
                  desc: "Average residential roof takes 3-7 days to complete with zero disruption.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative group bg-zinc-900 border-2 border-white/10 p-8 shadow-[8px_8px_0px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_0px_#EAB308] hover:border-brand-accent transition-all duration-300"
                >
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-brand-accent flex items-center justify-center border-2 border-zinc-900 font-black text-2xl text-zinc-900 group-hover:rotate-12 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-wide mt-6 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 min-h-screen bg-zinc-950 pt-24 pb-32 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:w-1/2"
            >
              <motion.h2
                variants={fadeUp}
                className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-8"
              >
                Who We Are.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-zinc-400 text-xl leading-relaxed font-medium"
              >
                Just Roofing Pvt Ltd was founded on a simple principle: every
                building deserves a shield that lasts a lifetime. We are a
                dedicated team of suppliers, engineers, and craftsmen.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-12 flex items-center gap-6"
              >
                <div className="w-16 h-16 bg-zinc-800 rounded-full overflow-hidden border-2 border-brand-accent grayscale">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                    alt="Leanard Teya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                    Leanard Teya
                  </h3>
                  <p className="text-brand-accent font-bold uppercase tracking-widest text-sm">
                    Chief Executive Officer
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              {[
                { end: 2024, label: "Year Est", prefix: "" },
                { end: 150, label: "Projects", prefix: "+" },
                { end: 24, label: "Professionals", prefix: "" },
                { end: 5, label: "Partners", prefix: "" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-center"
                >
                  <h4 className="text-5xl md:text-6xl font-black text-white mb-2 flex items-baseline">
                    <AnimatedCounter end={stat.end} />
                    <span className="text-brand-accent text-4xl">
                      {stat.prefix}
                    </span>
                  </h4>
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-y border-zinc-800 py-8 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
            <div className="flex space-x-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap opacity-30">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex space-x-16 items-center">
                  <span className="text-3xl font-black text-white uppercase tracking-widest">
                    City Builders
                  </span>
                  <span className="text-3xl font-black text-white uppercase tracking-widest">
                    Harare Homes
                  </span>
                  <span className="text-3xl font-black text-white uppercase tracking-widest">
                    Zim Warehousing
                  </span>
                  <span className="text-3xl font-black text-white uppercase tracking-widest">
                    Elite Contractors
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-40 bg-brand-accent text-zinc-950 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">
              Ready to secure <br />
              your investment?
            </h2>
            <div className="flex items-center gap-8">
              <div>
                <p className="font-bold uppercase tracking-wider text-zinc-800 mb-1">
                  Call Us Now
                </p>
                <p className="text-2xl font-black flex items-center gap-3">
                  <Phone className="w-6 h-6 fill-zinc-950" /> 071 278 9951
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:justify-end">
            <Link
              to="/quote"
              className="bg-zinc-950 text-white font-black uppercase tracking-wider py-6 px-12 shadow-[8px_8px_0px_#fff] hover:shadow-[4px_4px_0px_#fff] hover:translate-y-1 hover:translate-x-1 transition-all duration-300 flex items-center gap-4 text-xl"
            >
              Request a Call Back
              <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
