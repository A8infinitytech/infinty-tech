// Editable content: tools, social links (add your URLs) and testimonials (add real ones).
import {
  Braces, Component, Wind, Server, Terminal, Sparkles,
  Database, Cloud, Layers, Code, Bot, GitBranch,
} from "lucide-react";

// Brand icons from react-icons (Simple Icons — official brand logos)
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

// Edit to match your real stack. (Vercel is the added 9th tool.)
export const tools = [
  { name: "Next.js", icon: Layers, desc: "Modern web applications" },
  { name: "React", icon: Component, desc: "Interactive user interfaces" },
  { name: "TypeScript", icon: Braces, desc: "Type-safe development" },
  { name: "Tailwind CSS", icon: Wind, desc: "Modern UI styling" },
  { name: "Node.js", icon: Server, desc: "Backend development" },
  { name: "Python", icon: Terminal, desc: "AI & automation" },
  { name: "FastAPI", icon: Code, desc: "High-performance APIs" },
  { name: "LLM APIs", icon: Sparkles, desc: "AI-powered solutions" },
  { name: "AI Agents", icon: Bot, desc: "Intelligent automation" },
  { name: "PostgreSQL", icon: Database, desc: "Reliable data storage" },
  { name: "Neon", icon: Database, desc: "Serverless PostgreSQL" },
  { name: "Git & GitHub", icon: GitBranch, desc: "Version control" },
  { name: "Vercel", icon: Cloud, desc: "Hosting & deployment" },
];

// Paste your real profile URLs in href. Empty href renders a non-clickable icon.
export const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590980911003",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/its_infinity_tech/",
    icon: FaInstagram,
  },
  {
    name: "GitHub",
    href: "https://github.com/A8infinitytech",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/infinity-tech/",
    icon: FaLinkedinIn,
  },
];

// Add ONLY genuine testimonials: { quote, name, role }
export const testimonials: { quote: string; name: string; role: string }[] = [];