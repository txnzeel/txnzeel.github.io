import React, { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";
import {
  Database,
  Table2,
  Code2,
  Sigma,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Cloud,
  Server,
  Mail,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Phone,
  Activity,
  Sparkles,
  Shuffle,
} from "lucide-react";

// --- Three.js Imports for 3D Background ---
import { Canvas, useFrame } from "@react-three/fiber";

/* ---------- SVGs for Socials ---------- */
function Github({ size = 17, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.08 3.29 9.38 7.86 10.9 0.57 0.1 0.78-0.25 0.78-0.55 0-0.27-0.01-1.16-0.02-2.11-3.2 0.7-3.88-1.36-3.88-1.36-0.52-1.33-1.28-1.68-1.28-1.68-1.04-0.72 0.08-0.7 0.08-0.7 1.16 0.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36 0.96 0.1-0.75 0.4-1.25 0.73-1.54-2.56-0.29-5.25-1.28-5.25-5.7 0-1.26 0.45-2.29 1.19-3.1-0.12-0.29-0.52-1.46 0.11-3.05 0 0 0.97-0.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18 0.63 1.59 0.23 2.76 0.11 3.05 0.74 0.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69 0.42 0.36 0.78 1.07 0.78 2.15 0 1.55-0.01 2.8-0.01 3.18 0 0.3 0.2 0.66 0.79 0.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}
function Linkedin({ size = 17, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-0.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h0.05c0.48-0.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C0.8 0 0 0.78 0 1.75v20.5C0 23.22 0.8 24 1.77 24h20.45c0.98 0 1.78-0.78 1.78-1.75V1.75C24 0.78 23.2 0 22.22 0Z" />
    </svg>
  );
}
function Twitter({ size = 17, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.24 2H21.5l-7.3 8.34L22.8 22h-6.74l-5.28-6.9L4.7 22H1.44l7.8-8.92L1 2h6.9l4.77 6.3L18.24 2Zm-1.18 18h1.8L7.02 3.9H5.08L17.06 20Z" />
    </svg>
  );
}

/* ---------- PEACEFUL DATA CLUSTER (Automatic Breathing) ---------- */
function DataCluster() {
  const groupRef = useRef();

  const count = 80;
  const positions = useRef(
    Array.from({ length: count }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.3;
      return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ];
    })
  );

  const colors = ["#C8842B", "#2F6B66", "#2ecc71", "#e67e22", "#3498db", "#F3F1E9"];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(time * 0.08) * 0.05;

      // AUTOMATIC BREATHING: pulses between 1.0 and 2.2 every 4 seconds
      const breathe = 1.4 + Math.sin(time * 0.4) * 0.6;

      groupRef.current.children.forEach((child, i) => {
        if (i >= positions.current.length) return;
        const base = positions.current[i];
        child.position.set(
          base[0] * breathe,
          base[1] * breathe,
          base[2] * breathe
        );
        // Size also breathes slightly
        const size = 0.06 + (Math.sin(time * 0.3 + i) * 0.02 + 0.02);
        child.scale.setScalar(size);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {positions.current.map((pos, i) => {
        const color = colors[i % colors.length];
        return (
          <mesh key={i} position={[pos[0], pos[1], pos[2]]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.1}
              roughness={0.3}
              metalness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function ThreeBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2] }}
        dpr={[1, 1]}
        performance={{ min: 0.5 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#C8842B" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#2F6B66" />
        <DataCluster />
      </Canvas>
    </div>
  );
}

/* ---------- Content ---------- */
const person = {
  name: "Tanzeel Aftab",
  role: "Operations Data Analyst",
  location: "Srinagar, Jammu & Kashmir",
  email: "tanzeelq@gmail.com",
  phone: "+91 91496 51440",
  site: "txnzeel.github.io",
};

const roles = [
  "Data Analyst",
  "Dashboard Builder",
  "ETL Pipeline Creator",
  "SQL Debugger",
  "BI Developer",
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

function generateMetricData(metric, seed = 0) {
  const baseMap = {
    SLA: { min: 75, max: 98, label: "SLA Compliance", color: "#2ecc71" },
    Shrinkage: { min: 15, max: 35, label: "Agent Shrinkage", color: "#e67e22" },
    Occupancy: { min: 60, max: 92, label: "Agent Occupancy", color: "#3498db" },
  };
  const base = baseMap[metric];
  return months.map((m, i) => ({
    m: m,
    v: Math.floor(
      base.min +
        (base.max - base.min) * (0.3 + 0.7 * (i / months.length)) +
        (Math.sin(i + seed) * 8 + Math.cos(i * 2 + seed) * 4)
    ),
  }));
}

const initialChartData = generateMetricData("SLA", 0);

const heroStats = [
  { label: "Reporting time cut", target: 30, prefix: "", suffix: "%", decimals: 0 },
  { label: "Forecast accuracy (MAPE)", target: 5, prefix: "~", suffix: "%", decimals: 0 },
  { label: "Years in ops analytics", target: 1.5, prefix: "", suffix: "+", decimals: 1 },
];

const skillGroups = [
  {
    label: "BI & Visualization",
    skills: [
      { name: "Power BI (DAX, Power Query)", level: 85, icon: BarChart3 },
      { name: "Advanced Excel (Macros, Pivot Tables)", level: 88, icon: Table2 },
    ],
  },
  {
    label: "Database & Code",
    skills: [
      { name: "SQL (Window Functions, CTEs)", level: 90, icon: Database },
      { name: "Python (Pandas, Matplotlib)", level: 80, icon: Code2 },
    ],
  },
  {
    label: "AI & Machine Learning",
    skills: [
      { name: "ARIMA Forecasting", level: 76, icon: TrendingUp },
      { name: "RFM & K-Means Segmentation", level: 78, icon: PieChartIcon },
      { name: "RAG (Groq + Pinecone)", level: 70, icon: Sigma },
    ],
  },
  {
    label: "Cloud & Deploy",
    skills: [
      { name: "Vercel", level: 74, icon: Cloud },
      { name: "Railway", level: 68, icon: Server },
      { name: "MongoDB Atlas", level: 72, icon: Database },
    ],
  },
];

const projects = [
  {
    index: "01",
    title: "Customer Churn Early-Warning System",
    desc: "End-to-end retention system on 7,043 telecom customers: SQL feature engineering, a Random Forest classifier (89% recall on high-risk churners, 0.86 ROC AUC), and a 4-page Power BI dashboard that surfaces ₹127K in monthly revenue at risk and an exportable retention action list.",
    tags: ["SQL", "Python", "Scikit-learn", "Power BI", "DAX"],
    metric: "89% recall · ₹127K/mo at risk",
    href: "https://github.com/txnzeel/customer-churn-early-warning-system",
  },
  {
    index: "02",
    title: "TR-InsightForge — AI-Powered BI Platform",
    desc: "Full-stack platform letting small business owners upload raw data and get instant revenue forecasts (ARIMA, MAPE ~5%), customer segments (RFM + K-Means), and a RAG business advisor grounded in Groq Llama 3.3-70B.",
    tags: ["React", "FastAPI", "MongoDB", "Pinecone", "Groq"],
    metric: "~5% MAPE · RAG advisor",
    href: "#",
  },
  {
    index: "03",
    title: "Kashmir Tourism Analytics",
    desc: "Power BI deep-dive into district-wise tourist footfall and seasonal patterns across J&K, flagging peak months (May–Sep) and under-visited 'hidden gem' districts for targeted off-season marketing.",
    tags: ["Power BI", "DAX", "Power Query"],
    metric: "Peak season flagged",
    href: "#",
  },
  {
    index: "04",
    title: "Walmart Sales Performance",
    desc: "Interactive Power BI dashboard tracking MoM growth, regional profit margins, and category performance using CALCULATE and SAMEPERIODLASTYEAR with store-level drill-through.",
    tags: ["Power BI", "DAX", "Drill-through"],
    metric: "Store-level drill-through",
    href: "#",
  },
  {
    index: "05",
    title: "SQL Data Exploration",
    desc: "Deep-dives using window functions (RANK, ROW_NUMBER, LAG/LEAD), CTEs, and multi-table joins to solve real retention, lifetime-value, and top-category business questions.",
    tags: ["SQL", "Window Functions", "CTEs"],
    metric: "RANK · LAG/LEAD · CTEs",
    href: "#",
  },
];

const education = [
  { school: "Islamic University of Science & Technology", degree: "Master of Computer Applications", period: "2024 – 2026", score: "7.5" },
  { school: "Islamia College of Science and Commerce", degree: "Bachelor of Computer Applications", period: "2020 – 2023", score: "7.45" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* ---------- Animation Utilities ---------- */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(node);
          }
        });
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);

    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const [ref, inView] = useInView(0.15);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`ta-reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}

function CountUp({ target, duration = 1300, prefix = "", suffix = "", decimals = 0 }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SkillRow({ skill }) {
  const [ref, inView] = useInView(0.3);
  const Icon = skill.icon;
  return (
    <div className="ta-skill-row" ref={ref}>
      <div className="ta-skill-top">
        <span className="ta-skill-name"><Icon size={15} color="#2F6B66" /> {skill.name}</span>
        <span className="ta-skill-pct">
          {inView ? <CountUp target={skill.level} duration={1000} suffix="%" /> : "0%"}
        </span>
      </div>
      <div className="ta-skill-track">
        <div className="ta-skill-fill" style={{ width: inView ? `${skill.level}%` : "0%" }} />
      </div>
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = (el.scrollHeight || document.body.scrollHeight) - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="ta-scroll-progress" style={{ width: `${progress}%` }} />;
}

function CustomTooltip({ active, payload, label, metricLabel }) {
  if (active && payload && payload.length) {
    return (
      <div className="ta-tooltip">
        <span className="ta-tooltip-month">{label}</span>
        <span className="ta-tooltip-value">{payload[0].value}% {metricLabel}</span>
      </div>
    );
  }
  return null;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [chartMetric, setChartMetric] = useState("SLA");
  const [chartData, setChartData] = useState(initialChartData);
  const [seed, setSeed] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const metricConfig = {
    SLA: { label: "SLA Compliance", color: "#2ecc71", lineColor: "#2ecc71" },
    Shrinkage: { label: "Agent Shrinkage", color: "#e67e22", lineColor: "#e67e22" },
    Occupancy: { label: "Agent Occupancy", color: "#3498db", lineColor: "#3498db" },
  };

  const randomizeData = () => {
    setIsShuffling(true);
    const newSeed = Math.random() * 100;
    setSeed(newSeed);
    setChartData(generateMetricData(chartMetric, newSeed));
    setPulseKey((prev) => prev + 1);
    setTimeout(() => setIsShuffling(false), 600);
  };

  const switchMetric = (metric) => {
    setChartMetric(metric);
    const newSeed = Math.random() * 100;
    setSeed(newSeed);
    setChartData(generateMetricData(metric, newSeed));
    setPulseKey((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => {
      if (s) observer.observe(s);
    });
    return () => observer.disconnect();
  }, []);

  const isMobile = useIsMobile();

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSend = () => {
    if (!formState.name || !formState.email || !formState.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  const techStack = [
    "Power BI", "SQL", "Python", "ARIMA", "K-Means", "RAG",
    "DAX", "ETL", "Pandas", "FastAPI", "MongoDB", "Pinecone",
    "Groq", "React", "Vercel", "Railway"
  ];

  const latestValue = chartData.length > 0 ? chartData[chartData.length - 1].v : 0;

  return (
    <div className="ta-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        html, body, #root {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: var(--paper);
          scroll-behavior: smooth;
        }

        .ta-root {
          --paper: #121212;
          --ink: #F3F1E9;
          --ink-soft: #A8A69C;
          --panel: #1E1E1E;
          --line: #333333;
          --amber: #C8842B;
          --amber-soft: rgba(200,132,43,0.12);
          --teal: #4FA89F;
          --navy: #0A0A0A;
          --navy-soft: #888888;
          --navy-line: rgba(255,255,255,0.06);
          --glow: rgba(200,132,43,0.4);
          --shadow: 0 16px 32px rgba(0,0,0,0.6);
          font-family: 'IBM Plex Sans', sans-serif;
          color: var(--ink);
          background: var(--paper);
          width: 100%;
          overflow-x: hidden;
        }

        .ta-root * { box-sizing: border-box; }
        .ta-serif { font-family: 'Fraunces', serif; }
        .ta-mono { font-family: 'IBM Plex Mono', monospace; }

        /* ----- HERO TEXT SHADOW (Readability) ----- */
        .ta-hero .ta-sub,
        .ta-hero .ta-location-row,
        .ta-hero .ta-hi,
        .ta-hero .ta-headline {
          text-shadow: 
            0 0 10px rgba(0, 0, 0, 0.9),
            0 0 20px rgba(0, 0, 0, 0.9),
            0 0 40px rgba(0, 0, 0, 0.8),
            0 2px 4px rgba(0, 0, 0, 0.95);
        }

        .ta-scroll-progress {
          position: fixed; top: 0; left: 0; height: 3px; background: var(--amber);
          z-index: 100; transition: width 0.15s ease-out;
        }

        .ta-reveal {
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, opacity;
        }
        .ta-reveal.in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .ta-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--amber);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .ta-eyebrow::before {
          content: "";
          width: 22px;
          height: 1px;
          background: var(--amber);
          transition: width 0.3s ease;
        }
        .ta-eyebrow.on-dark { color: #E3B06B; }

        /* ----- NAV ----- */
        .ta-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(18,18,18,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--line);
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .ta-nav-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 18px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ta-brand {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.06em;
          display: flex;
          align-items: baseline;
          gap: 8px;
          cursor: pointer;
          background: none;
          border: none;
          color: var(--ink);
          transition: color 0.2s ease;
        }
        .ta-brand span { color: var(--amber); font-size: 11px; letter-spacing: 0.1em; }
        .ta-nav-links { display: flex; gap: 34px; list-style: none; margin: 0; padding: 0; }
        .ta-nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14.5px; color: var(--ink-soft);
          padding: 4px 0; position: relative;
          transition: color 0.2s ease;
        }
        .ta-nav-links button:hover { color: var(--ink); }
        .ta-nav-links button::after {
          content: ""; position: absolute; left: 0; bottom: -3px;
          height: 1.5px; width: 0; background: var(--amber);
          transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ta-nav-links button:hover::after,
        .ta-nav-links button.active::after { width: 100%; }
        .ta-nav-links button.active { color: var(--ink); font-weight: 600; }

        .ta-nav-right { display: flex; align-items: center; gap: 12px; }
        .ta-resume-btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          letter-spacing: 0.04em;
          border: 1px solid var(--ink);
          background: var(--ink);
          color: var(--paper);
          padding: 9px 16px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ta-resume-btn:hover { background: var(--amber); border-color: var(--amber); color: var(--navy); transform: translateY(-3px) scale(1.02); box-shadow: 0 6px 20px var(--glow); }
        .ta-burger { display: none; background: none; border: none; cursor: pointer; color: var(--ink); padding: 4px; }
        .ta-mobile-menu {
          display: none;
          flex-direction: column;
          gap: 2px;
          padding: 6px 28px 22px;
          border-bottom: 1px solid var(--line);
        }
        .ta-mobile-menu.open { display: flex; animation: taSlideDown 0.3s ease; }
        @keyframes taSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ta-mobile-menu button {
          text-align: left; background: none; border: none; cursor: pointer;
          padding: 12px 0; font-size: 15px; color: var(--ink); border-bottom: 1px solid var(--line);
          font-family: 'IBM Plex Sans', sans-serif;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .ta-mobile-menu button:hover { color: var(--amber); padding-left: 8px; }

        /* ----- HERO ----- */
        .ta-hero {
          background: var(--navy);
          color: var(--navy-soft);
          background-image:
            repeating-linear-gradient(0deg, var(--navy-line) 0px, var(--navy-line) 1px, transparent 1px, transparent 64px),
            repeating-linear-gradient(90deg, var(--navy-line) 0px, var(--navy-line) 1px, transparent 1px, transparent 64px);
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          will-change: transform;
        }

        .ta-hero-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 96px 28px 84px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 56px;
          align-items: center;
          position: relative;
          z-index: 1;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          will-change: transform;
          contain: layout style paint;
        }

        .ta-hero-fade {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ta-hero-fade.show { opacity: 1; transform: translateY(0); }
        .ta-hi {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #E3B06B;
          letter-spacing: 0.08em;
          margin: 0 0 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ta-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(46, 204, 113, 0.15);
          border: 1px solid rgba(46, 204, 113, 0.3);
          padding: 3px 10px;
          border-radius: 20px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.05em;
          color: #2ecc71;
          transition: transform 0.3s ease;
        }
        .ta-status-badge:hover { transform: scale(1.05); }
        .ta-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2ecc71;
          animation: taPulseDot 1.4s infinite;
        }
        @keyframes taPulseDot { 0%,100% { opacity:1; transform: scale(1); } 50% { opacity:0.2; transform: scale(0.8); } }

        .ta-headline {
          font-size: clamp(32px, 4.4vw, 50px);
          line-height: 1.14;
          font-weight: 500;
          margin: 0 0 8px;
          color: #F3F1E9;
        }
        .ta-headline em { font-style: italic; color: var(--amber); font-weight: 500; }
        .ta-typing {
          font-size: clamp(18px, 2vw, 26px);
          font-weight: 400;
          color: #E3B06B;
          font-family: 'IBM Plex Mono', monospace;
          margin: 0 0 20px;
          min-height: 44px;
        }
        .ta-sub {
          font-size: 16.5px;
          line-height: 1.65;
          color: var(--navy-soft);
          max-width: 480px;
          margin: 0 0 34px;
        }
        .ta-location-row {
          display: flex; gap: 20px; flex-wrap: wrap;
          font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--navy-soft);
          margin: -8px 0 26px;
        }
        .ta-location-row span { display: inline-flex; align-items: center; gap: 6px; }
        .ta-cta-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }
        .ta-btn-primary {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px; letter-spacing: 0.04em;
          background: var(--amber); color: #1D1204;
          border: 1px solid var(--amber);
          padding: 13px 22px;
          display: inline-flex; align-items: center; gap: 8px;
          cursor: pointer; text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative; overflow: hidden;
        }
        .ta-btn-primary::after {
          content: ""; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg); transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ta-btn-primary:hover::after { left: 130%; }
        .ta-btn-primary:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 8px 25px rgba(200,132,43,0.4); }
        .ta-btn-ghost {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px; letter-spacing: 0.04em;
          background: transparent; color: #F3F1E9;
          border: 1px solid var(--navy-line);
          padding: 13px 22px;
          display: inline-flex; align-items: center; gap: 8px;
          cursor: pointer; text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ta-btn-ghost:hover { border-color: var(--amber); background: rgba(200,132,43,0.12); transform: translateY(-4px) scale(1.02); }
        .ta-social-row { display: flex; gap: 16px; }
        .ta-social-row a {
          width: 38px; height: 38px; border: 1px solid var(--navy-line);
          display: flex; align-items: center; justify-content: center;
          color: var(--navy-soft); transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ta-social-row a:hover { border-color: var(--amber); color: var(--amber); transform: translateY(-5px) rotate(-6deg) scale(1.1); background: rgba(200,132,43,0.05); }

        .ta-panel {
          background: #1B1E2B;
          border: 1px solid var(--navy-line);
          padding: 26px 24px 22px;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease;
          will-change: transform;
        }
        .ta-panel:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 24px 48px rgba(0,0,0,0.5); }
        .ta-panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; }
        .ta-panel-title { font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.1em; color: var(--navy-soft); }
        .ta-live { display: flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #E3B06B; }
        .ta-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #E3B06B; animation: taPulseDot 1.8s infinite; }

        .ta-chart-controls {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
          margin-bottom: 12px;
          align-items: center;
        }
        .ta-metric-btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.04em;
          padding: 4px 10px;
          border: 1px solid var(--navy-line);
          background: transparent;
          color: var(--navy-soft);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 2px;
        }
        .ta-metric-btn:hover { border-color: var(--amber); color: #F3F1E9; transform: translateY(-2px); }
        .ta-metric-btn.active {
          background: var(--amber);
          border-color: var(--amber);
          color: #1D1204;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(200,132,43,0.3);
          transform: scale(1.02);
        }
        .ta-shuffle-btn {
          background: none;
          border: 1px solid var(--navy-line);
          color: var(--navy-soft);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 2px;
          margin-left: auto;
        }
        .ta-shuffle-btn:hover { border-color: var(--amber); color: var(--amber); }
        .ta-shuffle-btn.spin { transform: rotate(360deg); background: rgba(200,132,43,0.1); border-color: var(--amber); }

        .ta-chart-latest {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid var(--navy-line);
          font-family: 'IBM Plex Mono', monospace;
        }
        .ta-chart-latest-label {
          font-size: 10px;
          letter-spacing: 0.06em;
          color: var(--navy-soft);
          text-transform: uppercase;
        }
        .ta-chart-latest-value {
          font-size: 20px;
          font-weight: 700;
          color: #F3F1E9;
          transition: color 0.4s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: inline-block;
        }
        .ta-chart-latest-value.pulse {
          animation: taValuePulse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes taValuePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .ta-chart-caption { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--navy-soft); margin: 4px 0 2px; opacity: 0.7; }
        .ta-tooltip { background: #0E1019; border: 1px solid var(--navy-line); padding: 8px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; display: flex; flex-direction: column; gap: 2px; animation: taFadeIn 0.2s ease; }
        @keyframes taFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .ta-tooltip-month { color: var(--navy-soft); }
        .ta-tooltip-value { color: #E3B06B; }

        .ta-stat-rows { margin-top: 20px; display: flex; flex-direction: column; gap: 12px; }
        .ta-stat-row { display: flex; align-items: baseline; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--navy-line); font-family: 'IBM Plex Mono', monospace; }
        .ta-stat-row:first-child { border-top: none; padding-top: 0; }
        .ta-stat-label { font-size: 12.5px; color: var(--navy-soft); }
        .ta-stat-value { font-size: 16px; color: #F3F1E9; font-weight: 600; }

        .ta-marquee-wrapper {
          background: var(--line);
          padding: 12px 0;
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .ta-marquee-track {
          display: flex;
          gap: 48px;
          animation: taMarquee 25s linear infinite;
          width: max-content;
        }
        .ta-marquee-item {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.04em;
          color: var(--ink-soft);
          white-space: nowrap;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .ta-marquee-item:hover { color: var(--amber); }
        .ta-marquee-item::before {
          content: "◆ ";
          color: var(--amber);
          font-size: 8px;
        }
        @keyframes taMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ----- SECTIONS (PERFORMANCE-OPTIMIZED GLASS) ----- */
        .ta-section { padding: 96px 28px; }
        .ta-section-inner { max-width: 1180px; margin: 0 auto; }
        .ta-section.on-paper { background: transparent !important; padding: 64px 28px; }

        /* 🔥 KEY OPTIMIZATION: Static frosted glass (NO backdrop-filter) */
        .ta-section.on-paper .ta-section-inner {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          padding: 60px 48px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          background: rgba(0, 0, 0, 0.55);
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          will-change: transform;
          contain: layout style paint;
        }

        /* ----- Hero transparent so cubes show through ----- */
        .ta-hero {
          background: transparent !important;
        }
        .ta-hero-inner {
          background: rgba(0, 0, 0, 0.35) !important;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }

        /* ----- Contact transparent so cubes show through ----- */
        .ta-contact {
          background: transparent !important;
        }
        .ta-contact .ta-contact-grid {
          background: rgba(0, 0, 0, 0.55);
          border-radius: 32px;
          padding: 48px 40px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          will-change: transform;
          contain: layout style paint;
        }

        .ta-section.on-paper .ta-services-grid {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .ta-section.on-paper .ta-section-head {
          padding: 0 12px;
        }

        .ta-section-head { max-width: 620px; margin-bottom: 56px; }
        .ta-h2 { font-size: clamp(28px, 3.4vw, 40px); font-weight: 500; margin: 0 0 14px; line-height: 1.16; }
        .ta-h2-sub { font-size: 15.5px; color: var(--ink-soft); line-height: 1.6; margin: 0; }

        .ta-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .ta-service-card { background: var(--panel); padding: 34px 28px; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; z-index: 1; border-left: 3px solid transparent; will-change: transform; }
        .ta-service-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px var(--shadow); border-left-color: var(--amber); background: var(--panel); }
        .ta-service-num { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--amber); margin-bottom: 22px; }
        .ta-service-card h3 { font-family: 'Fraunces', serif; font-size: 21px; font-weight: 500; margin: 0 0 12px; }
        .ta-service-card p { font-size: 14.5px; color: var(--ink-soft); line-height: 1.65; margin: 0; }

        .ta-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px 52px; }
        .ta-skill-group-label { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 22px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
        .ta-skill-row { margin-bottom: 22px; }
        .ta-skill-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .ta-skill-name { display: flex; align-items: center; gap: 9px; font-size: 14.5px; color: var(--ink); }
        .ta-skill-pct { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--ink-soft); }
        .ta-skill-track { height: 5px; background: var(--line); position: relative; overflow: hidden; border-radius: 4px; }
        .ta-skill-fill { height: 100%; background: var(--teal); width: 0; transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); border-radius: 4px; }

        .ta-projects-list { display: flex; flex-direction: column; }
        .ta-project-row {
          display: grid; grid-template-columns: 70px 1.4fr 1fr; gap: 30px;
          padding: 34px 14px; border-top: 1px solid var(--line);
          align-items: start; border-left: 3px solid transparent;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          will-change: transform;
        }
        .ta-project-row:hover {
          background: var(--amber-soft);
          border-left-color: var(--amber);
          transform: translateX(6px) scale(1.01);
          box-shadow: 0 8px 24px var(--shadow);
        }
        .ta-project-row:last-child { border-bottom: 1px solid var(--line); }
        .ta-project-index { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--amber); padding-top: 4px; }
        .ta-project-title { font-family: 'Fraunces', serif; font-size: 21px; font-weight: 500; margin: 0 0 10px; }
        .ta-project-desc { font-size: 14px; color: var(--ink-soft); line-height: 1.65; margin: 0; max-width: 480px; }
        .ta-project-meta { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; }
        .ta-project-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .ta-tag { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.02em; padding: 5px 10px; border: 1px solid var(--line); color: var(--ink-soft); transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .ta-tag:hover { transform: translateY(-4px) scale(1.05); border-color: var(--amber); color: var(--amber); background: var(--amber-soft); }
        .ta-project-metric { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--teal); }
        .ta-project-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13.5px; color: var(--ink); text-decoration: none; border-bottom: 1px solid var(--ink); padding-bottom: 2px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .ta-project-link:hover { color: var(--amber); border-color: var(--amber); gap: 12px; transform: translateX(4px); }
        .ta-projects-note { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--ink-soft); margin-top: 26px; }

        .ta-about-grid { display: grid; grid-template-columns: 1fr 0.8fr; gap: 60px; align-items: start; }
        .ta-about-text p { font-size: 15px; line-height: 1.75; color: var(--ink-soft); margin: 0 0 18px; }
        .ta-about-actions { display: flex; gap: 14px; margin-top: 26px; flex-wrap: wrap; }
        .ta-btn-dark { font-family: 'IBM Plex Mono', monospace; font-size: 13px; background: var(--ink); color: var(--paper); border: 1px solid var(--ink); padding: 13px 22px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .ta-btn-dark:hover { background: var(--amber); border-color: var(--amber); color: #1D1204; transform: translateY(-4px) scale(1.02); box-shadow: 0 8px 25px var(--glow); }
        .ta-btn-outline { font-family: 'IBM Plex Mono', monospace; font-size: 13px; background: transparent; color: var(--ink); border: 1px solid var(--line); padding: 13px 22px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .ta-btn-outline:hover { border-color: var(--amber); color: var(--amber); transform: translateY(-4px) scale(1.02); box-shadow: 0 8px 24px var(--shadow); }
        .ta-photo-frame {
          border: 1px solid var(--line); padding: 14px; background: var(--panel);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
          perspective: 800px;
          will-change: transform;
        }
        .ta-photo-frame:hover {
          transform: translateY(-8px) rotateY(4deg) rotateX(2deg) scale(1.02);
          box-shadow: 0 28px 56px var(--shadow);
        }
        .ta-photo-frame img { width: 100%; display: block; filter: grayscale(15%); border-radius: 2px; }
        .ta-photo-caption { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.05em; color: var(--ink-soft); margin-top: 12px; text-transform: uppercase; }
        .ta-edu-block { margin-top: 26px; }
        .ta-edu-row { display: flex; justify-content: space-between; align-items: baseline; padding: 12px 0; border-top: 1px solid var(--line); font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; gap: 10px; flex-wrap: wrap; }
        .ta-edu-row:first-child { border-top: none; }
        .ta-edu-degree { color: var(--ink); font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; font-weight: 600; }
        .ta-edu-school { color: var(--ink-soft); font-family: 'IBM Plex Sans', sans-serif; font-size: 13px; }
        .ta-edu-score { color: var(--teal); }

        .ta-contact { background: var(--navy); color: var(--navy-soft); }
        .ta-contact-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 60px; }
        .ta-contact .ta-h2 { color: #F3F1E9; }
        .ta-contact-email { display: inline-flex; align-items: center; gap: 10px; font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: #F3F1E9; text-decoration: none; padding-bottom: 4px; border-bottom: 1px solid var(--navy-line); margin: 22px 0 18px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .ta-contact-email:hover { border-color: var(--amber); color: var(--amber); transform: translateX(4px); }
        .ta-contact-meta { display: flex; flex-direction: column; gap: 10px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--navy-soft); margin-bottom: 26px; }
        .ta-contact-meta span { display: inline-flex; align-items: center; gap: 8px; }
        .ta-field { margin-bottom: 18px; }
        .ta-field label { display: block; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--navy-soft); margin-bottom: 8px; }
        .ta-field input, .ta-field textarea {
          width: 100%; background: #1B1E2B; border: 1px solid var(--navy-line); color: #F3F1E9;
          padding: 12px 14px; font-family: 'IBM Plex Sans', sans-serif; font-size: 14.5px;
          outline: none; transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ta-field input:focus, .ta-field textarea:focus { border-color: var(--amber); box-shadow: 0 0 0 4px rgba(200,132,43,0.15); transform: scale(1.01); }
        .ta-field textarea { resize: vertical; min-height: 100px; }
        .ta-send-row { display: flex; align-items: center; gap: 16px; margin-top: 6px; flex-wrap: wrap; }
        .ta-sent-msg { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: #8FCF9F; animation: taFadeIn 0.4s ease; }

        .ta-footer { background: var(--navy); border-top: 1px solid var(--navy-line); padding: 22px 28px 30px; }
        .ta-footer-inner { max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--navy-soft); }
        .ta-back-top { background: none; border: 1px solid var(--navy-line); color: var(--navy-soft); width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .ta-back-top:hover { border-color: var(--amber); color: var(--amber); transform: translateY(-5px) scale(1.1); }

        @media (max-width: 860px) {
          .ta-nav-links { display: none; }
          .ta-nav-right .ta-resume-btn { display: none; }
          .ta-burger { display: block; }
          .ta-hero-inner { grid-template-columns: 1fr; padding: 56px 22px 60px; gap: 40px; }
          .ta-section { padding: 64px 22px; }
          .ta-services-grid { grid-template-columns: 1fr; }
          .ta-skills-grid { grid-template-columns: 1fr; gap: 36px; }
          .ta-project-row { grid-template-columns: 1fr; gap: 14px; padding: 26px 4px; }
          .ta-about-grid { grid-template-columns: 1fr; gap: 34px; }
          .ta-about-grid > div:last-child { order: -1; max-width: 280px; }
          .ta-contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .ta-chart-controls { justify-content: center; }
          .ta-shuffle-btn { margin-left: 0; }
          .ta-section.on-paper .ta-section-inner {
            padding: 32px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ta-hero-fade, .ta-reveal { transition: none; opacity: 1; transform: none; }
          .ta-skill-fill { transition: none; }
          .ta-live-dot, .ta-marquee-track { animation: none; }
          .ta-btn-primary::after { display: none; }
          .ta-chart-latest-value.pulse { animation: none; }
          .ta-shuffle-btn.spin { transform: none; }
        }
      `}</style>

              {/* 3D BACKGROUND - RENDERS BEHIND EVERYTHING */}
      {!isMobile && <ThreeBackground />}

      <ScrollProgress />

      {/* NAV */}
      <nav className="ta-nav">
        <div className="ta-nav-inner">
          <button className="ta-brand" onClick={() => handleNav("#home")}>
            TANZEEL<span>· DATA ANALYST</span>
          </button>
          <ul className="ta-nav-links">
            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className={activeSection === l.href.replace("#", "") ? "active" : ""}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="ta-nav-right">
            <a className="ta-resume-btn" href="cv/CV.pdf" download>
              Get resume <ArrowUpRight size={14} />
            </a>
            <button className="ta-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <div className={`ta-mobile-menu ${menuOpen ? "open" : ""}`}>
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => handleNav(l.href)}>{l.label}</button>
          ))}
          <a href="cv/CV.pdf" download style={{ padding: "12px 0", display: "block", color: "var(--amber)" }}>Get resume</a>
        </div>
      </nav>

      {/* MARQUEE */}
      <div className="ta-marquee-wrapper">
        <div className="ta-marquee-track">
          {techStack.concat(techStack).map((item, i) => (
            <span key={i} className="ta-marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <header className="ta-hero" id="home">
        
        <div className="ta-hero-inner">
          <div>
            <p className={`ta-hi ta-hero-fade ${mounted ? "show" : ""}`}>
              Greetings — let's make data work for you
              <span className="ta-status-badge">
                <span className="ta-status-dot" /> Open to Work
              </span>
            </p>
            <h1 className={`ta-headline ta-serif ta-hero-fade ${mounted ? "show" : ""}`} style={{ transitionDelay: "0.06s" }}>
              I'm <em>{person.name}</em>,<br />
              your <span className="ta-typing">{roles[roleIndex]}</span>
            </h1>
            <p className={`ta-sub ta-hero-fade ${mounted ? "show" : ""}`} style={{ transitionDelay: "0.12s" }}>
              I clean messy datasets, automate ETL pipelines, and build Power BI dashboards that cut reporting time by 30%.
              From root-cause SQL deep-dives to AI-driven forecasting — I turn raw ops data into strategic decisions.
            </p>
            <div className={`ta-location-row ta-hero-fade ${mounted ? "show" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <span><MapPin size={13} /> {person.location}</span>
              <span><Phone size={13} /> {person.phone}</span>
              <span><Activity size={13} /> 9 projects delivered</span>
            </div>
            <div className={`ta-cta-row ta-hero-fade ${mounted ? "show" : ""}`} style={{ transitionDelay: "0.18s" }}>
              <button className="ta-btn-primary" onClick={() => handleNav("#projects")}>
                View my work <ArrowRight size={15} />
              </button>
              <button className="ta-btn-ghost" onClick={() => handleNav("#contact")}>
                Get in touch
              </button>
            </div>
            <div className={`ta-social-row ta-hero-fade ${mounted ? "show" : ""}`} style={{ transitionDelay: "0.24s" }}>
              <a href="https://www.linkedin.com/in/txnzeel/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
              <a href="https://github.com/txnzeel" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
              <a href="https://twitter.com/txnzeelo" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={17} /></a>
              <a href="mailto:tanzeelq@gmail.com" aria-label="Email"><Mail size={17} /></a>
            </div>
          </div>

          {/* OPS COMMAND CENTER */}
          <div className={`ta-hero-fade ${mounted ? "show" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <div className="ta-panel">
              <div className="ta-panel-head">
                <span className="ta-panel-title">⚡ OPS COMMAND CENTER</span>
                <span className="ta-live"><span className="ta-live-dot" /> LIVE</span>
              </div>

              <div className="ta-chart-controls">
                {["SLA", "Shrinkage", "Occupancy"].map((metric) => (
                  <button
                    key={metric}
                    className={`ta-metric-btn ${chartMetric === metric ? "active" : ""}`}
                    onClick={() => switchMetric(metric)}
                  >
                    {metric}
                  </button>
                ))}
                <button
                  className={`ta-shuffle-btn ${isShuffling ? "spin" : ""}`}
                  onClick={randomizeData}
                  aria-label="Randomize Data"
                >
                  <Shuffle size={13} />
                </button>
              </div>

              <div style={{ width: "100%", height: 110 }}>
                <ResponsiveContainer>
                  <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="taFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={metricConfig[chartMetric].color} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={metricConfig[chartMetric].color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="m" tick={{ fill: "#8C8EA0", fontSize: 9, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} tickLine={false} />
                    <Tooltip
                      content={<CustomTooltip metricLabel={metricConfig[chartMetric].label} />}
                      cursor={{ stroke: "rgba(255,255,255,0.15)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={metricConfig[chartMetric].color}
                      strokeWidth={2}
                      fill="url(#taFill)"
                      animationDuration={300}
                      animationEasing="ease-in-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="ta-chart-latest">
                <span className="ta-chart-latest-label">Latest {metricConfig[chartMetric].label}</span>
                <span
                  key={pulseKey}
                  className={`ta-chart-latest-value`}
                  style={{ color: metricConfig[chartMetric].color }}
                >
                  {latestValue}%
                </span>
              </div>
              <p className="ta-chart-caption">Click metric to switch · Shuffle to simulate real-time dips</p>

              <div className="ta-stat-rows">
                {heroStats.map((s) => (
                  <div className="ta-stat-row" key={s.label}>
                    <span className="ta-stat-label">{s.label}</span>
                    <span className="ta-stat-value">
                      <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section className="ta-section on-paper" id="about">
        <div className="ta-section-inner">
          <Reveal className="ta-section-head">
            <p className="ta-eyebrow">01 — WHAT I DO</p>
            <h2 className="ta-h2 ta-serif">Less guessing, more querying.</h2>
            <p className="ta-h2-sub">
              Three things I get pulled into most: keeping SLA reporting honest and fast, forecasting
              and segmenting what's coming next, and wiring AI into the answers people actually need.
            </p>
          </Reveal>
          <div className="ta-services-grid">
            <Reveal className="ta-service-card" delay={0}>
              <div className="ta-service-num ta-mono">01</div>
              <h3 className="ta-serif">SLA &amp; Ops Reporting</h3>
              <p>Automated a Python + Excel macro ETL pipeline that cut reporting time by 30%, feeding daily Power BI dashboards on SLA, shrinkage, and agent occupancy.</p>
            </Reveal>
            <Reveal className="ta-service-card" delay={0.1}>
              <div className="ta-service-num ta-mono">02</div>
              <h3 className="ta-serif">Forecasting &amp; Segmentation</h3>
              <p>ARIMA time-series forecasting and RFM + K-Means customer segmentation, with rule-based fallbacks so small or thin datasets never break the pipeline.</p>
            </Reveal>
            <Reveal className="ta-service-card" delay={0.2}>
              <div className="ta-service-num ta-mono">03</div>
              <h3 className="ta-serif">AI-Powered BI &amp; RAG</h3>
              <p>A retrieval-augmented business advisor — KPIs turned into vector embeddings and queried in plain English through Groq's Llama 3.3-70B.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="ta-section on-paper" id="skills" style={{ background: "var(--paper)" }}>
        <div className="ta-section-inner">
          <Reveal className="ta-section-head">
            <p className="ta-eyebrow">02 — TOOLKIT</p>
            <h2 className="ta-h2 ta-serif">Toolkit, measured.</h2>
            <p className="ta-h2-sub">The tools I reach for most, and roughly how deep that goes — rated against real project use, not a self-assessment quiz.</p>
          </Reveal>
          <div className="ta-skills-grid">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 0.08}>
                <div className="ta-skill-group-label">{group.label}</div>
                {group.skills.map((s) => (
                  <SkillRow skill={s} key={s.name} />
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="ta-section on-paper" id="projects">
        <div className="ta-section-inner">
          <Reveal className="ta-section-head">
            <p className="ta-eyebrow">03 — SELECTED WORK</p>
            <h2 className="ta-h2 ta-serif">Case studies, not just charts.</h2>
            <p className="ta-h2-sub">A few projects that show how I get from a raw dataset to a decision someone can actually act on.</p>
          </Reveal>
          <div className="ta-projects-list">
            {projects.map((p, i) => (
              <Reveal className="ta-project-row" delay={i * 0.06} key={p.index}>
                <div className="ta-project-index">{p.index}</div>
                <div>
                  <h3 className="ta-project-title">{p.title}</h3>
                  <p className="ta-project-desc">{p.desc}</p>
                </div>
                <div className="ta-project-meta">
                  <div className="ta-project-tags">
                    {p.tags.map((t) => <span className="ta-tag" key={t}>{t}</span>)}
                  </div>
                  <span className="ta-project-metric">{p.metric}</span>
                  <a className="ta-project-link" href={p.href} target="_blank" rel="noreferrer">
                    View case study <ArrowUpRight size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="ta-projects-note">GitHub &amp; Power BI dashboards available on request · live demo available for TR-InsightForge.</p>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="ta-section on-paper" id="about" style={{ background: "var(--paper)" }}>
        <div className="ta-section-inner">
          <Reveal className="ta-section-head">
            <p className="ta-eyebrow">04 — ABOUT</p>
            <h2 className="ta-h2 ta-serif">From web analytics to operations analytics.</h2>
          </Reveal>
          <div className="ta-about-grid">
            <Reveal className="ta-about-text">
              <p>
                I'm a data analyst based in {person.location}, currently working at Everise (via
                Tibil Solutions), where I track real-time SLA, shrinkage, and agent occupancy and
                publish daily Power BI dashboards. Automating our ETL pipeline with Python and Excel macros
                cut reporting time by 30%, and most weeks I'm inside SQL — window functions and CTEs —
                chasing down the root cause behind a metric dip.
              </p>
              <p>
                Before this, I managed web analytics at Oncabs, tracking user behavior through Google
                Analytics and building weekly dashboards for the marketing team.
              </p>
              <p>
                I built <strong>TR-InsightForge</strong>, a BI platform combining ARIMA forecasting,
                RFM/K-Means segmentation, and a RAG pipeline grounded in Groq Llama 3.3-70B —
                giving small business owners enterprise-grade analytics without a data team.
              </p>

              <div className="ta-edu-block">
                {education.map((e) => (
                  <div className="ta-edu-row" key={e.school}>
                    <div>
                      <div className="ta-edu-degree">{e.degree}</div>
                      <div className="ta-edu-school">{e.school} · {e.period}</div>
                    </div>
                    <span className="ta-edu-score">{e.score}</span>
                  </div>
                ))}
              </div>

              <div className="ta-about-actions">
                <a className="ta-btn-dark" href="mailto:tanzeelq@gmail.com">Hire me <ArrowRight size={15} /></a>
                <a className="ta-btn-outline" href="cv/CV.pdf" download>Download CV</a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="ta-photo-frame">
                <img src="/pic.jpeg" alt="Tanzeel Aftab" />
              </div>
              <p className="ta-photo-caption">Exhibit A — analyst</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="ta-section ta-contact" id="contact">
        <div className="ta-section-inner">
          <div className="ta-contact-grid">
            <Reveal>
              <p className="ta-eyebrow on-dark">05 — GET IN TOUCH</p>
              <h2 className="ta-h2 ta-serif">Let's talk data.</h2>
              <p className="ta-h2-sub" style={{ color: "var(--navy-soft)" }}>
                Have a dataset that needs a story, or a dashboard that needs building? I'm a click away.
              </p>
              <a className="ta-contact-email" href="mailto:tanzeelq@gmail.com">
                <Mail size={16} /> {person.email}
              </a>
              <div className="ta-contact-meta">
                <span><MapPin size={13} /> {person.location}</span>
                <span><Phone size={13} /> {person.phone}</span>
                <span><Sparkles size={13} /> Available for freelance or full-time</span>
              </div>
              <div className="ta-social-row">
                <a href="https://www.linkedin.com/in/txnzeel/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
                <a href="https://github.com/txnzeel" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
                <a href="https://twitter.com/txnzeelo" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={17} /></a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="ta-field">
                <label>Full name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="ta-field">
                <label>Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="jane@company.com"
                />
              </div>
              <div className="ta-field">
                <label>Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about the data problem you're trying to solve."
                />
              </div>
              <div className="ta-send-row">
                <button className="ta-btn-primary" onClick={handleSend}>
                  Send message <ArrowRight size={15} />
                </button>
                {sent && <span className="ta-sent-msg">Thanks — message noted. I'll reply by email shortly.</span>}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ta-footer">
        <div className="ta-footer-inner">
          <span>© 2026 {person.name} — built with React</span>
          <button className="ta-back-top" onClick={() => handleNav("#home")} aria-label="Back to top">
            <ArrowUpRight size={16} style={{ transform: "rotate(-45deg)" }} />
          </button>
        </div>
      </footer>
    </div>
  );
}