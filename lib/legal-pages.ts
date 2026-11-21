// lib/legal-pages.ts
export type LegalPageKey =
  | "privacy-policy"
  | "terms-conditions"
  | "cookie-policy"
  | "disclaimer"
  | "refund-cancellation-policy";

type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageContent = {
  slug: LegalPageKey;
  title: string;
  description: string;
  sections: LegalSection[];
};

export const legalPages: Record<LegalPageKey, LegalPageContent> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Infinity Tech collects, uses and protects your personal information.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect information that you provide directly when you contact us, request a quote, subscribe to updates or use our services. This may include your name, email address, phone number, company name, project details and the content of your messages.",
          "We may also collect limited technical information such as your browser type, device type, pages visited and approximate location derived from IP address. Where required, we collect this information through cookies and similar technologies described in our Cookie Policy."
        ]
      },
      {
        heading: "How we use your information",
        bullets: [
          "To respond to enquiries, prepare proposals and deliver requested services.",
          "To communicate project updates, support requests and important service notices.",
          "To improve our website, content, security and user experience.",
          "To send newsletters or marketing messages only where you have consented.",
          "To meet legal, accounting and regulatory obligations."
        ]
      },
      {
        heading: "How we share information",
        paragraphs: [
          "We do not sell your personal data. We may share it with trusted service providers who help us operate the website and deliver services, such as hosting, email delivery, messaging, analytics and payment providers. These providers may use your information only for the purposes we instruct.",
          "We may also disclose information if required by law, to protect the rights and safety of Infinity Tech, our users or others, or in connection with a business transfer where appropriate safeguards are in place."
        ]
      },
      {
        heading: "Data retention and security",
        paragraphs: [
          "We keep personal information only as long as needed for the purposes described in this policy, including ongoing business relationships and legal record-keeping requirements. We use reasonable technical and organisational measures to protect your information from unauthorised access, loss or misuse."
        ]
      },
      {
        heading: "Your rights",
        bullets: [
          "Request access to the personal information we hold about you.",
          "Ask us to correct inaccurate or incomplete information.",
          "Request deletion of your information where legally permitted.",
          "Object to or restrict certain processing activities.",
          "Withdraw consent for marketing communications at any time."
        ]
      }
    ]
  },
  "terms-conditions": {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    description: "Conditions that apply when you use the Infinity Tech website and services.",
    sections: [
      {
        heading: "Acceptance of terms",
        paragraphs: [
          "By accessing this website or engaging Infinity Tech for any service, you agree to these Terms & Conditions. If you do not agree, please do not use the website or our services."
        ]
      },
      {
        heading: "Use of the website",
        bullets: [
          "You may use this website for lawful purposes only.",
          "You must not attempt to disrupt, hack, scrape or misuse the website or its infrastructure.",
          "You must not submit false, misleading, harmful or unlawful content through our forms.",
          "We may restrict or suspend access where we reasonably believe misuse has occurred."
        ]
      },
      {
        heading: "Services and scope",
        paragraphs: [
          "Service descriptions, proposals, quotations and delivery timelines are provided for guidance and become binding only when confirmed in writing. Any change to scope, timeline or deliverables must be agreed by both parties before additional work begins."
        ]
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Unless otherwise agreed in writing, all content, designs, code, documents and materials created by Infinity Tech remain our intellectual property until full payment is received. Client-supplied materials remain the property of the client, and the client confirms they have the right to provide them."
        ]
      },
      {
        heading: "Payments and liability",
        paragraphs: [
          "Fees, payment schedules and currency are stated in the relevant proposal or invoice. To the maximum extent permitted by law, Infinity Tech is not liable for indirect, incidental or consequential losses, or for damages arising from third-party services, network interruptions or factors outside our reasonable control."
        ]
      },
      {
        heading: "Termination",
        paragraphs: [
          "Either party may terminate an engagement by written notice. Work completed up to the termination date remains payable. Sections relating to confidentiality, intellectual property, payment and liability survive termination."
        ]
      }
    ]
  },
  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "How Infinity Tech uses cookies, local storage and similar tracking technologies.",
    sections: [
      {
        heading: "What cookies are",
        paragraphs: [
          "Cookies are small text files stored on your device by a website. They help websites remember information about your visit, such as preferences, login state and how you use the site. Local storage works in a similar way and is used for settings such as your theme preference."
        ]
      },
      {
        heading: "Cookies and storage we use",
        bullets: [
          "Essential cookies: used for administrator authentication and secure access to protected areas.",
          "Preference storage: used to remember settings such as light or dark mode.",
          "Analytics cookies: used only where enabled to understand page visits and improve performance.",
          "Marketing cookies: used only where enabled to measure campaigns and relevant communications."
        ]
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can control or block cookies through your browser settings. Blocking essential cookies may prevent parts of the website from working correctly, including admin login. You can also clear existing cookies and local storage at any time from your browser."
        ]
      },
      {
        heading: "Third-party cookies",
        paragraphs: [
          "Some cookies may be set by third-party services that support the website, such as hosting, analytics or communication tools. These services process information according to their own privacy terms and the purposes for which we use them."
        ]
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this Cookie Policy to reflect changes in technology or legal requirements. The updated version will be posted on this page with a revised date."
        ]
      }
    ]
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "Limitations of the information provided on the Infinity Tech website.",
    sections: [
      {
        heading: "General information",
        paragraphs: [
          "The information on this website is provided for general informational purposes only. While we aim to keep it accurate and up to date, Infinity Tech makes no representation or warranty that it is complete, error-free or suitable for your specific circumstances."
        ]
      },
      {
        heading: "Professional advice",
        paragraphs: [
          "Website content, articles and examples do not constitute legal, financial, tax or other professional advice. You should seek appropriate advice from a qualified professional before making decisions based on such information."
        ]
      },
      {
        heading: "AI and technology outputs",
        paragraphs: [
          "AI systems and automation can produce inaccurate or incomplete results. Outputs demonstrated or described on this website are illustrative and should be reviewed and verified by a qualified human before being relied upon in business, safety, legal or financial contexts."
        ]
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "Links to third-party websites are provided for convenience. We do not control their content, availability or privacy practices, and we are not responsible for any loss or damage arising from your use of them."
        ]
      },
      {
        heading: "No guarantee of results",
        paragraphs: [
          "Past project outcomes and case studies are examples of work and are not a guarantee of future results. Business outcomes depend on many factors, including data quality, market conditions and how recommendations are implemented."
        ]
      }
    ]
  },
  "refund-cancellation-policy": {
    slug: "refund-cancellation-policy",
    title: "Refund & Cancellation Policy",
    description: "Payment, cancellation and refund rules for Infinity Tech services.",
    sections: [
      {
        heading: "Payments",
        paragraphs: [
          "Fees are confirmed in the proposal, statement of work or invoice before work begins. Payment terms stated in those documents apply to each engagement. Work may begin only after the agreed initial payment or deposit has been received."
        ]
      },
      {
        heading: "Cancellation before work starts",
        paragraphs: [
          "You may cancel a confirmed engagement before work starts by notifying us in writing. Any deposit or advance payment may be refunded after deducting reasonable administrative, planning and third-party booking costs already incurred."
        ]
      },
      {
        heading: "Cancellation after work starts",
        paragraphs: [
          "Once work has started, fees for completed work, milestones reached and non-cancellable third-party costs are not refundable. Where work is billed monthly, the current billing period remains payable unless otherwise agreed in writing."
        ]
      },
      {
        heading: "Refund requests",
        bullets: [
          "Refunds are considered only where a paid deliverable has not been provided or a material error on our side is confirmed.",
          "Requests must be submitted in writing within seven days of the relevant delivery or billing date.",
          "Approved refunds are returned to the original payment method where possible, or by another agreed method.",
          "Processing times depend on the payment provider and bank and are typically five to fifteen business days."
        ]
      },
      {
        heading: "No refund circumstances",
        bullets: [
          "Change of mind after work has commenced.",
          "Delays caused by incomplete client information, feedback or approvals.",
          "Customised, completed or already delivered digital work.",
          "Third-party fees, subscriptions or licences purchased on the client's behalf."
        ]
      }
    ]
  }
};
