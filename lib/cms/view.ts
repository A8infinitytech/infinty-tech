// lib/cms/view.ts
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { GET as getAboutBlocks } from "@/app/api/cms/about-blocks/route";
import { GET as getChatbotConfig } from "@/app/api/cms/chatbot-config/route";
import { GET as getChatbotTemplates } from "@/app/api/cms/chatbot-templates/route";
import { GET as getContactFormLabels } from "@/app/api/cms/contact-form-labels/route";
import { GET as getContactInfo } from "@/app/api/cms/contact-info/route";
import { GET as getDashboardConfig } from "@/app/api/cms/dashboard-config/route";
import { GET as getDashboardSteps } from "@/app/api/cms/dashboard-steps/route";
import { GET as getFaqs } from "@/app/api/cms/faqs/route";
import { GET as getFooterConfig } from "@/app/api/cms/footer-config/route";
import { GET as getHeroAsk } from "@/app/api/cms/hero-ask/route";
import { GET as getHeroSections } from "@/app/api/cms/hero-sections/route";
import { GET as getIconMeta } from "@/app/api/cms/icon-meta/route";
import { GET as getMediaAssets } from "@/app/api/cms/media-assets/route";
import { GET as getNavigationItems } from "@/app/api/cms/navigation-items/route";
import { GET as getPageSeo } from "@/app/api/cms/page-seo/route";
import { GET as getProcessSteps } from "@/app/api/cms/process-steps/route";
import { GET as getProjects } from "@/app/api/cms/projects/route";
import { GET as getSectionHeadings } from "@/app/api/cms/section-headings/route";
import { GET as getSeoSettings } from "@/app/api/cms/seo-settings/route";
import { GET as getServiceSettings } from "@/app/api/cms/service-settings/route";
import { GET as getSiteSettings } from "@/app/api/cms/site-settings/route";
import { GET as getSocialLinks } from "@/app/api/cms/social-links/route";
import { GET as getStateMessages } from "@/app/api/cms/state-messages/route";
import { GET as getSuggestedPrompts } from "@/app/api/cms/suggested-prompts/route";
import { GET as getTestimonials } from "@/app/api/cms/testimonials/route";
import { GET as getTools } from "@/app/api/cms/tools/route";
import { GET as getUiLabels } from "@/app/api/cms/ui-labels/route";
import { GET as getWhyCards } from "@/app/api/cms/why-cards/route";
import type { Metadata } from "next";
import type { SiteContent } from "@/lib/data";

type Row = Record<string, unknown>;
type Loader = (request: Request) => Promise<Response>;

function text(row: Row | undefined, field: string, fallback = ""): string {
  const value = row?.[field];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function number(row: Row | undefined, field: string, fallback: number): number {
  const value = Number(row?.[field]);
  return Number.isFinite(value) ? value : fallback;
}

function isRow(value: unknown): value is Row {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stepLabels(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return [value];
  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      const labels = parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
      if (labels.length > 0) return labels;
    }
  } catch {
    return [value];
  }
  return [value];
}

async function load(loader: Loader): Promise<Row[]> {
  try {
    const response = await loader(new Request("http://localhost/api/cms"));
    const payload = (await response.json()) as { ok?: boolean; data?: unknown };
    if (!response.ok || !payload.ok || payload.data === undefined || payload.data === null) return [];
    return Array.isArray(payload.data) ? payload.data.filter(isRow) : isRow(payload.data) ? [payload.data] : [];
  } catch {
    return [];
  }
}

function byKey(rows: Row[], field: string): Map<string, Row> {
  return new Map(rows.map((row) => [text(row, field), row]));
}

function metadata(row: Row | undefined, fallback: Metadata = {}): Metadata {
  if (!row) return fallback;
  return {
    ...fallback,
    title: text(row, "title") || fallback.title,
    description: text(row, "description") || fallback.description,
  };
}

function sectionMap(rows: Row[], page: string): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  for (const row of rows.filter((item) => text(item, "page_key") === page)) {
    result[text(row, "section_key")] = {
      eyebrow: text(row, "eyebrow"),
      title: text(row, "title"),
      desc: text(row, "description"),
      description: text(row, "description"),
      button: text(row, "button_label"),
      buttonHref: text(row, "button_href"),
      loading: text(row, "loading_label"),
      emptyTitle: text(row, "empty_title"),
      emptyDescription: text(row, "empty_description"),
    };
  }
  return result;
}

function skeletonRows(value: number): number[] {
  const count = Math.max(1, Math.min(12, value));
  return Array.from({ length: count }, (_, index) => index + 1);
}

