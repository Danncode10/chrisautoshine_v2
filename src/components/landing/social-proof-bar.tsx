import { siteConfig } from "@/lib/config";

export function SocialProofBar() {
  const { socialProof } = siteConfig;

  const stats = [
    { value: socialProof.customers, label: "Happy Customers" },
    { value: `${socialProof.rating}★`, label: `${socialProof.ratingSource} Rating` },
    { value: `${socialProof.yearsInBusiness}+`, label: "Years Experience" },
  ];

  return (
    <section className="bg-red-600 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center text-white">
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
