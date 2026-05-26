import { FaFacebook, FaTiktok } from "react-icons/fa";
import { businessConfig } from "@/lib/business-config";

const quickLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#packages", label: "Packages" },
  { href: "/#contact", label: "Contact" },
];

const servicesList = [
  "Exterior Wash",
  "Interior Detailing",
  "Waxing & Polishing",
  "Paint Correction",
  "Ceramic Coating",
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-xl mb-3">{businessConfig.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              Professional mobile car detailing serving Brisbane and surrounding areas.
              Your vehicle deserves to shine.
            </p>
            <div className="flex gap-3">
              {businessConfig.socials.facebook && (
                <a
                  href={businessConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-primary/20 text-white/60 hover:text-primary transition-colors"
                >
                  <FaFacebook size={16} />
                </a>
              )}
              {businessConfig.socials.tiktok && (
                <a
                  href={businessConfig.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-primary/20 text-white/60 hover:text-primary transition-colors"
                >
                  <FaTiktok size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {servicesList.map((s) => (
                <li key={s} className="text-sm text-muted-foreground">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              {businessConfig.contact.email && (
                <li>
                  <a
                    href={`mailto:${businessConfig.contact.email}`}
                    className="text-sm text-muted-foreground hover:text-white transition-colors break-all"
                  >
                    {businessConfig.contact.email}
                  </a>
                </li>
              )}
              {businessConfig.contact.phone && (
                <li>
                  <a
                    href={`tel:${businessConfig.contact.phone}`}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {businessConfig.contact.phone}
                  </a>
                </li>
              )}
              {businessConfig.contact.address && (
                <li className="text-sm text-muted-foreground leading-relaxed">
                  {businessConfig.contact.address}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} {businessConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Professional Auto Detailing · Brisbane, QLD
          </p>
        </div>
      </div>
    </footer>
  );
}
