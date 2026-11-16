// Main site content: email, slogan, navigation, services, process, FAQ.
import { 
  Workflow, 
  BrainCircuit, 
  Globe, 
  ShoppingCart, 
  AppWindow , 
  Bot, 
  Code,
  Database,
  Layout,
  Smartphone
} from "lucide-react"; 

export const SLOGAN = "Build Smarter. Move Faster.";
export const EMAIL = "a8infinitytech@gmail.com";
export const PHONE = "+92 318 1935228";
export const PHONE_HREF = "tel:+923181935228";
export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
export const services = [
  {
    icon: Workflow,
    title: "AI Automation",
    desc: "Automate repetitive business tasks, streamline workflows, and boost productivity with intelligent automation.",
  },
  {
    icon: BrainCircuit,
    title: "AI Development",
    desc: "Build intelligent AI solutions, custom AI systems, and powerful applications tailored to business needs.",
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "Create modern, responsive, and professional websites that strengthen your online presence.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    desc: "Launch powerful online stores with product management, shopping carts, and seamless shopping experiences.",
  },
  {
    icon: AppWindow,
    title: "AI-Powered Web Apps",
    desc: "Develop smart web applications combining modern technologies with advanced AI capabilities.",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    desc: "Build intelligent AI chatbots that answer customer questions and automate customer support.",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    desc: "Develop custom software solutions designed to solve business challenges and improve efficiency.",
  },
  {
    icon: Database,
    title: "API Integration",
    desc: "Connect APIs, third-party services, and business tools to create seamless digital workflows.",
  },
  {
    icon: Layout,
    title: "Business Websites",
    desc: "Design and develop professional business websites that showcase your brand and attract customers.",
  },
  {
    icon: Smartphone,
    title: "Responsive Web Design",
    desc: "Create beautiful, mobile-friendly interfaces that deliver exceptional experiences across all devices.",
  },
];
export const process = [
  { t: "Discover", d: "We learn your business, goals, and constraints before proposing anything." },
  {
    t: "Design",
    d: "We define scope, architecture, and the user experience, and agree on it with you.",
  },
  { t: "Build", d: "We develop in clear iterations so you can see and react to real progress." },
  {
    t: "Launch & Improve",
    d: "We deploy, test in the real world, and keep refining the solution.",
  },
];
export const why = [
  { t: "Business-first thinking", d: "Technology choices follow your goals, not trends." },
  { t: "Engineering discipline", d: "Typed, tested, maintainable code you can build on." },
  { t: "Clear communication", d: "Plain-language updates and honest scoping." },
  { t: "AI that is practical", d: "Solutions designed to be useful, reliable, and controllable." },
];
// Edit to match your real stack.
export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "FastAPI",
  "OpenAI / LLM APIs",
  "AI Agents",
  "AI Automation",
  "PostgreSQL",
  "Neon Database",
  "REST APIs",
  "Git & GitHub",
];
export const faqs = [
  {
    q: "What services does Infinity Tech provide?",
    a: "We provide AI automation, AI development, web development, e-commerce development, AI chatbots, and AI-powered web applications.",
  },
  {
    q: "How can I start a project with Infinity Tech?",
    a: "Simply contact us through our website or social media. Share your idea, business requirements, and goals, and we will discuss the best solution for your project.",
  },
  {
    q: "Can Infinity Tech build custom solutions for my business?",
    a: "Absolutely. We develop customized websites, AI solutions, automation workflows, and software tailored to your business needs.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Yes. We help startups, entrepreneurs, and small businesses build digital solutions that support their growth and improve efficiency.",
  },
  {
    q: "Can you integrate AI into my existing website or business?",
    a: "Yes. We can integrate AI features, intelligent chatbots, APIs, and automation into existing websites and business workflows.",
  },
  {
    q: "Will my website be mobile-friendly?",
    a: "Yes. We build responsive websites that provide smooth and consistent experiences across mobile phones, tablets, and desktops.",
  },
  {
    q: "How long does a project take?",
    a: "Project timelines depend on complexity, features, and requirements. We discuss the estimated timeline before starting development.",
  },
  {
    q: "How can I get a quote for my project?",
    a: "Contact us with your project details and requirements. We will review your idea and discuss the estimated cost and development approach.",
  },
];