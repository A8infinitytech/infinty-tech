// Contact page: email, social icons and the contact form.
import { Suspense } from "react";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation about your project with Infinity Tech.",
};

export default function Contact() {
  // WhatsApp link banane ke liye (number se + aur spaces hata kar)
  // Note: Agar aapke PHONE variable mein +92... hai to ye direct WhatsApp khol dega
  const whatsappNumber = PHONE.replace(/[^0-9]/g, ""); 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <section className="mx-auto grid min-h-[640px] max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-5">
      {/* Left Side: Info */}
      <div className="lg:col-span-2 flex flex-col justify-center">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's discuss your project"
          desc="Have an idea? Need help with AI or web development? Fill out the form or reach out directly. We usually reply within 24 hours."
        />
        
        <div className="mt-10 space-y-4">
          {/* Email Card */}
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center gap-5 rounded-2xl border border-surface-border bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-600 hover:shadow-lg"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              <Mail className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Email Us</p>
              <p className="mt-1 text-sm font-semibold text-ink-900">{EMAIL}</p>
            </div>
          </a>

          {/* WhatsApp Card */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 rounded-2xl border border-surface-border bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-600 hover:shadow-lg"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-green-500 group-hover:text-white">
              {/* WhatsApp Icon using standard SVG */}
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">WhatsApp Us</p>
              <p className="mt-1 text-sm font-semibold text-ink-900">{PHONE}</p>
            </div>
          </a>
        </div>

        {/* Follow Us Section */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-brand-600" />
            <p className="text-sm font-semibold">Connect on Social Media</p>
          </div>
          <SocialLinks />
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="lg:col-span-3">
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30 p-2 sm:p-4">
          <Suspense fallback={<div className="h-[400px] flex items-center justify-center animate-pulse bg-white rounded-2xl">Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}