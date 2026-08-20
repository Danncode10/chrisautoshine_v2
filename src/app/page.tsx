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

export default function Home() {
  return (
    <>
      <Toaster position="bottom-right" theme="dark" richColors />
      <Navbar />
      <Hero />
      <SocialProofBar />
      <Services />
      <Gallery />
      <HowItWorks />
      <Packages />
      <CtaBanner />
      <ContactBlock />
      <Footer />
    </>
  );
}
