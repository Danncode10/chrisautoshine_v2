import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { Services } from "@/components/landing/services";
import { Packages } from "@/components/landing/packages";
import { About } from "@/components/landing/about";
import { ContactBlock } from "@/components/landing/contact-block";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProofBar />
      <Services />
      <Packages />
      <About />
      <ContactBlock />
      <Footer />
    </>
  );
}
