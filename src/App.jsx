import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

console.log(import.meta.env);
console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log(import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// ── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    sun: (<><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>),
    menu: (<><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>),
    x: (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>),
    folder: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />,
    mail: (<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>),
    download: (<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>),
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
    linkedin: (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>),
    user: (<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>),
    "graduation-cap": (<><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>),
    target: (<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>),
    monitor: (<><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>),
    server: (<><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>),
    database: (<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>),
    wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
    "code-2": (<><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></>),
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    "shield-check": (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>),
    "file-text": (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>),
    "external-link": (<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>),
    "chevron-right": <polyline points="9 18 15 12 9 6" />,
    send: (<><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>),
    "map-pin": (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
    "arrow-up": (<><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>),
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {icons[name]}
    </svg>
  );
};

// ── Skill Bar ────────────────────────────────────────────────────────────────
const SkillBar = ({ label, pct, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-400">{label}</span>
    <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  </div>
);

// ── Section Heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ comment, plain, gradient }) => (
  <div className="text-center mb-12">
    <p className="text-blue-400 font-mono text-sm mb-2">{comment}</p>
    <h2 className="text-3xl sm:text-4xl font-bold inline-block relative">
      {plain} <span className="gradient-text">{gradient}</span>
      <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
    </h2>
  </div>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["hero", "about", "skills", "projects", "experience", "contact"];

const FRONTEND_SKILLS = [
  { label: "React.js", pct: 90 }, { label: "Next.js", pct: 75 },
  { label: "TypeScript", pct: 80 }, { label: "Tailwind CSS", pct: 92 },
  { label: "JavaScript", pct: 88 },
];
const BACKEND_SKILLS = [
  { label: "Node.js", pct: 85 }, { label: "Express.js", pct: 82 },
  { label: "REST APIs", pct: 88 }, { label: "JWT Auth", pct: 80 },
];
const DB_SKILLS = [
  { label: "MongoDB", pct: 85 }, { label: "PostgreSQL", pct: 70 },
  { label: "Mongoose", pct: 82 }, { label: "Prisma ORM", pct: 65 },
];
const PROG_SKILLS = [
  { label: "Java", pct: 70 }, { label: "Python", pct: 65 }, { label: "DSA", pct: 60 },
];

const PROJECTS = [
  {
    title: "Authentication App",
    desc: "A full-stack authentication system with secure user authentication, email verification, password reset, JWT tokens, and modern responsive UI.",
    tags: [
      { label: "React.js", color: "bg-blue-500/10 text-blue-300" },
      { label: "Node.js", color: "bg-green-500/10 text-green-300" },
      { label: "Express.js", color: "bg-yellow-500/10 text-yellow-300" },
      { label: "MongoDB", color: "bg-purple-500/10 text-purple-300" },
      { label: "JWT", color: "bg-pink-500/10 text-pink-300" },
    ],
    icon: "shield-check",
    gradient: "from-blue-500/20 to-purple-500/20",
    btnGradient: "from-blue-500 to-purple-500",
    iconColor: "text-blue-400/60",
    demo: "https://authentication-system-6ijvb05ij-love-sharma-s-projects.vercel.app/",
    repo: "#",
  },
  {
    title: "Blog App",
    desc: "A modern full-stack blogging platform where users can create, edit, delete, and manage blog posts with authentication and rich content support.",
    tags: [
      { label: "React.js", color: "bg-blue-500/10 text-blue-300" },
      { label: "Node.js", color: "bg-green-500/10 text-green-300" },
      { label: "Express.js", color: "bg-yellow-500/10 text-yellow-300" },
      { label: "MongoDB", color: "bg-purple-500/10 text-purple-300" },
    ],
    icon: "file-text",
    gradient: "from-green-500/20 to-cyan-500/20",
    btnGradient: "from-green-500 to-cyan-500",
    iconColor: "text-green-400/60",
    demo: "#",
    repo: "#",
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [formStatus, setFormStatus] = useState(null);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef(null);

  // ── Loading ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  // ── Scroll: progress bar + navbar + active section ─────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // progress bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      // active section
      const scrollY = window.scrollY + 100;
      document.querySelectorAll("section[id]").forEach((sec) => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Custom cursor move ─────────────────────────────────────────────────────
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 10 + "px";
        cursorRef.current.style.top = e.clientY - 10 + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── Cursor glow on interactive elements ───────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const enter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(2.5)";
        cursorRef.current.style.background = "rgba(167,139,250,0.15)";
      }
    };
    const leave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "scale(1)";
        cursorRef.current.style.background = "transparent";
      }
    };
    const els = document.querySelectorAll("a, button");
    els.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
    return () => els.forEach((el) => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
  }, [loaded]);

  // ── Scroll reveal for cards ────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  // ── Contact form ───────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error"); setFormError("Please fill in all fields."); return;
    }
    setSending(true); setFormStatus(null);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        EMAILJS_PUBLIC_KEY
      );
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setFormStatus("error"); setFormError("Something went wrong. Please try again.");
      console.error("EmailJS error:", err);
    } finally {
      setSending(false);
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"} overflow-auto`}
      style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── Scroll Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-0.5 bg-transparent">
        <div className="h-full transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%`, background: "linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6)" }} />
      </div>

      {/* ── Loading Screen ── */}
      {!loaded && (
        <div className="fixed inset-0 z-[100] bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-transparent border-t-blue-400 border-r-purple-400 rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-gray-400 font-mono text-sm">Loading...</p>
          </div>
        </div>
      )}

      {/* ── Custom Cursor ── */}
      <div ref={cursorRef}
        className="hidden lg:block fixed pointer-events-none z-[9999] w-5 h-5 rounded-full border-2 border-purple-400/50 mix-blend-difference"
        style={{ transition: "transform 0.2s ease, background 0.2s ease" }} />

      {/* ── Particles ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-blue-400/40"
            style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              animation: `floatUp ${8 + Math.random() * 12}s linear ${Math.random() * 5}s infinite`,
            }} />
        ))}
      </div>

      {/* ── Global Styles ── */}
      <style>{`
        @keyframes floatUp {
          0%   { transform:translateY(0) translateX(0); opacity:0 }
          10%  { opacity:1 } 90% { opacity:1 }
          100% { transform:translateY(-200px) translateX(50px); opacity:0 }
        }
        // @keyframes typing { from{width:0} to{width:100%} }
        // @keyframes blink  { 50%{border-color:transparent} }

        /* Remove .typing-effect class completely */
/* Keep only these keyframes */
@keyframes typing {
  from { width: 0 }
  to   { width: 43ch }
}
@keyframes blink {
  50% { border-color: transparent }
}
    
        @keyframes fadeInUp {
          from{opacity:0;transform:translateY(30px)}
          to  {opacity:1;transform:translateY(0)}
        }
        .animate-in{animation:fadeInUp 0.6s ease forwards;opacity:0}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
        .d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}

        /* scroll reveal */
        .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.6s ease,transform 0.6s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}

        @keyframes pulseGlow {
          0%,100%{box-shadow:0 0 20px rgba(96,165,250,.2)}
          50%    {box-shadow:0 0 40px rgba(167,139,250,.3)}
        }
        .glow-pulse{animation:pulseGlow 3s ease infinite}
        .glass{background:rgba(255,255,255,.03);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08)}
        .glass-strong{background:rgba(255,255,255,.06);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.10)}
        .gradient-text{
          background:linear-gradient(135deg,#60a5fa,#a78bfa,#f472b6);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .card-hover{transition:all .3s ease}
        .card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(96,165,250,.1)}
        .gradient-border{position:relative}
        .gradient-border::before{
          content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;
          background:linear-gradient(135deg,#60a5fa,#a78bfa,#f472b6);
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;
        }
        /* button ripple */
        .btn-ripple{position:relative;overflow:hidden}
        .btn-ripple::after{
          content:'';position:absolute;inset:0;background:white;opacity:0;
          transition:opacity .2s ease;border-radius:inherit;
        }
        .btn-ripple:hover::after{opacity:.05}
        .btn-ripple:active::after{opacity:.12}
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => scrollTo("hero")} className="text-xl font-bold gradient-text">LS</button>
            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((id) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className={`text-sm transition capitalize px-3 py-1.5 rounded-md
                    ${activeSection === id
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                  {id === "hero" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <button onClick={() => setDarkMode(!darkMode)}
                className="ml-2 p-2 rounded-lg glass hover:bg-white/10 transition">
                <Icon name={darkMode ? "moon" : "sun"} className="w-4 h-4" />
              </button>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(true)}>
              <Icon name="menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`fixed top-0 right-0 h-full w-64 z-[60] glass-strong transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6">
          <button className="mb-8" onClick={() => setMobileOpen(false)}>
            <Icon name="x" className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((id) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`text-left transition capitalize ${activeSection === id ? "text-white" : "text-gray-400 hover:text-white"}`}>
                {id === "hero" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10">

        {/* ── Hero ── */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
          <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">

            {/* ── Left: Text Content ── */}
            <div className="space-y-5 text-center lg:text-left">

              {/* Open to work badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full text-xs font-mono animate-in d1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-green-400">Open to opportunities</span>
              </div>

              <p className="text-blue-400 font-mono text-sm animate-in d1">👋 Hello, I'm</p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold animate-in d2 leading-tight">
                <span className="gradient-text">Love Sharma</span>
              </h1>

              <div className="animate-in d3">
                <p className="text-base sm:text-lg text-gray-400 font-mono inline-block"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    borderRight: "2px solid #a78bfa",
                    animation: "typing 3.5s steps(43) 0.5s forwards, blink 0.7s step-end infinite",
                    width: "0",
                    maxWidth: "100%",
                  }}>
                  Full Stack Developer | MERN Stack Developer
                </p>
              </div>

              <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 animate-in d4 leading-relaxed">
                BCA student at MLCNU building full-stack apps with the MERN stack.
                I care about clean architecture, fast UIs, and shipping things that work.
                Currently levelling up in System Design and AWS.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 animate-in d5">
                <button
                  onClick={() => scrollTo("projects")}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2 btn-ripple text-sm"
                >
                  <Icon name="folder" className="w-4 h-4" /> View Projects
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-5 py-2.5 glass rounded-lg font-medium hover:bg-white/10 transition flex items-center gap-2 gradient-border btn-ripple text-sm"
                >
                  <Icon name="mail" className="w-4 h-4" /> Contact Me
                </button>
                <a
                  href="/portfolio_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Love_Sharma_Resume.pdf"
                >
                  Resume
                </a>
              </div>

              {/* Social icons */}
              <div className="flex justify-center lg:justify-start gap-3 animate-in d6">
                {[
                  ["github", "https://github.com"],
                  ["linkedin", "https://linkedin.com"],
                  ["mail", "mailto:love@example.com"],
                ].map(([icon, href]) => (
                  <a
                    key={icon}
                    href={href}
                    target={icon !== "mail" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="p-2.5 glass rounded-lg hover:bg-white/10 transition"
                  >
                    <Icon name={icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Info line */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-mono animate-in d6">
                <span className="flex items-center gap-1">
                  <Icon name="map-pin" className="w-3 h-3 flex-shrink-0" /> India
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="graduation-cap" className="w-3 h-3 flex-shrink-0" /> BCA · 2027
                </span>
                <span className="flex items-center gap-1 min-w-0">
                  <Icon name="mail" className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">love.sharma.engineer@gmail.com</span>
                </span>
              </div>
            </div>

            {/* ── Right: Photo ── */}
            <div className="flex justify-center order-first lg:order-last animate-in d4">
              <div className="relative">
                {/* Outer glow ring — smaller on mobile */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center glow-pulse">
                  {/* Photo */}
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-blue-500/30">
                    <img
                      src="/photo.jpeg"
                      alt="Love Sharma"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    {/* Fallback initials */}
                    <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-blue-600/30 to-purple-600/30">
                      <span className="text-5xl sm:text-6xl font-bold gradient-text">LS</span>
                    </div>
                  </div>
                </div>

                {/* Floating tech pills — hidden on very small screens */}
                <div className="hidden sm:block absolute -top-3 -right-2 px-3 py-1 glass rounded-full text-xs font-mono text-blue-400">
                  React.js
                </div>
                <div className="hidden sm:block absolute -bottom-2 -left-2 px-3 py-1 glass rounded-full text-xs font-mono text-purple-400">
                  Node.js
                </div>
                <div className="hidden md:block absolute top-1/2 -right-8 px-3 py-1 glass rounded-full text-xs font-mono text-pink-400">
                  TypeScript
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeading comment="// about me" plain="Get To Know" gradient="Me" />
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="glass rounded-2xl p-8 card-hover reveal">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="user" className="w-5 h-5 text-blue-400" /> Who I Am
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Passionate BCA student and aspiring Full Stack Developer with hands-on experience in modern web
                  technologies including React.js, Node.js, Express.js, JavaScript, TypeScript, Next.js, Tailwind CSS,
                  MongoDB, PostgreSQL, Docker, Redis, and cloud technologies. I enjoy building scalable web applications,
                  solving real-world problems, and continuously learning new technologies. My goal is to become a
                  world-class software engineer and contribute to impactful products.
                </p>
              </div>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6 card-hover reveal">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Icon name="graduation-cap" className="w-5 h-5 text-purple-400" /> Education
                  </h3>
                  <p className="text-gray-300 font-medium">Bachelor of Computer Applications (BCA)</p>
                  <p className="text-gray-500 text-sm">Makhan Lal Chaturvedi National University</p>
                  <p className="text-gray-500 text-sm">Expected Graduation: 2027</p>
                </div>
                <div className="glass rounded-2xl p-6 card-hover reveal">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Icon name="target" className="w-5 h-5 text-pink-400" /> Goals
                  </h3>
                  <p className="text-gray-400 text-sm">Become a world-class software engineer at top tech companies and build products that impact millions.</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[["5+", "Projects"], ["10+", "Technologies"], ["1+", "Years Coding"]].map(([n, l]) => (
                    <div key={l} className="glass rounded-xl p-4 text-center card-hover reveal">
                      <p className="text-2xl font-bold gradient-text">{n}</p>
                      <p className="text-gray-500 text-xs">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeading comment="// my skills" plain="Tech" gradient="Stack" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Frontend", icon: "monitor", iconColor: "text-blue-400", bg: "bg-blue-500/10", skills: FRONTEND_SKILLS, barColor: "bg-gradient-to-r from-blue-400 to-blue-600", tags: null },
                { title: "Backend", icon: "server", iconColor: "text-green-400", bg: "bg-green-500/10", skills: BACKEND_SKILLS, barColor: "bg-gradient-to-r from-green-400 to-green-600", tags: null },
                { title: "Database", icon: "database", iconColor: "text-purple-400", bg: "bg-purple-500/10", skills: DB_SKILLS, barColor: "bg-gradient-to-r from-purple-400 to-purple-600", tags: null },
                { title: "Tools & DevOps", icon: "wrench", iconColor: "text-orange-400", bg: "bg-orange-500/10", skills: null, barColor: null, tags: ["Git", "GitHub", "Docker", "Redis", "Nginx", "Postman", "Cloudinary", "VS Code"], tagColor: "text-orange-300" },
                { title: "Programming", icon: "code-2", iconColor: "text-cyan-400", bg: "bg-cyan-500/10", skills: PROG_SKILLS, barColor: "bg-gradient-to-r from-cyan-400 to-cyan-600", tags: null },
                { title: "Learning", icon: "zap", iconColor: "text-pink-400", bg: "bg-pink-500/10", skills: null, barColor: null, tags: ["System Design", "AWS", "Microservices", "GraphQL", "CI/CD"], tagColor: "text-pink-300" },
              ].map(({ title, icon, iconColor, bg, skills, barColor, tags, tagColor }) => (
                <div key={title} className="glass rounded-2xl p-6 card-hover reveal">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon name={icon} className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <h3 className="font-semibold">{title}</h3>
                  </div>
                  {skills && (
                    <div className="space-y-3">
                      {skills.map((s) => <SkillBar key={s.label} {...s} color={barColor} />)}
                    </div>
                  )}
                  {tags && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => <span key={t} className={`px-3 py-1 text-xs glass rounded-full ${tagColor}`}>{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeading comment="// my work" plain="Featured" gradient="Projects" />
            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((p) => (
                <div key={p.title} className="glass rounded-2xl overflow-hidden card-hover group reveal">
                  <div className={`h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} group-hover:opacity-150 transition-all`} />
                    <Icon name={p.icon} className={`w-16 h-16 ${p.iconColor} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map((t) => <span key={t.label} className={`px-2 py-0.5 text-xs rounded ${t.color}`}>{t.label}</span>)}
                    </div>
                    <div className="flex gap-3">
                      <a href={p.demo} target="_blank" rel="noopener noreferrer"
                        className={`px-4 py-2 bg-gradient-to-r ${p.btnGradient} rounded-lg text-sm font-medium hover:opacity-90 transition flex items-center gap-1 btn-ripple`}>
                        <Icon name="external-link" className="w-3 h-3" /> Live Demo
                      </a>
                      <a href={p.repo} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 glass rounded-lg text-sm font-medium hover:bg-white/10 transition flex items-center gap-1 btn-ripple">
                        <Icon name="github" className="w-3 h-3" /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading comment="// experience" plain="Work" gradient="Experience" />
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500" />

              {/* Exp 1 */}
              <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 gap-8 mb-12">
                <div className="md:text-right md:pr-12">
                  <span className="text-sm text-blue-400 font-mono">June 2025 – Present</span>
                </div>
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-950 top-1" />
                <div className="glass rounded-xl p-6 card-hover md:ml-12 reveal">
                  <h3 className="font-semibold text-lg">Intern Software Developer</h3>
                  <ul className="mt-3 space-y-2 text-gray-400 text-sm">
                    {["Assisted in developing web applications using React & Node.js", "Collaborated with senior developers on production features", "Implemented modern web features with clean code practices"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Icon name="chevron-right" className="w-3 h-3 mt-1 text-blue-400 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exp 2 */}
              <div className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 gap-8">
                <div className="md:text-right md:pr-12">
                  <span className="text-sm text-purple-400 font-mono">Aug 2024 – June 2025</span>
                </div>
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-gray-950 top-1" />
                <div className="glass rounded-xl p-6 card-hover md:ml-12 reveal">
                  <h3 className="font-semibold text-lg">Volunteer Tutor</h3>
                  <ul className="mt-3 space-y-2 text-gray-400 text-sm">
                    {["Taught programming basics to fellow students", "Developed learning materials and exercises"].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Icon name="chevron-right" className="w-3 h-3 mt-1 text-purple-400 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeading comment="// get in touch" plain="Contact" gradient="Me" />
            <div className="grid lg:grid-cols-2 gap-10">
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5 reveal">
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm text-gray-400 mb-1">{label}</label>
                    <input id={id} type={type} value={formData[id]}
                      onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm" />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
                  <textarea id="message" rows={4} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed btn-ripple">
                  {sending ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Icon name="send" className="w-4 h-4" /> Send Message</>
                  )}
                </button>
                {formStatus === "success" && (
                  <div className="text-center text-sm py-2 rounded-lg bg-green-500/10 text-green-400">
                    ✓ Message sent! I'll get back to you soon.
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="text-center text-sm py-2 rounded-lg bg-red-500/10 text-red-400">
                    ✗ {formError}
                  </div>
                )}
              </form>

              <div className="space-y-6">
                {[
                  { icon: "mail", color: "bg-blue-500/10", iconColor: "text-blue-400", label: "Email", value: "love.sharma.engineer@gmail.com" },
                  { icon: "github", color: "bg-purple-500/10", iconColor: "text-purple-400", label: "GitHub", value: "https://github.com/loveCoder52" },
                  { icon: "linkedin", color: "bg-blue-500/10", iconColor: "text-blue-400", label: "LinkedIn", value: "https://linkedin.com/in/love-sharma-dev" },
                  { icon: "map-pin", color: "bg-pink-500/10", iconColor: "text-pink-400", label: "Location", value: "India" },
                ].map(({ icon, color, iconColor, label, value }) => (
                  <div key={label} className="glass rounded-2xl p-6 card-hover flex items-center gap-4 reveal">
                    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                      <Icon name={icon} className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">{label}</p>
                      <p className="text-gray-200 text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-8 px-4 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Love Sharma. Built with ❤️</p>
            <div className="flex gap-4">
              {[["github", "https://github.com"], ["linkedin", "https://linkedin.com"], ["mail", "mailto:love@example.com"]].map(([icon, href]) => (
                <a key={icon} href={href} target={icon !== "mail" ? "_blank" : undefined} rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition">
                  <Icon name={icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 glass rounded-lg hover:bg-white/10 transition btn-ripple">
              <Icon name="arrow-up" className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </main>
    </div >
  );
}