export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Chris Auto Shine Detailing",
  description:
    "Professional car wash and detailing services to make your vehicle shine like new.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://chrisautoshine.vercel.app",
  socialProof: {
    rating: "5",
    ratingSource: "Google",
    customers: "1000+",
    yearsInBusiness: "10",
  },
  contact: {
    email: "info@chrisautoshinedetailing.com.au",
    phone: "",
    address: "26 Cameron St, Clontarf 4019, Australia",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15600.000000000000!2d153.0724!3d-27.2486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m1!1s26%20Cameron%20St%2C%20Clontarf%204019%2C%20Australia!5e0!3m2!1sen!2sus!4v1726200000000",
  },
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61579380248722",
    instagram: null as string | null,
    tiktok: "https://www.tiktok.com/@malaykosayuwolf",
  },
} as const;
