// app/contact/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { type SiteContent, iconElement } from "@/lib/data";
import { getSiteContent } from "@/lib/site-content";
import { getCmsServices } from "@/lib/cms/services";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return content.contact.metadata;
}

// Main Page Component
export default async function Contact() {
  const content = await getSiteContent();
  return (
    <section className="mx-auto grid min-h-[640px] max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-5">
      {/* Data fetch karne wale hisse ko Suspense mein wrap kiya */}
      <Suspense fallback={
        <div className="col-span-full flex items-center justify-center py-20 text-ink-500">
          {content.contact.loadingContactInfo}
        </div>
      }>
        <ContactContent content={content} />
      </Suspense>
    </section>
  );
}

// Alag async component jo data fetch karega
async function ContactContent({ content }: { content: SiteContent }) {
  const settings = await getSettings();
  const servicesData = await getCmsServices();

  const { contact } = content;
  const phoneNumber = settings?.phone || contact.fallbacks.phone;
  const emailAddress = settings?.email || contact.fallbacks.email;
  const whatsapp = content.iconMeta.whatsapp;
  
  const whatsappNumber = phoneNumber.replace(/[^0-9]/g, ""); 
  const whatsappLink = `${contact.whatsappBaseUrl}${whatsappNumber}`;

  return (
    <>
      {/* Left Side: Info */}
      <div className="lg:col-span-2 flex flex-col justify-center">
        <SectionHeading
          as="h1"
          eyebrow={contact.heading.eyebrow}
          title={contact.heading.title}
          desc={contact.heading.desc}
        />
        
        <div className="mt-10 space-y-4">
          {/* Email Card */}
          <a href={`mailto:${emailAddress}`} className="group flex items-center gap-5 rounded-2xl border border-surface-border bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-600 hover:shadow-lg">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              {iconElement("Mail", { className: "h-6 w-6", "aria-hidden": true })}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{contact.emailLabel}</p>
              <p className="mt-1 text-sm font-semibold text-ink-900">{emailAddress}</p>
            </div>
          </a>

          {/* WhatsApp Card */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 rounded-2xl border border-surface-border bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-600 hover:shadow-lg">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-green-500 group-hover:text-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox={whatsapp.viewBox} xmlns="http://www.w3.org/2000/svg">
                <path d={whatsapp.path} />
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{contact.whatsappLabel}</p>
              <p className="mt-1 text-sm font-semibold text-ink-900">{phoneNumber}</p>
            </div>
          </a>
        </div>

        {/* Follow Us Section */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            {iconElement("MessageSquare", { className: "h-5 w-5 text-brand-600", "aria-hidden": true })}
            <p className="text-sm font-semibold">{contact.socialHeading}</p>
          </div>
          <SocialLinks />
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="lg:col-span-3">
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30 p-2 sm:p-4">
          <Suspense fallback={<div className="h-[400px] flex items-center justify-center animate-pulse bg-white rounded-2xl">{contact.loadingForm}</div>}>
            <ContactForm services={servicesData} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
