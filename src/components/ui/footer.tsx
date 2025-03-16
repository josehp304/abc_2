"use client";

import Link from "next/link";
import { useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }, 1000);
  };

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About", href: "/aboutus" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contactus" },
        { name: "Join Us", href: "/joinus" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Web Development", href: "#" },
        { name: "Mobile Apps", href: "#" },
        { name: "UI/UX Design", href: "#" },
        { name: "Consulting", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
    { name: "GitHub", icon: FaGithub, href: "https://github.com" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Gooners Studio</h2>
              <p className="text-muted-foreground max-w-xs">
                Transforming ideas into captivating digital experiences with creativity and innovation.
              </p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === "loading"}
                  className="mt-2 w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {subscribeStatus === "loading" ? "Subscribing..." : 
                   subscribeStatus === "success" ? "Subscribed!" : 
                   "Subscribe"}
                </button>
              </div>
              {subscribeStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-500"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Gooners Studio. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-4 md:mt-0">
              Made with ❤️ by Gooners Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 