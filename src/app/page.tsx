import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { Services } from "@/components/landing/services";
import { Gallery } from "@/components/landing/gallery";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Packages } from "@/components/landing/packages";
import { CtaBanner } from "@/components/landing/cta-banner";
import { ContactBlock } from "@/components/landing/contact-block";
import { BlogPreview } from "@/components/landing/blog-preview";
import { listPublishedServices } from "@/services/services";

// Fetch fresh on every request (revalidatePath in dashboard mutations re-renders this)
export const dynamic = "force-dynamic";

export default async function Home() {
  const services = await listPublishedServices();

  return (
    <>
      <Toaster position="bottom-right" theme="dark" richColors />
      <Navbar />
      <Hero />
      <SocialProofBar />
      <Services />
      <Gallery />
      <HowItWorks />
      <Packages services={services} />
      <CtaBanner />
      <BlogPreview />
      <ContactBlock />
      <Footer />
    </>
  );
}
