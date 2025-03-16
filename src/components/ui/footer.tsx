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
    <footer className="bg-background border-t border-border/10 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {/* Brand Section - Simplified */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-lg font-medium text-foreground mb-6">ABC Studio</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Crafting digital experiences that inspire and innovate.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links - Cleaner Layout */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-sm font-medium text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter - Separate Section with Cleaner Design */}
        <div className="mt-16 pt-10 border-t border-border/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">Stay Updated</h3>
              <p className="text-xs text-muted-foreground">Subscribe to our newsletter</p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full md:w-auto md:min-w-[320px]">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-3 py-2 text-xs rounded-l-md bg-background text-foreground border border-border/30 focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === "loading"}
                  className="bg-primary/10 text-primary px-4 py-2 text-xs rounded-r-md hover:bg-primary/20 transition-colors disabled:opacity-50"
                >
                  {subscribeStatus === "loading" ? "..." : 
                   subscribeStatus === "success" ? "✓" : 
                   "Subscribe"}
                </button>
              </div>
              {subscribeStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-500 mt-2"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar - Ultra Minimal */}
        <div className="mt-16 pt-6 border-t border-border/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} ABC Studio
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 md:mt-0">
            Made with ♥ by ABC Studio
          </p>
        </div>
      </div>
    </footer>
  );
} 