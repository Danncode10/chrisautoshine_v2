"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { businessConfig } from "@/lib/business-config";

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15600.000000000000!2d153.0724!3d-27.2486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m1!1s26%20Cameron%20St%2C%20Clontarf%204019%2C%20Australia!5e0!3m2!1sen!2sus!4v1726200000000";

export function ContactBlock() {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setSending(true);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      try {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
      } catch {
        // auto-reply failure is non-critical
      }
      toast.success("Message sent! We'll get back to you soon.");
      form.current.reset();
    } catch {
      toast.error("Failed to send. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Book a Detail</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Ready for a showroom-fresh vehicle? Drop us a message and we&apos;ll lock in your booking.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ── Left: info + socials + map ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Contact info */}
            <div className="space-y-4">
              {businessConfig.contact.email && (
                <a
                  href={`mailto:${businessConfig.contact.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                    {businessConfig.contact.email}
                  </span>
                </a>
              )}

              {businessConfig.contact.phone && (
                <a
                  href={`tel:${businessConfig.contact.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                    {businessConfig.contact.phone}
                  </span>
                </a>
              )}

              {businessConfig.contact.address && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {businessConfig.contact.address}
                  </span>
                </div>
              )}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {businessConfig.socials.facebook && (
                <a
                  href={businessConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-primary/20 text-white/60 hover:text-primary transition-colors"
                >
                  <FaFacebook size={18} />
                </a>
              )}
              {businessConfig.socials.tiktok && (
                <a
                  href={businessConfig.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-primary/20 text-white/60 hover:text-primary transition-colors"
                >
                  <FaTiktok size={18} />
                </a>
              )}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border">
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chris Auto Shine Detailing location"
              />
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-3xl p-px bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent inner-highlight">
              <div className="bg-card rounded-3xl p-8">
                <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">Name</label>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">Email</label>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about your vehicle and the service you need..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
