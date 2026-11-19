// lib/data.ts
import { createElement } from "react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  Activity,
  AlertTriangle,
  AppWindow,
  ArrowRight,
  ArrowUp,
  Bot,
  BrainCircuit,
  Braces,
  Check,
  CheckCircle2,
  Cloud,
  Code,
  Component,
  Database,
  Eye,
  FolderKanban,
  GitBranch,
  Globe,
  HelpCircle,
  Layers,
  Layout,
  Lightbulb,
  Loader2,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  MessageSquareQuote,
  MessagesSquare,
  Moon,
  Phone,
  Plus,
  Quote,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Sun,
  Target,
  Terminal,
  Wind,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export type AppIcon = LucideIcon | IconType;

export const iconMap: Record<string, AppIcon> = {
  Activity,
  AlertTriangle,
  AppWindow,
  ArrowRight,
  ArrowUp,
  Bot,
  BrainCircuit,
  Braces,
  Check,
  CheckCircle2,
  Cloud,
  Code,
  Component,
  Database,
  Eye,
  FolderKanban,
  GitBranch,
  Globe,
  HelpCircle,
  Layers,
  Layout,
  Lightbulb,
  Loader2,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  MessageSquareQuote,
  MessagesSquare,
  Moon,
  Phone,
  Plus,
  Quote,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Sun,
  Target,
  Terminal,
  Wind,
  Workflow,
  Wrench,
  X,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
};

export const iconsData = Object.keys(iconMap);

export function getIcon(name: string): AppIcon {
  return iconMap[name] || HelpCircle;
}

export function iconElement(
  name: string,
  props: { className?: string; "aria-hidden"?: boolean | "true" | "false" } = {}
) {
  return createElement(getIcon(name), props);
}

/* ─────────────────────────── Shared Types ─────────────────────────── */
/* ─────────────────────────── Static Error / Loading / 404 ─────────────────────────── */

export type ErrorContent = {
  heading: string;
  description: string;
  tryAgain: string;
  goHome: string;
};

export type LoadingContent = {
  statusLabel: string;
  srOnly: string;
};

export type NotFoundContent = {
  code: string;
  heading: string;
  description: string;
  button: string;
};

export type ConstantsContent = {
  slogan: string;
  email: string;
  phone: string;
  phoneHref: string;
};

export type NavItem = { href: string; label: string };
export type TextPair = { t: string; d: string };
export type IconTextPair = { i: string; t: string; d: string };
export type ToolItem = { name: string; icon: string; desc: string };
export type SocialItem = { name: string; href: string; icon: string };
export type Testimonial = { quote: string; name: string; role: string };
export type FaqItem = { q: string; a: string };
export type ProjectItem = { title: string; category: string; description: string };

export type ChatbotContent = {
  title: string;
  subtitle: string;
  ariaLabel: string;
  closeLabel: string;
  openLabel: string;
  welcome: string;
  welcomeWithSlogan: string;
  suggestions: string[];
  thinking: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendLabel: string;
  fallbackDefaults: { email: string; phone: string };
  fallbackTemplates: Record<string, string>;
};

export type DashboardContent = {
  loadingLabel: string;
  consoleLabel: string;
  servicesLabel: string;
  tablistLabel: string;
  quoteLabel: string;
  performanceLabel: string;
  liveLabel: string;
  autoLabel: string;
  processLabel: string;
  completedLabel: string;
  inProgressLabel: string;
  defaultSteps: string[];
  workflowSteps: Record<string, string[]>;
  skeletonRows: number[];
};

export type ServicesPreviewContent = {
  previewLimit: number;
  button: string;
};

export type ServiceCardContent = {
  quoteLabel: string;
  fallbackIconName: string;
  contactBaseUrl: string;
};

export type SiteContent = {
   
  constants: ConstantsContent;
  site: {
    brand: string;
    slogan: string;
    email: string;
    phone: string;
    phoneHref: string;
    skipLink: string;
    metadata: Metadata;
  };
  images: {
    logo: { src: string; darkSrc: string; alt: string };
    favicon: string;
  };
  iconMeta: {
    fallbackName: string;
    whatsapp: { viewBox: string; path: string };
  };
  navigation: NavItem[];
  scrollUtils: { backToTopLabel: string };
  themeToggle: { ariaLabel: string };
  navbar: {
    ariaLabel: string;
    homeAriaLabel: string;
    ctaLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
  };
  hero: {
    headingLead: string;
    headingAccent: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  heroAsk: {
    label: string;
    placeholder: string;
    submitLabel: string;
    suggestions: string[];
  };
  process: TextPair[];
  why: TextPair[];
  stack: string[];
  home: {
    hero: {
      headingLead: string;
      headingAccent: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
    };
    sections: Record<string, Record<string, string>>;
    processNumberPrefix: string;
  };
  about: {
    metadata: Metadata;
    intro: { eyebrow: string; desc: string };
    blocks: IconTextPair[];
    values: IconTextPair[];
    sections: Record<string, Record<string, string>>;
    loadingCapabilities: string;
    noServices: string;
    processNumberPrefix: string;
  };
  projects: {
    metadata: Metadata;
    heading: { eyebrow: string; title: string };
    emptyState: { heading: string; description: string };
    projects: ProjectItem[];
  };
  contact: {
    metadata: Metadata;
    loadingContactInfo: string;
    loadingForm: string;
    heading: { eyebrow: string; title: string; desc: string };
    emailLabel: string;
    whatsappLabel: string;
    socialHeading: string;
    fallbacks: { phone: string; email: string };
    whatsappBaseUrl: string;
  };
  contactForm: {
    labels: { name: string; email: string; service: string; details: string };
    otherOption: string;
    sending: string;
    sendMessage: string;
    sent: string;
    error: string;
  };
  cta: { heading: string; description: string; button: string };
  servicesPage: {
    heading: { eyebrow: string; title: string; desc: string };
    loading: string;
    noServices: string;
  };
  servicesPreview: ServicesPreviewContent;
  serviceCard: ServiceCardContent;
  dashboard: DashboardContent;
  tools: ToolItem[];
  socials: SocialItem[];
  socialLinks: { ariaLabel: string; comingSoonSuffix: string };
  testimonials: Testimonial[];
  testimonialsPlaceholder: { heading: string; description: string };
  faq: FaqItem[];
  footer: {
    headings: { pages: string; contact: string; newsletter: string };
    newsletterDescription: string;
    emailPlaceholder: string;
    waitLabel: string;
    subscribeLabel: string;
    success: string;
    error: string;
    copyrightSymbol: string;
    copyrightText: string;
  };
  chatbot: ChatbotContent;
  loading: { statusLabel: string; srOnly: string };
  error: { heading: string; description: string; tryAgain: string; goHome: string };
  notFound: { code: string; heading: string; description: string; button: string };
  
};
