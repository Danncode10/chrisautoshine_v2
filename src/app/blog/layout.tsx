import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
