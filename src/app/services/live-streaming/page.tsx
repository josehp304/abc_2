'use client';

import { motion } from 'framer-motion';
import { FaVideo, FaUsers, FaComments, FaCog, FaCheck, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ThemeToggle from "@/components/theme-toggle";
import { GridCard } from "@/components/ui/grid-card";
import Link from 'next/link';

const features = [
  {
    title: "High-Quality Streaming",
    description: "Broadcast in crystal clear HD/4K quality with professional-grade equipment and encoding.",
    icon: <FaVideo className="w-8 h-8" />,
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    title: "Multi-Platform Support",
    description: "Stream simultaneously to YouTube, Facebook, Twitch, and custom RTMP destinations.",
    icon: <FaUsers className="w-8 h-8" />,
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    title: "Real-Time Engagement",
    description: "Interact with your audience through live chat, polls, and Q&A sessions.",
    icon: <FaComments className="w-8 h-8" />,
    gradient: "from-green-600 to-teal-600"
  },
  {
    title: "24/7 Technical Support",
    description: "Expert team available for immediate assistance and troubleshooting.",
    icon: <FaCog className="w-8 h-8" />,
    gradient: "from-red-600 to-pink-600"
  }
];

const process = [
  {
    step: 1,
    title: "Consultation",
    description: "We discuss your event requirements and design a custom streaming solution."
  },
  {
    step: 2,
    title: "Setup & Testing",
    description: "Professional setup of equipment and thorough testing of all systems."
  },
  {
    step: 3,
    title: "Live Execution",
    description: "Smooth broadcasting with real-time monitoring and support."
  },
  {
    step: 4,
    title: "Post-Event Analytics",
    description: "Detailed reports and recordings for future reference."
  }
];

const testimonials = [
  {
    name: "Tech Conference 2024",
    quote: "Flawless streaming quality for our 3-day virtual conference with over 10,000 attendees.",
    image: "/testimonials/tech-conf.jpg"
  },
  {
    name: "Global Music Festival",
    quote: "ABC Studios helped us reach 1M+ viewers across multiple platforms simultaneously.",
    image: "/testimonials/music-fest.jpg"
  },
  {
    name: "Corporate Summit",
    quote: "Professional team that delivered beyond our expectations. Will definitely work with them again.",
    image: "/testimonials/corporate.jpg"
  }
];

const faqs = [
  {
    question: "Which platforms do you support for live streaming?",
    answer: "We support all major platforms including YouTube, Facebook Live, Twitch, and custom RTMP destinations. Multiple simultaneous streams are also possible."
  },
  {
    question: "How many cameras can be used in a single stream?",
    answer: "We can support up to 8 cameras in a single stream with our multi-camera switching setup. This allows for dynamic and engaging content delivery."
  },
  {
    question: "What internet speed is required for high-quality streaming?",
    answer: "For 1080p streaming, we recommend a minimum upload speed of 10Mbps. We also bring backup internet solutions for critical events."
  },
  {
    question: "Do you provide post-event recordings?",
    answer: "Yes, we provide both raw footage and edited highlights of your stream in multiple formats, suitable for various platforms and purposes."
  }
];

export default function LiveStreamingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Live Streaming"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-primary-foreground"
          >
            Live Streaming Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4 text-primary-foreground"
          >
            Professional-grade streaming solutions for virtual and hybrid events, delivering exceptional quality and engagement.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
            >
              Why Choose Our Streaming Service?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Experience the difference with our professional streaming solutions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 h-full"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            >
              Our Process
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              A streamlined approach to deliver exceptional streaming experiences
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 h-full relative"
                >
                  <div className="text-4xl font-bold text-primary mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/50" />
                  )}
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground"
            >
              Find answers to common questions about our streaming services
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center cursor-pointer">
                    <h3 className="text-lg font-semibold text-card-foreground">{faq.question}</h3>
                    <FaQuestionCircle className={`text-primary transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                  {openFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-muted-foreground"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
              variants={fadeInUp}
            >
              Ready to Start Streaming?
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Let's create an exceptional streaming experience for your audience
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contactus">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg">
                  Get Started
                </button>
              </Link>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 