export async function getNormalizedSiteContent(): Promise<Partial<SiteContent> | null> {
  "use cache";

  cacheLife("default");
  cacheTag("site-content");

  const [
    siteSettings,
    seoSettings,
    pageSeo,
    mediaAssets,
    navigationItems,
    uiLabels,
    heroSections,
    sectionHeadings,
    heroAsk,
    suggestedPrompts,
    aboutBlocks,
    processSteps,
    whyCards,
    serviceSettings,
    tools,
    projects,
    testimonials,
    faqs,
    socialLinks,
    contactInfo,
    contactFormLabels,
    chatbotConfig,
    chatbotTemplates,
    dashboardConfig,
    dashboardSteps,
    stateMessages,
    footerConfig,
    iconMeta,
  ] = await Promise.all([
    load(getSiteSettings),
    load(getSeoSettings),
    load(getPageSeo),
    load(getMediaAssets),
    load(getNavigationItems),
    load(getUiLabels),
    load(getHeroSections),
    load(getSectionHeadings),
    load(getHeroAsk),
    load(getSuggestedPrompts),
    load(getAboutBlocks),
    load(getProcessSteps),
    load(getWhyCards),
    load(getServiceSettings),
    load(getTools),
    load(getProjects),
    load(getTestimonials),
    load(getFaqs),
    load(getSocialLinks),
    load(getContactInfo),
    load(getContactFormLabels),
    load(getChatbotConfig),
    load(getChatbotTemplates),
    load(getDashboardConfig),
    load(getDashboardSteps),
    load(getStateMessages),
    load(getFooterConfig),
    load(getIconMeta),
  ]);

  const site = siteSettings[0];
  if (!site) return null;

  const seo = seoSettings[0];
  const hero = heroSections[0];
  const ask = heroAsk[0];
  const service = serviceSettings[0];
  const contact = contactInfo[0];
  const form = contactFormLabels[0];
  const bot = chatbotConfig[0];
  const dashboard = dashboardConfig[0];
  const footer = footerConfig[0];
  const icon = iconMeta[0];

  const media = byKey(mediaAssets, "asset_key");
  const labels = byKey(uiLabels, "label_key");
  const seoPages = byKey(pageSeo, "page_key");
  const messages = byKey(stateMessages, "message_key");
  const templates = byKey(chatbotTemplates, "template_key");
  const homeSections = sectionMap(sectionHeadings, "home");
  const aboutSections = sectionMap(sectionHeadings, "about");
  const servicesSection = sectionMap(sectionHeadings, "services").services ?? {};
  const projectsSection = sectionMap(sectionHeadings, "projects").projects ?? {};
  const cta = homeSections.cta ?? {};
  const logo = media.get("logo");
  const favicon = media.get("favicon");
  const whatsapp = media.get("whatsapp");

  const nav = navigationItems
    .filter((row) => text(row, "nav_group", "main") === "main")
    .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
    .map((row) => ({ href: text(row, "href"), label: text(row, "label") }));

  const prompts = (scope: string) =>
    suggestedPrompts
      .filter((row) => text(row, "scope", "hero_ask") === scope)
      .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
      .map((row) => text(row, "label"));

  const aboutList = (kind: string) =>
    aboutBlocks
      .filter((row) => text(row, "kind", "block") === kind)
      .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
      .map((row) => ({ i: text(row, "icon"), t: text(row, "title"), d: text(row, "description") }));

  const process = processSteps
    .filter((row) => text(row, "page_key", "home") === "home")
    .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
    .map((row) => ({ t: text(row, "title"), d: text(row, "description") }));

  const why = whyCards
    .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
    .map((row) => ({ t: text(row, "title"), d: text(row, "description") }));

  const sortedTools = [...tools].sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0));
  const toolItems = sortedTools
    .filter((row) => number(row, "sort_order", 0) < 100)
    .map((row) => ({ name: text(row, "name"), icon: text(row, "icon"), desc: text(row, "description") }));
  const stack = sortedTools
    .filter((row) => number(row, "sort_order", 0) >= 100)
    .map((row) => text(row, "name"));

  const defaultSteps = dashboardSteps
    .filter((row) => text(row, "scope", "workflow") === "default")
    .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
    .flatMap((row) => stepLabels(text(row, "label")));

  const workflowSteps: Record<string, string[]> = {};
  for (const row of dashboardSteps.filter((item) => text(item, "scope", "workflow") === "workflow")) {
    const serviceName = text(row, "service_name");
    workflowSteps[serviceName] = [...(workflowSteps[serviceName] ?? []), ...stepLabels(text(row, "label"))];
  }

  const loadingMessage = messages.get("loading");
  const errorMessage = messages.get("error");
  const notFoundMessage = messages.get("notFound");

  return {
    constants: {
      slogan: text(site, "slogan"),
      email: text(site, "email"),
      phone: text(site, "phone"),
      phoneHref: text(site, "phone_href"),
    },
    site: {
      brand: text(site, "brand"),
      slogan: text(site, "slogan"),
      email: text(site, "email"),
      phone: text(site, "phone"),
      phoneHref: text(site, "phone_href"),
      skipLink: text(site, "skip_link"),
      metadata: {
        icons: text(seo, "icons"),
        title: { default: text(seo, "title_default"), template: text(seo, "title_template") },
        description: text(seo, "description"),
        openGraph: {
          type: text(seo, "og_type"),
          title: text(seo, "og_title"),
          description: text(seo, "og_description"),
        },
      } as Metadata,
    },
    images: {
      logo: { src: text(logo, "src"), darkSrc: text(logo, "dark_src"), alt: text(logo, "alt") },
      favicon: text(favicon, "src"),
    },
    iconMeta: {
      fallbackName: text(icon, "fallback_name"),
      whatsapp: { viewBox: text(whatsapp, "view_box"), path: text(whatsapp, "path") },
    },
    navigation: nav,
    scrollUtils: { backToTopLabel: text(labels.get("scrollUtils.backToTopLabel"), "value") },
    themeToggle: { ariaLabel: text(labels.get("themeToggle.ariaLabel"), "value") },
    navbar: {
      ariaLabel: text(labels.get("navbar.ariaLabel"), "value"),
      homeAriaLabel: text(labels.get("navbar.homeAriaLabel"), "value"),
      ctaLabel: text(labels.get("navbar.ctaLabel"), "value"),
      openMenuLabel: text(labels.get("navbar.openMenuLabel"), "value"),
      closeMenuLabel: text(labels.get("navbar.closeMenuLabel"), "value"),
    },
    hero: {
      headingLead: text(hero, "heading_lead"),
      headingAccent: text(hero, "heading_accent"),
      description: text(hero, "description"),
      primaryCta: text(hero, "primary_cta_label"),
      secondaryCta: text(hero, "secondary_cta_label"),
    },
    heroAsk: {
      label: text(ask, "label"),
      placeholder: text(ask, "placeholder"),
      submitLabel: text(ask, "submit_label"),
      suggestions: prompts("hero_ask"),
    },
    process,
    why,
    stack,
    home: {
      hero: {
        headingLead: text(hero, "heading_lead"),
        headingAccent: text(hero, "heading_accent"),
        description: text(hero, "description"),
        primaryCta: text(hero, "primary_cta_label"),
        secondaryCta: text(hero, "secondary_cta_label"),
      },
      sections: homeSections,
      processNumberPrefix: text(site, "process_number_prefix", "0"),
    },
    about: {
      metadata: metadata(seoPages.get("about")),
      intro: {
        eyebrow: text(aboutSections.intro, "eyebrow"),
        desc: text(aboutSections.intro, "desc"),
      },
      blocks: aboutList("block"),
      values: aboutList("value"),
      sections: aboutSections,
      loadingCapabilities: text(aboutSections.capabilities, "loading"),
      noServices: text(aboutSections.capabilities, "emptyTitle"),
      processNumberPrefix: text(site, "process_number_prefix", "0"),
    },
    projects: {
      metadata: metadata(seoPages.get("projects")),
      heading: {
        eyebrow: text(projectsSection, "eyebrow"),
        title: text(projectsSection, "title"),
      },
      emptyState: {
        heading: text(projectsSection, "emptyTitle"),
        description: text(projectsSection, "emptyDescription"),
      },
      projects: projects
        .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
        .map((row) => ({
          title: text(row, "title"),
          category: text(row, "category"),
          description: text(row, "description"),
        })),
    },
    contact: {
      metadata: metadata(seoPages.get("contact")),
      loadingContactInfo: "",
      loadingForm: "",
      heading: {
        eyebrow: text(contact, "heading_eyebrow"),
        title: text(contact, "heading_title"),
        desc: text(contact, "heading_description"),
      },
      emailLabel: "",
      whatsappLabel: "",
      socialHeading: "",
      fallbacks: { phone: text(contact, "fallback_phone"), email: text(contact, "fallback_email") },
      whatsappBaseUrl: text(contact, "whatsapp_base_url"),
    },
    contactForm: {
      labels: {
        name: text(form, "name_label"),
        email: text(form, "email_label"),
        service: text(form, "service_label"),
        details: text(form, "details_label"),
      },
      otherOption: text(form, "other_option"),
      sending: text(form, "sending_label"),
      sendMessage: text(form, "submit_label"),
      sent: text(form, "success_message"),
      error: text(form, "error_message"),
    },
    cta: {
      heading: text(cta, "title"),
      description: text(cta, "desc"),
      button: text(cta, "button"),
    },
    servicesPage: {
      heading: {
        eyebrow: text(servicesSection, "eyebrow"),
        title: text(servicesSection, "title"),
        desc: text(servicesSection, "desc"),
      },
      loading: text(servicesSection, "loading"),
      noServices: text(servicesSection, "emptyTitle"),
    },
    servicesPreview: {
      previewLimit: number(service, "preview_limit", 5),
      button: text(service, "explore_button_label"),
    },
    serviceCard: {
      quoteLabel: text(service, "quote_label"),
      fallbackIconName: text(service, "fallback_icon_name"),
      contactBaseUrl: text(service, "contact_base_url"),
    },
    dashboard: {
      loadingLabel: text(dashboard, "loading_label"),
      consoleLabel: text(dashboard, "console_label"),
      servicesLabel: text(dashboard, "services_label"),
      tablistLabel: text(dashboard, "tablist_label"),
      quoteLabel: text(dashboard, "quote_label"),
      performanceLabel: text(dashboard, "performance_label"),
      liveLabel: text(dashboard, "live_label"),
      autoLabel: text(dashboard, "auto_label"),
      processLabel: text(dashboard, "process_label"),
      completedLabel: text(dashboard, "completed_label"),
      inProgressLabel: text(dashboard, "in_progress_label"),
      defaultSteps,
      workflowSteps,
      skeletonRows: skeletonRows(number(dashboard, "skeleton_rows", 5)),
    },
    tools: toolItems,
    socials: socialLinks
      .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
      .map((row) => ({ name: text(row, "name"), href: text(row, "href"), icon: text(row, "icon") })),
    socialLinks: {
      ariaLabel: text(labels.get("socialLinks.ariaLabel"), "value"),
      comingSoonSuffix: text(labels.get("socialLinks.comingSoonSuffix"), "value"),
    },
    testimonials: testimonials
      .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
      .map((row) => ({ quote: text(row, "quote"), name: text(row, "name"), role: text(row, "role") })),
    faq: faqs
      .sort((a, b) => number(a, "sort_order", 0) - number(b, "sort_order", 0))
      .map((row) => ({ q: text(row, "question"), a: text(row, "answer") })),
    footer: {
      headings: {
        pages: text(footer, "pages_heading"),
        contact: text(footer, "contact_heading"),
        newsletter: text(footer, "newsletter_heading"),
      },
      newsletterDescription: text(footer, "newsletter_description"),
      emailPlaceholder: text(footer, "email_placeholder"),
      waitLabel: text(footer, "wait_label"),
      subscribeLabel: text(footer, "subscribe_label"),
      success: text(footer, "success_message"),
      error: text(footer, "error_message"),
      copyrightSymbol: text(footer, "copyright_symbol"),
      copyrightText: text(footer, "copyright_text"),
    },
    chatbot: {
      title: text(bot, "title"),
      subtitle: text(bot, "subtitle"),
      ariaLabel: text(bot, "aria_label"),
      closeLabel: text(bot, "close_label"),
      openLabel: text(bot, "open_label"),
      welcome: text(bot, "welcome"),
      welcomeWithSlogan: text(bot, "welcome_with_slogan"),
      suggestions: prompts("chatbot"),
      thinking: text(bot, "thinking"),
      messageLabel: text(bot, "message_label"),
      messagePlaceholder: text(bot, "message_placeholder"),
      sendLabel: text(bot, "send_label"),
      fallbackDefaults: {
        email: text(bot, "fallback_email"),
        phone: text(bot, "fallback_phone"),
      },
      fallbackTemplates: {
        contact: text(templates.get("contact"), "value"),
        default: text(templates.get("default"), "value"),
        pricing: text(templates.get("pricing"), "value"),
        service: text(templates.get("service"), "value"),
        defaultServiceNames: text(bot, "default_service_names"),
      },
    },
    loading: {
      statusLabel: text(loadingMessage, "heading"),
      srOnly: text(loadingMessage, "description"),
    },
    error: {
      heading: text(errorMessage, "heading"),
      description: text(errorMessage, "description"),
      tryAgain: text(errorMessage, "button_label"),
      goHome: text(errorMessage, "button_href"),
    },
    notFound: {
      code: text(notFoundMessage, "code"),
      heading: text(notFoundMessage, "heading"),
      description: text(notFoundMessage, "description"),
      button: text(notFoundMessage, "button_label"),
    },
  } as Partial<SiteContent>;
}

export function mergeContent(base: SiteContent, override: Partial<SiteContent>): SiteContent {
  const merge = (current: unknown, next: unknown): unknown => {
    if (next === undefined) return current;
    if (Array.isArray(next)) return next;
    if (isRow(current) && isRow(next)) {
      const result: Row = { ...current };
      for (const [key, value] of Object.entries(next)) result[key] = merge(result[key], value);
      return result;
    }
    return next;
  };
  return merge(base, override) as SiteContent;
}
