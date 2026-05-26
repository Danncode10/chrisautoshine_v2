/**
 * Business Config — dynamically loaded from business.json
 * Single source of truth for all client-facing content.
 * Edit business.json, and the landing page updates automatically.
 */

import businessData from "../../business.json" assert { type: "json" };

export const businessConfig = {
  name: businessData.business.name || "Chris Auto Shine",
  tagline: businessData.business.tagline || "Your vehicle deserves to shine.",
  description:
    businessData.business.description ||
    "Professional car wash and detailing services to make your vehicle shine like new.",
  industry: businessData.business.industry || "Auto Detailing",
  vertical: businessData.business.vertical || "service",

  branding: {
    primaryColor: businessData.branding.primaryColor || "#DC2626",
    accentColor: businessData.branding.accentColor || "#B91C1C",
    logoUrl: businessData.branding.logoUrl || null,
  },

  contact: {
    email: businessData.contact.email || "info@chrisautoshinedetailing.com.au",
    phone: businessData.contact.phone || "",
    address: businessData.contact.address || "26 Cameron St, Clontarf 4019, Australia",
    website: businessData.contact.website || "https://chrisautoshine.vercel.app",
    googleMapsUrl: businessData.contact.googleMapsUrl || null,
  },

  hours: businessData.hours || {
    monday: "By Appointment",
    tuesday: "By Appointment",
    wednesday: "By Appointment",
    thursday: "By Appointment",
    friday: "By Appointment",
    saturday: "By Appointment",
    sunday: "By Appointment",
  },

  socials: {
    twitter: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
    facebook: (businessData.socials as Record<string, string | null>).facebook || null,
    youtube: null as string | null,
    tiktok: (businessData.socials as Record<string, string | null>).tiktok || null,
  },

  socialProof: {
    rating: businessData.socialProof.rating || "5",
    ratingSource: businessData.socialProof.ratingSource || "Google",
    customers: businessData.socialProof.customers || "1000+",
    yearsInBusiness: businessData.socialProof.yearsInBusiness || "10",
  },

  seo: {
    keywords: businessData.seo.keywords || ["car wash", "auto detailing", "Brisbane"],
    ogImage: businessData.seo.ogImage || null,
    twitterHandle: businessData.seo.twitterHandle || null,
  },

  deployment: {
    domain: businessData.deployment.domain || null,
    vercelProject: businessData.deployment.vercelProject || null,
    appId: businessData.deployment.appId || "chris-auto-shine",
  },

  supabase: {
    organizationSlug: businessData.supabase.organizationSlug || null,
    projectRef: businessData.supabase.projectRef || null,
  },

  features: {
    blog: businessData.features.blog || false,
    gallery: businessData.features.gallery || true,
    testimonials: businessData.features.testimonials || false,
    pricing: businessData.features.pricing || true,
    contactForm: businessData.features.contactForm || true,
    teamPage: businessData.features.teamPage || false,
    analytics: businessData.features.analytics || false,
  },

  client: {
    name: businessData.client.name || null,
    email: businessData.client.email || null,
    github: businessData.client.github || null,
  },

  // No public GitHub repo for this client
  githubUrl: null as string | null,
} as const;

export type BusinessConfig = typeof businessConfig;
